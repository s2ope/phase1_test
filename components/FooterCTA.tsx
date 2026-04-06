"use client";

import Link from "next/link";
import type { CTABandData } from "../sanity/types.ts";

interface FooterProps {
  data?: CTABandData;
}

const FALLBACK: CTABandData = {
  headline: "Have something to talk about?",
  ctaLabel: "Get Started",
  ctaHref: "/get-started",
  footerLinks: [
    { _key: "fl1", label: "About", href: "/about" },
    { _key: "fl2", label: "Solutions", href: "/solutions" },
    { _key: "fl3", label: "Pricing", href: "/pricing" },
    { _key: "fl4", label: "Resources", href: "/resources" },
  ],
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function FooterCTA({ data }: FooterProps) {
  const d = {
    headline: data?.headline ?? FALLBACK.headline,
    ctaLabel: data?.ctaLabel ?? FALLBACK.ctaLabel,
    ctaHref: data?.ctaHref ?? FALLBACK.ctaHref,
    footerLinks: data?.footerLinks ?? FALLBACK.footerLinks,
  };

  return (
    <>
      {/* Nozzle connector: cream bg so the SVG cutout shows the page bg */}
      <div className="relative bg-[#f5f0e8]">

        {/* SVG that draws the dark footer shape with a circular bite taken out of the top-center */}
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ display: "block", marginBottom: "-2px" }}
        >
          <path
            d="
              M0,0
              L660,0
              Q680,0 688,10
              A44,44 0 0,0 752,10
              Q760,0 780,0
              L1440,0
              L1440,72
              L0,72
              Z
            "
            fill="#1a1a1a"
          />
        </svg>

        {/* Yellow button absolutely centered over the SVG notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-14 h-14 rounded-full bg-[#f0c132] flex items-center justify-center hover:bg-[#f5d060] transition-colors shadow-lg hover:-translate-y-0.5 transform"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13V3M3 8l5-5 5 5"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* CTA Band + Footer */}
      <footer className="bg-[#1a1a1a] px-6 md:px-10 pt-10 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight max-w-xs">
              {d.headline}
            </h2>
            <Link
              href={d.ctaHref ?? "#"}
              className="flex-shrink-0 border border-white/30 text-white text-[13px] font-medium px-7 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              {d.ctaLabel}
            </Link>
          </div>

          {/* Divider */}
          {/* <div className="h-[1px] bg-white/10" /> */}

         {/* Bottom row */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

  {/* Links as pill badges — left side */}
  <nav className="flex items-center gap-3 flex-wrap">
    {d.footerLinks?.map((link) => (
      <Link
        key={link._key}
        href={link.href ?? "#"}
        className="text-[12px] text-white border border-white/20 rounded-full px-4 py-1.5 hover:border-white/50 hover:text-white transition-colors"
      >
        {link.label}
      </Link>
    ))}
  </nav>

  {/* Logo + copyright — right side, right aligned */}
  <div className="flex flex-col items-start gap-1">
  <div className="flex items-center gap-1.5">
    <span className="text-[#f0c132] text-base leading-none">▲</span>
    <span className="text-white font-semibold text-[14px] tracking-tight">
      flatter
    </span>
  </div>
  <span className="text-[11px] text-white/30">
    © Copyright 2026, All Rights Reserved
  </span>
</div>

</div>

        </div>
      </footer>
    </>
  );
}