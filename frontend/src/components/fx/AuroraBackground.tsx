"use client";

import { motion } from "framer-motion";

export function AuroraBackground({ intensity = 1 }: { intensity?: number }) {
  const m = intensity;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="aurora-blob absolute -top-[30%] left-[5%] h-[85vh] w-[75vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(124,58,237,0.2) 40%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.9 * m,
        }}
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob absolute top-[15%] -right-[15%] h-[65vh] w-[65vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(6,182,212,0.15) 45%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.85 * m,
        }}
        animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="aurora-blob absolute bottom-[-10%] left-[25%] h-[55vh] w-[55vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 65%)",
          filter: "blur(75px)",
          opacity: 0.75 * m,
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(167,139,250,0.15), transparent 60%)",
        }}
      />
    </div>
  );
}
