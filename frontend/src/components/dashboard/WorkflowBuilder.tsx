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
import { Card } from "@/components/ui/card";
import { workflowNodeTypes } from "@/data/mock";
import { api } from "@/lib/api";
import { saveExecution, logActivity } from "@/lib/data/data-service";
import type { WorkflowExecutionRecord } from "@/lib/data/types";
import { WorkflowReplay } from "@/components/workflow/WorkflowReplay";

const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 100, y: 150 }, data: { label: "Trigger", type: "trigger", color: "#06B6D4" } },
  { id: "2", type: "custom", position: { x: 350, y: 100 }, data: { label: "AI Analysis", type: "ai-analysis", color: "#7C3AED" } },
  { id: "3", type: "custom", position: { x: 350, y: 220 }, data: { label: "Classification", type: "classification", color: "#8B5CF6" } },
  { id: "4", type: "custom", position: { x: 600, y: 150 }, data: { label: "Email", type: "email", color: "#06B6D4" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#7C3AED" } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#7C3AED" } },
  { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#06B6D4" } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#06B6D4" } },
];

function CustomNode({ data }: { data: { label: string; color: string; executing?: boolean } }) {
  return (
    <motion.div
      animate={
        data.executing
          ? {
              boxShadow: [
                `0 0 30px ${data.color}88`,
                `0 0 50px ${data.color}cc`,
                `0 0 30px ${data.color}88`,
              ],
            }
          : {}
      }
      transition={{ duration: 1, repeat: data.executing ? Infinity : 0 }}
      className={`relative holo-panel rounded-xl px-4 py-3 min-w-[150px] border transition-all ${
        data.executing ? "ring-2 ring-emerald-400" : ""
      }`}
      style={{ borderColor: `${data.color}50` }}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-[#7C3AED] !border-0 !shadow-[0_0_8px_#7C3AED]" />
      <div className="flex items-center gap-2">
        <motion.div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: data.color, boxShadow: `0 0 10px ${data.color}` }}
          animate={data.executing ? { scale: [1, 1.4, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
        <span className="text-sm font-medium text-white">{data.label}</span>
      </div>
      {data.executing && <div className="absolute inset-0 rounded-xl shimmer opacity-20 pointer-events-none" />}
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-[#06B6D4] !border-0 !shadow-[0_0_8px_#06B6D4]" />
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
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#7C3AED" } }, eds)),
    [setEdges]
  );

  const addNode = (type: string, label: string, color: string) => {
    const id = `${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      { id, type: "custom", position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 50 }, data: { label, type, color } },
    ]);
  };

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
              className="glass rounded-lg px-3 py-1.5 text-xs text-[#94a3b8] hover:text-white hover:border-[#7C3AED]/50 border border-transparent transition-all"
            >
              <Plus className="h-3 w-3 inline mr-1" />
              {nt.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Save className="h-4 w-4" /> Save</Button>
          <Button size="sm" onClick={execute} disabled={executing}>
            <Play className="h-4 w-4" /> {executing ? "Executing..." : "Execute"}
          </Button>
        </div>
      </div>

      {executing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-emerald-400">Workflow executing...</span>
            <span className="text-[#94a3b8]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-[#06B6D4]" animate={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}

      {lastExecution && !executing && (
        <WorkflowReplay execution={lastExecution} />
      )}

      <div className="holo-panel rounded-2xl overflow-hidden glow-border p-[1px]" style={{ height: "calc(100vh - 280px)", minHeight: 400 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#050816]"
        >
          <Background color="#7C3AED" gap={24} size={1} style={{ opacity: 0.15 }} />
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <Controls className="!glass !border-white/10 !rounded-xl" />
          <MiniMap nodeColor={() => "#7C3AED"} maskColor="rgba(5,8,22,0.8)" className="!glass !border-white/10 !rounded-xl" />
        </ReactFlow>
      </div>
    </div>
  );
}
