"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { BorrowSectionData } from "../sanity/types";

interface BorrowSectionProps {
  data?: BorrowSectionData;
}

const FALLBACK: BorrowSectionData = {
  eyebrow: "per month",
  headline: "Estimate how much you could borrow from our bank partners",
  defaultAmount: "$17,8120.20",
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
  const loan = principal - downPayment;
  if (loan <= 0) return 0;
  if (annualRate === 0) return loan / (termYears * 12);
  const mr = annualRate / 100 / 12;
  const n = termYears * 12;
  return (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}

export default function BorrowSection({ data = FALLBACK }: BorrowSectionProps) {
  const d = data ?? FALLBACK;

const [principalStr, setPrincipalStr] = useState("500000");
const [downStr, setDownStr] = useState("100000");
const [interestRate, setInterestRate] = useState<number | "">(5.5);
const [termYears, setTermYears] = useState(15);

  const principal = parseFloat(principalStr) || 0;
  const downPayment = Math.min(parseFloat(downStr) || 0, principal);
  const loanAmount = principal - downPayment;
  const pct = principal > 0 ? Math.min(100, Math.max(0, (downPayment / principal) * 100)) : 0;

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const hasValidInputs = principal > 0 && (Number(interestRate) || 0) > 0 && termYears > 0;
  const monthlyPayment = hasValidInputs
    ? calculateMonthlyPayment(principal, Number(interestRate) || 0, downPayment, termYears)
    : null;

  function pctFromClientX(clientX: number) {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100;
  }

  function applyPct(p: number) {
    const clamped = Math.max(0, Math.min(100, p));
    if (principal > 0) {
      const dp = Math.round((clamped / 100) * principal);
      setDownStr(dp > 0 ? String(dp) : "");
    }
  }

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      applyPct(pctFromClientX(clientX));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [principal]);

  const onTrackDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    applyPct(pctFromClientX(clientX));
  };

  const onDownInput = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) && principal > 0 && num > principal) {
      setDownStr(String(principal));
    } else {
      setDownStr(val);
    }
  };

  return (
    <section className="bg-[#f5f0e8] px-4 sm:px-6 md:px-10 py-16">
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

        {/* Calculator card — split dark left / light right */}
        <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-black">

          {/* LEFT — dark panel */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 flex flex-col gap-5">

            {/* Home Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Home Price
              </label>
              <input
                type="number"
                value={principalStr}
                placeholder="Emirate, Neighborhood or building"
                onChange={(e) => setPrincipalStr(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-[13px] py-2 outline-none focus:border-[#f0c132] placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Down Payment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono flex justify-between">
                Down Payment
                <span className="text-white font-semibold normal-case">{Math.round(pct)}%</span>
              </label>
              <input
                type="number"
                value={downStr}
                placeholder="Emirate, Neighborhood or building"
                onChange={(e) => onDownInput(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-[13px] py-2 outline-none focus:border-[#f0c132] placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Interest Rate + Term side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                  Interest Rate
                </label>
                <input
                  type="number"
                  value={interestRate}
                  step={0.1}
                  placeholder="5.5"
                  onChange={(e) => setInterestRate(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-transparent border-b border-white/20 text-white text-[13px] py-2 outline-none focus:border-[#f0c132] placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                  Term (years)
                </label>
                <input
                  type="number"
                  value={termYears}
                  placeholder="30"
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full bg-transparent border-b border-white/20 text-white text-[13px] py-2 outline-none focus:border-[#f0c132] placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Loan Term slider */}
            <div className="flex flex-col gap-3 mt-1">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Length of Loan
              </label>

              {/* Slider track with floating pill */}
              <div className="relative pt-8">
                {/* Floating pill label */}
                <div
                  className="absolute top-0 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${((termYears - 5) / 25) * 100}%` }}
                >
                  <div className="bg-[#f0c132] text-[#1a1a1a] text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {termYears} Years
                  </div>
                </div>

                <input
                  type="range"
                  min={5}
                  max={30}
                  step={5}
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full accent-[#f0c132] cursor-pointer"
                  style={{ height: "4px" }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>5y</span><span>10y</span><span>15y</span><span>20y</span><span>25y</span><span>30y</span>
              </div>
            </div>
          </div>

          {/* RIGHT — light panel */}
          <div className="bg-[#f5f0e8] p-6 md:p-8 flex flex-col justify-between gap-6">

            {/* Top: result + arrow button */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#1a1a1a]/40">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[12px] text-[#1a1a1a]/50">{d.eyebrow}</span>
                </div>
                <p className="text-[38px] md:text-[44px] font-bold text-[#1a1a1a] leading-none tracking-tight">
                  {monthlyPayment !== null ? formatCurrency(monthlyPayment) : (
                    <span className="text-[#1a1a1a]/20">—</span>
                  )}
                </p>
                <p className="text-[12px] text-[#1a1a1a]/50 mt-1">Estimated mortgage payment</p>
              </div>

              {/* Arrow up button */}
              <button
                className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors group"
                aria-label="Calculate"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 14V4M4 9l5-5 5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Loan detail rows */}
            <div className="flex flex-col divide-y divide-[#1a1a1a]/10">
              <div className="flex items-center justify-between py-3">
                <span className="text-[13px] text-[#1a1a1a]/70">Total loan amount</span>
                <span className="text-[13px] text-[#1a1a1a]/40">
                  {loanAmount > 0 ? formatCurrency(loanAmount) : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[13px] text-[#1a1a1a]/70">Down payment</span>
                <span className="text-[13px] text-[#1a1a1a]/40">
                  {downPayment > 0 ? formatCurrency(downPayment) : "—"}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-[#1a1a1a]/35 leading-relaxed">
              All calculations are estimates and provided for informational purposes only.
              Actual amounts may vary.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button className="flex-1 text-[13px] text-[#1a1a1a]/60 border border-[#1a1a1a]/20 px-5 py-3 rounded-full hover:border-[#1a1a1a]/50 transition-colors">
                Share
              </button>
              <button className="flex-1 text-[13px] bg-[#1a1a1a] text-white font-semibold px-5 py-3 rounded-full hover:bg-[#333] transition-colors">
                Get In Touch
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}