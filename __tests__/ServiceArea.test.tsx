import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ServiceAreaSection from "../components/ServiceArea";

let mockMap: any;
let mockMarkers: any[] = [];

beforeEach(() => {
  mockMap = {
    panTo: jest.fn(),
    setZoom: jest.fn(),
  };

  mockMarkers = [];

  (window as any).google = {
    maps: {
      Map: jest.fn(() => mockMap),
      Marker: jest.fn(() => {
        const fakeMarker = {
          setMap: jest.fn(),
          setIcon: jest.fn(),
          addListener: jest.fn(),
        };
        mockMarkers.push(fakeMarker);
        return fakeMarker;
      }),
      Size: jest.fn((w: number, h: number) => ({ w, h })),
      Point: jest.fn((x: number, y: number) => ({ x, y })),
    },
  };

  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "test-key";
});

afterEach(() => {
  jest.clearAllMocks();
  mockMarkers = [];
});

// ─── helper: render and wait for map + markers to be ready ───────────────────
async function renderAndWait() {
  render(<ServiceAreaSection />);
  await waitFor(() => {
    expect(mockMarkers.length).toBe(3);
  });
}

describe("Map interaction logic", () => {

  it("clicking a location triggers panTo and setZoom on the map", async () => {
    await renderAndWait();

    await act(async () => {
      fireEvent.click(screen.getByText("Kotagede Yogyakarta"));
    });

    await waitFor(() => {
      expect(mockMap.panTo).toHaveBeenCalledWith({ lat: -7.8731, lng: 110.4 });
      expect(mockMap.setZoom).toHaveBeenCalledWith(15);
    }, { timeout: 2000 });
  });

  it("only the clicked marker gets isActive=true, others get isActive=false", async () => {
    await renderAndWait();

    await act(async () => {
      fireEvent.click(screen.getByText("Kotagede Yogyakarta"));
    });

    await waitFor(() => {
      // marker 0 = Kotagede (clicked) → icon url must contain #ffe033 (active color)
      const activeIconArg = mockMarkers[0].setIcon.mock.calls[0][0];
      expect(activeIconArg.url).toContain("%23ffe033"); // #ffe033 URL-encoded

      // marker 1 = Imogiri (not clicked) → icon url must contain #888888 (inactive color)
      const inactiveIconArg = mockMarkers[1].setIcon.mock.calls[0][0];
      expect(inactiveIconArg.url).toContain("%23888888"); // #888888 URL-encoded

      // marker 2 = Condongcatur (not clicked) → same inactive color
      const inactiveIconArg2 = mockMarkers[2].setIcon.mock.calls[0][0];
      expect(inactiveIconArg2.url).toContain("%23888888");
    });
  });

  it("clicking a different location switches which marker is active", async () => {
    await renderAndWait();

    // Click first location
    await act(async () => {
      fireEvent.click(screen.getByText("Kotagede Yogyakarta"));
    });

    // Click second location
    await act(async () => {
      fireEvent.click(screen.getByText("Makam Imogiri Jogja"));
    });

    await waitFor(() => {
      // Get the LAST call to setIcon for each marker (index -1 = last call)
      const calls0 = mockMarkers[0].setIcon.mock.calls;
      const calls1 = mockMarkers[1].setIcon.mock.calls;

      const lastIconMarker0 = calls0[calls0.length - 1][0];
      const lastIconMarker1 = calls1[calls1.length - 1][0];

      // marker 0 (Kotagede) should now be inactive
      expect(lastIconMarker0.url).toContain("%23888888");

      // marker 1 (Imogiri) should now be active
      expect(lastIconMarker1.url).toContain("%23ffe033");
    });
  });

  it("clicking Show all locations resets map and all markers to default", async () => {
    await renderAndWait();

    // First activate a location so the button appears
    await act(async () => {
      fireEvent.click(screen.getByText("Kotagede Yogyakarta"));
    });

    // "← Show all locations" button is now visible
    await waitFor(() => {
      expect(screen.getByText("← Show all locations")).toBeInTheDocument();
    });

    // Click it
    await act(async () => {
      fireEvent.click(screen.getByText("← Show all locations"));
    });

    await waitFor(() => {
      // Map pans back to the center overview position
      expect(mockMap.panTo).toHaveBeenLastCalledWith({ lat: -7.8731, lng: 110.3948 });

      // Map zooms back out to overview zoom level
      expect(mockMap.setZoom).toHaveBeenLastCalledWith(11);

      // All markers go back to inactive color
      mockMarkers.forEach((marker) => {
        const calls = marker.setIcon.mock.calls;
        const lastCall = calls[calls.length - 1][0];
        expect(lastCall.url).toContain("%23888888");
      });

      // The "← Show all locations" button disappears
      expect(screen.queryByText("← Show all locations")).not.toBeInTheDocument();
    });
  });

});