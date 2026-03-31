// ─── Shared image type ────────────────────────────────────────────────────────
export interface SanityImage {
  url: string;
  alt: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export interface HeroData {
  headlineStart: string;        // "Hello"
  headlineMiddle: string;       // "Future"
  headlineEnd: string;          // "Home Owners"
  emojiIcons?: string[];        // ["🕶️", "🤝"]
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  heroImage: SanityImage;
  heroCaption: string;
}

// ─── Search Section ───────────────────────────────────────────────────────────
export interface SearchSectionData {
  searchPlaceholder: string;
  searchImage: SanityImage;
  headlineStart: string;        // "Start the"
  headlineEnd: string;          // "search now."
}

// ─── Journey Section ──────────────────────────────────────────────────────────
export interface JourneySectionData {
  eyebrow: string;
  headline: string;
  body: string;
}

// ─── Feature Strip ────────────────────────────────────────────────────────────
export interface FeatureItem {
  _key: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FeatureStripData {
  items: FeatureItem[];
}

// ─── Neighborhoods ────────────────────────────────────────────────────────────
export interface PropertyCard {
  _key: string;
  price: string;                // "$17,8120.20"
  label: string;                // "For Sale"
  title: string;                // "Vida Residence Downtown"
  location: string;             // "Sparkton"
  image: SanityImage;
}

export interface NeighborhoodsSectionData {
  eyebrow: string;
  headline: string;
  city: string;
  searchMoreLabel: string;
  viewMoreLabel: string;
  properties: PropertyCard[];
}

// ─── Borrow Estimator ─────────────────────────────────────────────────────────
export interface BorrowSectionData {
  eyebrow: string;
  headline: string;
  defaultAmount: string;
}

// ─── About / Stats ────────────────────────────────────────────────────────────
export interface StatItem {
  _key: string;
  value: string;                // "90k+"
  label: string;                // "Customers"
}

export interface AboutSectionData {
  eyebrow: string;
  headline: string;
  stats: StatItem[];
}

// ─── Service Area / Map ───────────────────────────────────────────────────────
export interface ServiceLocation {
  _key: string;
  name: string;
  type: string;                 // e.g. "Villa"
  address: string;
  lat: number;
  lng: number;
}

export interface ServiceAreaSectionData {
  eyebrow: string;
  headline: string;
  locations: ServiceLocation[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  _key: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage: SanityImage;
}

export interface TestimonialsSectionData {
  sectionLabel: string;
  viewMoreLabel: string;
  items: Testimonial[];
}

// ─── CTA Footer Band ──────────────────────────────────────────────────────────
export interface CTABandData {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  footerLinks: Array<{ _key: string; label: string; href: string }>;
}