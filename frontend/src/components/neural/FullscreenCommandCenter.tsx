"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { NeuralCommandCenter } from "./NeuralCommandCenter";
import { ReasoningTimeline } from "./ReasoningTimeline";
import { ScenarioEngine } from "@/components/demo/ScenarioEngine";
import { LiveIntelligenceFeed } from "@/components/fx/LiveIntelligenceFeed";
import { SpatialModule } from "@/components/fx/SpatialModule";
import { useAutonomous } from "@/providers/AutonomousProvider";
import { useScenarioEngine } from "@/providers/ScenarioEngineProvider";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { motion as motionTokens } from "@/lib/motion";

export function FullscreenCommandCenter() {
  const { logs, demoRunning } = useAutonomous();
  const { timeline, activeLink, metrics, running, runInvestorDemo } = useScenarioEngine();

  const reasoningSteps =
    timeline.length > 0
      ? timeline
      : demoRunning
        ? logs.map((l, i) => ({
            id: l.id,
            phase: (["thinking", "memory", "context", "route", "collab", "execute", "resolve"] as const)[
              i % 7
            ],
            message: l.message,
            agent: l.agent,
            active: i === 0,
            done: i > 0,
          }))
        : [];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#020408] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(6,182,212,0.08),transparent_45%)]" />
      <div className="neural-grid-overlay pointer-events-none" />
      <div className="scanline-overlay pointer-events-none opacity-30" />

      {/* HUD header */}
      <header className="relative z-30 flex items-center justify-between gap-4 px-5 py-3 border-b border-white/[0.06] bg-black/50 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500"
          >
            <Brain className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h1 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
              Neural Command Center
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/80">Autonomous AI OS</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-center">
          <div>
            <p className="text-[9px] text-muted uppercase tracking-wider">Agents</p>
            <p className="font-display text-lg text-white">8</p>
          </div>
          <div>
            <p className="text-[9px] text-muted uppercase tracking-wider">Live tasks</p>
            <p className="font-display text-lg text-emerald-400">
              <AnimatedCounter value={running ? 12 : 7} />
            </p>
          </div>
          {metrics && (
            <div>
              <p className="text-[9px] text-muted uppercase tracking-wider">ROI</p>
              <p className="font-display text-lg text-cyan-400">${metrics.roi}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <AutonomousToggle />
        </div>
      </header>

      {/* Main intelligence world */}
      <div className="relative z-20 flex-1 grid lg:grid-cols-[1fr_300px] min-h-0">
        <div className="relative min-h-[45vh] lg:min-h-0 p-3 lg:p-4">
          <NeuralCommandCenter
            fullscreen
            showControls
            activeLink={activeLink}
            hideFooterPanels
            className="h-full"
          />

          {/* Floating investor demo CTA */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...motionTokens.normal }}
          >
            <button
              onClick={() => runInvestorDemo()}
              disabled={!!running}
              className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl px-6 py-3.5 text-sm font-semibold text-white hover:border-violet-500/50 hover:shadow-[0_0_50px_rgba(124,58,237,0.25)] transition-all disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-cyan-400 group-hover:animate-pulse" />
              {running ? "Autonomous demo running..." : "Run Autonomous AI Demo"}
            </button>
          </motion.div>
        </div>

        {/* Right cognition column — no card grid */}
        <aside className="hidden lg:flex flex-col gap-3 p-3 pl-0 border-l border-white/[0.05] min-h-0 overflow-hidden">
          <SpatialModule className="p-4 flex-1 min-h-0 overflow-y-auto" delay={0.1}>
            {reasoningSteps.length > 0 ? (
              <ReasoningTimeline steps={reasoningSteps} title="Cognition stream" compact />
            ) : (
              <div className="text-sm text-muted py-8 text-center">
                Launch a scenario to visualize AI reasoning
              </div>
            )}
          </SpatialModule>

          <SpatialModule className="p-4 max-h-[140px] overflow-hidden" delay={0.15}>
            <LiveIntelligenceFeed max={4} />
          </SpatialModule>

          <SpatialModule className="p-4 overflow-y-auto" delay={0.2}>
            <ScenarioEngine variant="panel" compact />
          </SpatialModule>
        </aside>
      </div>

      {/* Mobile bottom cognition drawer */}
      <AnimatePresence>
        {reasoningSteps.length > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="lg:hidden relative z-30 border-t border-white/10 bg-black/80 backdrop-blur-xl p-4 max-h-[35vh] overflow-y-auto"
          >
            <ReasoningTimeline steps={reasoningSteps} title="Cognition" compact />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#020408] to-transparent pointer-events-none z-10" />
    </div>
  );
}
