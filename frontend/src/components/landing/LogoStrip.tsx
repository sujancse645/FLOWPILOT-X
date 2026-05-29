"use client";

import { motion } from "framer-motion";

const BRANDS = ["NexusAI", "Orbital", "Synapse", "Vertex Labs", "Quantum Ops", "Helix Corp", "Axiom", "NeuralForge"];

export function LogoStrip() {
  return (
    <section className="py-16 border-y border-white/5">
      <p className="text-center text-[10px] uppercase tracking-[0.35em] text-muted mb-10">
        Trusted by AI-first teams worldwide
      </p>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...BRANDS, ...BRANDS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl font-display font-semibold text-white/20 hover:text-white/40 transition-colors"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
