"use client";

import Image from "next/image";
import type { SearchSectionData } from "../sanity/types";

interface SearchSectionProps {
  data?: SearchSectionData;
}

const FALLBACK: SearchSectionData = {
  searchPlaceholder: "Location, Neighborhood or Address",
  searchImage: {
    url: "/images/search-interior.jpg",
    alt: "Beautiful home interior",
  },
  headlineStart: "Start the",
  headlineEnd: "search now.",
};

export default function SearchSection({ data = FALLBACK }: SearchSectionProps) {
  const d = data ?? FALLBACK;

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Search card */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-lg group">
          <Image
            src={d.searchImage.url}
            alt={d.searchImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Search overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
            {/* Input */}
            <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400 flex-shrink-0"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <span className="text-[12px] text-gray-400 truncate">
                {d.searchPlaceholder}
              </span>
            </div>
            {/* Arrow button */}
            <button className="w-10 h-10 rounded-full bg-[#f0c132] flex items-center justify-center flex-shrink-0 hover:bg-[#f5d060] transition-colors shadow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2h10v10M2 12L12 2"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Headline */}
        <div className="flex items-end justify-start md:justify-end pb-2">
          <h2 className="text-[48px] md:text-[56px] font-bold text-[#1a1a1a] leading-[1.05] tracking-tight text-right">
            <span className="block">{d.headlineStart}</span>
            <span className="block">{d.headlineEnd}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}