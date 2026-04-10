import { render, screen, fireEvent } from "@testing-library/react";
import FeaturesCarousel from "../components/FeaturesCarousel";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockItems = [
  { _key: "f1", headline: "Feature One headline", ctaLabel: "Learn more one", ctaHref: "/one" },
  { _key: "f2", headline: "Feature Two headline", ctaLabel: "Learn more two", ctaHref: "/two" },
  { _key: "f3", headline: "Feature Three headline", ctaLabel: "Learn more three", ctaHref: "/three" },
  { _key: "f4", headline: "Feature Four headline", ctaLabel: "Learn more four", ctaHref: "/four" },
];

describe("FeaturesCarousel", () => {
  it("renders fallback items when no props passed", () => {
    render(<FeaturesCarousel />);
    expect(
      screen.getByText("Find and finance your home with us with online")
    ).toBeInTheDocument();
  });

  it("renders all provided items", () => {
    render(<FeaturesCarousel items={mockItems} />);
    expect(screen.getByText("Feature One headline")).toBeInTheDocument();
    expect(screen.getByText("Feature Two headline")).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    render(<FeaturesCarousel items={mockItems} />);
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("prev button is disabled at start", () => {
    render(<FeaturesCarousel items={mockItems} />);
    expect(screen.getByLabelText("Previous")).toBeDisabled();
  });

  it("next button is enabled when there are more items than visible", () => {
    render(<FeaturesCarousel items={mockItems} />);
    // On jsdom window.innerWidth defaults to 1024, so visibleCount = 3, maxIndex = 1
    expect(screen.getByLabelText("Next")).not.toBeDisabled();
  });

  it("clicking next enables the prev button", () => {
    render(<FeaturesCarousel items={mockItems} />);
    fireEvent.click(screen.getByLabelText("Next"));
    expect(screen.getByLabelText("Previous")).not.toBeDisabled();
  });

  it("clicking next then prev returns to start (prev disabled again)", () => {
    render(<FeaturesCarousel items={mockItems} />);
    fireEvent.click(screen.getByLabelText("Next"));
    fireEvent.click(screen.getByLabelText("Previous"));
    expect(screen.getByLabelText("Previous")).toBeDisabled();
  });

  it("renders dot indicators", () => {
    render(<FeaturesCarousel items={mockItems} />);
    const dots = screen.getAllByLabelText(/Go to slide/i);
    expect(dots.length).toBeGreaterThan(0);
  });

  it("clicking a dot changes the active slide", () => {
    render(<FeaturesCarousel items={mockItems} />);
    const dots = screen.getAllByLabelText(/Go to slide/i);
    // Click slide 2
    fireEvent.click(dots[1]);
    // Prev should now be enabled since index moved
    expect(screen.getByLabelText("Previous")).not.toBeDisabled();
  });

  it("renders cta links with correct hrefs", () => {
    render(<FeaturesCarousel items={mockItems} />);
    const link = screen.getByText("Learn more one").closest("a");
    expect(link).toHaveAttribute("href", "/one");
  });

  it("renders numbered index labels", () => {
    render(<FeaturesCarousel items={mockItems} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });
});