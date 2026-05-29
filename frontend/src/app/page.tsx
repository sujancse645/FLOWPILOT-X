import { SceneShell } from "@/components/fx/SceneShell";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { NeuralShowcase } from "@/components/landing/NeuralShowcase";
import {
  FeatureGrid,
  MarketplacePreview,
  Testimonials,
  PricingPreview,
  FAQ,
  IntegrationsBar,
  CTASection,
} from "@/components/landing/LandingSections";
import { Footer } from "@/components/landing/Footer";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { ScrollStory } from "@/components/landing/ScrollStory";

export default function HomePage() {
  return (
    <SceneShell className="grid-bg">
      <Navbar />
      <Hero />
      <LogoStrip />
      <NeuralShowcase />
      <ScrollStory />
      <ProductShowcase />
      <FeatureGrid />
      <ROICalculator />
      <CaseStudies />
      <IntegrationsBar />
      <MarketplacePreview />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTASection />
      <Footer />
    </SceneShell>
  );
}
