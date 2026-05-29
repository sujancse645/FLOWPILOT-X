"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Zap } from "lucide-react";
import { GlowPanel } from "@/components/elite/GlowPanel";
import { logActivity } from "@/lib/data/data-service";

const SCENARIOS = [
  { id: "complaint", label: "Customer complaint", agent: "Support AI", steps: ["Intent classified", "Sentiment analyzed", "Refund policy matched", "Resolution drafted"] },
  { id: "refund", label: "Refund request", agent: "Finance AI", steps: ["Transaction verified", "Policy check", "Approval routed", "Refund initiated"] },
  { id: "lead", label: "Sales lead", agent: "Sales AI", steps: ["Lead scored", "CRM enriched", "Outreach sequenced", "Meeting booked"] },
  { id: "hr", label: "HR screening", agent: "HR AI", steps: ["Resume parsed", "Skills matched", "Bias check", "Shortlist generated"] },
  { id: "invoice", label: "Invoice processing", agent: "Finance AI", steps: ["OCR extraction", "Line items validated", "ERP sync", "Payment scheduled"] },
];

export function DemoModeEngine() {
  const [running, setRunning] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [reasoning, setReasoning] = useState<string[]>([]);

  const run = async (scenario: (typeof SCENARIOS)[0]) => {
    setRunning(scenario.id);
    setStep(0);
    setReasoning([]);
    for (let i = 0; i < scenario.steps.length; i++) {
      await new Promise((r) => setTimeout(r, 1100));
      setStep(i);
      setReasoning((r) => [...r, `[${scenario.agent}] ${scenario.steps[i]}`]);
      await logActivity(scenario.steps[i], scenario.agent, "demo");
    }
    setRunning(null);
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 text-center">Interactive demo</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mt-3">
          Live scenario engine
        </h2>
        <p className="text-secondary text-center mt-3 max-w-lg mx-auto">
          Trigger enterprise workflows and watch AI reasoning, collaboration, and analytics update in real time.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENARIOS.map((s) => (
            <GlowPanel key={s.id} className="p-5">
              <h3 className="font-semibold text-white">{s.label}</h3>
              <p className="text-xs text-muted mt-1">{s.agent}</p>
              <button
                onClick={() => run(s)}
                disabled={!!running}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-white disabled:opacity-50"
              >
                {running === s.id ? <Zap className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4" />}
                {running === s.id ? "Running..." : "Run scenario"}
              </button>
            </GlowPanel>
          ))}
        </div>

        <AnimatePresence>
          {reasoning.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <GlowPanel glow className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-cyan-400 mb-4">AI reasoning stream</p>
                <div className="space-y-2 font-mono text-sm">
                  {reasoning.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={i === step && running ? "text-emerald-400" : "text-secondary"}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </GlowPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
