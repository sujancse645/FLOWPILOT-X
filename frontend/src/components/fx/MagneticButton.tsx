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
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-medium text-sm overflow-hidden transition-all duration-300",
    variant === "primary"
      ? "bg-text-primary text-background hover:scale-[1.02]"
      : "bg-background-secondary border border-white/10 text-text-primary hover:bg-white/5",
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
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return <button type="button" onClick={onClick} className="border-0 bg-transparent p-0 cursor-pointer">{inner}</button>;
}
