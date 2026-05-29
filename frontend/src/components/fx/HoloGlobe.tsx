"use client";

import { motion } from "framer-motion";

const NODES = 12;

export function HoloGlobe() {
  return (
    <div className="relative h-full min-h-[260px] flex items-center justify-center">
      <motion.div
        className="absolute h-52 w-52 rounded-full border-2 border-violet-400/50"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(167,139,250,0.5), rgba(139,92,246,0.15) 50%, transparent 70%)",
          boxShadow: "inset 0 0 80px rgba(167,139,250,0.35), 0 0 100px rgba(34,211,238,0.35)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-60 w-60 rounded-full border-2 border-dashed border-cyan-400/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {Array.from({ length: NODES }).map((_, i) => {
        const angle = (i / NODES) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 42;
        const y = 50 + Math.sin(angle) * 42;
        return (
          <motion.div
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full bg-cyan-300"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              boxShadow: "0 0 16px #67e8f9, 0 0 32px #22d3ee",
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.5, 1] }}
            transition={{ duration: 2, delay: i * 0.12, repeat: Infinity }}
          />
        );
      })}
      <motion.div
        className="relative z-10 text-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-4xl font-display font-bold gradient-text">AI CORE</div>
        <p className="text-[11px] text-cyan-300 mt-2 tracking-[0.35em] uppercase font-semibold shadow-[0_0_20px_rgba(34,211,238,0.5)]">
          Neural Sync Active
        </p>
      </motion.div>
    </div>
  );
}
