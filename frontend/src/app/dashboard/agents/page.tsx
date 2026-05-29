"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Brain, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { AgentEliteCard } from "@/components/elite/AgentEliteCard";
import { NeuralCommandCenter } from "@/components/neural/NeuralCommandCenter";
import { MemoryGraph } from "@/components/neural/MemoryGraph";
import { HoloCard } from "@/components/fx/HoloCard";
import { Button } from "@/components/ui/button";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";
import { usePersistedAgents } from "@/hooks/usePersistedAgents";
import type { AgentRecord } from "@/lib/data/types";

export default function AgentsPage() {
  const { agents, loading } = usePersistedAgents();
  const [selected, setSelected] = useState<AgentRecord | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Neural Workforce"
        title="AI Agent Command"
        description="Persistent AI workforce with memory, task history, and live collaboration."
        action={
          <div className="flex gap-2">
            <AutonomousToggle />
            <Button className="glow-purple"><Plus className="h-4 w-4" /> Deploy</Button>
          </div>
        }
      />

      <NeuralCommandCenter
        height={480}
        showControls
        activeAgentId={selected?.type}
        onAgentSelect={(id) => {
          const a = agents.find((x) => x.type === id || x.id === id);
          if (a) setSelected(a);
        }}
      />

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

      <div className="grid lg:grid-cols-2 gap-6">
        <MemoryGraph height={300} />
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <HoloCard glow>
                <div className="flex items-start gap-5">
                  <span className="text-6xl">{selected.avatar}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-white">{selected.name}</h3>
                    <p className="text-[#8B5CF6] capitalize text-sm mt-1">{selected.type}</p>
                  </div>
                  <Button variant="outline" size="sm"><Settings2 className="h-4 w-4" /></Button>
                </div>
                <div className="mt-6 space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
                  {["Memory graph synced", "Collaboration channel open", "Autonomous mode ready"].map((log, i) => (
                    <motion.div
                      key={log}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="glass rounded-lg px-3 py-2 text-secondary border-l-2 border-[#06B6D4]"
                    >
                      <Brain className="h-3 w-3 inline mr-1 text-violet-400" />
                      {log}
                    </motion.div>
                  ))}
                </div>
              </HoloCard>
            </motion.div>
          ) : (
            <HoloCard className="flex items-center justify-center min-h-[280px] text-muted">
              Select an agent on the neural mesh
            </HoloCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
