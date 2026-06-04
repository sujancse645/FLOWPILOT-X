"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Bot, GitBranch, Sparkles, ArrowRight, Check } from "lucide-react";
import { localStore } from "@/lib/data/data-service";

const STEPS = [
  {
    icon: Building2,
    title: "Welcome to FlowPilot X",
    desc: "Your autonomous AI workforce operating system. Let's configure your organization in under a minute.",
  },
  {
    icon: Bot,
    title: "Deploy your AI agents",
    desc: "Eight specialized agents collaborate in real time — support, sales, finance, workflow, and more.",
  },
  {
    icon: GitBranch,
    title: "Automate with neural workflows",
    desc: "Build visual automation pipelines with live execution replay and enterprise analytics.",
  },
  {
    icon: Sparkles,
    title: "Go autonomous",
    desc: "Enable autonomous mode to let your AI workforce operate, collaborate, and optimize continuously.",
  },
];

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("Acme Intelligence");

  const finish = () => {
    const settings = localStore.getSettings();
    localStore.setSettings({ ...settings, org_name: orgName, onboarding_complete: true });
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
    >
      <div className="glow-border max-w-lg w-full rounded-3xl p-[1px]">
        <div className="holo-panel rounded-3xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {STEPS[step] && (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] mb-6">
                    {(() => {
                      const Icon = STEPS[step].icon;
                      return <Icon className="h-7 w-7 text-white" />;
                    })()}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">{STEPS[step].title}</h2>
                  <p className="mt-3 text-secondary">{STEPS[step].desc}</p>
                  {step === 0 && (
                    <input
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                      placeholder="Organization name"
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mt-8">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-violet-500" : "bg-white/10"}`} />
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => (step > 0 ? setStep(step - 1) : finish())}
              className="text-sm text-muted hover:text-white"
            >
              {step === 0 ? "Skip" : "Back"}
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white"
              >
                <Check className="h-4 w-4" /> Launch workspace
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
