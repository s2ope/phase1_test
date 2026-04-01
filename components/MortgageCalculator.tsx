"use client";

import { useState, useCallback } from "react";
import type { BorrowSectionData } from "../sanity/types";

interface BorrowSectionProps {
  data?: BorrowSectionData;
}

const FALLBACK: BorrowSectionData = {
  eyebrow: "per month",
  headline: "Estimate how much you could borrow from our bank partners",
  defaultAmount: "$17,81 20.20",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  downPayment: number,
  termYears: number
): number {
  const loanAmount = principal - downPayment;
  if (loanAmount <= 0) return 0;
  if (annualRate === 0) return loanAmount / (termYears * 12);
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
}

export default function BorrowSection({ data = FALLBACK }: BorrowSectionProps) {
  const d = data ?? FALLBACK;

  const [principal, setPrincipal] = useState(500000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [downPayment, setDownPayment] = useState(100000);
  const [termYears, setTermYears] = useState(30);
  const [calculated, setCalculated] = useState(false);

  const monthlyPayment = useCallback(
    () => calculateMonthlyPayment(principal, interestRate, downPayment, termYears),
    [principal, interestRate, downPayment, termYears]
  );

  const handleCalculate = () => setCalculated(true);

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
            </span>
            <span className="text-[12px] text-[#1a1a1a]/50">{d.eyebrow}</span>
          </div>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight max-w-xl">
            {d.headline}
          </h2>
        </div>

        {/* Calculator card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Inputs */}
          <div className="flex flex-col gap-5">
            {/* Principal */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[13px]">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => { setPrincipal(Number(e.target.value)); setCalculated(false); }}
                  className="w-full bg-white/10 text-white text-[14px] rounded-xl pl-7 pr-4 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="500000"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[13px]">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => { setDownPayment(Number(e.target.value)); setCalculated(false); }}
                  className="w-full bg-white/10 text-white text-[14px] rounded-xl pl-7 pr-4 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="100000"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  step={0.1}
                  onChange={(e) => { setInterestRate(Number(e.target.value)); setCalculated(false); }}
                  className="w-full bg-white/10 text-white text-[14px] rounded-xl pl-4 pr-8 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="5.5"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-[13px]">%</span>
              </div>
            </div>

            {/* Loan Term slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                  Loan Term
                </label>
                <span className="text-[12px] text-white font-semibold">{termYears} years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={termYears}
                onChange={(e) => { setTermYears(Number(e.target.value)); setCalculated(false); }}
                className="w-full accent-[#f0c132] h-1 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>5y</span><span>10y</span><span>15y</span><span>20y</span><span>25y</span><span>30y</span>
              </div>
            </div>
          </div>

          {/* Right: Output */}
          <div className="flex flex-col items-start gap-6 md:pl-8 md:border-l border-white/10">
            {/* Result */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-white/40 uppercase tracking-widest font-mono">
                Est. Monthly Payment
              </span>
              <p className="text-[40px] md:text-[48px] font-bold text-white leading-none tracking-tight">
                {calculated
                  ? formatCurrency(monthlyPayment())
                  : <span className="text-white/20">—</span>}
              </p>
              {calculated && (
                <p className="text-[12px] text-white/40 mt-1">
                  Loan amount: {formatCurrency(principal - downPayment)} over {termYears} years
                </p>
              )}
            </div>

            {/* Up arrow (calculate) */}
            <button
              onClick={handleCalculate}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#f0c132] transition-colors group"
              aria-label="Calculate"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 13V3M3 8l5-5 5 5"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
              <button className="text-[12px] text-white/60 border border-white/20 px-5 py-2.5 rounded-full hover:border-white/50 transition-colors">
                Share
              </button>
              <button className="text-[12px] bg-[#f0c132] text-[#1a1a1a] font-semibold px-5 py-2.5 rounded-full hover:bg-[#f5d060] transition-colors">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}