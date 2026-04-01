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