"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";

const timeline = [
  { year: "2024", event: "FlowPilot X founded with vision of autonomous AI workforce" },
  { year: "2025", event: "Launched multi-agent orchestration with CrewAI integration" },
  { year: "2025", event: "Reached 10,000+ workflows executed daily" },
  { year: "2026", event: "Enterprise marketplace and voice AI released" },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Co-founder", bio: "Former AI research lead at major tech company" },
  { name: "Jordan Kim", role: "CTO", bio: "Built scalable ML systems for Fortune 500" },
  { name: "Sam Patel", role: "Head of AI", bio: "Expert in multi-agent systems and LLM orchestration" },
  { name: "Morgan Lee", role: "Head of Product", bio: "Product leader from enterprise SaaS background" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <section className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-bold gradient-text">About FlowPilot X</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-[#94a3b8]">
          We&apos;re building the operating system for the autonomous AI workforce — where businesses deploy intelligent agents that work together like a real team.
        </motion.p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Card glow>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-[#94a3b8]">Democratize access to enterprise-grade AI automation so every business can deploy an autonomous workforce that scales infinitely.</p>
          </Card>
          <Card glow>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-[#94a3b8]">A world where AI agents collaborate seamlessly with humans — handling operations, support, analysis, and execution while humans focus on strategy and creativity.</p>
          </Card>
        </div>

        <Card>
          <h2 className="font-display text-2xl font-bold text-white mb-6">AI Philosophy</h2>
          <p className="text-[#94a3b8] leading-relaxed">
            We believe AI should be autonomous, transparent, and collaborative — not a black-box chatbot. FlowPilot X agents communicate, delegate, share memory, and improve over time. Our CrewAI architecture ensures agents work as a team, not isolated tools.
          </p>
        </Card>

        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">Innovation Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div key={item.year + item.event} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="flex gap-6 items-start">
                  <span className="text-[#7C3AED] font-bold font-display text-xl shrink-0">{item.year}</span>
                  <p className="text-[#94a3b8]">{item.event}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">Leadership Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xl font-bold mb-4">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-[#7C3AED]">{member.role}</p>
                <p className="text-xs text-[#64748b] mt-2">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
