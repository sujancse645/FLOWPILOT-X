import { SceneShell } from "@/components/fx/SceneShell";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
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

export default function HomePage() {
  return (
    <SceneShell className="grid-bg">
      <Navbar />
      <Hero />
      <FeatureGrid />
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
