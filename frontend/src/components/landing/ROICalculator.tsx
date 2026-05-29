"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { GlowPanel } from "@/components/elite/GlowPanel";

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(25);
  const [tickets, setTickets] = useState(400);
  const [hours, setHours] = useState(12);
  const [workflows, setWorkflows] = useState(8);
  const [responseMin, setResponseMin] = useState(45);

  const metrics = useMemo(() => {
    const automationRate = Math.min(0.72, 0.35 + workflows * 0.04);
    const hoursSaved = Math.round(teamSize * hours * 0.22 * automationRate + tickets * 0.08);
    const roi = Math.round(hoursSaved * 85 * 12);
    const efficiency = Math.round(automationRate * 100);
    const responseGain = Math.round(responseMin * automationRate * 0.6);
    return { hoursSaved, roi, efficiency, responseGain };
  }, [teamSize, tickets, hours, workflows, responseMin]);

  const sliders = [
    { label: "Team size", value: teamSize, set: setTeamSize, min: 5, max: 200 },
    { label: "Support tickets / mo", value: tickets, set: setTickets, min: 50, max: 2000 },
    { label: "Manual hours / week", value: hours, set: setHours, min: 4, max: 40 },
    { label: "Active workflows", value: workflows, set: setWorkflows, min: 1, max: 30 },
    { label: "Avg response (min)", value: responseMin, set: setResponseMin, min: 10, max: 120 },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-violet-400 text-center">Business impact</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mt-3">
          AI Automation Savings Calculator
        </h2>
        <p className="text-secondary text-center mt-3 max-w-xl mx-auto">
          Model operational savings from autonomous workflows and multi-agent collaboration.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <GlowPanel className="p-8 space-y-6">
            {sliders.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-secondary">{s.label}</span>
                  <span className="text-white font-medium">{s.value}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>
            ))}
          </GlowPanel>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Hours saved / month", value: metrics.hoursSaved, suffix: "h" },
              { label: "Estimated annual ROI", value: metrics.roi, prefix: "$" },
              { label: "Automation efficiency", value: metrics.efficiency, suffix: "%" },
              { label: "Response time reduction", value: metrics.responseGain, suffix: " min" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlowPanel glow className="p-6 h-full">
                  <p className="text-xs text-muted uppercase tracking-wider">{m.label}</p>
                  <p className="mt-3 font-display text-3xl font-bold text-white">
                    {m.prefix}
                    <AnimatedCounter value={m.value} />
                    {m.suffix}
                  </p>
                </GlowPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
