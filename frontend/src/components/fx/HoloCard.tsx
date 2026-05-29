"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
  float?: boolean;
}

export function HoloCard({ children, className, glow, delay = 0, float: shouldFloat }: HoloCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className={cn(
        "holo-panel rounded-2xl p-6 hover-lift relative overflow-hidden group",
        glow && "glow-border",
        shouldFloat && "float",
        className
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#06B6D4]/10" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
