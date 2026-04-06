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
      url: data?.heroImage?.url ?? FALLBACK.heroImage?.url,
      alt: data?.heroImage?.alt ?? FALLBACK.heroImage?.alt,
    },
    heroCaption: data?.heroCaption ?? FALLBACK.heroCaption,
  };

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 pt-12 pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ── Left: Text column ── */}
          <div className="flex flex-col justify-between h-full">

            <div className="flex flex-col gap-5">

              {/* Headline — 01 / 02 / 03 */}
              <h1 className="text-[52px] md:text-[60px] leading-[1.05] font-bold text-[#1a1a1a] tracking-tight">

                {/* 01 — headlineStart */}
                <span className="flex items-baseline gap-4">
                  <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">
                    01
                  </span>
                  <span>{d.headlineStart}</span>
                </span>

                {/* 02 — headlineMiddle + pill + headlineEnd */}
                <span className="flex items-baseline gap-4">
                  <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">
                    02
                  </span>
                  <span className="flex items-center gap-3 flex-wrap">
                    {d.headlineMiddle}
                    {d.emojiIcons && d.emojiIcons.length > 0 && (
                      <span className="inline-flex items-center bg-[#12151e] rounded-full p-1.5 gap-1.5 flex-shrink-0 translate-y-[6px]">
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
                    {d.headlineEnd}
                  </span>
                </span>

                {/* 03 — headlineFinal */}
                <span className="flex items-baseline gap-4">
                  <span className="text-[11px] font-mono font-normal text-[#1a1a1a]/40 tracking-widest w-6 shrink-0 translate-y-[-4px]">
                    03
                  </span>
                  <span>{d.headlineFinal}</span>
                </span>

              </h1>

              {/* Subtext — pl-10 = w-6 (24px label) + gap-4 (16px) = 40px, aligns with headline text */}
              <p className="text-[14px] text-[#1a1a1a]/60 leading-relaxed max-w-sm pl-10">
                {d.subtext}
              </p>
            </div>

            {/* CTA — same pl-10 indent, pushed to bottom to align with image card */}
            <div className="pt-6 pb-9 pl-10">
              <Link
                href={d.ctaHref ?? "#"}
                className="inline-flex items-center bg-[#1a1a1a] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#333] transition-colors"
              >
                {d.ctaLabel}
              </Link>
            </div>

          </div>

          {/* ── Right: Image card ── */}
          <div className="relative w-full">

            <div className="bg-[#1a1b1e] rounded-[24px] overflow-visible border-2 border-black">

              {/* Image */}
              <div className="rounded-[20px] overflow-hidden aspect-[4/3] relative border-2 border-black">
                {d.heroImage.url && (
                  <Image
                    src={d.heroImage.url}
                    alt={d.heroImage.alt ?? "Hero image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              {/* Caption */}
              <div className="px-5 pt-[18px] pb-6">
                <p className="text-white text-[24px] font-medium leading-[1.22] tracking-tight">
                  {d.heroCaption}
                </p>
              </div>

              {/* Notch row */}
              <div className="relative h-9 flex justify-center">
                <div
                  className="absolute bottom-[-2px] left-[-2px] h-[38px] bg-[#1a1b1e] rounded-bl-[24px] border-b-2 border-l-2 border-black"
                  style={{ width: "calc(50% - 36px)" }}
                />
                <div
                  className="absolute bottom-[-2px] right-[-2px] h-[38px] bg-[#1a1b1e] rounded-br-[24px] border-b-2 border-r-2 border-black"
                  style={{ width: "calc(50% - 36px)" }}
                />
              </div>
            </div>

            {/* Arrow button */}
            <div className="flex justify-center -mt-[36px] relative z-10">
              <button className="w-[72px] h-[72px] rounded-full bg-[#f0c132] hover:bg-[#f5d060] transition-colors flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M7 7h14v14"
                    stroke="#0e121b"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 21L21 7"
                    stroke="#0e121b"
                    strokeWidth="2.8"
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