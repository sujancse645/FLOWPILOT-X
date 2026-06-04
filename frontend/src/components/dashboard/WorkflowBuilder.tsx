"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow, Background, Controls, MiniMap, addEdge,
  useNodesState, useEdgesState, type Connection, type Node, type Edge,
  Handle, Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Play, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workflowNodeTypes } from "@/data/mock";
import { api } from "@/lib/api";
import { saveExecution, logActivity } from "@/lib/data/data-service";
import type { WorkflowExecutionRecord } from "@/lib/data/types";
import { WorkflowReplay } from "@/components/workflow/WorkflowReplay";

const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 250, y: 150 }, data: { label: "Incoming Support Ticket", type: "trigger", color: "#22D3EE" } },
  { id: "2", type: "custom", position: { x: 600, y: 100 }, data: { label: "Analyze Sentiment", type: "ai-analysis", color: "#64748B", executing: true } },
  { id: "3", type: "custom", position: { x: 600, y: 250 }, data: { label: "Check Knowledge Base", type: "agent-task", color: "#64748B" } },
  { id: "4", type: "custom", position: { x: 950, y: 150 }, data: { label: "Draft Resolution", type: "email", color: "#34D399" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#22D3EE" } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#22D3EE" } },
  { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#64748B" } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#64748B" } },
];

function CustomNode({ data }: { data: { label: string; color: string; executing?: boolean } }) {
  return (
    <motion.div
      className={`relative bg-background-secondary rounded-xl px-4 py-3 min-w-[150px] border transition-all shadow-md ${
        data.executing ? "border-cyan-400/50" : "border-white/10"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-white/20 !border-0" />
      <div className="flex items-center gap-2">
        <motion.div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.color }}
          animate={data.executing ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span className="text-sm font-medium text-text-primary">{data.label}</span>
      </div>
      {data.executing && <div className="absolute inset-0 rounded-xl bg-cyan-400/5 pointer-events-none" />}
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-white/20 !border-0" />
    </motion.div>
  );
}

const nodeTypes = { custom: CustomNode };

interface WorkflowBuilderProps {
  onExecute?: () => void;
}

export function WorkflowBuilder({ onExecute }: WorkflowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [executing, setExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastExecution, setLastExecution] = useState<WorkflowExecutionRecord | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#22D3EE" } }, eds)),
    [setEdges]
  );

  const addNode = useCallback((type: string, label: string, color: string) => {
    // eslint-disable-next-line
    const id = `${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      // eslint-disable-next-line
      { id, type: "custom", position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 50 }, data: { label, type, color } },
    ]);
  }, [setNodes]);

  const execute = async () => {
    setExecuting(true);
    setProgress(0);
    onExecute?.();
    const nodeIds = ["1", "2", "3", "4"];
    const labels = ["Trigger", "AI Analysis", "Classification", "Email"];
    const started = new Date().toISOString();
    const timeline: WorkflowExecutionRecord["timeline"] = [];

    for (let i = 0; i < nodeIds.length; i++) {
      timeline.push({
        node_id: nodeIds[i],
        label: labels[i],
        status: "running",
        started_at: new Date().toISOString(),
        reasoning: i === 1 ? "Analyzing intent with neural classifier" : i === 2 ? "Routing to optimal branch" : undefined,
      });
      await new Promise((r) => setTimeout(r, 1200));
      timeline[i] = { ...timeline[i], status: "completed", completed_at: new Date().toISOString() };
      setNodes((nds) =>
        nds.map((n) => ({ ...n, data: { ...n.data, executing: n.id === nodeIds[i] } }))
      );
      setProgress(((i + 1) / nodeIds.length) * 100);
    }
    await new Promise((r) => setTimeout(r, 500));
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, executing: false } })));
    setExecuting(false);

    const exec: WorkflowExecutionRecord = {
      id: `${Date.now()}`,
      workflow_id: "demo",
      status: "completed",
      timeline,
      started_at: started,
      completed_at: new Date().toISOString(),
    };
    saveExecution(exec);
    setLastExecution(exec);
    await logActivity("Workflow execution completed", "Workflow AI", "workflow");

    try {
      await api("/api/workflows/demo/execute", { method: "POST" });
    } catch { /* demo */ }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {workflowNodeTypes.slice(0, 6).map((nt) => (
            <button
              key={nt.type}
              onClick={() => addNode(nt.type, nt.label, nt.color)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-text-secondary hover:text-white hover:bg-white/10 transition-all"
            >
              <Plus className="h-3 w-3 inline mr-1" />
              {nt.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-background-secondary border-white/10"><Save className="h-4 w-4 mr-1.5" /> Save</Button>
          <Button size="sm" onClick={execute} disabled={executing} className="bg-cyan-500 text-black hover:bg-cyan-400">
            <Play className="h-4 w-4 mr-1.5" /> {executing ? "Executing..." : "Execute"}
          </Button>
        </div>
      </div>

      {executing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-cyan-400 font-medium">Workflow executing...</span>
            <span className="text-text-muted">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full bg-cyan-400" animate={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}

      {lastExecution && !executing && (
        <WorkflowReplay execution={lastExecution} />
      )}

      <div className="rounded-2xl overflow-hidden border border-white/10 bg-background" style={{ height: "calc(100vh - 280px)", minHeight: 400 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#0B0F17]"
        >
          <Background color="#22D3EE" gap={24} size={1} style={{ opacity: 0.1 }} />
          <Controls className="!bg-background-secondary !border-white/10 !rounded-xl !shadow-sm" />
          <MiniMap nodeColor={(n) => n.data.color || "#64748B"} maskColor="rgba(11, 15, 23, 0.8)" className="!bg-background-secondary !border-white/10 !rounded-xl" />
        </ReactFlow>
      </div>
    </div>
  );
}
