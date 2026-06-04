"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Mail } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16 px-4 text-center">
        <h1 className="font-display text-5xl font-bold text-text-primary">Get in Touch</h1>
        <p className="mt-4 text-text-secondary">We&apos;d love to hear from you</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 grid lg:grid-cols-2 gap-12">
        <Card className="bg-background-secondary border-white/10">
          {sent ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-4xl mb-4 text-cyan-400">✓</div>
              <h3 className="text-xl font-bold text-text-primary">Message Sent!</h3>
              <p className="text-text-secondary mt-2">We&apos;ll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="First name" required className="bg-background border-white/10 focus:border-cyan-500/50" />
                <Input placeholder="Last name" required className="bg-background border-white/10 focus:border-cyan-500/50" />
              </div>
              <Input type="email" placeholder="Email" required className="bg-background border-white/10 focus:border-cyan-500/50" />
              <Input placeholder="Company" className="bg-background border-white/10 focus:border-cyan-500/50" />
              <textarea
                className="flex min-h-[120px] w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                placeholder="How can we help?"
                required
              />
              <Button type="submit" variant="cyan" className="w-full">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="bg-background-secondary border-white/10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <MessageCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Live Support</h3>
                <p className="text-sm text-text-secondary mt-1">Available 24/7 for Pro and Enterprise customers</p>
                <p className="text-sm text-cyan-400 mt-2">support@flowpilot.ai</p>
              </div>
            </div>
          </Card>
          <Card className="bg-background-secondary border-white/10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Mail className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Sales</h3>
                <p className="text-sm text-text-secondary mt-1">Enterprise demos and custom solutions</p>
                <p className="text-sm text-cyan-400 mt-2">sales@flowpilot.ai</p>
              </div>
            </div>
          </Card>
          <Card className="bg-background-secondary border-white/10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <MapPin className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">HQ</h3>
                <p className="text-sm text-text-secondary mt-1">San Francisco, CA · Remote-first team</p>
              </div>
            </div>
          </Card>
          <div className="bg-background-secondary border border-white/10 rounded-2xl h-48 flex items-center justify-center text-text-muted text-sm">
            [ Interactive Map Placeholder ]
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
