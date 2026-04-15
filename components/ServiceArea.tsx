"use client";

import { useState, useEffect, useRef } from "react";
import type { ServiceAreaSectionData, ServiceLocation } from "../sanity/types";

// Type declarations for Google Maps API
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement | null, options?: MapOptions);
      panTo(latlng: LatLngLiteral): void;
      setZoom(zoom: number): void;
      setCenter(latlng: LatLngLiteral): void;
    }
    class Marker {
      constructor(options?: MarkerOptions);
      setMap(map: Map | null): void;
      setIcon(icon: Icon | string): void;
      addListener(event: string, handler: Function): void;
    }
    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(options?: InfoWindowOpenOptions): void;
      close(): void;
    }
    class Size {
      constructor(width: number, height: number);
    }
    class Point {
      constructor(x: number, y: number);
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      zoomControl?: boolean;
      styles?: any[];
    }
    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: Icon | string;
    }
    interface Icon {
      url: string;
      scaledSize?: Size;
      anchor?: Point;
    }
    interface InfoWindowOptions {
      content?: string;
      position?: LatLngLiteral;
    }
    interface InfoWindowOpenOptions {
      map?: Map;
      anchor?: Marker;
      shouldFocus?: boolean;
    }
  }
}

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

function createMarkerIcon(google: any, name: string, isActive: boolean) {
  const outer = 108;
  const mid = 47;
  const dot = 18;
  const cx = outer / 2;

  const pillH = 33;
  const pillRadius = 16;

  const triW = 18;
  const triD = 14;

  const pillStartX = outer - triD;
  const triTipX = pillStartX;
  const triBaseX = pillStartX + triD;

  const pillW = 159;
  const pillX = triBaseX;
  const pillY = cx - pillH / 2;

  const totalW = pillX + pillW;
  const totalH = outer;

  const goldColor = isActive ? "#ffe033" : "#888888";
  const clipId = `clip-${name.replace(/\s+/g, "-")}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
      <defs>
        <clipPath id="${clipId}">
          <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillRadius}" ry="${pillRadius}" />
        </clipPath>
      </defs>
      <circle cx="${cx}" cy="${cx}" r="${outer / 2 - 0.5}" fill="#00000033" stroke="#000000" stroke-width="1" />
      <circle cx="${cx}" cy="${cx}" r="${mid / 2 - 0.5}" fill="#00000099" stroke="#000000" stroke-width="1" />
      <circle cx="${cx}" cy="${cx}" r="${dot / 2}" fill="${goldColor}" />
      <polygon points="${triTipX},${cx} ${triBaseX},${cx - triW / 2} ${triBaseX},${cx + triW / 2}" fill="#000000" />
      <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillRadius}" ry="${pillRadius}" fill="#000000" />
      <text
        x="${pillX + pillW / 2}" y="${cx}"
        font-family="Inter, sans-serif" font-size="14" font-weight="400"
        fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle"
        letter-spacing="0" clip-path="url(#${clipId})"
      >${name}</text>
    </svg>
  `;

  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(totalW, totalH),
    anchor: new google.maps.Point(cx, cx),
  };
}

export default function ServiceAreaSection({
  data = FALLBACK,
}: ServiceAreaSectionProps) {
  const d = data ?? FALLBACK;
  const locations = d.locations ?? [];

  const [activeLocation, setActiveLocation] = useState<ServiceLocation | null>(
    null,
  );

  // Search / autocomplete state
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<ServiceLocation[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  // Filter as user types
  useEffect(() => {
    if (query.trim().length === 0) {
      setFiltered([]);
      setDropdownOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const results = locations.filter(
      (loc) =>
        loc.name?.toLowerCase().includes(q) ||
        loc.address?.toLowerCase().includes(q) ||
        loc.type?.toLowerCase().includes(q),
    );
    setFiltered(results);
    setDropdownOpen(results.length > 0);
  }, [query, locations]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectSuggestion(loc: ServiceLocation) {
    setQuery(loc.name ?? "");
    setDropdownOpen(false);
    setActiveLocation(loc);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setDropdownOpen(false);
    if (e.key === "Enter" && filtered.length > 0)
      handleSelectSuggestion(filtered[0]!);
  }

  // Google Maps init
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
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#f5f0e8" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#e0d8ca" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9e4f0" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#d8ead0" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      mapRef.current = map;
      infoWindowRef.current = null;

      markersRef.current = locations.map((loc) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.name,
          icon: createMarkerIcon(google, loc.name ?? "", false),
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

  // Pan + marker update on active change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const google = (window as any).google;

    if (!activeLocation) {
      map.panTo({ lat: -7.8731, lng: 110.3948 });
      map.setZoom(11);
      markersRef.current.forEach((m, i) => {
        const loc = locations[i];
        if (!loc) return;
        m.setIcon(createMarkerIcon(google, loc.name ?? "", false));
      });
      return;
    }

    const idx = locations.findIndex((l) => l._key === activeLocation._key);
    if (idx === -1) return;

    const loc = locations[idx];
    if (!loc) return;
    if (loc.lat == null || loc.lng == null) return;

    map.panTo({ lat: loc.lat, lng: loc.lng });
    setTimeout(() => map.setZoom(15), 300);

    markersRef.current.forEach((m, i) => {
      const markerLoc = locations[i];
      if (!markerLoc) return;
      m.setIcon(createMarkerIcon(google, markerLoc.name ?? "", i === idx));
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

        {/* Search input with autocomplete */}
        <div className="relative max-w-md mx-auto w-full">
          <div className="flex items-center bg-white border border-[#1a1a1a]/15 rounded-2xl px-4 py-3 gap-3 shadow-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#1a1a1a]/30 flex-shrink-0"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M16.5 16.5L21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => filtered.length > 0 && setDropdownOpen(true)}
              placeholder="Search locations..."
              className="flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setActiveLocation(null);
                  setDropdownOpen(false);
                }}
                className="text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown suggestions */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#1a1a1a]/10 rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              {filtered.map((loc) => (
                <button
                  key={loc._key}
                  onClick={() => handleSelectSuggestion(loc)}
                  className="w-full text-left px-4 py-3 hover:bg-[#f5f0e8] transition-colors flex items-center gap-3 border-b border-[#1a1a1a]/5 last:border-0"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0 text-[#1a1a1a]/30"
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
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-[#1a1a1a]">
                      {loc.name}
                    </span>
                    <span className="text-[11px] text-[#1a1a1a]/40">
                      {loc.address}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map + Locations */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5">
          {/* Map */}
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
            {locations.map((loc) => {
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
                      <span className="text-[14px] font-semibold text-[#1a1a1a]">
                        {loc.name}
                      </span>
                      <span className="text-[11px] text-[#1a1a1a]/50">
                        {loc.type}
                      </span>
                      <span className="text-[11px] text-[#1a1a1a]/40 mt-1 leading-snug">
                        {loc.address}
                      </span>
                    </div>
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
                        className={
                          isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"
                        }
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="9"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}

            {activeLocation && (
              <button
                onClick={() => {
                  setActiveLocation(null);
                  setQuery("");
                }}
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
