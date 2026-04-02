// app/properties/page.tsx
import { client } from "@/sanity/lib/client";
import type { HomeRecord } from "@/sanity/types";
import Image from "next/image";

interface Props {
  searchParams: { q?: string };
}

const searchPropertiesQuery = `
  *[_type == "homeRecord" && (
    location match "*" + $q + "*" ||
    title match "*" + $q + "*"
  )] {
    _id,
    title,
    price,
    location,
    address,
    type,
    bedrooms,
    bathrooms,
    area,
    "image": image {
      "url": asset->url,
      alt
    }
  }
`;

const allPropertiesQuery = `
  *[_type == "homeRecord"] {
    _id,
    title,
    price,
    location,
    address,
    type,
    bedrooms,
    bathrooms,
    area,
    "image": image {
      "url": asset->url,
      alt
    }
  }
`;

export default async function PropertiesPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? "";

  const properties = await client.fetch<HomeRecord[]>(
    q ? searchPropertiesQuery : allPropertiesQuery,
    q ? { q } : {}
  );

  return (
    <main className="bg-[#f5f0e8] min-h-screen px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <h1 className="text-[36px] font-bold text-[#1a1a1a]">
          {q ? `Results for "${q}"` : "All Properties"}
        </h1>

        {properties.length === 0 ? (
          <p className="text-[#1a1a1a]/50 text-[14px]">
            No properties found{q ? ` for "${q}"` : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {p.image?.url && (
                  <div className="relative h-[200px]">
                    <Image
                      src={p.image.url}
                      alt={p.image.alt ?? p.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {p.type === "for-sale" ? "For Sale" : "For Rent"}
                    </span>
                  </div>
                )}
                <div className="p-4 flex flex-col gap-1.5">
                  <span className="text-[#f0c132] font-bold text-[18px]">{p.price}</span>
                  <h3 className="text-[#1a1a1a] font-semibold text-[14px]">{p.title}</h3>
                  <p className="text-[#1a1a1a]/50 text-[12px]">{p.address ?? p.location}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-[#1a1a1a]/40">
                    <span>{p.bedrooms} bed</span>
                    <span>{p.bathrooms} bath</span>
                    <span>{p.area} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}