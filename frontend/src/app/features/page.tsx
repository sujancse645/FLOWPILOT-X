"use client";

import { motion } from "framer-motion";
import { SceneShell } from "@/components/fx/SceneShell";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HoloCard } from "@/components/fx/HoloCard";
import { ScrollReveal } from "@/components/fx/ScrollReveal";
import {
  Bot, GitBranch, Zap, FileText, BarChart3, Rocket, Users, Mic, Plug,
} from "lucide-react";

const sections = [
  { icon: Bot, title: "AI Agents", desc: "Deploy specialized agents with custom prompts, tools, and autonomous mode.", gradient: "from-violet-600/30" },
  { icon: GitBranch, title: "Workflow Builder", desc: "Drag-and-drop neural automation with live execution streams.", gradient: "from-cyan-600/25" },
  { icon: Zap, title: "AI Automation", desc: "Pre-built templates for support, leads, resumes, emails, and reports.", gradient: "from-amber-600/20" },
  { icon: FileText, title: "Document Intelligence", desc: "Upload, embed, summarize, and query with ChromaDB + LangChain.", gradient: "from-emerald-600/20" },
  { icon: BarChart3, title: "Analytics Engine", desc: "Enterprise insights on efficiency, savings, and AI performance.", gradient: "from-pink-600/20" },
  { icon: Rocket, title: "Autonomous Execution", desc: "CrewAI multi-agent orchestration with delegation and memory.", gradient: "from-indigo-600/25" },
  { icon: Users, title: "Team Collaboration", desc: "Multi-agent chat with shared memory and real-time feeds.", gradient: "from-teal-600/20" },
  { icon: Mic, title: "Voice Commands", desc: "Speech interface with reactive AI orb and waveform.", gradient: "from-yellow-600/15" },
  { icon: Plug, title: "API Integrations", desc: "Slack, CRM, email, databases, and marketplace packs.", gradient: "from-rose-600/20" },
];

export default function FeaturesPage() {
  return (
    <SceneShell className="grid-bg">
      <Navbar />
      <section className="pt-32 pb-16 px-4 text-center relative">
        <div className="hero-spotlight opacity-60" />
        <ScrollReveal>
          <h1 className="font-display text-5xl sm:text-6xl font-bold gradient-text">Platform Capabilities</h1>
          <p className="mt-6 text-secondary text-lg max-w-2xl mx-auto">Every module engineered for autonomous enterprise AI.</p>
        </ScrollReveal>
      </section>
      <div className="mx-auto max-w-6xl px-4 pb-24 space-y-8">
        {sections.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.05}>
            <HoloCard glow className={`bg-gradient-to-br ${s.gradient} to-transparent`}>
              <div className={`flex flex-col gap-8 lg:flex-row items-center ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED]/25 mb-4 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                    <s.icon className="h-7 w-7 text-[#a78bfa]" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white">{s.title}</h2>
                  <p className="mt-4 text-secondary leading-relaxed text-lg">{s.desc}</p>
                </div>
                <motion.div
                  className="flex-1 w-full h-48 holo-panel rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <s.icon className="h-24 w-24 text-[#7C3AED]/25" />
                </motion.div>
              </div>
            </HoloCard>
          </ScrollReveal>
        ))}
      </div>
      <Footer />
    </SceneShell>
  );
}
