"use client";

import { motion } from "framer-motion";
import {
  Bot, GitBranch, Users, BarChart3, Mic, Plug, Store,
  CheckCircle, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoloCard } from "@/components/fx/HoloCard";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { testimonials, integrations, faqItems } from "@/data/mock";
import { pricingTiers } from "@/data/mock";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const features = [
  { icon: Bot, title: "AI Agent Showcase", desc: "Deploy specialized agents for support, sales, HR, finance, and more.", color: "#7C3AED" },
  { icon: GitBranch, title: "Workflow Automation", desc: "Visual drag-and-drop builder with real-time execution tracking.", color: "#06B6D4" },
  { icon: Users, title: "Real-Time Collaboration", desc: "Multi-agent communication with shared memory and delegation.", color: "#8B5CF6" },
  { icon: BarChart3, title: "AI Analytics", desc: "Enterprise-grade insights on efficiency, savings, and performance.", color: "#10B981" },
  { icon: Mic, title: "Voice AI", desc: "Speech-to-text, text-to-speech, and voice command execution.", color: "#F59E0B" },
  { icon: Plug, title: "Enterprise Integrations", desc: "Connect Slack, CRM, email, databases, and 100+ tools.", color: "#EC4899" },
];

export function FeatureGrid() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white">Everything you need to deploy an AI workforce</h2>
          <p className="mt-4 text-secondary max-w-2xl mx-auto text-lg">From autonomous agents to workflow orchestration — built for enterprise scale.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <HoloCard key={f.title} delay={i * 0.08} glow className="h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-4" style={{ background: `${f.color}20`, boxShadow: `0 0 30px ${f.color}22` }}>
                <f.icon className="h-6 w-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-secondary">{f.desc}</p>
            </HoloCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketplacePreview() {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3 py-1 text-sm text-cyan-400 mb-4">
              <Store className="h-4 w-4" /> AI Marketplace
            </div>
            <h2 className="font-display text-4xl font-bold text-white">Pre-built workflow packs</h2>
            <p className="mt-4 text-[#94a3b8]">Install automation packs for support, HR, finance, CRM, and email — rated by thousands of teams.</p>
            <Link href="/dashboard/marketplace" className="inline-block mt-6">
              <Button variant="cyan">Explore Marketplace <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {["Support Pack", "HR Suite", "CRM Pipeline", "Email AI"].map((pack, i) => (
              <motion.div key={pack} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="text-center">
                  <p className="font-medium text-white">{pack}</p>
                  <p className="text-xs text-[#64748b] mt-1">{["4.9★", "4.7★", "4.6★", "4.9★"][i]} · {["2.3k", "1.8k", "2.1k", "3.2k"][i]} installs</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="font-display text-4xl font-bold text-white text-center mb-16">Trusted by forward-thinking teams</motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.15 }}>
              <Card glow className="h-full">
                <p className="text-[#94a3b8] italic">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[#64748b]">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingPreview() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white">Simple, transparent pricing</h2>
          <p className="mt-4 text-[#94a3b8]">14-day free trial on all plans</p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div key={tier.name} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full relative ${tier.popular ? "glow-border scale-105" : ""}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3 py-0.5 text-xs font-medium text-white">Most Popular</span>
                )}
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <div className="mt-4">
                  {tier.price ? (
                    <><span className="text-4xl font-bold text-white">${tier.price}</span><span className="text-[#64748b]">/mo</span></>
                  ) : (
                    <span className="text-4xl font-bold text-white">Custom</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-[#94a3b8]">{tier.description}</p>
                <ul className="mt-6 space-y-2">
                  {tier.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="block mt-6">
                  <Button variant={tier.popular ? "default" : "outline"} className="w-full">{tier.cta}</Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="font-display text-4xl font-bold text-white text-center mb-12">FAQ</motion.h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <motion.div key={item.q} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Card>
                <h3 className="font-medium text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-[#94a3b8]">{item.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntegrationsBar() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <p className="text-center text-sm text-muted mb-8">Integrates with your favorite tools</p>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {integrations.map((name) => (
          <span key={name} className="glass rounded-lg px-4 py-2 text-sm text-secondary hover:text-white hover:border-violet-400/40 border border-transparent transition-all">{name}</span>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/25 via-transparent to-[#06B6D4]/25 aurora-blob" />
      <ScrollReveal className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold gradient-text">Ready to deploy your AI workforce?</h2>
        <p className="mt-4 text-secondary text-lg">Join the next generation of autonomous enterprise intelligence.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton href="/sign-up">Start Free Trial</MagneticButton>
          <MagneticButton href="/contact" variant="ghost">Talk to Sales</MagneticButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
