"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/fx/NeuralBackground";
import { AuroraBackground } from "@/components/fx/AuroraBackground";

export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      <NeuralBackground intensity={1.2} />
      <AuroraBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.2),transparent_50%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center max-w-md"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-semibold">FlowPilot X</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-secondary">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glow-border w-full max-w-md rounded-3xl p-[1px]"
        >
          <div className="holo-panel rounded-3xl p-2 backdrop-blur-xl">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
