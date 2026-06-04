"use client";

import { motion, Transition } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const transition: Transition = { duration: 0.35, ease: "easeOut" };

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-16 bg-[#090514]">
      {/* Dark purple radial background matching the screenshot */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div 
          className="w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3B0764]/40 via-transparent to-transparent" 
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-[-5vh]">
        
        {/* Shield Logo matching screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl font-serif"
        >
          AutoPilot AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-[#94a3b8] font-light leading-relaxed"
        >
          The autonomous business operating system. Seamlessly resolving support tickets, executing retention strategies, and driving sales without human intervention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            Customer Chat
          </Link>
          <Link href="/dashboard/command-center" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Operator Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
