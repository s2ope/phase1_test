import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock sanity client
jest.mock("../sanity/lib/client", () => ({
  client: {
    fetch: jest.fn().mockResolvedValue([
      { title: "Palm Jumeirah", location: "Dubai, UAE", address: "Palm Jumeirah, Dubai" },
      { title: "Downtown Dubai", location: "Dubai, UAE", address: "Downtown, Dubai" },
      { title: "Abu Dhabi Villa", location: "Abu Dhabi, UAE", address: "Corniche, Abu Dhabi" },
    ]),
  },
}));

jest.mock("../sanity/queries", () => ({
  searchLocationsQuery: "mock-query",
}));

describe("SearchBar", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the headline and input", async () => {
    render(<SearchBar />);
    expect(screen.getByText("Start the")).toBeInTheDocument();
    expect(screen.getByText("search now.")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows loading state initially then placeholder", async () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Loading locations...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });
  });

  it("filters suggestions as user types", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Dubai" } });

    await waitFor(() => {
      expect(screen.getByText("Palm Jumeirah")).toBeInTheDocument();
      expect(screen.getByText("Downtown Dubai")).toBeInTheDocument();
    });
  });

  it("navigates to properties page when suggestion is clicked", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Palm" } });

    await waitFor(() => {
      expect(screen.getByText("Palm Jumeirah")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Palm Jumeirah"));
    expect(mockPush).toHaveBeenCalledWith("/properties?q=Palm%20Jumeirah");
  });

  it("navigates on Enter key press", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Abu Dhabi" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/properties?q=Abu%20Dhabi");
  });

  it("navigates on search button click", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Dubai" } });
    fireEvent.click(screen.getByLabelText("Search properties"));

    expect(mockPush).toHaveBeenCalledWith("/properties?q=Dubai");
  });

  it("does not navigate if search query is empty", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Search properties"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("closes dropdown on Escape key", async () => {
    render(<SearchBar />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Emirate, Neighborhood or building")).toBeInTheDocument();
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Dubai" } });

    await waitFor(() => {
      expect(screen.getByText("Palm Jumeirah")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByText("Palm Jumeirah")).not.toBeInTheDocument();
    });
  });

  it("renders with custom Sanity data", async () => {
    render(
      <SearchBar
        data={{
          headlineStart: "Begin your",
          headlineEnd: "journey today.",
          searchPlaceholder: "Search by city",
          searchImage: { url: "/test.jpg", alt: "Test" },
        }}
      />
    );
    expect(screen.getByText("Begin your")).toBeInTheDocument();
    expect(screen.getByText("journey today.")).toBeInTheDocument();
  });
});