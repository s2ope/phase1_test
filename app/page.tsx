import { client, HOMEPAGE_QUERY } from "@/sanity/lib/client";
import { neighborhoodPropertiesQuery } from "@/sanity/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import JourneySection from "@/components/JourneySection";
import FeaturesCarousel from "@/components/FeaturesCarousel";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import MortgageCalculator from "@/components/MortgageCalculator";
import AboutStats from "@/components/AboutStats";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FooterCTA from "@/components/FooterCTA";

export const revalidate = 0;

export default async function Home() {
  const pageData = await client.fetch(HOMEPAGE_QUERY, {}, { cache: 'no-store' });

  const city = pageData?.neighborhoodsSection?.city ?? "Boston";

  const neighborhoodProperties = await client.fetch(
    neighborhoodPropertiesQuery,
    { city },
    { cache: 'no-store' }
  );

  return (
    <main className="bg-cream min-h-screen font-sans">
      <Navbar />
      <Hero data={pageData?.hero} />
      <SearchBar data={pageData?.searchSection} />
      <JourneySection data={pageData?.journeySection} />
      <FeaturesCarousel items={pageData?.featureStrip} />
      <NeighborhoodsSection
        data={pageData?.neighborhoodsSection}
        properties={neighborhoodProperties}
      />
      <MortgageCalculator data={pageData?.borrowSection} />
      <AboutStats data={pageData?.aboutSection} />
      <ServiceArea data={pageData?.serviceAreaSection} />
      <Testimonials data={pageData?.testimonialsSection} />
      <FooterCTA data={pageData?.ctaBand} />
    </main>
  );
}