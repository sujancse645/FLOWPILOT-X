"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { Zap } from "lucide-react";

const FALLBACK = [
  { agent: "Support AI", action: "resolved ticket #4521", timestamp: "" },
  { agent: "Workflow AI", action: "executing lead nurture pipeline", timestamp: "" },
  { agent: "Finance AI", action: "processed batch of 12 invoices", timestamp: "" },
];

export function ActivityStream({ max = 6 }: { max?: number }) {
  const { activities, connected } = useSocket();
  const items = activities.length > 0 ? activities : FALLBACK;

  return (
    <div className="holo-panel rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#7C3AED]" />
          <span className="text-sm font-semibold text-white">Operational Intelligence</span>
        </div>
        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider ${connected ? "text-emerald-400" : "text-amber-400"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-400 ai-pulse" : "bg-amber-400"}`} />
          {connected ? "Live" : "Standby"}
        </span>
      </div>
      <ul className="flex-1 space-y-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {items.slice(0, max).map((item, i) => (
            <motion.li
              key={`${item.agent}-${item.action}-${i}`}
              layout
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs"
            >
              <span className="h-full w-0.5 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#06B6D4] shrink-0" />
              <div>
                <span className="text-[#a78bfa] font-medium">{item.agent}</span>
                <span className="text-[#94a3b8]"> {item.action}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
