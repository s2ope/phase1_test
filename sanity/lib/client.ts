import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url' 
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const builder =  createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: any) {
  return builder.image(source)
}

export const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "e3f0f7a6-ae96-405b-b43d-e94664b3a94f"][0]{
  hero {
    headlineStart,
    headlineMiddle,
    headlineEnd,
    emojiIcons,
    subtext,
    ctaLabel,
    ctaHref,
    heroImage { ..., "url": asset->url, alt },
    heroCaption,
  },
  searchSection {
    searchPlaceholder,
    searchImage { ..., "url": asset->url, alt },
    headlineStart,
    headlineEnd,
  },
  journeySection {
    eyebrow,
    headline,
    body,
  },
  featureStrip[] {
    _key,
    headline,
    ctaLabel,
    ctaHref,
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
      image { ..., "url": asset->url, alt },
    },
  },
  borrowSection {
    eyebrow,
    headline,
    defaultAmount,
  },
aboutSection {
  eyebrow,
  headline,
  stats[] { _key, value, label },
  image { ..., "url": asset->url, alt },  // ← add this
},
  serviceAreaSection {
    eyebrow,
    headline,
    locations[] { _key, name, type, address, lat, lng },
  },
  testimonialsSection {
    sectionLabel,
    viewMoreLabel,
    items[] {
      _key,
      quote,
      authorName,
      authorRole,
      authorImage { ..., "url": asset->url, alt },
    },
  },
  ctaBand {
    headline,
    ctaLabel,
    ctaHref,
  },
}`