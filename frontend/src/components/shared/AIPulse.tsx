"use client";

import { motion } from "framer-motion";

export function AIPulse({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-2 w-2", md: "h-3 w-3", lg: "h-4 w-4" };
  return (
    <span className="relative inline-flex">
      <motion.span
        className={`absolute inline-flex rounded-full bg-emerald-400 opacity-75 ${sizes[size]}`}
        animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className={`relative inline-flex rounded-full bg-emerald-500 ${sizes[size]}`} />
    </span>
  );
}
