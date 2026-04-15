"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { client } from "../sanity/lib/client";
import { searchLocationsQuery } from "../sanity/queries";
import type { SearchSectionData } from "../sanity/types";

interface SearchSectionProps {
  data?: SearchSectionData;
}

const FALLBACK: SearchSectionData = {
  searchPlaceholder: "Emirate, Neighborhood or building",
  searchImage: {
    url: "/images/search-interior.jpg",
    alt: "Beautiful home interior",
  },
  headlineStart: "Start the",
  headlineEnd: "search now.",
};

export default function SearchBar({ data }: SearchSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [allTerms, setAllTerms] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const d = {
    searchPlaceholder: data?.searchPlaceholder ?? FALLBACK.searchPlaceholder,
    searchImage: {
      url: data?.searchImage?.url ?? FALLBACK.searchImage?.url,
      alt: data?.searchImage?.alt ?? FALLBACK.searchImage?.alt,
    },
    headlineStart: data?.headlineStart ?? FALLBACK.headlineStart,
    headlineEnd: data?.headlineEnd ?? FALLBACK.headlineEnd,
  };

  useEffect(() => {
    client
      .fetch<{ title: string; location: string; address: string }[]>(
        searchLocationsQuery,
      )
      .then((results) => {
        const terms = new Set<string>();
        results.forEach((r) => {
          if (r.title) terms.add(r.title);
          if (r.location) terms.add(r.location);
          if (r.address) terms.add(r.address);
          if (r.location) {
            r.location.split(",").forEach((part) => {
              const trimmed = part.trim();
              if (trimmed) terms.add(trimmed);
            });
          }
        });
        setAllTerms([...terms]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setFiltered([]);
      setOpen(false);
      return;
    }
    const results = allTerms.filter((term) =>
      term.toLowerCase().includes(query.toLowerCase()),
    );
    setFiltered(results);
    setOpen(results.length > 0);
  }, [query, allTerms]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function fireEvent(
    name: string,
    params: Record<string, string | number | boolean> = {},
  ) {
    if (typeof window === "undefined") return;

    if (!window.gtag) {
      console.warn("gtag not ready:", name, params);
      return;
    }

    window.gtag("event", name, params);
  }

  function handleSelect(value: string) {
    setQuery(value);
    setOpen(false);
    // ✅ Fixed: was incorrectly passing `query` (stale state) instead of `value`
    fireEvent("search_suggestion_selected", {
      search_term: value,
      selected_suggestion: value,
    });
    router.push(`/properties?q=${encodeURIComponent(value)}`);
  }

  function handleSearch() {
    const term = query.trim();
    if (!term) return;
    fireEvent("search_initiated", { search_term: term });
    router.push(`/properties?q=${encodeURIComponent(term)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 pb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative bg-[#12151c] rounded-2xl flex items-center overflow-visible shadow-xl w-full md:w-[50%] flex-shrink-0">
          <div className="relative h-[110px] w-[130px] md:h-[130px] md:w-[160px] flex-shrink-0 rounded-xl overflow-hidden m-3">
            {d.searchImage.url && (
              <Image
                src={d.searchImage.url}
                alt={d.searchImage.alt ?? "Search image"}
                fill
                sizes="160px"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-1 px-4 md:px-6 relative">
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium tracking-wide uppercase">
              Location
            </label>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => filtered.length > 0 && setOpen(true)}
              placeholder={
                loading ? "Loading locations..." : d.searchPlaceholder
              }
              disabled={loading}
              className="w-full bg-transparent text-white text-[13px] placeholder:text-white/30 outline-none border-b border-white/20 pb-2 focus:border-white/50 transition-colors disabled:opacity-40"
            />

            {open && (
              <div
                ref={dropdownRef}
                className="absolute left-0 right-0 top-full mt-2 bg-[#1e2230] rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                {filtered.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(suggestion)}
                    className="w-full text-left px-5 py-3 text-[13px] text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="flex-shrink-0 text-white/30"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            aria-label="Search properties"
            className="flex-shrink-0 w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-full border border-white/20 flex items-center justify-center mr-3 hover:bg-white/5 hover:border-white/40 transition-all group"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform rotate-90"
            >
              <path
                d="M7 7h10v10M7 17L17 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center md:justify-end flex-1">
          <h2 className="text-[36px] sm:text-[44px] md:text-[48px] lg:text-[56px] font-bold text-[#1a1a1a] leading-[1.05] tracking-tight md:text-right">
            <span className="block">{d.headlineStart}</span>
            <span className="block">{d.headlineEnd}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
