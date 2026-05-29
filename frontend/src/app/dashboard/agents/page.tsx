"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Brain, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { AgentEliteCard } from "@/components/elite/AgentEliteCard";
import { AgentNetwork } from "@/components/fx/AgentNetwork";
import { ActivityStream } from "@/components/fx/ActivityStream";
import { HoloCard } from "@/components/fx/HoloCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  intelligence_score: number;
  tasks: number;
  avatar: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selected, setSelected] = useState<Agent | null>(null);

  useEffect(() => {
    api<Agent[]>("/api/agents").then(setAgents).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Neural Workforce"
        title="AI Agent Command"
        description="Live multi-agent mesh — collaboration, delegation, and autonomous execution."
        action={
          <Button className="glow-purple shadow-[0_0_30px_rgba(124,58,237,0.4)]">
            <Plus className="h-4 w-4" /> Deploy Agent
          </Button>
        }
      />

      <HoloCard glow className="!p-2">
        <AgentNetwork activeId={selected?.type} />
      </HoloCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent) => (
          <AgentEliteCard
            key={agent.id}
            name={agent.name}
            type={agent.type}
            avatar={agent.avatar}
            status={agent.status}
            intelligence={agent.intelligence_score}
            tasks={agent.tasks}
            selected={selected?.id === agent.id}
            onClick={() => setSelected(agent)}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 min-h-[320px]">
          <ActivityStream max={10} />
        </div>
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
              >
                <HoloCard glow>
                  <div className="flex items-start gap-5">
                    <span className="text-6xl">{selected.avatar}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-white">{selected.name}</h3>
                      <p className="text-[#8B5CF6] capitalize text-sm mt-1">{selected.type} · Intelligence {selected.intelligence_score}%</p>
                      {selected.status === "thinking" && (
                        <p className="flex items-center gap-2 text-amber-400 text-sm mt-3">
                          <Brain className="h-4 w-4 animate-pulse" /> Neural processing active
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm"><Settings2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="mt-6 grid sm:grid-cols-3 gap-3">
                    {["Memory sync", "Tool chain", "Autonomous"].map((m) => (
                      <div key={m} className="glass rounded-xl p-3 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-muted">{m}</p>
                        <p className="text-emerald-400 text-sm font-medium mt-1">Online</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2 font-mono text-xs max-h-40 overflow-y-auto">
                    {["Routing task to Workflow AI", "Updating semantic memory", "Generating response draft", "Confidence: 97.2%"].map((log, i) => (
                      <motion.div
                        key={log}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.25 }}
                        className="glass rounded-lg px-3 py-2 text-secondary border-l-2 border-[#7C3AED]"
                      >
                        [{new Date().toLocaleTimeString()}] {log}
                      </motion.div>
                    ))}
                  </div>
                </HoloCard>
              </motion.div>
            ) : (
              <HoloCard className="flex items-center justify-center min-h-[280px] text-muted">
                Select an agent on the neural mesh to inspect live cognition
              </HoloCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
