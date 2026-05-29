"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAutonomous } from "@/providers/AutonomousProvider";

export function AutonomousToggle() {
  const { autonomous, setAutonomous } = useAutonomous();

  return (
    <button
      onClick={() => setAutonomous(!autonomous)}
      className={`relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all border ${
        autonomous
          ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.25)]"
          : "glass border-white/10 text-muted hover:text-white"
      }`}
    >
      {autonomous && (
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      <Zap className={`h-3.5 w-3.5 relative z-10 ${autonomous ? "text-emerald-400" : ""}`} />
      <span className="relative z-10 hidden sm:inline">Autonomous</span>
    </button>
  );
}
