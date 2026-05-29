"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { label: "Neural Core Initializing", sub: "Booting quantum cognition matrix" },
  { label: "AI Agents Online", sub: "8 specialized agents synchronized" },
  { label: "Cognition Engine Active", sub: "Reasoning pipelines armed" },
  { label: "Memory Synchronization", sub: "Semantic graph connected" },
  { label: "Workflow Engine Ready", sub: "Neural automation online" },
  { label: "Autonomous Intelligence Active", sub: "Welcome to FlowPilot X" },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));
    let frame = 0;
    let raf = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(5, 8, 22, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.fillStyle = `rgba(124, 58, 237, ${0.3 + Math.sin(frame * 0.02 + n.x) * 0.2})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      const pulse = 0.5 + Math.sin(frame * 0.04) * 0.5;
      const g = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        200 + pulse * 80
      );
      g.addColorStop(0, `rgba(124, 58, 237, ${0.15 * pulse})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 700);
      }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 680);
    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[#050816]"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.7 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.4),transparent_70%)]" />
          <div className="scanline-overlay" />

          <motion.div
            className="relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <motion.div
              className="relative h-32 w-32 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 80px rgba(124,58,237,0.6), 0 0 120px rgba(6,182,212,0.3)",
                  "0 0 120px rgba(6,182,212,0.6), 0 0 160px rgba(124,58,237,0.4)",
                  "0 0 80px rgba(124,58,237,0.6), 0 0 120px rgba(6,182,212,0.3)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-400 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-white tracking-widest">FPX</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            className="relative z-10 mt-12 font-display text-3xl sm:text-4xl font-bold gradient-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            FlowPilot X
          </motion.p>
          <p className="relative z-10 mt-2 text-xs text-cyan-300/90 tracking-[0.45em] uppercase">
            Autonomous AI Operating System
          </p>

          <div className="relative z-10 mt-10 w-[min(100%,28rem)] px-6 space-y-3 font-mono text-xs">
            {STEPS.slice(0, step).map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-0.5 border-l-2 border-emerald-500/60 pl-3"
              >
                <span className="text-white font-medium flex items-center gap-2">
                  <span className="text-emerald-400">▸</span> {s.label}
                  {i === step - 1 && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="text-violet-400"
                    >
                      █
                    </motion.span>
                  )}
                </span>
                <span className="text-muted pl-5">{s.sub}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 mt-10 w-72 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 via-cyan-400 to-violet-400"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="relative z-10 mt-3 text-[10px] text-muted tracking-widest">
            {Math.round((step / STEPS.length) * 100)}% SYSTEM READY
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
