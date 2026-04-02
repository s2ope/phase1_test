"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TestimonialsSectionData } from "../sanity/types";

interface TestimonialsSectionProps {
  data?: TestimonialsSectionData;
}

const FALLBACK: TestimonialsSectionData = {
  sectionLabel: "Testimonials",
  viewMoreLabel: "View More",
  items: [],
};

export default function Testimonials({ data }: TestimonialsSectionProps) {
const d = {
  sectionLabel: data?.sectionLabel ?? FALLBACK.sectionLabel,
  viewMoreLabel: data?.viewMoreLabel ?? FALLBACK.viewMoreLabel,
  items: data?.items ?? FALLBACK.items ?? [],  // ← add ?? []
};

  const total = (d.items ?? []).length;
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Empty state — no testimonials in Sanity yet
  if (!d.items || d.items.length === 0) {
    return (
      <section className="bg-[#f5f0e8] px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#1a1a1a]">
              {d.sectionLabel}
            </span>
            <Link
              href="/testimonials"
              className="text-[12px] text-[#1a1a1a]/60 border border-[#1a1a1a]/20 px-4 py-2 rounded-full hover:border-[#1a1a1a]/50 transition-colors"
            >
              {d.viewMoreLabel}
            </Link>
          </div>
          <p className="text-[14px] text-[#1a1a1a]/40 py-12 text-center">
            No testimonials yet — add some in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  const current = d.items[index];

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#1a1a1a]">
            {d.sectionLabel}
          </span>
          <Link
            href="/testimonials"
            className="text-[12px] text-[#1a1a1a]/60 border border-[#1a1a1a]/20 px-4 py-2 rounded-full hover:border-[#1a1a1a]/50 transition-colors"
          >
            {d.viewMoreLabel}
          </Link>
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-8">
          <blockquote className="text-[22px] md:text-[28px] font-medium text-[#1a1a1a] leading-[1.4] tracking-tight max-w-3xl">
            &ldquo; {current?.quote ?? ""} &rdquo;
          </blockquote>

          {/* Author + controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1a1a1a]/10 flex-shrink-0">
                {current?.authorImage?.url && (
                  <Image
                    src={current.authorImage.url}
                    alt={current.authorImage.alt ?? current.authorName ?? "Author"}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-[#1a1a1a]">
                  {current?.authorName ?? ""}
                </span>
                <span className="text-[11px] text-[#1a1a1a]/50">
                  {current?.authorRole ?? ""}
                </span>
              </div>
            </div>

            {/* Arrow controls */}
            {total > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:border-[#1a1a1a]/60 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9 2L4 7l5 5"
                      stroke="#1a1a1a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:border-[#1a1a1a]/60 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M5 2l5 5-5 5"
                      stroke="#1a1a1a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Dot indicators */}
          {total > 1 && (
            <div className="flex gap-1.5">
         {(d.items ?? []).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "bg-[#1a1a1a] w-6" : "bg-[#1a1a1a]/20 w-1.5"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}