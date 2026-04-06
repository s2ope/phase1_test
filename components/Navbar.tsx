"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "About us", href: "/about" },
  { label: "Partners", href: "#", hasDropdown: true },
  { label: "Career", href: "/career" },
  { label: "FAQ", href: "/faq" },
  { label: "EN", href: "#", hasDropdown: true, flag: "🇬🇧" },
];

const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-55 mt-px">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#f5f0e8] px-6 md:px-10 py-4">
      <nav
        className="mx-auto max-w-6xl flex items-center justify-between"
        style={{
          background: "#0E121B",
          borderRadius: "24px",
          padding: "24px",
          height: "98px",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="w-[18px] h-[18px] bg-[#f0c132] shrink-0"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
          <span className="text-white font-semibold text-[15px] tracking-tight">
            flatter
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center px-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[13.5px] px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors whitespace-nowrap
                  ${link.active
                    ? "text-white font-medium"
                    : "text-[#c8c9cc] hover:text-white font-normal"
                  }`}
              >
                {link.flag && <span className="text-[14px]">{link.flag}</span>}
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/get-started"
          className="hidden md:inline-flex shrink-0 items-center text-white text-[13px] font-medium px-[18px] py-[7px] rounded-full border border-white/35 hover:border-white/65 hover:bg-white/5 transition-all"
        >
          Get Started
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-auto max-w-6xl mt-2 bg-[#0E121B] rounded-[24px] px-6 py-5 flex flex-col gap-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] text-[#c8c9cc] hover:text-white transition-colors flex items-center gap-1.5"
              onClick={() => setMobileOpen(false)}
            >
              {link.flag && <span>{link.flag}</span>}
              {link.label}
              {link.hasDropdown && <ChevronDown />}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="text-white text-[13px] font-medium px-5 py-2.5 rounded-full border border-white/35 text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}