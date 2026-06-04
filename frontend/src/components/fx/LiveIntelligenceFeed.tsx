"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { localStore } from "@/lib/data/data-service";

const STREAM_LINES = [
  "Workflow AI routing task packet → Finance AI",
  "Memory graph sync: 3 new semantic nodes",
  "Support AI cognition spike — urgency detected",
  "Analytics AI updating efficiency forecast",
  "Autonomous orchestration cycle complete",
];

export function LiveIntelligenceFeed({ max = 5, className = "" }: { max?: number; className?: string }) {
  const { activities } = useSocket();
  const [lines, setLines] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const seed = activities.slice(0, max).map((a, i) => ({
      id: `sock-${i}`,
      text: `${a.agent} · ${a.action}`,
    }));
    if (seed.length) setTimeout(() => setLines(seed), 0);
  }, [activities, max]);

  useEffect(() => {
    const iv = setInterval(() => {
      const acts = localStore.getActivities();
      if (acts[0]) {
        setLines((prev) => [
          { id: acts[0].id, text: `${acts[0].agent_name || "System"} · ${acts[0].message}` },
          ...prev.slice(0, max - 1),
        ]);
        return;
      }
      const text = STREAM_LINES[Math.floor(Math.random() * STREAM_LINES.length)];
      setLines((prev) => [{ id: `${Date.now()}`, text }, ...prev.slice(0, max - 1)]);
    }, 4000);
    return () => clearInterval(iv);
  }, [max]);

  return (
    <div className={`font-mono text-[11px] space-y-1.5 ${className}`}>
      <p className="text-[9px] uppercase tracking-[0.35em] text-cyan-400/80 mb-2">Intelligence stream</p>
      <AnimatePresence mode="popLayout">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            layout
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-secondary border-l border-violet-500/40 pl-2 py-0.5 truncate"
          >
            <span className="text-violet-400/90">›</span> {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
