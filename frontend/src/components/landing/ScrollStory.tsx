"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScenarioEngine } from "@/components/demo/ScenarioEngine";

const CHAPTERS = [
  {
    title: "Deploy intelligence",
    body: "Eight autonomous agents form a living neural mesh — thinking, routing, and executing as one organism.",
    gradient: "from-violet-600/30 to-transparent",
  },
  {
    title: "Orchestrate workflows",
    body: "Visual neural automation with flowing execution energy, replay traces, and holographic decision paths.",
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    title: "Operate autonomously",
    body: "Run live enterprise scenarios. Watch cognition streams, collaboration pulses, and ROI materialize in real time.",
    gradient: "from-emerald-500/20 to-transparent",
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.4em] text-violet-400 text-center mb-16"
        >
          The ecosystem evolves as you scroll
        </motion.p>

        <div className="space-y-32">
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">{ch.title}</h3>
                <p className="mt-4 text-lg text-secondary leading-relaxed">{ch.body}</p>
              </div>
              <motion.div
                className={`depth-layer float-ui rounded-3xl aspect-video bg-gradient-to-br ${ch.gradient} border border-white/10 flex items-center justify-center`}
                whileInView={{ rotateX: 4, rotateY: i % 2 === 0 ? -4 : 4 }}
                viewport={{ once: true }}
                style={{ transformPerspective: 1200 }}
              >
                <div className="flex gap-2">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="w-2 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
                      animate={{ height: [20, 40 + j * 12, 20] }}
                      transition={{ duration: 1.2 + j * 0.1, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <ScenarioEngine variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
