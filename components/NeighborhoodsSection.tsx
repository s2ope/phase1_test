"use client";

import Image from "next/image";
import Link from "next/link";
import type { NeighborhoodsSectionData, HomeRecord } from "../sanity/types";

interface NeighborhoodsSectionProps {
  data?: NeighborhoodsSectionData;
  properties?: HomeRecord[];
}

const FALLBACK: NeighborhoodsSectionData = {
  eyebrow: "Lorem ipsum",
  headline: "The most popular neighborhoods in Boston",
  city: "Boston",
  searchMoreLabel: "Search more neighborhoods",
  viewMoreLabel: "View More",
  properties: [],
};

function PropertyCard({ p }: { p: HomeRecord }) {
  const imageUrl = p.image?.url ?? "https://placehold.co/400x300/1a1a1a/ffffff?text=Property";
  const imageAlt = p.image?.alt ?? p.title ?? "Property image";

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-sm px-4 py-3">
          <p className="text-white text-[15px] font-bold">
            {p.price ?? "Price on request"}
          </p>
          <p className="text-white/70 text-[11px]">
            {p.type === "for-sale" ? "For Sale" : "For Rent"} | {p.title ?? "Property"} · {p.location ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NeighborhoodsSection({ data, properties }: NeighborhoodsSectionProps) {
  const d = {
    eyebrow: data?.eyebrow ?? FALLBACK.eyebrow,
    headline: data?.headline ?? FALLBACK.headline,
    city: data?.city ?? FALLBACK.city,
    searchMoreLabel: data?.searchMoreLabel ?? FALLBACK.searchMoreLabel,
    viewMoreLabel: data?.viewMoreLabel ?? FALLBACK.viewMoreLabel,
  };

  return (
    <section className="bg-[#f5f0e8] px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
            </span>
            <span className="text-[12px] text-[#1a1a1a]/50">{d.eyebrow}</span>
          </div>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight max-w-lg">
            {d.headline}
          </h2>
        </div>

        {/* Cards grid */}
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {properties.map((p) => (
              <PropertyCard key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#1a1a1a]/40 text-[14px]">
            No properties yet — add some in Sanity Studio.
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <Link
            href="/properties"
            className="text-[13px] text-[#1a1a1a] font-medium underline underline-offset-4 hover:text-[#1a1a1a]/60 transition-colors"
          >
            {d.searchMoreLabel}
          </Link>
          <Link
            href="/properties"
            className="text-[12px] text-[#1a1a1a]/60 border border-[#1a1a1a]/20 px-4 py-2 rounded-full hover:border-[#1a1a1a]/50 transition-colors"
          >
            {d.viewMoreLabel}
          </Link>
        </div>

      </div>
    </section>
  );
}