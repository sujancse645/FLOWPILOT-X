"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const offset = direction === "up" ? { y: 48 } : direction === "left" ? { x: -48 } : { x: 48 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
