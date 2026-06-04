"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Play, Pause, Activity } from "lucide-react";
import { useAutonomous } from "@/providers/AutonomousProvider";
import { useSocket } from "@/hooks/useSocket";

export type NeuralAgent = {
  id: string;
  label: string;
  emoji: string;
  x: number;
  y: number;
  state: "idle" | "active" | "thinking" | "executing";
  intelligence: number;
};

const DEFAULT_AGENTS: NeuralAgent[] = [
  { id: "support", label: "Support AI", emoji: "🎧", x: 0.18, y: 0.35, state: "active", intelligence: 94 },
  { id: "sales", label: "Sales AI", emoji: "💼", x: 0.82, y: 0.28, state: "idle", intelligence: 91 },
  { id: "finance", label: "Finance AI", emoji: "📊", x: 0.78, y: 0.72, state: "idle", intelligence: 96 },
  { id: "workflow", label: "Workflow AI", emoji: "⚡", x: 0.5, y: 0.5, state: "executing", intelligence: 95 },
  { id: "analytics", label: "Analytics AI", emoji: "📈", x: 0.22, y: 0.72, state: "thinking", intelligence: 97 },
  { id: "email", label: "Email AI", emoji: "✉️", x: 0.5, y: 0.18, state: "active", intelligence: 89 },
];

