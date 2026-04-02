// app/properties/page.tsx
import { client } from "@/sanity/lib/client";
import { allPropertiesQuery } from "@/sanity/queries";
import type { HomeRecord } from "@/sanity/types";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";

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
          <div className="flex items-center gap-3 mt-1 text-white/50 text-[10px]">
            {p.bedrooms && <span>{p.bedrooms} bed</span>}
            {p.bathrooms && <span>{p.bathrooms} bath</span>}
            {p.area && <span>{p.area} sqft</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const all = await client.fetch<HomeRecord[]>(allPropertiesQuery);

  const properties = query
    ? all.filter((p) => {
        const term = query.toLowerCase();
        return (
          p.title?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term) ||
          p.address?.toLowerCase().includes(term)
        );
      })
    : all;

  return (
    <main className="bg-[#f5f0e8] min-h-screen font-sans">
      <Navbar />

      <div className="px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-[#1a1a1a]/30 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 block" />
              </span>
              <span className="text-[12px] text-[#1a1a1a]/50">Properties</span>
            </div>
            <h1 className="text-[36px] md:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight max-w-lg">
              {query ? `Results for "${query}"` : "All Properties"}
            </h1>
          </div>

          {/* Grid */}
          {properties.length === 0 ? (
            <div className="text-center py-16 text-[#1a1a1a]/40 text-[14px]">
              {query
                ? `No properties found for "${query}".`
                : "No properties yet — add some in Sanity Studio."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {properties.map((p) => (
                <PropertyCard key={p._id} p={p} />
              ))}
            </div>
          )}

        </div>
      </div>

      <FooterCTA data={undefined} />
    </main>
  );
}