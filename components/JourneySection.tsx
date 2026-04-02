"use client";

import type { JourneySectionData } from "../sanity/types";

interface JourneySectionProps {
  data?: JourneySectionData;
}

const FALLBACK: JourneySectionData = {
  eyebrow: "Lorem ipsum",
  headline: "Every home buying journey is unique",
  body: "Searching for your new home? Looking for a mortgage? No matter where you're at in the home buying journey, you've come to the right place.",
};

export default function JourneySection({ data = FALLBACK }: JourneySectionProps) {
  const d = data ?? FALLBACK;

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left */}
        <div className="flex flex-col gap-4">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
            </span>
            <span className="text-[12px] text-[#1a1a1a]/50">{d.eyebrow}</span>
          </div>

          {/* Headline */}
          <h2 className="text-[36px] md:text-[42px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
            {d.headline}
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center md:pt-10">
          <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed max-w-sm">
            {d.body}
          </p>
        </div>
      </div>
    </section>
  );
}