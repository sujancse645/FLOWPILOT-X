"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { HoloCard } from "@/components/fx/HoloCard";
import { Button } from "@/components/ui/button";

export default function VoiceAIPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleMic = () => {
    setListening(!listening);
    if (!listening) {
      setTimeout(() => {
        setTranscript("Deploy support automation and analyze Q4 revenue documents");
        setListening(false);
      }, 2800);
    }
  };

  const rings = [1, 2, 3, 4];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#06B6D4]">Voice Interface</p>
        <h1 className="font-display text-3xl font-bold text-white">Voice AI</h1>
      </motion.div>

      <HoloCard glow className="flex flex-col items-center justify-center py-20 relative overflow-hidden min-h-[480px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2),transparent_60%)]" />

        {rings.map((r) => (
          <motion.div
            key={r}
            className="absolute rounded-full border border-[#7C3AED]/20"
            style={{ width: 120 + r * 60, height: 120 + r * 60 }}
            animate={
              listening
                ? { scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }
                : { opacity: 0.15 }
            }
            transition={{ duration: 2 + r * 0.3, repeat: Infinity, delay: r * 0.2 }}
          />
        ))}

        <motion.button
          onClick={toggleMic}
          className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            listening
              ? { boxShadow: ["0 0 60px rgba(124,58,237,0.6)", "0 0 100px rgba(6,182,212,0.5)", "0 0 60px rgba(124,58,237,0.6)"] }
              : { boxShadow: "0 0 40px rgba(124,58,237,0.4)" }
          }
          transition={{ duration: 1.5, repeat: listening ? Infinity : 0 }}
          style={{
            background: listening
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : "linear-gradient(135deg, #7C3AED, #06B6D4)",
          }}
        >
          {listening ? <MicOff className="h-12 w-12 text-white" /> : <Mic className="h-12 w-12 text-white" />}
        </motion.button>

        <p className="relative z-10 mt-8 text-[#94a3b8]">{listening ? "Neural listening..." : "Tap to speak to your AI workforce"}</p>

        <div className="relative z-10 flex items-end gap-1 h-20 mt-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-[#7C3AED] to-[#06B6D4]"
              animate={
                listening
                  ? { height: [8, 12 + Math.sin(i * 0.5) * 28 + Math.random() * 20, 8] }
                  : { height: 8 }
              }
              transition={{ duration: 0.4, repeat: listening ? Infinity : 0, delay: i * 0.02 }}
            />
          ))}
        </div>
      </HoloCard>

      {transcript && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <HoloCard>
            <p className="text-[10px] uppercase tracking-widest text-[#64748b] mb-2">Neural transcript</p>
            <p className="text-lg text-white">{transcript}</p>
            <div className="mt-6 flex gap-3">
              <Button>Execute Command</Button>
              <Button variant="outline"><Volume2 className="h-4 w-4" /> AI Response</Button>
            </div>
          </HoloCard>
        </motion.div>
      )}
    </div>
  );
}
