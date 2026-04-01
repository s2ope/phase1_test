"use client";

import { useState } from "react";
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

const VISIBLE_COUNT = 3;

export default function FeaturesCarousel({ items }: FeatureSliderProps) {
  const safeItems = (items && items.length > 0 ? items : FALLBACK_ITEMS).map((item) => ({
    _key: item._key ?? Math.random().toString(),
    headline: item.headline ?? "Find and finance your home",
    ctaLabel: item.ctaLabel ?? "Learn more",
    ctaHref: item.ctaHref ?? "#",
  }));

  const [index, setIndex] = useState(0);
  const total = safeItems.length;
  const maxIndex = Math.max(total - VISIBLE_COUNT, 0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section className="bg-[#1a1a1a] px-6 md:px-10 py-8">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous"
          className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Slider viewport */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-5"
            style={{
              transform: `translateX(calc(-${index} * (100% / ${VISIBLE_COUNT}) - ${index} * (20px / ${VISIBLE_COUNT})))`,
            }}
          >
            {safeItems.map((item, i) => (
              <div
                key={item._key}
                className="flex-shrink-0 flex flex-col gap-3 border-r border-white/10 pr-5 last:border-r-0 last:pr-0"
                style={{
                  width: `calc((100% - ${(VISIBLE_COUNT - 1) * 20}px) / ${VISIBLE_COUNT})`,
                }}
              >
                {/* Slide number */}
                <span className="text-[11px] text-white/30 font-mono">
                  0{i + 1}
                </span>
                <h3 className="text-white text-[15px] font-semibold leading-snug">
                  {item.headline}
                </h3>
                <Link
                  href={item.ctaHref}
                  className="text-[12px] text-[#f0c132] hover:underline underline-offset-2 transition-all w-fit"
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
          className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "bg-[#f0c132] w-4" : "bg-white/30 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}