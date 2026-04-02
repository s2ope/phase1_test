// Fixed
export interface CTABandData {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  footerLinks: Array<{ _key: string; label: string; href: string }>;
}

export interface BorrowSectionData {
  eyebrow: string;
  headline: string;
  defaultAmount?: string; // optional — it's in FALLBACK but unused in the component
}

export interface AboutSectionData {
  eyebrow: string;
  headline: string;
  stats: StatItem[];
  image?: SanityImage; // ← add this
}

export type FeatureItem = {
  _key: string
  title: string
  headline: string
  icon: any // or SanityImageSource if using @sanity/image-url
}

export type HeroData = {
  headlineStart?: string
  headlineMiddle?: string
  headlineEnd?: string
  headlineFinal?: string
  emojiIcons?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  heroImage?: {
    url?: string
    alt?: string
  }
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
  image?: {
    url?: string
    alt?: string
  }
}

export type NeighborhoodsSectionData = {
  eyebrow?: string
  headline?: string
  city?: string
  searchMoreLabel?: string
  viewMoreLabel?: string
  properties?: PropertyItem[]
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
  image?: { url: string; alt: string } // ← make optional, asset->url can be null
}