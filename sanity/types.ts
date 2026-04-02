// sanity/types.ts

export interface SanityImage {
  url?: string
  alt?: string
}

export interface StatItem {
  _key?: string
  value: string
  label: string
}

export interface CTABandData {
  headline: string
  ctaLabel: string
  ctaHref: string
  footerLinks?: Array<{ _key: string; label: string; href: string }>
}

export interface BorrowSectionData {
  eyebrow: string
  headline: string
  defaultAmount?: string
}

export interface AboutSectionData {
  eyebrow: string
  headline: string
  stats: StatItem[]
  image?: SanityImage
}

export type FeatureItem = {
  _key: string
  title?: string
  headline?: string
  ctaLabel?: string  // ← add
  ctaHref?: string   // ← add
  icon?: any
}

export type HeroData = {
  headlineStart?: string
  headlineMiddle?: string
  headlineEnd?: string
  headlineFinal?: string
  emojiIcons?: string[]  // ← was string, must be string[]
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  heroImage?: SanityImage  // ← already correct if SanityImage is defined
  heroCaption?: string
}

export type JourneySectionData = {
  eyebrow?: string
  headline?: string
  body?: string
}

export type PropertyItem = {
  _key: string
  _type: string
  title?: string
  price?: string
  image?: SanityImage
}

export type PropertyCard = {
  _key: string
  title?: string
  price?: string
  label?: string
  location?: string
  image?: SanityImage
}

export type NeighborhoodsSectionData = {
  eyebrow?: string
  headline?: string
  city?: string
  searchMoreLabel?: string
  viewMoreLabel?: string
  properties?: PropertyCard[]
}

export interface HomeRecord {
  _id: string
  title: string
  price: string
  location: string
  address: string
  type: "for-sale" | "for-rent"
  bedrooms: number
  bathrooms: number
  area: number
  description?: string
  image?: SanityImage
}

// ← was missing
export type SearchSectionData = {
  searchPlaceholder?: string
  searchImage?: SanityImage
  headlineStart?: string
  headlineEnd?: string
}

// ← was missing
export type ServiceLocation = {
  _key?: string
  name?: string
  type?: string
  address?: string
  lat?: number
  lng?: number
}

// ← was missing
export type ServiceAreaSectionData = {
  eyebrow?: string
  headline?: string
  locations?: ServiceLocation[]
}

// ← was missing
export type TestimonialItem = {
  _key?: string
  quote?: string
  authorName?: string
  authorRole?: string
  authorImage?: SanityImage
}

// ← was missing
export type TestimonialsSectionData = {
  sectionLabel?: string
  viewMoreLabel?: string
  items?: TestimonialItem[]
}