"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

export function CinematicVoiceOrb({
  listening,
  supported,
  onToggle,
  interim = "",
}: {
  listening: boolean;
  supported: boolean;
  onToggle: () => void;
  interim?: string;
}) {
  const [breath, setBreath] = useState(0);
  const rings = [1, 2, 3, 4, 5];

  useEffect(() => {
    const iv = setInterval(() => setBreath((b) => b + 1), 50);
    return () => clearInterval(iv);
  }, []);

  const breatheScale = 1 + Math.sin(breath * 0.04) * 0.04;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[460px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2),transparent_60%)]" />

      {/* Ambient float particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/60"
          style={{ left: `${15 + i * 7}%`, top: `${20 + (i % 4) * 18}%` }}
          animate={{
            y: [0, -20 - i * 3, 0],
            opacity: listening ? [0.2, 0.8, 0.2] : [0.1, 0.4, 0.1],
          }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}

      <motion.div
        className="absolute w-72 h-72 rounded-full bg-violet-600/15 blur-3xl"
        animate={{
          scale: listening ? [1, 1.4, 1] : [breatheScale, breatheScale * 1.08, breatheScale],
          opacity: listening ? [0.25, 0.5, 0.25] : [0.15, 0.25, 0.15],
        }}
        transition={{ duration: listening ? 2 : 4, repeat: Infinity }}
      />

      {rings.map((r) => (
        <motion.div
          key={r}
          className="absolute rounded-full border border-violet-400/25"
          style={{ width: 90 + r * 50, height: 90 + r * 50 }}
          animate={
            listening
              ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.12, 0.35 - r * 0.04, 0.12],
                }
              : {
                  scale: breatheScale,
                  opacity: 0.06 + r * 0.02,
                }
          }
          transition={{
            duration: listening ? 1.5 + r * 0.2 : 4,
            repeat: Infinity,
            delay: r * 0.12,
          }}
        />
      ))}

      <motion.button
        onClick={onToggle}
        disabled={!supported}
        className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full focus:outline-none disabled:opacity-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: listening ? [1, 1.03, 1] : breatheScale,
          boxShadow: listening
            ? [
                "0 0 60px rgba(239,68,68,0.4), 0 0 100px rgba(124,58,237,0.3)",
                "0 0 100px rgba(6,182,212,0.45), 0 0 140px rgba(124,58,237,0.35)",
                "0 0 60px rgba(239,68,68,0.4), 0 0 100px rgba(124,58,237,0.3)",
              ]
            : "0 0 50px rgba(124,58,237,0.4), 0 0 90px rgba(6,182,212,0.2)",
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-1 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: listening ? 4 : 12, repeat: Infinity, ease: "linear" }}
          style={{
            background: listening
              ? "conic-gradient(from 0deg, #ef4444, #7C3AED, #06B6D4, #ef4444)"
              : "conic-gradient(from 0deg, #7C3AED, #06B6D4, #8B5CF6, #7C3AED)",
          }}
        />
        <div className="absolute inset-5 rounded-full bg-[#080c1a] flex items-center justify-center">
          {listening ? <MicOff className="h-14 w-14 text-white" /> : <Mic className="h-14 w-14 text-white" />}
        </div>
      </motion.button>

      <p className="relative z-10 mt-10 text-secondary text-sm">
        {listening ? "Listening — speak naturally" : "Tap to open neural voice channel"}
      </p>
      {interim && listening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 mt-2 text-xs text-cyan-400/90 max-w-xs text-center italic"
        >
          {interim}
        </motion.p>
      )}

      <div className="relative z-10 flex items-end gap-0.5 h-28 mt-8 px-6 w-full max-w-lg justify-center">
        {Array.from({ length: 56 }).map((_, i) => {
          const h = listening
            ? 8 + Math.abs(Math.sin(i * 0.4 + breath * 0.08)) * (interim ? 42 : 28)
            : 6 + Math.sin(i * 0.2 + breath * 0.03) * 4;
          return (
            <motion.div
              key={i}
              className="w-0.5 rounded-full bg-gradient-to-t from-violet-700 via-violet-400 to-cyan-300"
              animate={{ height: h }}
              transition={{ duration: 0.15 }}
            />
          );
        })}
      </div>
    </div>
  );
}
