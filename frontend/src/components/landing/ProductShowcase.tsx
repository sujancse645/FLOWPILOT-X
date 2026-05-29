"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, GitBranch, Bot, BarChart3 } from "lucide-react";
import { GlowPanel } from "@/components/elite/GlowPanel";

const TABS = [
  { id: "workflow", label: "Workflow Engine", icon: GitBranch, desc: "Visual neural automation with live execution replay and energy streams." },
  { id: "agents", label: "AI Agents", icon: Bot, desc: "Eight specialized agents with persistent memory and real-time collaboration." },
  { id: "analytics", label: "Analytics", icon: BarChart3, desc: "Live metrics, ROI tracking, and operational intelligence dashboards." },
];

export function ProductShowcase() {
  const [active, setActive] = useState("workflow");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-violet-400 text-center">Product tour</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mt-3">
          See the AI operating system in action
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all ${
                active === t.id
                  ? "bg-violet-600/30 text-white border border-violet-500/50"
                  : "text-muted hover:text-white border border-transparent"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <GlowPanel glow className="mt-8 p-1 overflow-hidden">
          <div className="rounded-2xl bg-[#0a0f24] aspect-video relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.25),transparent_50%)]" />
                <tab.icon className="h-16 w-16 text-violet-400 relative z-10 mb-6" />
                <p className="text-xl font-display font-semibold text-white relative z-10">{tab.label}</p>
                <p className="text-secondary text-center max-w-md mt-3 relative z-10">{tab.desc}</p>
                <motion.div
                  className="mt-8 flex gap-2 relative z-10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 w-16 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted">
              <Play className="h-3 w-3" /> Live product preview
            </div>
          </div>
        </GlowPanel>
      </div>
    </section>
  );
}
