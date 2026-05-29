"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Pause, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Automation {
  id: string;
  name: string;
  template_type: string;
  active: boolean;
  runs: number;
}

export default function AutomationPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    api<Automation[]>("/api/automations").then(setAutomations).catch(() => {});
  }, []);

  const toggle = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Automation Center</h1>
        <p className="text-sm text-[#94a3b8]">Pre-built templates for common business workflows</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {automations.map((auto, i) => (
          <motion.div key={auto.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card glow className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/20">
                  <Zap className="h-5 w-5 text-[#7C3AED]" />
                </div>
                <Badge variant={auto.active ? "success" : "info"}>{auto.active ? "Active" : "Paused"}</Badge>
              </div>
              <h3 className="font-semibold text-white">{auto.name}</h3>
              <p className="text-xs text-[#64748b] mt-1 capitalize">{auto.template_type.replace(/_/g, " ")}</p>
              <p className="text-sm text-[#94a3b8] mt-3">{auto.runs.toLocaleString()} total runs</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant={auto.active ? "outline" : "default"} onClick={() => toggle(auto.id)}>
                  {auto.active ? <><Pause className="h-3 w-3" /> Pause</> : <><Play className="h-3 w-3" /> Activate</>}
                </Button>
                <Button size="sm" variant="ghost"><FileText className="h-3 w-3" /> Logs</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
