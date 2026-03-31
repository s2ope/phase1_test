import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "YOUR_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ─── GROQ queries ─────────────────────────────────────────────────────────────

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  hero {
    headlineStart,
    headlineMiddle,
    headlineEnd,
    emojiIcons,
    subtext,
    ctaLabel,
    ctaHref,
    heroImage { ..., "url": asset->url, alt },
    heroCaption
  },
  searchSection {
    searchPlaceholder,
    searchImage { ..., "url": asset->url, alt },
    headlineStart,
    headlineEnd
  },
  journeySection {
    eyebrow,
    headline,
    body
  },
  featureStrip[] {
    _key,
    headline,
    ctaLabel,
    ctaHref
  },
  neighborhoodsSection {
    eyebrow,
    headline,
    city,
    searchMoreLabel,
    viewMoreLabel,
    properties[] {
      _key,
      price,
      label,
      title,
      location,
      image { ..., "url": asset->url, alt }
    }
  },
  borrowSection {
    eyebrow,
    headline,
    defaultAmount
  },
  aboutSection {
    eyebrow,
    headline,
    stats[] { _key, value, label }
  },
  serviceAreaSection {
    eyebrow,
    headline,
    locations[] { _key, name, type, address, lat, lng }
  },
  testimonialsSection {
    sectionLabel,
    viewMoreLabel,
    items[] {
      _key,
      quote,
      authorName,
      authorRole,
      authorImage { ..., "url": asset->url, alt }
    }
  },
  ctaBand {
    headline,
    ctaLabel,
    ctaHref
  }
}`;