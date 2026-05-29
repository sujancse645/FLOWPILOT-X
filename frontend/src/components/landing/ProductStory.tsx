"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScenarioEngine } from "@/components/demo/ScenarioEngine";
import { motion as motionTokens } from "@/lib/motion";

const CHAPTERS = [
  {
    num: "01",
    title: "Complexity overwhelms operations",
    body: "Tickets pile up. Workflows fragment. Teams drown in manual coordination while customers wait.",
    mood: "from-slate-900/80 to-[#050816]",
    accent: "text-red-300/80",
  },
  {
    num: "02",
    title: "FlowPilot activates orchestration",
    body: "A neural operating system awakens — autonomous agents ready to think, route, and execute as one.",
    mood: "from-violet-950/60 to-[#050816]",
    accent: "text-violet-300",
  },
  {
    num: "03",
    title: "Agents collaborate intelligently",
    body: "Support, Finance, Sales, and Workflow AI communicate in real time across a living intelligence mesh.",
    mood: "from-violet-900/40 to-cyan-950/30",
    accent: "text-cyan-300",
  },
  {
    num: "04",
    title: "Workflows execute automatically",
    body: "Visual neural pipelines trigger, branch, and complete — with cinematic replay of every decision.",
    mood: "from-cyan-950/40 to-[#050816]",
    accent: "text-emerald-300",
  },
  {
    num: "05",
    title: "Analytics evolve in realtime",
    body: "Efficiency metrics, ROI, and operational intelligence update as your workforce operates autonomously.",
    mood: "from-emerald-950/30 to-[#050816]",
    accent: "text-emerald-400",
  },
  {
    num: "06",
    title: "Efficiency compounds",
    body: "Hours reclaimed. Costs reduced. Resolution times collapse. Your team focuses on strategy, not triage.",
    mood: "from-violet-950/50 to-emerald-950/20",
    accent: "text-white",
  },
  {
    num: "07",
    title: "The future of AI operations",
    body: "FlowPilot X — the autonomous AI operating system enterprises have been waiting for.",
    mood: "from-violet-600/20 via-cyan-500/10 to-[#050816]",
    accent: "gradient-text",
    cta: true,
  },
];

export function ProductStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-8">
      <div className="sticky top-20 z-20 hidden lg:flex justify-center mb-16 pointer-events-none">
        <div className="h-1 w-48 rounded-full bg-white/5 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: progress }} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-[min(100vh,720px)]">
        {CHAPTERS.map((ch, i) => (
          <motion.article
            key={ch.num}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ ...motionTokens.slow, delay: 0.05 }}
            className={`relative min-h-[70vh] flex flex-col justify-center py-20 rounded-3xl bg-gradient-to-b ${ch.mood} px-8 sm:px-16 border border-white/[0.04]`}
          >
            <span className={`text-[10px] uppercase tracking-[0.5em] ${ch.accent} mb-6`}>
              Chapter {ch.num}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl">
              {ch.title}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-secondary max-w-xl leading-relaxed">{ch.body}</p>

            {i === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 aspect-[2/1] rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.3),transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 flex-wrap p-8">
                  {["🎧", "📊", "⚡", "📈", "✉️"].map((e, j) => (
                    <motion.span
                      key={e}
                      className="text-4xl"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2 + j * 0.3, delay: j * 0.2 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {ch.cta && (
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard/command-center"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:scale-[1.02] transition-transform"
                >
                  Enter Neural Command Center <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.article>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <ScenarioEngine variant="hero" />
      </div>
    </section>
  );
}
