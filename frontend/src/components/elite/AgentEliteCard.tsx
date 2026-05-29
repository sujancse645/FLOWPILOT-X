"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentEliteCardProps {
  name: string;
  type: string;
  avatar: string;
  status: string;
  intelligence: number;
  tasks: number;
  selected?: boolean;
  onClick?: () => void;
}

const statusVariant: Record<string, "success" | "warning" | "info" | "purple"> = {
  active: "success",
  idle: "info",
  thinking: "warning",
};

export function AgentEliteCard({
  name, type, avatar, status, intelligence, tasks, selected, onClick,
}: AgentEliteCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full text-left holo-panel rounded-2xl p-5 overflow-hidden transition-shadow duration-300",
        selected && "ring-2 ring-[#06B6D4] shadow-[0_0_50px_rgba(6,182,212,0.35)]"
      )}
    >
      {status === "thinking" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#7C3AED]/20 blur-2xl" />
      <div className="flex justify-between items-start relative z-10">
        <motion.span
          className="text-4xl"
          animate={status === "active" ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {avatar}
        </motion.span>
        <Badge variant={statusVariant[status] || "info"}>{status}</Badge>
      </div>
      <h3 className="mt-4 font-semibold text-white text-lg relative z-10">{name}</h3>
      <p className="text-xs text-[#8B5CF6] capitalize relative z-10">{type} agent</p>

      {/* Mini radar */}
      <div className="mt-4 flex items-center gap-3 relative z-10">
        <div className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15" fill="none"
              stroke="url(#agentGrad)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${intelligence} 100`}
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <defs>
              <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{intelligence}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted">Intelligence</p>
          <div className="h-1.5 mt-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
              initial={{ width: 0 }}
              animate={{ width: `${intelligence}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-xs text-muted mt-2">{tasks} active tasks</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent" />
    </motion.button>
  );
}
