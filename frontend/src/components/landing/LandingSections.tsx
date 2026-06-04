"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { 
  ArrowRight, Activity, Cpu, Workflow, BarChart, ShieldCheck, Zap, 
  MessageSquare, Brain, Send, CheckCircle2, Bot
} from "lucide-react";
import Link from "next/link";

const transition: Transition = { duration: 0.35, ease: "easeOut" };

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { ...transition },
};

export function ProblemSection() {
  return (
    <section className="py-24 sm:py-32 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            The Automation Gap
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              "Manual workflows slow businesses down",
              "Teams lose time switching tools",
              "No real automation intelligence"
            ].map((pain, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background-secondary border border-white/5">
                <Activity className="h-6 w-6 text-text-muted mb-4" />
                <p className="text-text-primary font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section className="py-24 sm:py-32 bg-background-secondary border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            AI-Orchestrated Workflow Automation
          </h2>
        </motion.div>
        
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-left">
          {[
            { icon: Bot, title: "AI Agents", desc: "Specialized models tailored for specific operational roles." },
            { icon: Workflow, title: "Workflows", desc: "Neural pipelines where agents collaborate and hand off tasks." },
            { icon: Cpu, title: "Automation Engine", desc: "The core layer driving real-time multi-agent execution." }
          ].map((feature, i) => (
            <motion.div key={feature.title} {...fadeUp} transition={{ ...transition, delay: 0.1 * i }} className="p-8 rounded-2xl border border-white/5 bg-background">
              <feature.icon className="h-8 w-8 text-cyan-400 mb-6" />
              <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
              <p className="mt-3 text-text-secondary font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LiveDemoSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: MessageSquare, label: "Customer Ticket Arrives", status: "Support issue received from user." },
    { icon: Brain, label: "AI Analysis", status: "Sentiment and intent parsed instantly." },
    { icon: Workflow, label: "Workflow Trigger", status: "Support AI and Finance AI activated." },
    { icon: Send, label: "Response Generated", status: "Draft sent and refund issued autonomously." },
    { icon: BarChart, label: "Analytics Updated", status: "Metrics dashboard reflects operation." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Live Execution Flow
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed font-light">
              Watch how FlowPilot coordinates itself. No human intervention required.
            </p>
            <div className="mt-12 space-y-6">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                return (
                  <div key={i} className={`flex gap-4 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}>
                    <div className="relative flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border ${isActive ? "border-cyan-400 bg-cyan-400/10 text-cyan-400" : isPast ? "border-text-muted text-text-muted" : "border-white/10 text-white/20"}`}>
                        {isPast ? <CheckCircle2 className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                      </div>
                      {i !== steps.length - 1 && (
                        <div className={`w-px h-8 mt-2 ${isPast ? "bg-text-muted" : "bg-white/10"}`} />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`font-semibold ${isActive ? "text-text-primary" : "text-text-secondary"}`}>{step.label}</p>
                      <p className="text-sm text-text-muted mt-1">{step.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full bg-background-secondary rounded-2xl border border-white/5 flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="w-full max-w-sm rounded-xl border border-white/10 bg-background shadow-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">System Execution</div>
                    <div className="text-xs text-cyan-400">Step {activeStep + 1} of {steps.length}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-16 rounded-lg bg-background-secondary border border-white/5 flex items-center px-4">
                    <span className="text-sm text-text-secondary">{steps[activeStep].label}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-full bg-background-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 2.3, ease: "linear" }}
                        className="h-full bg-cyan-400" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { title: "Autonomous AI Agents", icon: Bot },
    { title: "Real-time Workflow Execution", icon: Zap },
    { title: "AI Reasoning Engine", icon: Brain },
    { title: "Enterprise Automation Layer", icon: ShieldCheck }
  ];

  return (
    <section className="py-24 bg-background-secondary border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...transition, delay: 0.1 * i }} className="p-6 rounded-2xl bg-background border border-white/5 flex flex-col items-center text-center">
              <f.icon className="h-8 w-8 text-cyan-400 mb-4" />
              <h3 className="font-semibold text-text-primary">{f.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessImpactSection() {
  return (
    <section className="py-24 sm:py-32 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-16">
          Business Impact
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <motion.div {...fadeUp} className="space-y-4">
            <div className="text-5xl sm:text-6xl font-bold text-text-primary">70<span className="text-cyan-400">%</span></div>
            <div className="text-text-secondary uppercase tracking-wider text-sm font-medium">Faster Response Time</div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...transition, delay: 0.1 }} className="space-y-4">
            <div className="text-5xl sm:text-6xl font-bold text-text-primary">60<span className="text-cyan-400">%</span></div>
            <div className="text-text-secondary uppercase tracking-wider text-sm font-medium">Automation Coverage</div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...transition, delay: 0.2 }} className="space-y-4">
            <div className="text-5xl sm:text-6xl font-bold text-text-primary">3<span className="text-cyan-400">x</span></div>
            <div className="text-text-secondary uppercase tracking-wider text-sm font-medium">Productivity Improvement</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-32 bg-[#000000] border-t border-white/5 flex flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2 {...fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
          Transform your operations with AI autonomy
        </motion.h2>
        <motion.div {...fadeUp} transition={{ ...transition, delay: 0.1 }} className="mt-10">
          <Link href="/sign-up" className="inline-flex px-8 py-3.5 rounded-xl bg-text-primary text-background font-medium hover:scale-[1.02] transition-transform">
            Deploy Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
