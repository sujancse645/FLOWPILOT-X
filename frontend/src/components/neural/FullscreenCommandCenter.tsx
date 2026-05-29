"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Brain } from "lucide-react";
import { NeuralCommandCenter } from "./NeuralCommandCenter";
import { ReasoningTimeline } from "./ReasoningTimeline";
import { ScenarioEngine } from "@/components/demo/ScenarioEngine";
import { useAutonomous } from "@/providers/AutonomousProvider";
import { useScenarioEngine } from "@/providers/ScenarioEngineProvider";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";

export function FullscreenCommandCenter() {
  const [immersive, setImmersive] = useState(true);
  const { logs, demoRunning } = useAutonomous();
  const { timeline, activeLink } = useScenarioEngine();

  const reasoningSteps =
    timeline.length > 0
      ? timeline
      : demoRunning
        ? logs.map((l, i) => ({
            id: l.id,
            phase: (["memory", "sentiment", "route", "collab", "execute"] as const)[i % 5],
            message: l.message,
            agent: l.agent,
            active: i === 0,
            done: i > 0,
          }))
        : [];

  return (
    <div
      className={
        immersive
          ? "fixed inset-0 z-[100] flex flex-col bg-[#030510]"
          : "relative space-y-6"
      }
    >
      {immersive && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.12),transparent_40%)]" />
          <div className="scanline-overlay pointer-events-none" />
        </>
      )}

      <header
        className={`relative z-20 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 ${
          immersive ? "border-b border-white/5 bg-black/40 backdrop-blur-xl" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            <Brain className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-white">Neural Command Center</h1>
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/90">Autonomous AI Operating System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AutonomousToggle />
          <button
            onClick={() => setImmersive(!immersive)}
            className="p-2.5 rounded-xl border border-white/10 text-muted hover:text-white hover:border-violet-500/40 transition-all"
            aria-label={immersive ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {immersive ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <div
        className={`relative z-10 flex-1 grid gap-4 px-4 sm:px-6 pb-4 min-h-0 ${
          immersive ? "lg:grid-cols-[1fr_340px] lg:grid-rows-[1fr_auto]" : "grid-cols-1"
        }`}
      >
        <div className={immersive ? "min-h-[50vh] lg:min-h-0 lg:row-span-2" : ""}>
          <NeuralCommandCenter
            fullscreen={immersive}
            height={immersive ? undefined : 560}
            showControls
            activeLink={activeLink}
            className="h-full"
          />
        </div>

        <AnimatePresence>
          {(reasoningSteps.length > 0 || immersive) && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col gap-4 overflow-hidden ${immersive ? "max-h-[40vh] lg:max-h-none" : ""}`}
            >
              {reasoningSteps.length > 0 && (
                <div className="holo-panel depth-layer rounded-2xl p-4 overflow-y-auto flex-1 border border-white/10">
                  <ReasoningTimeline steps={reasoningSteps} title="Active cognition" compact />
                </div>
              )}
              <div className="holo-panel depth-layer rounded-2xl p-4 overflow-y-auto max-h-[280px] lg:max-h-none border border-white/10">
                <ScenarioEngine variant="panel" compact />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {immersive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-[#030510] to-transparent z-10"
          aria-hidden
        />
      )}
    </div>
  );
}
