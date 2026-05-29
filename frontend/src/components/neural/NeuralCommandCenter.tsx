"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Play, Pause } from "lucide-react";
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
  { id: "research", label: "Research AI", emoji: "🔬", x: 0.35, y: 0.15, state: "idle", intelligence: 92 },
  { id: "hr", label: "HR AI", emoji: "👥", x: 0.65, y: 0.85, state: "idle", intelligence: 88 },
];

const LINKS: [number, number][] = [
  [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [5, 6], [0, 4], [1, 2], [5, 1], [6, 3],
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

  // Sync agent states during demo
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
    setAgents((prev) =>
      prev.map((a) =>
        latest.agent?.includes(a.label.split(" ")[0])
          ? { ...a, state }
          : a
      )
    );
  }, [logs, demoRunning]);

  // Burst particles on collaboration link
  useEffect(() => {
    if (!activeLink) return;
    const idx = LINKS.findIndex(([a, b]) => a === activeLink[0] && b === activeLink[1]);
    if (idx < 0) return;
    const burst = Array.from({ length: 6 }, () => ({
      linkIdx: idx,
      t: Math.random() * 0.3,
      speed: 0.02 + Math.random() * 0.015,
    }));
    setParticles((p) => [...p, ...burst].slice(-24));
  }, [activeLink]);

  // Ambient particle spawn
  useEffect(() => {
    const iv = setInterval(() => {
      const count = fullscreen ? 3 : 1;
      const batch = Array.from({ length: count }, () => ({
        linkIdx: Math.floor(Math.random() * LINKS.length),
        t: 0,
        speed: 0.008 + Math.random() * 0.012,
      }));
      setParticles((p) => [...p.slice(-(fullscreen ? 28 : 12)), ...batch]);
      setCorePulse((c) => c + 1);
      if (autonomous && Math.random() > 0.85) {
        setAgents((prev) =>
          prev.map((a) =>
            Math.random() > 0.7
              ? { ...a, state: ["active", "thinking", "executing"][Math.floor(Math.random() * 3)] as NeuralAgent["state"] }
              : a
          )
        );
      }
    }, fullscreen ? 350 : 600);
    return () => clearInterval(iv);
  }, [autonomous, fullscreen]);

  // Subtle agent drift in fullscreen — living ecosystem
  useEffect(() => {
    if (!fullscreen) return;
    const iv = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          x: Math.max(0.1, Math.min(0.9, a.x + (Math.random() - 0.5) * 0.006)),
          y: Math.max(0.1, Math.min(0.9, a.y + (Math.random() - 0.5) * 0.006)),
        }))
      );
    }, 2800);
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

    // Holographic grid
    if (fullscreen) {
      ctx.strokeStyle = "rgba(124, 58, 237, 0.06)";
      ctx.lineWidth = 1;
      const grid = 48;
      for (let gx = 0; gx < w; gx += grid) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += grid) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
    }

    // Core glow
    const cx = w / 2;
    const cy = h / 2;
    const pulse = 0.5 + Math.sin(corePulse * 0.08) * 0.3;
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120 * pulse);
    coreGrad.addColorStop(0, `rgba(124, 58, 237, ${0.35 * pulse})`);
    coreGrad.addColorStop(0.5, `rgba(6, 182, 212, ${0.15 * pulse})`);
    coreGrad.addColorStop(1, "transparent");
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, w, h);

    const getPos = (idx: number) => ({
      x: agents[idx].x * w,
      y: agents[idx].y * h,
    });

    // Links
    LINKS.forEach(([a, b], i) => {
      const A = getPos(a);
      const B = getPos(b);
      const isHot =
        activeLink && activeLink[0] === a && activeLink[1] === b;
      const grad = ctx.createLinearGradient(A.x, A.y, B.x, B.y);
      grad.addColorStop(0, isHot ? "rgba(52, 211, 153, 0.8)" : "rgba(124, 58, 237, 0.4)");
      grad.addColorStop(0.5, isHot ? "rgba(103, 232, 249, 0.9)" : "rgba(6, 182, 212, 0.5)");
      grad.addColorStop(1, isHot ? "rgba(52, 211, 153, 0.8)" : "rgba(139, 92, 246, 0.4)");
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = isHot ? 3 : 1.5;
      if (isHot) {
        ctx.shadowColor = "#34d399";
        ctx.shadowBlur = 16;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Particles on links
    particles.forEach((p) => {
      const [a, b] = LINKS[p.linkIdx];
      const A = getPos(a);
      const B = getPos(b);
      const t = p.t;
      const x = A.x + (B.x - A.x) * t;
      const y = A.y + (B.y - A.y) * t;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(103, 232, 249, ${1 - Math.abs(t - 0.5) * 2})`;
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Agents
    agents.forEach((agent) => {
      const x = agent.x * w;
      const y = agent.y * h;
      const isActive = agent.id === activeAgentId || agent.id === hovered;
      const stateGlow =
        agent.state === "thinking"
          ? "rgba(251, 191, 36, 0.6)"
          : agent.state === "executing"
            ? "rgba(52, 211, 153, 0.6)"
            : agent.state === "active"
              ? "rgba(124, 58, 237, 0.6)"
              : "rgba(139, 92, 246, 0.3)";

      const r = isActive ? 36 : 28;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, stateGlow);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = stateGlow.replace("0.6", "1").replace("0.3", "0.8");
      ctx.fill();
    });
  }, [agents, particles, corePulse, height, fullscreen, activeAgentId, hovered, activeLink]);

  useEffect(() => {
    draw();
    const anim = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, t: p.t + p.speed }))
          .filter((p) => p.t <= 1)
      );
      draw();
    }, 32);
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
    <div
      className={`relative overflow-hidden ${fullscreen ? "h-full glow-border p-[1px]" : "rounded-2xl glow-border p-[1px]"} ${className}`}
    >
      <div className={`holo-panel overflow-hidden h-full ${fullscreen ? "rounded-none" : "rounded-2xl"}`}>
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 bg-gradient-to-r from-violet-950/50 to-cyan-950/30 ${
            hideFooterPanels ? "bg-black/40 backdrop-blur-md" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]"
            >
              <Brain className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-display font-bold text-white text-sm sm:text-base">Live AI Neural Command Center</h3>
              <p className="text-[10px] text-cyan-300/80 uppercase tracking-widest">
                {connected ? "Neural link active" : "Simulated intelligence mesh"}
              </p>
            </div>
          </div>
          {showControls && (
            <div className="flex items-center gap-2">
              <button
                onClick={demoRunning ? stopDemo : runDemo}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
              >
                {demoRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {demoRunning ? "Stop demo" : "Run live demo"}
              </button>
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  autonomous ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "glass text-muted"
                }`}
              >
                <Zap className="h-3 w-3" />
                {autonomous ? "Autonomous ON" : "Manual"}
              </span>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className={`relative ${fullscreen ? "flex-1 min-h-[400px]" : ""}`}
          style={fullscreen ? { height: canvasHeight, minHeight: 400 } : { height }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full" />
          {agents.map((agent) => (
            <motion.button
              key={agent.id}
              type="button"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 cursor-pointer"
              style={{ left: `${agent.x * 100}%`, top: `${agent.y * 100}%` }}
              onMouseEnter={() => setHovered(agent.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onAgentSelect?.(agent.id)}
              animate={{
                scale:
                  agent.state === "thinking"
                    ? [1, 1.1, 1]
                    : agent.state === "executing"
                      ? [1, 1.06, 1]
                      : hovered === agent.id
                        ? 1.12
                        : 1,
                y: agent.state !== "idle" ? [0, -3, 0] : 0,
              }}
              transition={{
                repeat: agent.state !== "idle" ? Infinity : 0,
                duration: agent.state === "thinking" ? 1 : 1.8,
              }}
            >
              <span className="text-2xl drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]">{agent.emoji}</span>
              <span className="text-[9px] font-medium text-white/90 whitespace-nowrap glass rounded px-1.5 py-0.5">
                {agent.label}
              </span>
              {agent.state !== "idle" && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    agent.state === "thinking"
                      ? "bg-amber-400"
                      : agent.state === "executing"
                        ? "bg-emerald-400"
                        : "bg-violet-400"
                  } ai-pulse`}
                />
              )}
            </motion.button>
          ))}
        </div>

        {!hideFooterPanels && (
        <div className="grid md:grid-cols-2 gap-0 border-t border-white/10 max-h-36 overflow-hidden">
          <div className="p-3 border-r border-white/5 overflow-y-auto max-h-36">
            <p className="text-[9px] uppercase tracking-widest text-violet-300 mb-2">Autonomous reasoning</p>
            <AnimatePresence mode="popLayout">
              {(demoRunning ? logs : activities.slice(0, 4).map((a, i) => ({
                id: `act-${i}`,
                phase: "live",
                message: `${a.agent} ${a.action}`,
                agent: a.agent,
                timestamp: a.timestamp,
              }))).slice(0, 5).map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] text-secondary py-1 border-l border-violet-500/50 pl-2 mb-1"
                >
                  <span className="text-violet-300">{log.agent}</span> — {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="p-3 overflow-y-auto max-h-36">
            <p className="text-[9px] uppercase tracking-widest text-cyan-300 mb-2">Intelligence state</p>
            {agents.slice(0, 4).map((a) => (
              <div key={a.id} className="flex justify-between text-[11px] py-0.5">
                <span className="text-muted">{a.label}</span>
                <span className="text-white capitalize">{a.state}</span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
