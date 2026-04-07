"use client";

import { useState, useEffect, useRef } from "react";
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

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;
    if ((window as any).google?.maps) return resolve();
    if (document.getElementById("google-maps-script")) {
      const interval = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

// Full marker SVG:
// - Outer glow:   108×108, #00000033, border 1px #000
// - Black circle:  47×47,  #00000099, border 1px #000
// - Gold dot:      18×18,  #f0c132
// - Triangle pointer: 21×18, #000, rotated 90deg, border-radius 3px (via rx)
// - Black pill label: 159×33, border-radius 24px, padding 8px, bg #000
// - White text: Inter 14px, font-weight 400
function createMarkerIcon(google: any, name: string, isActive: boolean) {
  const outer = 108;
  const mid = 47;
  const dot = 18;
  const cx = outer / 2; // 54

  const pillH = 33;
  const pillRadius = 16;

  // Triangle pointer dimensions
  const triW = 18;  // height of triangle
  const triD = 14;  // depth (how far it pokes left into the circle)

  // Pill starts exactly at the circle edge (outer = 108)
  const pillStartX = outer - triD; // triangle tip touches circle, pill overlaps slightly
  const triTipX = pillStartX;
  const triBaseX = pillStartX + triD;

  // Make pill wide enough but clip text inside
  const pillW = 159;
  const pillX = triBaseX;
  const pillY = cx - pillH / 2;

  const totalW = pillX + pillW;
  const totalH = outer;

  const goldColor = isActive ? "#ffe033" : "#f0c132";

  // Unique clip path ID to avoid conflicts between markers
  const clipId = `clip-${name.replace(/\s+/g, "-")}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
      <defs>
        <clipPath id="${clipId}">
          <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillRadius}" ry="${pillRadius}" />
        </clipPath>
      </defs>

      <!-- Outer glow: 108×108, #00000033, 1px border -->
      <circle cx="${cx}" cy="${cx}" r="${outer / 2 - 0.5}"
        fill="#00000033" stroke="#000000" stroke-width="1" />

      <!-- Black circle: 47×47, #00000099, 1px border -->
      <circle cx="${cx}" cy="${cx}" r="${mid / 2 - 0.5}"
        fill="#00000099" stroke="#000000" stroke-width="1" />

      <!-- Gold dot: 18×18 -->
      <circle cx="${cx}" cy="${cx}" r="${dot / 2}" fill="${goldColor}" />

      <!-- Pill + triangle as one connected shape -->
      <!-- Triangle pointer pointing left, tip touching circle edge -->
      <polygon
        points="
          ${triTipX},${cx}
          ${triBaseX},${cx - triW / 2}
          ${triBaseX},${cx + triW / 2}
        "
        fill="#000000"
      />

      <!-- Black pill -->
      <rect
        x="${pillX}" y="${pillY}"
        width="${pillW}" height="${pillH}"
        rx="${pillRadius}" ry="${pillRadius}"
        fill="#000000"
      />

      <!-- Text clipped inside pill -->
      <text
        x="${pillX + pillW / 2}"
        y="${cx}"
        font-family="Inter, sans-serif"
        font-size="14"
        font-weight="400"
        fill="#FFFFFF"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="0"
        clip-path="url(#${clipId})"
      >${name}</text>

    </svg>
  `;

  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(totalW, totalH),
    anchor: new google.maps.Point(cx, cx),
  };
}

export default function ServiceAreaSection({ data = FALLBACK }: ServiceAreaSectionProps) {
  const d = data ?? FALLBACK;
  const [activeLocation, setActiveLocation] = useState<ServiceLocation | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  useEffect(() => {
    if (!apiKey) return;

    loadGoogleMapsScript(apiKey).then(() => {
      if (!containerRef.current || mapRef.current) return;

      const google = (window as any).google;

      const map = new google.maps.Map(containerRef.current, {
        center: { lat: -7.8731, lng: 110.3948 },
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#4a4a4a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#f5f0e8" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e0d8ca" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9e4f0" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d8ead0" }] },
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
      });

      mapRef.current = map;
      // No infoWindow needed — label is baked into the marker SVG
      infoWindowRef.current = null;

      markersRef.current = (d.locations ?? []).map((loc) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.name,
          icon: createMarkerIcon(google, loc.name, false),
          // No separate label — it's drawn inside the SVG
        });

        marker.addListener("click", () => {
          setActiveLocation((prev) => (prev?._key === loc._key ? null : loc));
        });

        return marker;
      });
    });

    return () => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      mapRef.current = null;
    };
  }, [apiKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const google = (window as any).google;

    if (!activeLocation) {
      map.panTo({ lat: -7.8731, lng: 110.3948 });
      map.setZoom(11);
      markersRef.current.forEach((m, i) => {
        const loc = d.locations[i];
        m.setIcon(createMarkerIcon(google, loc.name, false));
      });
      return;
    }

    const idx = (d.locations ?? []).findIndex((l) => l._key === activeLocation._key);
    if (idx === -1) return;

    const loc = d.locations[idx];
    map.panTo({ lat: loc.lat, lng: loc.lng });
    setTimeout(() => map.setZoom(15), 300);

    markersRef.current.forEach((m, i) => {
      m.setIcon(createMarkerIcon(google, d.locations[i].name, i === idx));
    });
  }, [activeLocation]);

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

          {/* Map — Figma: 785×530, #0E121B, border-radius 32px */}
          <div
            style={{
              background: "#0E121B",
              borderRadius: "32px",
              padding: "8px",
              width: "100%",
              maxWidth: "785px",
              height: "530px",
            }}
          >
            <div
              ref={containerRef}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "26px",
                overflow: "hidden",
              }}
            />
          </div>

          {/* Location list */}
          <div className="flex flex-col gap-3 justify-start">
            {(d.locations ?? []).map((loc) => {
              const isActive = activeLocation?._key === loc._key;
              return (
                <button
                  key={loc._key}
                  onClick={() => setActiveLocation(isActive ? null : loc)}
                  className={`text-left rounded-2xl border px-5 py-4 transition-all ${
                    isActive
                      ? "border-[#f0c132] bg-[#f0c132]/10"
                      : "border-[#1a1a1a]/15 bg-white hover:border-[#1a1a1a]/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#1a1a1a]">{loc.name}</span>
                      <span className="text-[11px] text-[#1a1a1a]/50">{loc.type}</span>
                      <span className="text-[11px] text-[#1a1a1a]/40 mt-1 leading-snug">{loc.address}</span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
                        isActive ? "bg-[#f0c132]" : "bg-[#1a1a1a]/8"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        className={isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}

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