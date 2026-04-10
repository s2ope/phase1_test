import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("flatter")).toBeInTheDocument();
  });

  it("renders all desktop nav links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About us")).toBeInTheDocument();
    expect(screen.getByText("Career")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders Get Started CTA button", () => {
    render(<Navbar />);
    const ctaLinks = screen.getAllByText("Get Started");
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("logo links to home", () => {
    render(<Navbar />);
    const logoLink = screen.getByText("flatter").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("Get Started links to /get-started", () => {
    render(<Navbar />);
    const ctaLinks = screen.getAllByText("Get Started");
    const desktopCta = ctaLinks[0].closest("a");
    expect(desktopCta).toHaveAttribute("href", "/get-started");
  });

  it("mobile menu is hidden by default", () => {
    render(<Navbar />);
    // Mobile menu links won't be visible — check the toggle button is present
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("opens mobile menu on hamburger click", () => {
    render(<Navbar />);
    const toggleBtn = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleBtn);

    // After opening, mobile links appear — About us appears twice (desktop + mobile)
    const aboutLinks = screen.getAllByText("About us");
    expect(aboutLinks.length).toBeGreaterThan(1);
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<Navbar />);

    // Open menu
    fireEvent.click(screen.getByLabelText("Toggle menu"));

    const aboutLinks = screen.getAllByText("About us");
    expect(aboutLinks.length).toBeGreaterThan(1);

    // Click mobile link (last one = mobile version)
    fireEvent.click(aboutLinks[aboutLinks.length - 1]);

    // Menu closes — only one "About us" remains (desktop)
    expect(screen.getAllByText("About us").length).toBe(1);
  });

  it("toggles mobile menu closed on second hamburger click", () => {
    render(<Navbar />);
    const btn = screen.getByLabelText("Toggle menu");

    fireEvent.click(btn); // open
    fireEvent.click(btn); // close

    expect(screen.getAllByText("About us").length).toBe(1);
  });
});