"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Download, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const COLORS = ["#7C3AED", "#06B6D4", "#8B5CF6", "#10B981"];

export default function AnalyticsPage() {
  const [data, setData] = useState<{
    workflowCompletion: Array<{ month: string; completed: number; failed: number }>;
    aiEfficiency: Array<{ day: string; score: number }>;
    usageTrends: Array<{ date: string; agents: number; workflows: number }>;
    satisfaction: number;
    savings: number;
    responseQuality: number;
  } | null>(null);

  useEffect(() => {
    api<typeof data>("/api/analytics").then(setData).catch(() => {});
  }, []);

  const pieData = data ? [
    { name: "Completed", value: 85 },
    { name: "Failed", value: 8 },
    { name: "Pending", value: 7 },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-[#94a3b8]">Enterprise-grade AI performance insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="h-4 w-4" /> Last 30 days</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Customer Satisfaction", value: data?.satisfaction ?? 4.8, suffix: "/5" },
          { label: "Automation Savings", value: data?.savings ?? 124500, prefix: "$" },
          { label: "Response Quality", value: data?.responseQuality ?? 97.3, suffix: "%" },
        ].map((stat) => (
          <Card key={stat.label} glow>
            <p className="text-xs text-[#64748b]">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">
              {stat.prefix}{typeof stat.value === "number" && stat.value > 1000 ? stat.value.toLocaleString() : stat.value}{stat.suffix}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Workflow Completion</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data?.workflowCompletion ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="completed" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>AI Efficiency Score</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data?.aiEfficiency ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[85, 100]} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={2} dot={{ fill: "#06B6D4" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Usage Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data?.usageTrends ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="agents" stroke="#7C3AED" strokeWidth={2} />
                <Line type="monotone" dataKey="workflows" stroke="#06B6D4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Completion Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
