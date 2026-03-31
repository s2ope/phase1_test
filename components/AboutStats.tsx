"use client";

import type { AboutSectionData } from "@/sanity/types";

interface AboutSectionProps {
  data?: AboutSectionData;
}

const FALLBACK: AboutSectionData = {
  eyebrow: "About Us",
  headline: "HighQuality has been helping people of Boston to find their dream homes.",
  stats: [
    { _key: "s1", value: "90k+", label: "Customers" },
    { _key: "s2", value: "45k+", label: "Units Ready" },
    { _key: "s3", value: "5k+",  label: "Units Sold" },
  ],
};

export default function AboutSection({ data = FALLBACK }: AboutSectionProps) {
  const d = data ?? FALLBACK;

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-16 border-t border-[#1a1a1a]/10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
            </span>
            <span className="text-[12px] text-[#1a1a1a]/50">{d.eyebrow}</span>
          </div>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
            {d.headline}
          </h2>
        </div>

        {/* Stats band */}
        <div className="bg-[#1a1a1a] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {d.stats.map((stat, i) => (
            <div key={stat._key} className="flex items-center gap-6 w-full sm:w-auto">
              {/* Stat */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[32px] font-bold text-white leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[12px] text-white/50">{stat.label}</span>
              </div>

              {/* Arrow divider (not after last) */}
              {i < d.stats.length - 1 && (
                <div className="hidden sm:flex items-center gap-3 ml-auto">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 2h8v8M2 10L10 2"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Right image placeholder */}
          <div className="hidden md:block w-24 h-16 rounded-xl bg-white/10 overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}