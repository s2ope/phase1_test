import { client, HOMEPAGE_QUERY } from "@/sanity/lib/client";
const pageData = await client.fetch(HOMEPAGE_QUERY);

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

export default function Home() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <Navbar />
      <Hero />
      <SearchBar />
      <JourneySection />
      <FeaturesCarousel />
      <NeighborhoodsSection />
      <MortgageCalculator />
      <AboutStats />
      <ServiceArea />
      <Testimonials />
      <FooterCTA />
    </main>
  );
}