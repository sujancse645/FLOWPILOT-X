"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line,
} from "recharts";
import { Bot, GitBranch, CheckCircle, Target, Heart, Zap } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { HoloCard } from "@/components/fx/HoloCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ActivityStream } from "@/components/fx/ActivityStream";
import { AgentNetwork } from "@/components/fx/AgentNetwork";
import { useSocket } from "@/hooks/useSocket";
import { api } from "@/lib/api";

const icons = [Bot, GitBranch, CheckCircle, Target, Heart, Zap];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAgents: 8, activeWorkflows: 24, tasksCompleted: 1847,
    aiAccuracy: 97.3, customerSatisfaction: 4.8, automationRate: 78.5,
  });
  const { connected } = useSocket();

  useEffect(() => {
    api<typeof stats>("/api/dashboard/stats").then(setStats).catch(() => {});
  }, []);

  const chartData = [
    { name: "Mon", tasks: 120, workflows: 8 },
    { name: "Tue", tasks: 180, workflows: 12 },
    { name: "Wed", tasks: 150, workflows: 10 },
    { name: "Thu", tasks: 220, workflows: 15 },
    { name: "Fri", tasks: 280, workflows: 18 },
    { name: "Sat", tasks: 90, workflows: 5 },
    { name: "Sun", tasks: 110, workflows: 6 },
  ];

  const cards = [
    { label: "AI Agents", value: stats.totalAgents, suffix: "", color: "#7C3AED", icon: icons[0] },
    { label: "Workflows", value: stats.activeWorkflows, suffix: "", color: "#06B6D4", icon: icons[1] },
    { label: "Tasks", value: stats.tasksCompleted, suffix: "", color: "#8B5CF6", icon: icons[2] },
    { label: "Accuracy", value: stats.aiAccuracy, suffix: "%", color: "#10B981", icon: icons[3], dec: 1 },
    { label: "CSAT", value: stats.customerSatisfaction, suffix: "/5", color: "#F59E0B", icon: icons[4], dec: 1 },
    { label: "Automation", value: stats.automationRate, suffix: "%", color: "#EC4899", icon: icons[5], dec: 1 },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Mission Control"
        title="Command Center"
        description={connected ? "Neural link active — full workforce telemetry online." : "Establishing neural link to backend..."}
      />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((s, i) => (
          <HoloCard key={s.label} delay={i * 0.04} className="!p-4">
            <s.icon className="h-4 w-4 mb-2 opacity-60" style={{ color: s.color }} />
            <p className="text-[9px] uppercase tracking-widest text-muted font-medium">{s.label}</p>
            <p className="text-2xl font-bold mt-1 stat-value" style={{ color: s.color }}>
              <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.dec ?? 0} />
            </p>
          </HoloCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <HoloCard className="xl:col-span-2 !p-0 overflow-hidden" delay={0.15}>
          <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold text-white">Neural Throughput</h3>
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%" minHeight={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8b9cb8" fontSize={11} />
                <YAxis stroke="#8b9cb8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0a0f24", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="tasks" stroke="#7C3AED" fill="url(#gT)" strokeWidth={2} />
                <Line type="monotone" dataKey="workflows" stroke="#06B6D4" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </HoloCard>
        <div className="min-h-[360px]">
          <ActivityStream max={8} />
        </div>
      </div>

      <HoloCard glow delay={0.25}>
        <h3 className="font-display text-lg font-semibold text-white mb-4">Agent Neural Mesh</h3>
        <AgentNetwork />
      </HoloCard>
    </div>
  );
}
