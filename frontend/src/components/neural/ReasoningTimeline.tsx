"use client";

import { motion, AnimatePresence } from "framer-motion";
import { reasoningPhases } from "@/lib/motion";

export type ReasoningStep = {
  id: string;
  phase: (typeof reasoningPhases)[number]["key"] | string;
  message: string;
  agent?: string;
  active?: boolean;
  done?: boolean;
};

export function ReasoningTimeline({
  steps,
  title = "Cognition stream",
  compact = false,
}: {
  steps: ReasoningStep[];
  title?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400 font-semibold">{title}</p>
      <div className="relative">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-cyan-400/40 to-transparent" />
        <AnimatePresence mode="popLayout">
          {steps.map((step, i) => {
            const meta =
              reasoningPhases.find((p) => p.key === step.phase) ||
              reasoningPhases[i % reasoningPhases.length];
            return (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                className={`relative flex gap-3 pl-0 ${compact ? "py-1.5" : "py-2.5"}`}
              >
                <motion.div
                  className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    step.active
                      ? "bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(124,58,237,0.8)]"
                      : step.done
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-white/5 text-muted border border-white/10"
                  }`}
                  animate={step.active ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ repeat: step.active ? Infinity : 0, duration: 1.2 }}
                >
                  {step.done ? "✓" : meta.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] uppercase tracking-wider ${step.active ? "text-violet-300" : "text-muted"}`}>
                    {meta.label}
                  </p>
                  <p className={`text-sm ${step.active ? "text-white" : "text-secondary"} ${compact ? "text-xs" : ""}`}>
                    {step.agent && <span className="text-violet-400">{step.agent} · </span>}
                    {step.message}
                  </p>
                </div>
                {step.active && (
                  <motion.span
                    className="text-[10px] text-cyan-400 shrink-0"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    processing
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
