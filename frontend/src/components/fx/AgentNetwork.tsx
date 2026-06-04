"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AGENTS = [
  { id: "support", label: "Support", emoji: "🎧", x: 20, y: 30 },
  { id: "sales", label: "Sales", emoji: "💼", x: 75, y: 25 },
  { id: "finance", label: "Finance", emoji: "📊", x: 80, y: 65 },
  { id: "workflow", label: "Workflow", emoji: "⚡", x: 50, y: 50 },
  { id: "analytics", label: "Analytics", emoji: "📈", x: 25, y: 70 },
  { id: "research", label: "Research", emoji: "🔬", x: 55, y: 15 },
];

const LINKS = [
  [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [0, 4], [1, 2],
];

export function AgentNetwork({ activeId }: { activeId?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pulse, setPulse] = useState(0);
  const [packets, setPackets] = useState<{ link: number; t: number }[]>([]);

  useEffect(() => {
    const iv = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
      if (Math.random() > 0.6) {
        setPackets((prev) => [...prev.slice(-4), { link: Math.floor(Math.random() * LINKS.length), t: 0 }]);
      }
    }, 800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const anim = setInterval(() => {
      setPackets((prev) =>
        prev.map((p) => ({ ...p, t: p.t + 0.05 })).filter((p) => p.t <= 1)
      );
    }, 50);
    return () => clearInterval(anim);
  }, []);

  return (
    <div className="relative aspect-[16/10] w-full min-h-[320px] rounded-2xl overflow-hidden holo-panel">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]" />
      <svg ref={svgRef} className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {LINKS.map(([a, b], i) => {
          const A = AGENTS[a];
          const B = AGENTS[b];
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#link-grad)"
              strokeWidth="0.3"
              opacity={0.4 + Math.sin(pulse * 0.1 + i) * 0.2}
            />
          );
        })}
        {packets.map((p, i) => {
          const [a, b] = LINKS[p.link];
          const A = AGENTS[a];
          const B = AGENTS[b];
          const x = A.x + (B.x - A.x) * p.t;
          const y = A.y + (B.y - A.y) * p.t;
          return (
            <circle key={i} cx={x} cy={y} r="0.8" fill="#06B6D4" opacity={1 - p.t}>
              <animate attributeName="r" values="0.5;1.2;0.5" dur="0.5s" repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>

      {AGENTS.map((agent) => (
        <motion.div
          key={agent.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
          animate={{
            scale: activeId === agent.id ? [1, 1.15, 1] : [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className={`relative flex flex-col items-center gap-1 rounded-2xl px-3 py-2 glass transition-all ${
              activeId === agent.id ? "ring-2 ring-[#06B6D4] glow-cyan" : ""
            }`}
          >
            {activeId === agent.id && (
              <motion.div
                className="absolute -inset-2 rounded-2xl border border-[#7C3AED]/50"
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <span className="text-2xl relative z-10">{agent.emoji}</span>
            <span className="text-[10px] font-medium text-white/90 relative z-10">{agent.label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ai-pulse relative z-10" />
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#64748b]">
        Live Agent Neural Mesh
      </p>
    </div>
  );
}
