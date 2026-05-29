"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CLUSTERS = [
  { id: "support", label: "Support KB", x: 0.2, y: 0.3, nodes: 12 },
  { id: "sales", label: "Lead Intel", x: 0.75, y: 0.25, nodes: 8 },
  { id: "finance", label: "Transactions", x: 0.7, y: 0.7, nodes: 15 },
  { id: "product", label: "Product Docs", x: 0.25, y: 0.75, nodes: 20 },
  { id: "core", label: "Shared Memory", x: 0.5, y: 0.5, nodes: 24 },
];

export function MemoryGraph({ height = 320 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    const draw = () => {
      frame++;
      const w = canvas.width / devicePixelRatio;
      const h = height;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      CLUSTERS.forEach((c, i) => {
        const x = c.x * w;
        const y = c.y * h;
        const pulse = 0.5 + Math.sin(frame * 0.03 + i) * 0.3;
        const r = 30 + c.nodes * 0.8 * pulse;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(124, 58, 237, ${0.25 * pulse})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        for (let n = 0; n < 5; n++) {
          const angle = (n / 5) * Math.PI * 2 + frame * 0.01;
          const nx = x + Math.cos(angle) * (r * 0.6);
          const ny = y + Math.sin(angle) * (r * 0.6);
          ctx.beginPath();
          ctx.arc(nx, ny, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${0.6 * pulse})`;
          ctx.fill();
        }
      });

      // Connect to core
      const core = CLUSTERS[4];
      const cx = core.x * w;
      const cy = core.y * h;
      CLUSTERS.slice(0, 4).forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(c.x * w, c.y * h);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 + Math.sin(frame * 0.02) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [height]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="holo-panel rounded-2xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="font-display font-semibold text-white text-sm">AI Memory Cognition Graph</h3>
        <p className="text-[10px] text-muted mt-0.5">Neural clusters · shared knowledge · live sync</p>
      </div>
      <canvas ref={canvasRef} style={{ height }} className="w-full" />
      <div className="flex flex-wrap gap-2 p-3 border-t border-white/5">
        {CLUSTERS.map((c) => (
          <span key={c.id} className="text-[10px] glass rounded-full px-2 py-0.5 text-violet-200">
            {c.label} · {c.nodes} nodes
          </span>
        ))}
      </div>
    </motion.div>
  );
}
