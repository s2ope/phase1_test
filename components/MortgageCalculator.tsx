"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const loan = principal - downPayment;
  if (loan <= 0) return 0;
  if (annualRate === 0) return loan / (termYears * 12);
  const mr = annualRate / 100 / 12;
  const n = termYears * 12;
  return (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}

export default function BorrowSection({ data = FALLBACK }: BorrowSectionProps) {
  const d = data ?? FALLBACK;

  const [principalStr, setPrincipalStr] = useState("");
  const [downStr, setDownStr] = useState("");
  const [interestRate, setInterestRate] = useState<number | "">(5.5);
  const [termYears, setTermYears] = useState(30);
  const [calculated, setCalculated] = useState(false);

  const principal = parseFloat(principalStr) || 0;
  const downPayment = Math.min(parseFloat(downStr) || 0, principal);
  const pct = principal > 0 ? Math.min(100, Math.max(0, (downPayment / principal) * 100)) : 0;

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

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
    setCalculated(false);
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
    setCalculated(false);
  };

  const monthly = useCallback(
    () => calculateMonthlyPayment(principal, Number(interestRate) || 0, downPayment, termYears),
    [principal, interestRate, downPayment, termYears]
  );

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

            {/* Home Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Home Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-white/40 text-[13px] pointer-events-none">$</span>
                <input
                  type="number"
                  value={principalStr}
                  placeholder="500000"
                  onChange={(e) => { setPrincipalStr(e.target.value); setCalculated(false); }}
                  className="w-full bg-white/10 text-white text-[13px] rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono flex justify-between items-center">
                Down Payment
                <span className="text-white font-semibold normal-case">{Math.round(pct)}%</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-white/40 text-[13px] pointer-events-none">$</span>
                <input
                  type="number"
                  value={downStr}
                  placeholder="100000"
                  onChange={(e) => onDownInput(e.target.value)}
                  className="w-full bg-white/10 text-white text-[13px] rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* Linear track */}
              <div
                ref={trackRef}
                onMouseDown={onTrackDown}
                onTouchStart={onTrackDown}
                className="relative h-7 flex items-center cursor-pointer select-none mt-1"
                style={{ touchAction: "none" }}
              >
                <div className="absolute inset-x-0 h-1.5 bg-white/10 rounded-full" />
                <div
                  className="absolute left-0 h-1.5 bg-[#f0c132] rounded-full pointer-events-none"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute w-[18px] h-[18px] bg-white rounded-full -translate-x-1/2 pointer-events-none shadow-sm"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
                Annual Interest Rate
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={interestRate}
                  step={0.1}
                  placeholder="5.5"
                  onChange={(e) => { setInterestRate(e.target.value === "" ? "" : Number(e.target.value)); setCalculated(false); }}
                  className="w-full bg-white/10 text-white text-[13px] rounded-xl pl-4 pr-8 py-3 outline-none focus:ring-1 focus:ring-[#f0c132] placeholder:text-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-4 text-white/40 text-[13px] pointer-events-none">%</span>
              </div>
            </div>

            {/* Loan Term */}
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
                  ? formatCurrency(monthly())
                  : <span className="text-white/20">—</span>}
              </p>
              {calculated && (
                <p className="text-[12px] text-white/40 mt-1">
                  Loan: {formatCurrency(principal - downPayment)} over {termYears} yrs
                </p>
              )}
            </div>

            {/* Calculate button */}
            <button
              onClick={() => setCalculated(true)}
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