"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="holo-panel rounded-2xl p-12 text-center relative overflow-hidden"
    >
      <motion.div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#06B6D4]/20"
        animate={{ boxShadow: ["0 0 40px rgba(124,58,237,0.3)", "0 0 60px rgba(6,182,212,0.4)", "0 0 40px rgba(124,58,237,0.3)"] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Sparkles className="h-10 w-10 text-[#a78bfa]" />
      </motion.div>
      <h3 className="font-display text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-secondary max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#7C3AED]"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  );
}
