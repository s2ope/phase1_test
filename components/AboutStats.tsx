"use client";

import Image from "next/image";
import { useRef } from "react";
import type { AboutSectionData } from "../sanity/types";

interface AboutSectionProps {
  data?: AboutSectionData;
}

const FALLBACK: AboutSectionData = {
  eyebrow: "About Us",
  headline: "HighQuality has been helping people of Boston to find their dream homes.",
  stats: [
    { _key: "1", value: "90k+", label: "Customers" },
    { _key: "2", value: "45k+", label: "Units Ready" },
    { _key: "3", value: "5k+",  label: "units Sold" },
  ],
  image: {
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400",
    alt: "Building",
  },
};

const SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400",
    alt: "Building 1",
  },
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    alt: "Building 2",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    alt: "Building 3",
  },
];

export default function AboutStats({ data }: AboutSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  const d = {
    eyebrow: data?.eyebrow ?? FALLBACK.eyebrow,
    headline: data?.headline ?? FALLBACK.headline,
    stats: data?.stats?.length ? data.stats : FALLBACK.stats,
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
<div className="bg-[#1a1a1a] rounded-2xl px-8 py-5 flex items-center gap-0">

  {/* Stats */}
  <div className="flex items-center gap-10 flex-1">
    {d.stats.map((stat, i) => (
      <div key={stat._key ?? i} className="flex flex-col gap-1">
        <span className="text-[28px] md:text-[32px] font-bold text-[#f0c132] leading-none tracking-tight">
          {stat.value ?? "—"}
        </span>
        <span className="text-[11px] text-white/50 whitespace-nowrap">
          {stat.label ?? ""}
        </span>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="w-[1px] h-10 bg-white/10 mx-6 flex-shrink-0" />

  {/* Plain arrow + circled arrow */}
  <div className="flex items-center gap-4 flex-shrink-0">
    <span className="text-white/40 text-[22px] leading-none">→</span>
    <button
      onClick={handleNext}
      className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center flex-shrink-0 hover:border-white/60 hover:bg-white/5 transition-all"
    >
      <span className="text-white text-[18px] leading-none">→</span>
    </button>
  </div>

  {/* Divider */}
  <div className="w-[1px] h-10 bg-white/10 mx-6 flex-shrink-0" />

  {/* Image slider */}
  <div
    ref={sliderRef}
    className="hidden md:flex gap-2.5 overflow-x-auto scroll-smooth no-scrollbar flex-shrink-0"
    style={{ width: "260px" }}
  >
    {SLIDER_IMAGES.map((img, i) => (
      <div
        key={i}
        className="relative h-[64px] rounded-xl overflow-hidden flex-shrink-0"
        style={{ width: "150px" }}
      >
        <Image
          src={img.url}
          alt={img.alt}
          fill
          sizes="150px"
          className="object-cover"
        />
      </div>
    ))}
  </div>

</div>
      </div>
    </section>
  );
}