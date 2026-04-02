"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroData } from "../sanity/types";

interface HeroProps {
  data?: HeroData;
}

const FALLBACK: HeroData = {
  headlineStart: "Hello",
  headlineMiddle: "Future",
  headlineEnd: "Home Owners",
  headlineFinal: "Owners",
  emojiIcons: ["🕶️", "🤝"],
  subtext:
    "Searching for your new home? Looking for a mortgage? No matter where you're at in the home buying journey, you've come to the right place.",
  ctaLabel: "Get Started",
  ctaHref: "/get-started",
  heroImage: {
    url: "/images/hero-building.jpg",
    alt: "Modern apartment building",
  },
  heroCaption: "Every home buying journey is unique.",
};

export default function Hero({ data }: HeroProps) {
  const d = {
    headlineStart: data?.headlineStart ?? FALLBACK.headlineStart,
    headlineMiddle: data?.headlineMiddle ?? FALLBACK.headlineMiddle,
    headlineEnd: data?.headlineEnd ?? FALLBACK.headlineEnd,
    headlineFinal: data?.headlineFinal ?? FALLBACK.headlineFinal,
    emojiIcons: data?.emojiIcons ?? FALLBACK.emojiIcons,
    subtext: data?.subtext ?? FALLBACK.subtext,
    ctaLabel: data?.ctaLabel ?? FALLBACK.ctaLabel,
    ctaHref: data?.ctaHref ?? FALLBACK.ctaHref,
    heroImage: {
      url: data?.heroImage?.url ?? FALLBACK.heroImage.url,
      alt: data?.heroImage?.alt ?? FALLBACK.heroImage.alt,
    },
    heroCaption: data?.heroCaption ?? FALLBACK.heroCaption,
  };

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 pt-12 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex gap-6 items-start">

        {/* Left rail: 01 / 02 / 03 indicators
        <div className="flex flex-col gap-3">
  {["01", "02", "03"].map((label, i) => (
    <span key={i} className="text-[10px] text-[#1a1a1a]/40 font-mono uppercase tracking-widest">
      {label}
    </span>
  ))}
</div> */}

        {/* Right: main content grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-5">
            {/* Headline */}
           <h1 className="text-[52px] md:text-[60px] leading-[1.05] font-bold text-[#1a1a1a] tracking-tight">
  <span className="flex items-baseline gap-4">
    <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">01</span>
    <span>{d.headlineStart}</span>
  </span>
<span className="flex items-baseline gap-4">
  <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">02</span>
  <span className="flex items-center gap-3 flex-wrap">
    {d.headlineMiddle}
    {d.emojiIcons && d.emojiIcons.length > 0 && (
      <span className="inline-flex items-center bg-[#12151e] rounded-full p-1.5 gap-1.5 shadow-lg flex-shrink-0 translate-y-[6px]">
        <span className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative block">
          <Image
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200"
            alt="Person"
            fill
            sizes="56px"
            className="object-cover"
          />
        </span>
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-3xl leading-none">
          {d.emojiIcons[1] ?? d.emojiIcons[0]}
        </span>
      </span>
    )}
    <span>{d.headlineEnd}</span>
  </span>
</span>
  <span className="flex items-baseline gap-4">
    <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">03</span>
    <span>{d.headlineFinal}</span>
  </span>
</h1>

            {/* Subtext */}
            <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed max-w-sm">
              {d.subtext}
            </p>

            {/* CTA */}
            <div className="mt-1">
              <Link
                href={d.ctaHref ?? "#"}
                className="inline-flex items-center bg-[#1a1a1a] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
              >
                {d.ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right: Image card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
            {d.heroImage.url && (
              <Image
                src={d.heroImage.url}
                alt={d.heroImage.alt ?? "Hero image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            {/* Caption bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-sm px-5 py-3.5 flex items-center justify-between">
              <p className="text-white text-[13px] font-medium leading-snug max-w-[180px]">
                {d.heroCaption}
              </p>
              <button className="w-9 h-9 rounded-full bg-[#f0c132] flex items-center justify-center flex-shrink-0 hover:bg-[#f5d060] transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-90">
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
        </div>

      </div>
    </section>
  );
}