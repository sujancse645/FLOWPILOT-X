"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { HoloGlobe } from "@/components/fx/HoloGlobe";
import { FloatingWorkflowPreview } from "@/components/elite/FloatingWorkflowPreview";

const WORDS = ["Autonomous", "AI", "Workforce", "Platform"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <div className="hero-spotlight" aria-hidden />
      <FloatingWorkflowPreview />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-2 text-sm backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.3)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-90" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          </span>
          <span className="gradient-text-purple font-semibold">Neural Workforce Online</span>
        </motion.div>

        <h1 className="font-display text-center text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl leading-[1.05] drop-shadow-[0_4px_40px_rgba(139,92,246,0.25)]">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 100 }}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              <span className={i < 2 ? "gradient-text" : "text-white"}>{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg sm:text-xl leading-relaxed text-secondary font-medium"
        >
          Deploy a living AI operating system — agents that collaborate, workflows that execute,
          intelligence that never sleeps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/sign-up">
            Start Building <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/dashboard" variant="ghost">
            <Play className="h-4 w-4" /> Enter Command Center
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, type: "spring" }}
          className="mt-20 perspective-[1200px]"
        >
          <div className="glow-border rounded-3xl p-[1.5px] mx-auto max-w-5xl shadow-[0_0_80px_rgba(139,92,246,0.35)]">
            <div className="holo-panel rounded-3xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/15 px-5 py-3 bg-gradient-to-r from-violet-950/60 to-cyan-950/40">
                <div className="flex gap-1.5">
                  {["#f87171", "#facc15", "#4ade80"].map((c) => (
                    <div key={c} className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-[11px] text-violet-200 tracking-widest uppercase ml-2 font-medium">
                  FlowPilot X — Holographic Command
                </span>
              </div>
              <div className="grid lg:grid-cols-2 gap-0 min-h-[340px] bg-gradient-to-br from-violet-950/30 via-[#0f0a2e] to-cyan-950/20">
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10">
                  <HoloGlobe />
                </div>
                <div className="p-6 grid grid-cols-2 gap-3 content-center">
                  {[
                    { label: "Agents", value: "8", color: "#c4b5fd", glow: "#8b5cf6" },
                    { label: "Workflows", value: "24", color: "#67e8f9", glow: "#22d3ee" },
                    { label: "Tasks", value: "1.8K", color: "#e9d5ff", glow: "#a78bfa" },
                    { label: "Accuracy", value: "97%", color: "#6ee7b7", glow: "#34d399" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      className="glass rounded-xl p-4 hover-lift border border-white/10"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-violet-200/90 font-semibold">{s.label}</p>
                      <p
                        className="text-3xl font-bold mt-1 stat-value"
                        style={{ color: s.color, textShadow: `0 0 40px ${s.glow}` }}
                      >
                        {s.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-violet-400/50 flex justify-center pt-2 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <motion.div
            className="h-2 w-1.5 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
