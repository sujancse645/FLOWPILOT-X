"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlowPanel } from "@/components/elite/GlowPanel";

const CASES = [
  {
    company: "Helix Commerce",
    role: "VP Operations",
    quote: "FlowPilot X reduced ticket resolution time by 62% in the first quarter. Our agents collaborate like a real team.",
    metrics: ["62% faster resolution", "$1.2M saved", "8 agents deployed"],
    avatar: "HC",
  },
  {
    company: "Vertex Financial",
    role: "Head of Automation",
    quote: "Invoice processing went from 4 hours to 11 minutes. Investors asked if we built this in-house.",
    metrics: ["94% automation rate", "11 min processing", "Zero manual errors"],
    avatar: "VF",
  },
  {
    company: "Synapse Health",
    role: "Chief AI Officer",
    quote: "The neural command center changed how we demo to enterprise. It feels like the future of work.",
    metrics: ["40% ops efficiency", "24/7 autonomous", "Enterprise ready"],
    avatar: "SH",
  },
];

export function CaseStudies() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400">Customer success</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">Enterprise outcomes</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowPanel className="p-6 h-full flex flex-col hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                    {c.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{c.company}</p>
                    <p className="text-xs text-muted">{c.role}</p>
                  </div>
                </div>
                <p className="text-secondary text-sm flex-1">&ldquo;{c.quote}&rdquo;</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.metrics.map((m) => (
                    <span key={m} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {m}
                    </span>
                  ))}
                </div>
                <button className="mt-6 flex items-center gap-1 text-sm text-cyan-400 hover:text-white transition-colors">
                  Read case study <ArrowUpRight className="h-4 w-4" />
                </button>
              </GlowPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
