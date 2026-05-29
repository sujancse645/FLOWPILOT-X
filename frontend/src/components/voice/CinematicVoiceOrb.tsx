"use client";

import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

export function CinematicVoiceOrb({
  listening,
  supported,
  onToggle,
}: {
  listening: boolean;
  supported: boolean;
  onToggle: () => void;
}) {
  const rings = [1, 2, 3, 4, 5];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[420px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_55%)]" />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-violet-600/20 blur-3xl"
        animate={listening ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, repeat: listening ? Infinity : 0 }}
      />

      {rings.map((r) => (
        <motion.div
          key={r}
          className="absolute rounded-full border border-violet-400/30"
          style={{ width: 100 + r * 55, height: 100 + r * 55 }}
          animate={
            listening
              ? {
                  scale: [1, 1.12, 1],
                  opacity: [0.15, 0.45 - r * 0.05, 0.15],
                  rotate: r % 2 === 0 ? 360 : -360,
                }
              : { opacity: 0.08 }
          }
          transition={{
            duration: 3 + r * 0.4,
            repeat: Infinity,
            ease: "linear",
            delay: r * 0.15,
          }}
        />
      ))}

      <motion.button
        onClick={onToggle}
        disabled={!supported}
        className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full focus:outline-none disabled:opacity-40"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={
          listening
            ? {
                boxShadow: [
                  "0 0 80px rgba(239,68,68,0.5), 0 0 120px rgba(124,58,237,0.3)",
                  "0 0 120px rgba(6,182,212,0.5), 0 0 160px rgba(124,58,237,0.4)",
                  "0 0 80px rgba(239,68,68,0.5), 0 0 120px rgba(124,58,237,0.3)",
                ],
              }
            : { boxShadow: "0 0 60px rgba(124,58,237,0.5), 0 0 100px rgba(6,182,212,0.25)" }
        }
        transition={{ duration: 1.8, repeat: listening ? Infinity : 0 }}
      >
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: listening
              ? "conic-gradient(from 0deg, #ef4444, #7C3AED, #06B6D4, #ef4444)"
              : "conic-gradient(from 0deg, #7C3AED, #06B6D4, #8B5CF6, #7C3AED)",
          }}
        />
        <div className="absolute inset-4 rounded-full bg-[#0a0f24] flex items-center justify-center">
          {listening ? <MicOff className="h-14 w-14 text-white" /> : <Mic className="h-14 w-14 text-white" />}
        </div>
      </motion.button>

      <p className="relative z-10 mt-10 text-secondary text-sm">
        {listening ? "Neural voice channel open" : "Tap the orb to speak"}
      </p>

      <div className="relative z-10 flex items-end gap-1 h-24 mt-8 px-8 w-full max-w-md justify-center">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-violet-600 via-violet-400 to-cyan-300"
            animate={
              listening
                ? {
                    height: [
                      6,
                      10 + Math.abs(Math.sin(i * 0.35 + Date.now() * 0.008)) * 36,
                      6,
                    ],
                  }
                : { height: 6 }
            }
            transition={{ duration: 0.3, repeat: listening ? Infinity : 0, delay: i * 0.018 }}
          />
        ))}
      </div>
    </div>
  );
}
