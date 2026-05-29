"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import dynamic from "next/dynamic";

const NeuralCommandCenter = dynamic(
  () => import("@/components/neural/NeuralCommandCenter").then((m) => m.NeuralCommandCenter),
  { ssr: false, loading: () => <div className="h-[400px] holo-panel rounded-2xl animate-pulse" /> }
);

export function NeuralShowcase() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-violet-400 mb-3">Centerpiece</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Live AI <span className="gradient-text">Neural Command Center</span>
          </h2>
          <p className="mt-4 text-secondary text-lg max-w-2xl mx-auto">
            The hackathon wow factor — autonomous agents, flowing intelligence, and cinematic demo scenarios.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <NeuralCommandCenter height={420} showControls />
        </ScrollReveal>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="/dashboard/command-center">Enter Full Command Center</MagneticButton>
        </div>
      </div>
    </section>
  );
}
