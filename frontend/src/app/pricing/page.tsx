"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pricingTiers, faqItems } from "@/data/mock";

const comparison = [
  { feature: "AI Agents", starter: "5", pro: "25", enterprise: "Unlimited" },
  { feature: "Workflows", starter: "10", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Tasks/month", starter: "1,000", pro: "50,000", enterprise: "Unlimited" },
  { feature: "Document AI", starter: "10 docs", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Voice AI", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "API Access", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "SSO/SAML", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Dedicated Support", starter: "—", pro: "—", enterprise: "✓" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <section className="pt-32 pb-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold gradient-text">Pricing</h1>
        <p className="mt-4 text-[#94a3b8]">14-day free trial · No credit card required</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-3 pb-16">
        {pricingTiers.map((tier, i) => (
          <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={`h-full ${tier.popular ? "glow-border ring-2 ring-[#7C3AED]/30" : ""}`}>
              {tier.popular && <span className="text-xs text-[#a78bfa] font-medium">MOST POPULAR</span>}
              <h3 className="text-2xl font-bold text-white mt-2">{tier.name}</h3>
              <div className="mt-4 mb-6">
                {tier.price ? <><span className="text-5xl font-bold">${tier.price}</span><span className="text-[#64748b]">/mo</span></> : <span className="text-5xl font-bold">Custom</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-[#94a3b8]"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Link href="/sign-up"><Button className="w-full" variant={tier.popular ? "default" : "outline"}>{tier.cta}</Button></Link>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 overflow-x-auto">
        <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">Compare Plans</h2>
        <table className="w-full glass rounded-2xl overflow-hidden">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-[#94a3b8]">Feature</th>
              <th className="p-4 text-center">Starter</th>
              <th className="p-4 text-center text-[#7C3AED]">Pro</th>
              <th className="p-4 text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b border-white/5">
                <td className="p-4 text-white">{row.feature}</td>
                <td className="p-4 text-center text-[#94a3b8]">{row.starter}</td>
                <td className="p-4 text-center text-white">{row.pro}</td>
                <td className="p-4 text-center text-[#94a3b8]">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="font-display text-2xl font-bold text-white text-center mb-8">FAQ</h2>
        {faqItems.map((item) => (
          <Card key={item.q} className="mb-4">
            <h3 className="font-medium text-white">{item.q}</h3>
            <p className="mt-2 text-sm text-[#94a3b8]">{item.a}</p>
          </Card>
        ))}
      </section>
      <Footer />
    </main>
  );
}
