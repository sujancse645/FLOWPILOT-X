"use client";

import { motion } from "framer-motion";

export function AIPulse({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-2 w-2", md: "h-3 w-3", lg: "h-4 w-4" };
  return (
    <span className="relative inline-flex">
      <motion.span
        className={`absolute inline-flex rounded-full bg-cyan-400 opacity-50 ${sizes[size]}`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className={`relative inline-flex rounded-full bg-cyan-500 ${sizes[size]}`} />
    </span>
  );
}
