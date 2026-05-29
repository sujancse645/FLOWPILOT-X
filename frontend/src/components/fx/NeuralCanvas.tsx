"use client";

import { useEffect, useRef } from "react";

export function NeuralCanvas({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const count = Math.floor(60 * density);
    const nodes: {
      x: number; y: number; vx: number; vy: number;
      r: number; pulse: number; hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.5 ? 270 : 190,
      });
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const glow = 0.4 + Math.sin(n.pulse) * 0.3;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, `hsla(${n.hue}, 80%, 65%, ${glow})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 90%, 70%, ${glow})`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.28;
            const pulse = (Math.sin(t * 0.002 + i) + 1) * 0.5;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lg = ctx.createLinearGradient(n.x, n.y, n2.x, n2.y);
            lg.addColorStop(0, `rgba(124, 58, 237, ${alpha * pulse})`);
            lg.addColorStop(0.5, `rgba(6, 182, 212, ${alpha})`);
            lg.addColorStop(1, `rgba(139, 92, 246, ${alpha * pulse})`);
            ctx.strokeStyle = lg;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-90"
      aria-hidden
    />
  );
}
