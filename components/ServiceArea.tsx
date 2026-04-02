"use client";

import { useState } from "react";
import type { ServiceAreaSectionData, ServiceLocation } from "../sanity/types";

interface ServiceAreaSectionProps {
  data?: ServiceAreaSectionData;
}

const FALLBACK: ServiceAreaSectionData = {
  eyebrow: "Find Us",
  headline: "Our service area",
  locations: [
    {
      _key: "l1",
      name: "Kotagede Yogyakarta",
      type: "Villa",
      address: "Jl. Kotagede, Yogyakarta 55173",
      lat: -7.8731,
      lng: 110.4,
    },
    {
      _key: "l2",
      name: "Makam Imogiri Jogja",
      type: "Villa",
      address: "Jl. Imogiri, Bantul, Yogyakarta",
      lat: -7.9731,
      lng: 110.3667,
    },
    {
      _key: "l3",
      name: "Condongcatur Sleman",
      type: "Villa",
      address: "Condongcatur, Depok, Sleman, Yogyakarta",
      lat: -7.7572,
      lng: 110.3948,
    },
  ],
};

function buildEmbedUrl(location: ServiceLocation | null, apiKey: string): string {
  const key = apiKey || "YOUR_API_KEY";

  if (!location) {
    // Show all 3 locations — center on Yogyakarta region
    return `https://www.google.com/maps/embed/v1/view?key=${key}&center=-7.8731,110.3948&zoom=11`;
  }

  // Zoom in to specific location
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${location.lat},${location.lng}&zoom=15`;
}

export default function ServiceAreaSection({ data = FALLBACK }: ServiceAreaSectionProps) {
  const d = data ?? FALLBACK;
  const [activeLocation, setActiveLocation] = useState<ServiceLocation | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const embedUrl = buildEmbedUrl(activeLocation, apiKey);

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
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
            {d.headline}
          </h2>
        </div>

        {/* Map + Locations */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[380px] shadow-sm">
            <iframe
              key={embedUrl} // re-mounts iframe on URL change to trigger pan/zoom
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service area map"
              className="w-full h-full"
            />
          </div>

          {/* Location list */}
          <div className="flex flex-col gap-3">
            {d.locations.map((loc) => {
              const isActive = activeLocation?._key === loc._key;
              return (
                <button
                  key={loc._key}
                  onClick={() =>
                    setActiveLocation(isActive ? null : loc)
                  }
                  className={`text-left rounded-2xl border px-5 py-4 transition-all ${
                    isActive
                      ? "border-[#f0c132] bg-[#f0c132]/10"
                      : "border-[#1a1a1a]/15 bg-white hover:border-[#1a1a1a]/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#1a1a1a]">
                        {loc.name}
                      </span>
                      <span className="text-[11px] text-[#1a1a1a]/50">{loc.type}</span>
                      <span className="text-[11px] text-[#1a1a1a]/40 mt-1 leading-snug">
                        {loc.address}
                      </span>
                    </div>
                    {/* Pin icon */}
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
                        isActive ? "bg-[#f0c132]" : "bg-[#1a1a1a]/8"
                      }`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"}
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Reset hint */}
            {activeLocation && (
              <button
                onClick={() => setActiveLocation(null)}
                className="text-[11px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors text-center mt-1"
              >
                ← Show all locations
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}