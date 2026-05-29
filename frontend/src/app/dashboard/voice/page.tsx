"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { GlowPanel } from "@/components/elite/GlowPanel";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";
import { logActivity } from "@/lib/data/data-service";

export default function VoiceAIPage() {
  const { listening, transcript, interim, supported, start, stop, speak } = useSpeech();
  const display = transcript + (interim ? ` ${interim}` : "");
  const rings = [1, 2, 3, 4];

  const toggleMic = () => {
    if (listening) stop();
    else start();
  };

  const respond = () => {
    speak("Command received. Deploying your AI workforce across connected workflows.");
    logActivity(`Voice command: ${transcript.slice(0, 80)}`, "Workflow AI", "voice");
  };

  useEffect(() => {
    if (!listening && transcript) {
      logActivity("Voice session completed", undefined, "voice");
    }
  }, [listening, transcript]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Voice Interface"
        title="Voice AI"
        description="Real-time speech recognition and synthesis — talk to your autonomous workforce."
      />

      {!supported && (
        <div className="flex items-center gap-2 text-amber-400 text-sm holo-panel rounded-xl p-4 border border-amber-500/20">
          <AlertCircle className="h-4 w-4" />
          Web Speech API not available in this browser. Use Chrome or Edge for full voice features.
        </div>
      )}

      <GlowPanel glow className="flex flex-col items-center justify-center py-20 relative overflow-hidden min-h-[480px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2),transparent_60%)]" />

        {rings.map((r) => (
          <motion.div
            key={r}
            className="absolute rounded-full border border-violet-500/20"
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
          disabled={!supported}
          className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full focus:outline-none disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            listening
              ? {
                  boxShadow: [
                    "0 0 60px rgba(124,58,237,0.6)",
                    "0 0 100px rgba(6,182,212,0.5)",
                    "0 0 60px rgba(124,58,237,0.6)",
                  ],
                }
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

        <p className="relative z-10 mt-8 text-secondary">
          {listening ? "Neural listening — speak now" : "Tap to speak to your AI workforce"}
        </p>

        <div className="relative z-10 flex items-end gap-1 h-20 mt-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"
              animate={
                listening
                  ? { height: [8, 12 + Math.sin(i * 0.5 + Date.now() * 0.01) * 28, 8] }
                  : { height: 8 }
              }
              transition={{ duration: 0.35, repeat: listening ? Infinity : 0, delay: i * 0.02 }}
            />
          ))}
        </div>
      </GlowPanel>

      {display && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <GlowPanel className="p-6">
            <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Live transcript</p>
            <p className="text-lg text-white">{display}</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => logActivity(`Execute: ${transcript}`, "Workflow AI", "voice")}>
                Execute command
              </Button>
              <Button variant="outline" onClick={respond}>
                <Volume2 className="h-4 w-4" /> AI response
              </Button>
            </div>
          </GlowPanel>
        </motion.div>
      )}
    </div>
  );
}
