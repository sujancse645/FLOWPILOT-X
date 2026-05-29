import { SceneShell } from "@/components/fx/SceneShell";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductStory } from "@/components/landing/ProductStory";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { ROICalculator } from "@/components/landing/ROICalculator";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { CTASection, FAQ, PricingPreview } from "@/components/landing/LandingSections";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <SceneShell className="grid-bg perspective-scene">
      <Navbar />
      <Hero />
      <LogoStrip />
      <ProductStory />
      <ROICalculator />
      <CaseStudies />
      <PricingPreview />
      <FAQ />
      <CTASection />
      <Footer />
    </SceneShell>
  );
}