const LINKS: [number, number][] = [
  [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [0, 4], [1, 2], [5, 1],
];

interface Particle {
  linkIdx: number;
  t: number;
  speed: number;
}

interface NeuralCommandCenterProps {
  height?: number;
  showControls?: boolean;
  onAgentSelect?: (id: string) => void;
  activeAgentId?: string;
  fullscreen?: boolean;
  activeLink?: [number, number] | null;
  className?: string;
  hideFooterPanels?: boolean;
}

export function NeuralCommandCenter({
  height = 480,
  showControls = true,
  onAgentSelect,
  activeAgentId,
  fullscreen = false,
  activeLink = null,
  className = "",
  hideFooterPanels = false,
}: NeuralCommandCenterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [agents, setAgents] = useState(DEFAULT_AGENTS);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [corePulse, setCorePulse] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const { autonomous, demoRunning, logs, runDemo, stopDemo } = useAutonomous();
  const { activities, connected } = useSocket();

  useEffect(() => {
    if (!demoRunning || logs.length === 0) return;
    const latest = logs[0];
    const agentMap: Record<string, NeuralAgent["state"]> = {
      "Support AI": "thinking",
      "Finance AI": "executing",
      "Email AI": "active",
      "Workflow AI": "executing",
      "Analytics AI": "active",
    };
    const state = agentMap[latest.agent || ""] || "active";
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          latest.agent?.includes(a.label.split(" ")[0])
            ? { ...a, state }
            : a
        )
      );
    }, 0);
  }, [logs, demoRunning]);

  useEffect(() => {
    if (!activeLink) return;
    const idx = LINKS.findIndex(([a, b]) => a === activeLink[0] && b === activeLink[1]);
    if (idx < 0) return;
    const burst = Array.from({ length: 3 }, () => ({
      linkIdx: idx,
      t: Math.random() * 0.3,
      speed: 0.01 + Math.random() * 0.01,
    }));
    setTimeout(() => setParticles((p) => [...p, ...burst].slice(-15)), 0);
  }, [activeLink]);

  useEffect(() => {
    const iv = setInterval(() => {
      const count = fullscreen ? 2 : 1;
      const batch = Array.from({ length: count }, () => ({
        linkIdx: Math.floor(Math.random() * LINKS.length),
        t: 0,
        speed: 0.005 + Math.random() * 0.01,
      }));
      setParticles((p) => [...p.slice(-(fullscreen ? 15 : 8)), ...batch]);
      setCorePulse((c) => c + 1);
    }, fullscreen ? 800 : 1200);
    return () => clearInterval(iv);
  }, [fullscreen]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = container.clientWidth;
    const h = fullscreen ? container.clientHeight : height;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    ctx.clearRect(0, 0, w, h);

    const getPos = (idx: number) => ({
      x: agents[idx].x * w,
      y: agents[idx].y * h,
    });

    // Links (Thin, precise lines)
    LINKS.forEach(([a, b]) => {
      const A = getPos(a);
      const B = getPos(b);
      const isHot = activeLink && activeLink[0] === a && activeLink[1] === b;
      
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = isHot ? "rgba(34, 211, 238, 0.4)" : "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = isHot ? 1.5 : 1;
      ctx.stroke();
    });

    // Particles on links (Minimal)
    particles.forEach((p) => {
      const [a, b] = LINKS[p.linkIdx];
      const A = getPos(a);
      const B = getPos(b);
      const t = p.t;
      const x = A.x + (B.x - A.x) * t;
      const y = A.y + (B.y - A.y) * t;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${1 - Math.abs(t - 0.5) * 2})`;
      ctx.fill();
    });

    // Agents
    agents.forEach((agent) => {
      const x = agent.x * w;
      const y = agent.y * h;
      const isActive = agent.id === activeAgentId || agent.id === hovered;
      
      const r = isActive ? 28 : 24;
      ctx.fillStyle = "rgba(15, 23, 42, 0.8)"; // bg-background-secondary
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = isActive ? "rgba(34, 211, 238, 0.5)" : "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (agent.state !== "idle") {
        ctx.beginPath();
        ctx.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }, [agents, particles, height, fullscreen, activeAgentId, hovered, activeLink]);

  useEffect(() => {
    draw();
    const anim = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, t: p.t + p.speed }))
          .filter((p) => p.t <= 1)
      );
      draw();
    }, 40);
    return () => clearInterval(anim);
  }, [draw]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    const container = containerRef.current;
    let ro: ResizeObserver | undefined;
    if (container && fullscreen) {
      ro = new ResizeObserver(() => draw());
      ro.observe(container);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [draw, fullscreen]);

  const canvasHeight = fullscreen ? "100%" : height;

  return (
    <div className={`relative overflow-hidden ${fullscreen ? "h-full" : "rounded-2xl border border-white/10"} bg-background ${className}`}>
      <div className={`flex flex-col h-full bg-background-secondary/50`}>
        
        {/* Header Pane */}
        <div className={`flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-6 py-4 bg-background`}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Brain className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-sm tracking-wide">Neural OS Core</h3>
              <p className="text-xs text-text-muted mt-0.5">
                {connected ? "System connected" : "Monitoring intelligence mesh"}
              </p>
            </div>
          </div>
          {showControls && (
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border ${autonomous ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-white/5 text-text-muted border-white/10"}`}>
                <Activity className="h-3 w-3" />
                {autonomous ? "Autonomous" : "Manual"}
              </span>
              <button
                onClick={demoRunning ? stopDemo : runDemo}
                className="flex items-center gap-1.5 rounded-md bg-white text-black px-3 py-1.5 text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {demoRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {demoRunning ? "Halt" : "Execute"}
              </button>
            </div>
          )}
        </div>

        {/* Center Canvas Pane */}
        <div
          ref={containerRef}
          className={`relative ${fullscreen ? "flex-1 min-h-[400px]" : ""}`}
          style={fullscreen ? { height: canvasHeight, minHeight: 400 } : { height }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full" />
          {agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
              style={{ left: `${agent.x * 100}%`, top: `${agent.y * 100}%` }}
              onMouseEnter={() => setHovered(agent.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onAgentSelect?.(agent.id)}
            >
              <span className="text-xl relative z-10 pt-1">{agent.emoji}</span>
              <span className="text-[10px] font-medium text-text-secondary bg-background border border-white/5 rounded px-2 py-0.5">
                {agent.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Data Pane */}
        {!hideFooterPanels && (
        <div className="grid md:grid-cols-2 gap-0 border-t border-white/5 bg-background h-32">
          <div className="p-4 border-r border-white/5 overflow-y-auto">
            <p className="text-xs font-medium text-text-muted mb-3 flex items-center gap-2">
               <Zap className="w-3 h-3 text-cyan-400" /> Activity Stream
            </p>
            <AnimatePresence mode="popLayout">
              {(demoRunning ? logs : activities.slice(0, 4).map((a, i) => ({
                id: `act-${i}`,
                phase: "live",
                message: `${a.agent} ${a.action}`,
                agent: a.agent,
                timestamp: a.timestamp,
              }))).slice(0, 3).map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-text-secondary py-1 truncate"
                >
                  <span className="text-text-primary font-medium">{log.agent}</span> — {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="text-xs font-medium text-text-muted mb-3">Agent State</p>
            {agents.slice(0, 3).map((a) => (
              <div key={a.id} className="flex justify-between items-center text-xs py-1">
                <span className="text-text-secondary">{a.label}</span>
                <span className="text-text-primary capitalize flex items-center gap-1.5">
                  {a.state !== "idle" && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                  {a.state}
                </span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
