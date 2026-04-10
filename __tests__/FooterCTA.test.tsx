import { render, screen, fireEvent } from "@testing-library/react";
import FooterCTA from "../components/FooterCTA";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

describe("FooterCTA", () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
  });

  it("renders the default headline", () => {
    render(<FooterCTA />);
    expect(screen.getByText("Have something to talk about?")).toBeInTheDocument();
  });

  it("renders the CTA button with correct label and href", () => {
    render(<FooterCTA />);
    const ctaLink = screen.getByText("Get Started");
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.closest("a")).toHaveAttribute("href", "/get-started");
  });

  it("renders all default footer links", () => {
    render(<FooterCTA />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("footer links have correct hrefs", () => {
    render(<FooterCTA />);
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Solutions").closest("a")).toHaveAttribute("href", "/solutions");
  });

  it("scroll to top button calls window.scrollTo", () => {
    render(<FooterCTA />);
    const scrollBtn = screen.getByLabelText("Scroll to top");
    fireEvent.click(scrollBtn);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("renders copyright text", () => {
    render(<FooterCTA />);
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
  });

  it("renders logo mark", () => {
    render(<FooterCTA />);
    // Logo text appears in footer
    const logoText = screen.getAllByText("flatter");
    expect(logoText.length).toBeGreaterThan(0);
  });

  it("renders with custom Sanity data", () => {
    render(
      <FooterCTA
        data={{
          headline: "Ready to find your home?",
          ctaLabel: "Contact Us",
          ctaHref: "/contact",
          footerLinks: [
            { _key: "l1", label: "Blog", href: "/blog" },
            { _key: "l2", label: "Careers", href: "/careers" },
          ],
        }}
      />
    );
    expect(screen.getByText("Ready to find your home?")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
  });
});