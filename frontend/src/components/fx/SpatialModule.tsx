"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motion as motionTokens } from "@/lib/motion";

export function SpatialModule({
  children,
  className,
  delay = 0,
  float = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  float?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ...motionTokens.normal, delay }}
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]",
        float && "float-ui",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
