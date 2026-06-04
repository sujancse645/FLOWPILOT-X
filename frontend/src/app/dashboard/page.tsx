"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line,
  BarChart, Bar,
} from "recharts";
import Link from "next/link";
import { Bot, GitBranch, CheckCircle, Target, Heart, Zap, ArrowRight, Sparkles } from "lucide-react";
import { SpatialModule } from "@/components/fx/SpatialModule";
import { LiveIntelligenceFeed } from "@/components/fx/LiveIntelligenceFeed";
import { PageHeader } from "@/components/elite/PageHeader";
import { HoloCard } from "@/components/fx/HoloCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ActivityStream } from "@/components/fx/ActivityStream";
import { NeuralCommandCenter } from "@/components/neural/NeuralCommandCenter";
import { MemoryGraph } from "@/components/neural/MemoryGraph";
import { NeuralScene3D } from "@/components/neural/NeuralScene3D";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";
import { useSocket } from "@/hooks/useSocket";
import { api } from "@/lib/api";

const icons = [Bot, GitBranch, CheckCircle, Target, Heart, Zap];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAgents: 8, activeWorkflows: 24, tasksCompleted: 1847,
    aiAccuracy: 97.3, customerSatisfaction: 4.8, automationRate: 78.5,
  });
  const { socket, error } = useSocket();

  useEffect(() => {
    api<typeof stats>("/api/dashboard/stats").then(setStats).catch(() => {});
    const iv = setInterval(() => {
      api<typeof stats>("/api/dashboard/stats").then(setStats).catch(() => {});
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  const chartData = [
    { name: "Mon", tasks: 120, workflows: 8, roi: 12 },
    { name: "Tue", tasks: 180, workflows: 12, roi: 18 },
    { name: "Wed", tasks: 150, workflows: 10, roi: 15 },
    { name: "Thu", tasks: 220, workflows: 15, roi: 24 },
    { name: "Fri", tasks: 280, workflows: 18, roi: 31 },
    { name: "Sat", tasks: 90, workflows: 5, roi: 8 },
    { name: "Sun", tasks: 110, workflows: 6, roi: 10 },
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
        title="AI Operating System"
        description="Your neural workforce is active. Enter fullscreen command center for the demo."
        action={
          <div className="flex gap-2 items-center">
            <AutonomousToggle />
            <Link
              href="/dashboard/command-center"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Sparkles className="h-4 w-4" /> Fullscreen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        }
      />

      <NeuralCommandCenter height={480} showControls />

      <div className="flex flex-wrap gap-6 items-stretch">
        <SpatialModule className="flex-1 min-w-[200px] p-5" float>
          <p className="text-[9px] uppercase tracking-widest text-muted mb-3">Live metrics</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cards.slice(0, 3).map((s) => (
              <div key={s.label}>
                <s.icon className="h-4 w-4 mb-1 opacity-50" style={{ color: s.color }} />
                <p className="text-[9px] text-muted">{s.label}</p>
                <p className="text-xl font-bold stat-value" style={{ color: s.color }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.dec ?? 0} />
                </p>
              </div>
            ))}
          </div>
        </SpatialModule>
        <SpatialModule className="w-full sm:w-72 p-5" delay={0.08}>
          <LiveIntelligenceFeed max={6} />
        </SpatialModule>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <HoloCard className="xl:col-span-2 !p-0 overflow-hidden" delay={0.1}>
          <div className="px-5 py-4 border-b border-white/10 flex justify-between">
            <h3 className="font-semibold text-white">Enterprise Intelligence · Live</h3>
            <span className="text-[10px] text-emerald-400">Updated now</span>
          </div>
          <div className="h-[280px] p-4">
            <ResponsiveContainer width="100%" height="100%" minHeight={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gT2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8b9cb8" fontSize={11} />
                <YAxis stroke="#8b9cb8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0a0f24", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="tasks" stroke="#7C3AED" fill="url(#gT2)" strokeWidth={2} />
                <Line type="monotone" dataKey="workflows" stroke="#06B6D4" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </HoloCard>
        <HoloCard delay={0.15} className="!p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white text-sm">ROI Impact ($K)</h3>
          </div>
          <div className="h-[280px] p-4">
            <ResponsiveContainer width="100%" height="100%" minHeight={240}>
              <BarChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8b9cb8" fontSize={10} />
                <YAxis stroke="#8b9cb8" fontSize={10} />
                <Bar dataKey="roi" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </HoloCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 min-h-[320px]">
          <ActivityStream max={8} />
        </div>
        <div className="lg:col-span-1">
          <MemoryGraph height={280} />
        </div>
        <div className="lg:col-span-1">
          <HoloCard className="!p-0 overflow-hidden h-full">
            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="font-semibold text-white text-sm">3D Neural Core</h3>
            </div>
            <NeuralScene3D className="h-[280px]" />
          </HoloCard>
        </div>
      </div>
    </div>
  );
}
