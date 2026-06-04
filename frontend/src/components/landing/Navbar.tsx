"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { navLinks } from "@/data/mock";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${
          scrolled
            ? "glass-strong rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : ""
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-black"
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Zap className="h-5 w-5" />
            </motion.div>
            <span className="font-display text-xl font-bold text-text-primary">FlowPilot X</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-text-secondary transition-colors hover:text-text-primary group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/sign-in" className="text-sm text-text-secondary hover:text-text-primary px-3 py-2">
              Sign In
            </Link>
            <MagneticButton href="/sign-up" className="!px-5 !py-2.5 !text-sm bg-text-primary text-background">
              Start Building
            </MagneticButton>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 glass-strong rounded-2xl overflow-hidden md:hidden border border-white/10"
          >
            <div className="flex flex-col gap-3 p-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary py-2">
                  {link.label}
                </Link>
              ))}
              <MagneticButton href="/sign-up" className="w-full justify-center bg-text-primary text-background">Start Building</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
