"use client";

import { motion } from "framer-motion";
import { GitBranch, Zap, Mail } from "lucide-react";

const cards = [
  { icon: Zap, label: "Trigger", x: "8%", y: "20%", delay: 0 },
  { icon: GitBranch, label: "AI Route", x: "42%", y: "8%", delay: 0.2 },
  { icon: Mail, label: "Execute", x: "72%", y: "35%", delay: 0.4 },
];

export function FloatingWorkflowPreview() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block" aria-hidden>
      {cards.map((c) => (
        <motion.div
          key={c.label}
          className="absolute glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-white border border-white/10 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
          style={{ left: c.x, top: c.y }}
          animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, delay: c.delay, repeat: Infinity }}
        >
          <c.icon className="h-3.5 w-3.5 text-[#06B6D4]" />
          {c.label}
        </motion.div>
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.path
          d="M 120 80 Q 300 40 450 120"
          fill="none"
          stroke="url(#wfLine)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="wfLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
