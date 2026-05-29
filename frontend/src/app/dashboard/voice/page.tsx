"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { GlowPanel } from "@/components/elite/GlowPanel";
import { CinematicVoiceOrb } from "@/components/voice/CinematicVoiceOrb";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";
import { logActivity } from "@/lib/data/data-service";

export default function VoiceAIPage() {
  const { listening, transcript, interim, supported, start, stop, speak } = useSpeech();
  const display = transcript + (interim ? ` ${interim}` : "");
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

      <GlowPanel glow className="relative overflow-hidden depth-layer">
        <CinematicVoiceOrb listening={listening} supported={supported} onToggle={toggleMic} interim={interim} />
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
