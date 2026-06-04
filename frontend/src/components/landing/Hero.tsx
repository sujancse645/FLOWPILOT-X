"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-background to-background" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          <span className="text-text-primary font-medium tracking-wide">FlowPilot X Enterprise</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary max-w-4xl"
        >
          Autonomous AI Workforce for <span className="text-cyan-400">Modern Operations</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-text-secondary font-light leading-relaxed"
        >
          Deploy a living AI operating system. Orchestrate intelligent agents, automate complex workflows, and scale your operations with absolute precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-text-primary text-background font-medium hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-sm">
            Deploy Workforce <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/dashboard/command-center" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text-primary font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Play className="h-4 w-4" /> View Live Demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 w-full max-w-5xl rounded-2xl border border-white/10 bg-background-secondary/50 backdrop-blur-xl p-2 shadow-2xl"
        >
          <div className="rounded-xl overflow-hidden bg-background border border-white/5">
             <div className="h-10 border-b border-white/5 bg-background flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="mx-auto flex-1 text-center">
                  <span className="text-xs text-text-muted font-medium tracking-widest uppercase">System Execution Log</span>
                </div>
             </div>
             
             <div className="p-8 grid md:grid-cols-3 gap-8">
               <div className="space-y-2">
                  <div className="text-sm text-text-muted uppercase tracking-wider">Active Agents</div>
                  <div className="text-4xl font-semibold text-text-primary">12<span className="text-cyan-400 text-lg ml-1">Nodes</span></div>
               </div>
               <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/5 md:pl-8 pt-6 md:pt-0">
                  <div className="text-sm text-text-muted uppercase tracking-wider">Automation Rate</div>
                  <div className="text-4xl font-semibold text-text-primary">94<span className="text-cyan-400 text-lg ml-1">%</span></div>
               </div>
               <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/5 md:pl-8 pt-6 md:pt-0">
                  <div className="text-sm text-text-muted uppercase tracking-wider">System Status</div>
                  <div className="flex items-center gap-2 h-10 mt-1">
                     <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                     </span>
                     <span className="text-xl font-medium text-text-primary">Operational</span>
                  </div>
               </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
