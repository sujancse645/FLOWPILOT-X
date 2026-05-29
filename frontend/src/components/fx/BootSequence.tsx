"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Neural Core Initializing",
  "AI Agents Online",
  "Cognition Engine Active",
  "Memory Synchronization",
  "Workflow Engine Ready",
  "Autonomous Intelligence Active",
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 500);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050816]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.35),transparent_65%)]" />
          <motion.div
            className="relative h-28 w-28 rounded-full border-2 border-violet-400/60"
            animate={{
              rotate: 360,
              boxShadow: [
                "0 0 60px rgba(124,58,237,0.5)",
                "0 0 100px rgba(6,182,212,0.5)",
                "0 0 60px rgba(124,58,237,0.5)",
              ],
            }}
            transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
          >
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] breathe" />
            <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-white">
              FPX
            </div>
          </motion.div>
          <motion.p
            className="mt-10 font-display text-2xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            FlowPilot X
          </motion.p>
          <p className="mt-2 text-xs text-cyan-300/80 tracking-[0.3em] uppercase">Autonomous AI Operating System</p>
          <div className="mt-8 w-80 space-y-2 font-mono text-xs">
            {STEPS.slice(0, step).map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-secondary"
              >
                <span className="text-emerald-400">▸</span>
                {s}
                {i === step - 1 && <span className="ml-auto text-violet-400 animate-pulse">...</span>}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#8B5CF6]"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
