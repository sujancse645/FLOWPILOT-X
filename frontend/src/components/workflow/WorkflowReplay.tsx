"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkflowExecutionRecord } from "@/lib/data/types";
import { GlowPanel } from "@/components/elite/GlowPanel";

export function WorkflowReplay({ execution }: { execution: WorkflowExecutionRecord | null }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!execution) return;
    setTimeout(() => setStepIndex(0), 0);
    const iv = setInterval(() => {
      setStepIndex((i) => {
        if (i >= execution.timeline.length - 1) {
          clearInterval(iv);
          return i;
        }
        return i + 1;
      });
    }, 1400);
    return () => clearInterval(iv);
  }, [execution]);

  if (!execution) return null;

  return (
    <GlowPanel glow className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-semibold text-white">Execution Replay</h3>
        <span className="text-[10px] text-emerald-400 uppercase tracking-wider">Cinematic trace</span>
      </div>
      <div className="space-y-3">
        {execution.timeline.map((step, i) => (
          <motion.div
            key={step.node_id + i}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: i <= stepIndex ? 1 : 0.25,
              scale: i === stepIndex ? 1.02 : 1,
            }}
            className={`relative rounded-xl border px-4 py-3 ${
              i <= stepIndex ? "border-violet-500/40 bg-violet-500/10" : "border-white/5 bg-white/[0.02]"
            }`}
          >
            {i === stepIndex && (
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-violet-500 to-cyan-400"
                layoutId="replay-indicator"
              />
            )}
            <div className="flex justify-between items-start gap-4 pl-2">
              <div>
                <p className="text-sm font-medium text-white">{step.label}</p>
                {step.reasoning && <p className="text-xs text-muted mt-1">{step.reasoning}</p>}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider shrink-0 ${
                  step.status === "completed" ? "text-emerald-400" : step.status === "running" ? "text-amber-400" : "text-muted"
                }`}
              >
                {step.status}
              </span>
            </div>
            {i < execution.timeline.length - 1 && i <= stepIndex && (
              <div className="absolute -bottom-3 left-6 h-3 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {stepIndex >= execution.timeline.length - 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-emerald-400"
          >
            Workflow completed · Intelligence path verified
          </motion.p>
        )}
      </AnimatePresence>
    </GlowPanel>
  );
}
