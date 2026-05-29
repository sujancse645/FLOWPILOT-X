"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export function MagneticButton({ children, href, onClick, variant = "primary", className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-sm overflow-hidden transition-shadow duration-300",
    variant === "primary"
      ? "bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 text-white shadow-[0_0_50px_rgba(139,92,246,0.55)] hover:shadow-[0_0_70px_rgba(34,211,238,0.5)] border border-white/20"
      : "glass text-white border-2 border-violet-400/40 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]",
    className
  );

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={base}
      whileTap={{ scale: 0.97 }}
    >
      <span className="absolute inset-0 shimmer opacity-40" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return <button type="button" onClick={onClick} className="border-0 bg-transparent p-0 cursor-pointer">{inner}</button>;
}
