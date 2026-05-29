"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing neural core...",
  "Loading AI agent matrix...",
  "Syncing workflow engines...",
  "Calibrating holographic UI...",
  "FlowPilot X online.",
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [line, setLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (line >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 600);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLine((l) => l + 1), 450);
    return () => clearTimeout(t);
  }, [line, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030014]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.2),transparent_60%)]" />
          <motion.div
            className="relative h-24 w-24 rounded-full border-2 border-[#7C3AED]/50"
            animate={{ rotate: 360, boxShadow: ["0 0 40px rgba(124,58,237,0.3)", "0 0 80px rgba(6,182,212,0.4)", "0 0 40px rgba(124,58,237,0.3)"] }}
            transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] opacity-80 breathe" />
            <div className="absolute inset-0 flex items-center justify-center font-display text-xs font-bold text-white">
              FPX
            </div>
          </motion.div>
          <motion.p
            className="mt-8 font-display text-xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            FlowPilot X
          </motion.p>
          <div className="mt-6 h-24 w-80 font-mono text-xs text-[#64748b] space-y-1">
            {LINES.slice(0, line).map((l, i) => (
              <motion.div key={l} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <span className="text-emerald-400">▸</span> {l}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
              initial={{ width: "0%" }}
              animate={{ width: `${(line / LINES.length) * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
