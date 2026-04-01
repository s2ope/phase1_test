"use client";

import Image from "next/image";
import type { AboutSectionData } from "../sanity/types";

interface AboutSectionProps {
  data?: AboutSectionData;
}

const FALLBACK: AboutSectionData = {
  eyebrow: "About Us",
  headline: "HighQuality has been helping people of Boston to find their dream homes.",
  stats: [],
  image: {
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200",
    alt: "Building",
  },
};

export default function AboutStats({ data }: AboutSectionProps) {
  const d = {
    eyebrow: data?.eyebrow ?? FALLBACK.eyebrow,
    headline: data?.headline ?? FALLBACK.headline,
    stats: data?.stats ?? FALLBACK.stats,
    image: {
      url: data?.image?.url ?? FALLBACK.image?.url ?? "",
      alt: data?.image?.alt ?? FALLBACK.image?.alt ?? "About image",
    },
  };

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
          {d.stats && d.stats.length > 0 ? (
            <>
              {d.stats.map((stat, i) => (
                <div key={stat._key ?? i} className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[32px] font-bold text-white leading-none tracking-tight">
                      {stat.value ?? "—"}
                    </span>
                    <span className="text-[12px] text-white/50">
                      {stat.label ?? ""}
                    </span>
                  </div>
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
            </>
          ) : (
            <p className="text-white/40 text-[13px] py-4">
              No stats yet — add some in Sanity Studio.
            </p>
          )}

          {/* Right image — from Sanity */}
          {d.image.url && (
            <div className="hidden md:block w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image
                src={d.image.url}
                alt={d.image.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}