"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroData } from "../sanity/types";

interface HeroProps {
  data?: HeroData;
}

// Fallback static content (replaced by Sanity data when wired up)
const FALLBACK: HeroData = {
  headlineStart: "Hello",
  headlineMiddle: "Future",
  headlineEnd: "Home Owners",
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

export default function Hero({ data = FALLBACK }: HeroProps) {
  const d = data ?? FALLBACK;

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 pt-12 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-5">
          {/* Eyebrow indicators */}
          <div className="flex flex-col gap-1.5 mb-1">
            {["01", "02", "03"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
                <span className="text-[10px] text-[#1a1a1a]/40 font-mono uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-[52px] md:text-[60px] leading-[1.05] font-bold text-[#1a1a1a] tracking-tight">
            <span className="block">{d.headlineStart}</span>
            <span className="flex items-center gap-3 flex-wrap">
              {d.headlineMiddle}
              {d.emojiIcons?.map((emoji, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-xl leading-none"
                >
                  {emoji}
                </span>
              ))}
            </span>
            <span className="block">{d.headlineEnd}</span>
          </h1>

          {/* Subtext */}
          <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed max-w-sm">
            {d.subtext}
          </p>

          {/* CTA */}
          <div className="mt-1">
            <Link
              href={d.ctaHref}
              className="inline-flex items-center bg-[#1a1a1a] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
            >
              {d.ctaLabel}
            </Link>
          </div>
        </div>

        {/* Right: Image card */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
          <Image
            src={d.heroImage.url}
            alt={d.heroImage.alt}
            fill
            className="object-cover"
            priority
          />
          {/* Caption bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-sm px-5 py-3.5 flex items-center justify-between">
            <p className="text-white text-[13px] font-medium leading-snug max-w-[180px]">
              {d.heroCaption}
            </p>
            {/* Arrow button */}
            <button className="w-9 h-9 rounded-full bg-[#f0c132] flex items-center justify-center flex-shrink-0 hover:bg-[#f5d060] transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
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
    </section>
  );
}