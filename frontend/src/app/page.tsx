import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { 
  ProblemSection, 
  SolutionSection, 
  BenefitsSection, 
  CTASection 
} from "@/components/landing/LandingSections";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
