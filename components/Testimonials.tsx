"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TestimonialsSectionData } from "@/sanity/types";

interface TestimonialsSectionProps {
  data?: TestimonialsSectionData;
}

const FALLBACK: TestimonialsSectionData = {
  sectionLabel: "Testimonials",
  viewMoreLabel: "View More",
  items: [
    {
      _key: "t1",
      quote:
        "High Quality guided us through all the process with a lot of patience and professionalism, answering all our questions and concerns. Together it felt so much easier.",
      authorName: "Linda Amalia",
      authorRole: "Agent, Flatter",
      authorImage: { url: "/images/testimonial-1.jpg", alt: "Linda Amalia" },
    },
    {
      _key: "t2",
      quote:
        "We found our dream home in less than a month. The team was incredibly responsive and made sure we understood every step of the process.",
      authorName: "James Carter",
      authorRole: "First-time Buyer",
      authorImage: { url: "/images/testimonial-2.jpg", alt: "James Carter" },
    },
    {
      _key: "t3",
      quote:
        "The mortgage calculator helped us understand exactly what we could afford. We closed on our home in record time thanks to Flatter.",
      authorName: "Sarah Mills",
      authorRole: "Home Owner",
      authorImage: { url: "/images/testimonial-3.jpg", alt: "Sarah Mills" },
    },
  ],
};

export default function TestimonialsSection({ data = FALLBACK }: TestimonialsSectionProps) {
  const d = data ?? FALLBACK;
  const [index, setIndex] = useState(0);
  const total = d.items.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const current = d.items[index];

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-16 border-t border-[#1a1a1a]/10">
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
            &ldquo; {current.quote} &rdquo;
          </blockquote>

          {/* Author + controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1a1a1a]/10 flex-shrink-0">
                <Image
                  src={current.authorImage.url}
                  alt={current.authorImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-[#1a1a1a]">
                  {current.authorName}
                </span>
                <span className="text-[11px] text-[#1a1a1a]/50">
                  {current.authorRole}
                </span>
              </div>
            </div>

            {/* Arrow controls */}
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
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {d.items.map((_, i) => (
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
        </div>
      </div>
    </section>
  );
}