"use client";

import Link from "next/link";
import type { CTABandData } from "@/sanity/types";

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

export default function Footer({ data = FALLBACK }: FooterProps) {
  const d = data ?? FALLBACK;

  return (
    <>
      {/* Scroll-to-top arrow — sits above footer */}
      <div className="bg-[#f5f0e8] flex justify-center pb-2 pt-8">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-11 h-11 rounded-full bg-[#f0c132] flex items-center justify-center hover:bg-[#f5d060] transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

      {/* CTA Band + Footer */}
      <footer className="bg-[#1a1a1a] px-6 md:px-10 pt-12 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <h2 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight max-w-xs">
              {d.headline}
            </h2>
            <Link
              href={d.ctaHref}
              className="flex-shrink-0 bg-[#f0c132] text-[#1a1a1a] text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#f5d060] transition-colors"
            >
              {d.ctaLabel}
            </Link>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-white/10" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Links */}
            <nav className="flex items-center gap-6 flex-wrap">
              {d.footerLinks.map((link) => (
                <Link
                  key={link._key}
                  href={link.href}
                  className="text-[12px] text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo + copyright */}
            <div className="flex flex-col items-start sm:items-end gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[#f0c132] text-base leading-none">▲</span>
                <span className="text-white font-semibold text-[14px] tracking-tight">
                  flatter
                </span>
              </div>
              <span className="text-[11px] text-white/30">
                © Copyright 2024, All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}