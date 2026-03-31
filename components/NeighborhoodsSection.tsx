"use client";

import Image from "next/image";
import Link from "next/link";
import type { NeighborhoodsSectionData, PropertyCard } from "@/sanity/types";

interface NeighborhoodsSectionProps {
  data?: NeighborhoodsSectionData;
}

const FALLBACK: NeighborhoodsSectionData = {
  eyebrow: "Lorem ipsum",
  headline: "The most popular neighborhoods in Boston",
  city: "Boston",
  searchMoreLabel: "Search more neighborhoods",
  viewMoreLabel: "View More",
  properties: [
    {
      _key: "p1",
      price: "$17,8120.20",
      label: "For Sale",
      title: "Vida Residence Downtown",
      location: "Sparkton",
      image: { url: "/images/property-1.jpg", alt: "Property 1" },
    },
    {
      _key: "p2",
      price: "$17,8120.20",
      label: "For Sale",
      title: "Vida Residence Downtown",
      location: "Sparkton",
      image: { url: "/images/property-2.jpg", alt: "Property 2" },
    },
    {
      _key: "p3",
      price: "$17,8120.20",
      label: "For Sale",
      title: "Vida Residence Downtown",
      location: "Sparkton",
      image: { url: "/images/property-3.jpg", alt: "Property 3" },
    },
  ],
};

function PropertyCard({ card }: { card: PropertyCard }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={card.image.url}
          alt={card.image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-sm px-4 py-3">
          <p className="text-white text-[15px] font-bold">{card.price}</p>
          <p className="text-white/70 text-[11px]">
            {card.label} | {card.title} · {card.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NeighborhoodsSection({ data = FALLBACK }: NeighborhoodsSectionProps) {
  const d = data ?? FALLBACK;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {d.properties.map((card) => (
            <PropertyCard key={card._key} card={card} />
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <Link
            href="/neighborhoods"
            className="text-[13px] text-[#1a1a1a] font-medium underline underline-offset-4 hover:text-[#1a1a1a]/60 transition-colors"
          >
            {d.searchMoreLabel}
          </Link>
          <Link
            href="/neighborhoods"
            className="text-[12px] text-[#1a1a1a]/60 border border-[#1a1a1a]/20 px-4 py-2 rounded-full hover:border-[#1a1a1a]/50 transition-colors"
          >
            {d.viewMoreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}