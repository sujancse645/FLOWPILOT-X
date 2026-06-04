"use client";

import { motion, Transition } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const transition: Transition = { duration: 0.35, ease: "easeOut" };

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-16 bg-background">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_60%)]" 
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary max-w-5xl"
        >
          Autonomous AI Workforce for <span className="text-cyan-400">Modern Operations</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-text-secondary font-light leading-relaxed"
        >
          Deploy intelligent AI agents that automate workflows, decisions, and business operations in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-text-primary text-background font-medium hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-sm">
            Launch FlowPilot <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/dashboard/command-center" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text-primary font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Play className="h-4 w-4" /> Watch Demo
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
