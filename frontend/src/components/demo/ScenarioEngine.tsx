"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Zap, Radio } from "lucide-react";
import { ReasoningTimeline, type ReasoningStep } from "@/components/neural/ReasoningTimeline";
import { useScenarioEngine } from "@/providers/ScenarioEngineProvider";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const SCENARIOS = [
  { id: "complaint" as const, label: "Customer complaint", color: "from-red-500/20 to-violet-500/20" },
  { id: "invoice" as const, label: "Invoice issue", color: "from-amber-500/20 to-cyan-500/20" },
  { id: "lead" as const, label: "Sales lead", color: "from-emerald-500/20 to-violet-500/20" },
  { id: "hr" as const, label: "HR screening", color: "from-cyan-500/20 to-violet-500/20" },
  { id: "escalation" as const, label: "Support escalation", color: "from-orange-500/20 to-red-500/20" },
];

export function ScenarioEngine({ variant = "panel", compact = false }: { variant?: "panel" | "hero"; compact?: boolean }) {
  const { running, runScenario, metrics, timeline } = useScenarioEngine();
  const [localSteps, setLocalSteps] = useState<ReasoningStep[]>([]);

  const handleRun = useCallback(
    async (id: (typeof SCENARIOS)[0]["id"]) => {
      setLocalSteps([]);
      await runScenario(id, (step) => {
        setLocalSteps((prev) => {
          const done = prev.map((s) => ({ ...s, active: false, done: true }));
          return [...done, { ...step, active: true, done: false }];
        });
      });
      setLocalSteps((prev) => prev.map((s) => ({ ...s, active: false, done: true })));
    },
    [runScenario]
  );

  const steps = timeline.length > 0 ? timeline : localSteps;
  const isHero = variant === "hero";

  return (
    <div className={isHero || compact ? "" : "holo-panel depth-layer rounded-3xl p-6 sm:p-8"}>
      {!compact && (
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 flex items-center gap-2">
            <Radio className="h-3 w-3 animate-pulse" /> Live AI workforce
          </p>
          <h2 className={`font-display font-bold text-white mt-2 ${isHero ? "text-2xl" : "text-xl sm:text-2xl"}`}>
            Run Live AI Scenario
          </h2>
        </div>
        {metrics && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4 text-center"
          >
            <div>
              <p className="text-[10px] text-muted uppercase">Time saved</p>
              <p className="font-display text-xl text-emerald-400">
                <AnimatedCounter value={metrics.timeSaved} suffix="m" />
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted uppercase">ROI</p>
              <p className="font-display text-xl text-cyan-400">
                $<AnimatedCounter value={metrics.roi} />
              </p>
            </div>
          </motion.div>
        )}
      </div>
      )}

      {compact && (
        <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 mb-3">Run live scenario</p>
      )}

      <div className={`grid gap-3 ${isHero ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : compact ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {SCENARIOS.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => handleRun(s.id)}
            disabled={!!running}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 p-4 text-left transition-all disabled:opacity-50 bg-gradient-to-br ${s.color} hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]`}
          >
            <h3 className="text-sm font-semibold text-white">{s.label}</h3>
            <span className="mt-3 flex items-center gap-1.5 text-xs text-violet-300">
              {running === s.id ? (
                <>
                  <Zap className="h-3.5 w-3.5 animate-pulse" /> Executing...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Launch
                </>
              )}
            </span>
            {running === s.id && (
              <motion.div
                className="absolute inset-0 bg-violet-500/10"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl"
          >
            <ReasoningTimeline steps={steps} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
