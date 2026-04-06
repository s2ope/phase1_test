"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { FeatureItem } from "../sanity/types";

interface FeatureSliderProps {
  items?: FeatureItem[];
}

const FALLBACK_ITEMS: FeatureItem[] = [
  {
    _key: "f1",
    headline: "Find and finance your home with us with online",
    ctaLabel: "Start with your mortgage",
    ctaHref: "#",
  },
  {
    _key: "f2",
    headline: "Get matched with the best mortgage lenders",
    ctaLabel: "Start with your mortgage",
    ctaHref: "#",
  },
  {
    _key: "f3",
    headline: "Explore thousands of listings in your area",
    ctaLabel: "Start with your mortgage",
    ctaHref: "#",
  },
  {
    _key: "f4",
    headline: "Close on your dream home faster than ever",
    ctaLabel: "Start with your mortgage",
    ctaHref: "#",
  },
];

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function FeaturesCarousel({ items }: FeatureSliderProps) {
  const safeItems = (items && items.length > 0 ? items : FALLBACK_ITEMS).map((item) => ({
    _key: item._key ?? Math.random().toString(),
    headline: item.headline ?? "Find and finance your home",
    ctaLabel: item.ctaLabel ?? "Learn more",
    ctaHref: item.ctaHref ?? "#",
  }));

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const vc = getVisibleCount();
      setVisibleCount(vc);
      setIndex((i) => Math.min(i, Math.max(safeItems.length - vc, 0)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(safeItems.length - visibleCount, 0);
  const cardWidthPct = 100 / visibleCount;

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section className="bg-[#f5f0e8] px-4 sm:px-6 md:px-10 py-6">
      <div
        className="max-w-6xl mx-auto flex items-center gap-4 md:gap-6 rounded-[24px] px-6 md:px-10 py-10 md:py-14"
        style={{ background: "#0E121B" }}
      >
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous"
          className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/60 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Slider viewport */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * cardWidthPct}%)`,
            }}
          >
            {safeItems.map((item, i) => (
              <div
                key={item._key}
                className="flex-shrink-0 flex flex-col gap-5 px-6 md:px-8 border-r border-white/10 last:border-r-0"
                style={{ width: `${cardWidthPct}%` }}
              >
                <span className="text-[12px] text-white/25 font-mono tracking-wider">
                  0{i + 1}
                </span>
                <h3 className="text-white text-[22px] sm:text-[24px] md:text-[26px] font-semibold leading-[1.2] tracking-tight">
                  {item.headline}
                </h3>
                <Link
                  href={item.ctaHref}
                  className="text-[13px] text-white/50 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all w-fit"
                >
                  {item.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={index >= maxIndex}
          aria-label="Next"
          className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/60 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-[#f0c132] w-5" : "bg-white/20 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}