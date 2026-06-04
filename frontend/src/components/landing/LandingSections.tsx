"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Cpu, Workflow, BarChart, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/fx/ScrollReveal";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

export function ProblemSection() {
  return (
    <section className="py-24 sm:py-32 relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              The operational bottleneck.
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed font-light">
              Modern enterprises are paralyzed by manual workflows, fragmented tools, and isolated data silos. Your best talent is wasted on repetitive coordination instead of strategic execution.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-text-muted font-medium">
               <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-red-400" /> Manual Data Entry</span>
               <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-red-400" /> Context Switching</span>
               <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-red-400" /> Process Delays</span>
            </div>
          </motion.div>
          
          <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
             <div className="aspect-square max-h-[400px] w-full rounded-2xl border border-white/5 bg-background-secondary p-8 flex flex-col justify-center items-center gap-6">
                <div className="w-full h-12 rounded-lg bg-background border border-white/5 flex items-center px-4 opacity-50" />
                <div className="w-3/4 h-12 rounded-lg bg-background border border-white/5 flex items-center px-4 opacity-30" />
                <div className="w-5/6 h-12 rounded-lg bg-background border border-white/5 flex items-center px-4 opacity-70" />
                <div className="w-full h-12 rounded-lg bg-background border border-white/5 flex items-center px-4 opacity-40" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Orchestrate intelligence.
          </h2>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed font-light">
            FlowPilot X introduces the Neural Flow Engine. Connect specialized AI agents into autonomous pipelines that execute complex operational tasks end-to-end.
          </p>
        </motion.div>
        
        <div className="mt-20 grid sm:grid-cols-3 gap-8 text-left">
          {[
            { icon: Cpu, title: "Autonomous Agents", desc: "Deploy specialized models tailored for support, finance, HR, and operations." },
            { icon: Workflow, title: "Neural Pipelines", desc: "Design complex execution graphs where agents collaborate and hand off tasks." },
            { icon: Zap, title: "Real-time Execution", desc: "Monitor multi-step reasoning and sub-second execution speeds globally." }
          ].map((feature, i) => (
            <motion.div key={feature.title} {...fadeUp} transition={{ delay: 0.1 * i }} className="p-8 rounded-2xl border border-white/5 bg-background">
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

export function BenefitsSection() {
  return (
    <section className="py-24 sm:py-32 relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary text-center mb-16">
          Enterprise scale automation.
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div {...fadeUp} className="p-10 rounded-2xl border border-white/5 bg-background-secondary flex flex-col justify-between">
            <div>
               <ShieldCheck className="w-10 h-10 text-cyan-400 mb-6" />
               <h3 className="text-2xl font-semibold text-text-primary">Bank-Grade Security</h3>
               <p className="mt-4 text-text-secondary font-light leading-relaxed">
                 SOC2 Type II certified. End-to-end encryption. Your proprietary data never trains public models. Isolated execution environments for every tenant.
               </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="p-10 rounded-2xl border border-white/5 bg-background-secondary flex flex-col justify-between">
            <div>
               <BarChart className="w-10 h-10 text-cyan-400 mb-6" />
               <h3 className="text-2xl font-semibold text-text-primary">Measurable ROI</h3>
               <p className="mt-4 text-text-secondary font-light leading-relaxed">
                 Reduce operational overhead by 60%. Average enterprise deployment achieves positive ROI within 45 days through massive workflow acceleration.
               </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div>
                <div className="text-3xl font-semibold text-text-primary">10x</div>
                <div className="text-sm text-text-muted mt-1 uppercase tracking-wide">Faster Resolution</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-text-primary">24/7</div>
                <div className="text-sm text-text-muted mt-1 uppercase tracking-wide">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5 bg-background">
      <ScrollReveal className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
          Deploy Autonomous AI Workforce
        </h2>
        <p className="mt-6 text-xl text-text-secondary font-light">
          Join the next generation of enterprise intelligence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-text-primary text-background font-medium hover:scale-[1.02] transition-transform flex items-center justify-center">
            Start Deployment
          </Link>
          <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent text-text-primary hover:text-white transition-colors flex items-center justify-center">
            Contact Sales
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
