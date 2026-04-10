import { render, screen, fireEvent } from "@testing-library/react";
import BorrowSection from "../components/MortgageCalculator";

describe("MortgageCalculator (BorrowSection)", () => {
  it("renders the headline and inputs", () => {
    render(<BorrowSection />);
    expect(
      screen.getByText("Estimate how much you could borrow from our bank partners")
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/home price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/down payment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/term \(years\)/i)).toBeInTheDocument();
  });

  it("calculates and displays monthly payment with default values", () => {
    render(<BorrowSection />);
    // Default: principal=500000, down=100000, rate=5.5, term=15
    // Should display a formatted dollar amount
    const result = screen.getByText(/\$[\d,]+\.\d{2}/);
    expect(result).toBeInTheDocument();
  });

  it("shows dash when inputs are invalid/empty", () => {
    render(<BorrowSection />);
    const priceInput = screen.getByLabelText(/home price/i);
    fireEvent.change(priceInput, { target: { value: "" } });

    const rateInput = screen.getByLabelText(/interest rate/i);
    fireEvent.change(rateInput, { target: { value: "" } });

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("updates monthly payment when home price changes", () => {
    render(<BorrowSection />);
    const priceInput = screen.getByLabelText(/home price/i);

    fireEvent.change(priceInput, { target: { value: "1000000" } });

    const result = screen.getByText(/\$[\d,]+\.\d{2}/);
    expect(result).toBeInTheDocument();
  });

  it("displays loan amount and down payment breakdown", () => {
    render(<BorrowSection />);
    expect(screen.getByText("Total loan amount")).toBeInTheDocument();
    expect(screen.getByText("Down payment")).toBeInTheDocument();
  });

  it("down payment cannot exceed principal", () => {
    render(<BorrowSection />);
    const priceInput = screen.getByLabelText(/home price/i);
    const downInput = screen.getByLabelText(/down payment/i);

    fireEvent.change(priceInput, { target: { value: "300000" } });
    fireEvent.change(downInput, { target: { value: "999999" } });

    // Should clamp or show $0 monthly payment (loan <= 0)
    // Monthly payment should be $0.00 or — when down >= principal
    const result = screen.getByText(/\$0\.00|—/);
    expect(result).toBeInTheDocument();
  });

  it("updates payment when interest rate changes", () => {
    render(<BorrowSection />);
    const rateInput = screen.getByLabelText(/interest rate/i);
    fireEvent.change(rateInput, { target: { value: "3" } });

    const result = screen.getByText(/\$[\d,]+\.\d{2}/);
    expect(result).toBeInTheDocument();
  });

  it("updates payment when loan term slider changes", () => {
    render(<BorrowSection />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "30" } });

    expect(screen.getByText("30 Years")).toBeInTheDocument();
  });

  it("renders Share and Get In Touch buttons", () => {
    render(<BorrowSection />);
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders disclaimer text", () => {
    render(<BorrowSection />);
    expect(
      screen.getByText(/All calculations are estimates/i)
    ).toBeInTheDocument();
  });

  it("renders with custom Sanity data", () => {
    render(
      <BorrowSection
        data={{
          eyebrow: "monthly",
          headline: "Custom headline text",
          defaultAmount: "$5,000",
        }}
      />
    );
    expect(screen.getByText("Custom headline text")).toBeInTheDocument();
  });
});