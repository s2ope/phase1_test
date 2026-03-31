"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Partners",
    href: "#",
    hasDropdown: true,
  },
  { label: "Career", href: "/career" },
  { label: "FAQ", href: "/faq" },
  {
    label: "EN",
    href: "#",
    hasDropdown: true,
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a1a1a] px-6 md:px-10 py-3.5 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 group">
        <span className="text-[#f0c132] text-xl leading-none">▲</span>
        <span className="text-white font-semibold text-[15px] tracking-tight">
          flatter
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13px] text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.hasDropdown && (
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="opacity-60"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/get-started"
          className="bg-[#f0c132] text-[#1a1a1a] text-[13px] font-semibold px-5 py-2 rounded-full hover:bg-[#f5d060] transition-colors"
        >
          Get Started
        </Link>
      </div>

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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-t border-white/10 px-6 py-5 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-[#f0c132] text-[#1a1a1a] text-[13px] font-semibold px-5 py-2.5 rounded-full text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}