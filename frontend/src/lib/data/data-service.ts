"use client";

import { getSupabase, isSupabaseEnabled } from "@/lib/supabase/client";
import { localStore, initLocalStore } from "./local-store";
import { api } from "@/lib/api";
import type {
  AgentRecord,
  ActivityRecord,
  ConversationRecord,
  DocumentRecord,
  MessageRecord,
  WorkflowExecutionRecord,
} from "./types";

initLocalStore();

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Agents — Supabase → local persistence → API fallback */
export async function fetchAgents(): Promise<AgentRecord[]> {
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    const { data, error } = await supabase.from("agents").select("*").order("updated_at", { ascending: false });
    if (!error && data?.length) {
      const mapped = data.map(mapAgentRow);
      localStore.setAgents(mapped);
      return mapped;
    }
  }
  try {
    const remote = await api<AgentRecord[]>("/api/agents");
    localStore.setAgents(remote);
    return remote;
  } catch {
    return localStore.getAgents();
  }
}

function mapAgentRow(row: Record<string, unknown>): AgentRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    type: String(row.type),
    status: (row.status as AgentRecord["status"]) || "idle",
    intelligence_score: Number(row.intelligence_score) || 85,
    tasks: Number(row.tasks) || 0,
    avatar: String(row.avatar || "🤖"),
    memory: (row.memory as string[]) || [],
    task_history: (row.task_history as AgentRecord["task_history"]) || [],
    updated_at: String(row.updated_at || new Date().toISOString()),
  };
}

export async function saveAgent(agent: Partial<AgentRecord> & { name: string; type: string }) {
  const record: AgentRecord = {
    id: agent.id || uid(),
    name: agent.name,
    type: agent.type,
    status: agent.status || "idle",
    intelligence_score: agent.intelligence_score ?? 85,
    tasks: agent.tasks ?? 0,
    avatar: agent.avatar || "🤖",
    memory: agent.memory || [],
    task_history: agent.task_history || [],
    updated_at: new Date().toISOString(),
  };
  const agents = [...localStore.getAgents().filter((a) => a.id !== record.id), record];
  localStore.setAgents(agents);

  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    await supabase.from("agents").upsert({
      id: record.id,
      name: record.name,
      type: record.type,
      status: record.status,
      intelligence_score: record.intelligence_score,
      config: { avatar: record.avatar, tasks: record.tasks, memory: record.memory },
    });
  }
  return record;
}

export async function logActivity(message: string, agentName?: string, eventType = "system") {
  const entry: ActivityRecord = {
    id: uid(),
    event_type: eventType,
    agent_name: agentName,
    message,
    created_at: new Date().toISOString(),
  };
  localStore.addActivity(entry);
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    await supabase.from("activity_logs").insert({
      event_type: eventType,
      agent_name: agentName,
      message,
      payload: {},
    });
  }
  return entry;
}

export function getActivitiesLocal() {
  return localStore.getActivities();
}

export async function fetchConversations(): Promise<ConversationRecord[]> {
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    const { data } = await supabase.from("conversations").select("*").order("updated_at", { ascending: false });
    if (data?.length) return data as ConversationRecord[];
  }
  return localStore.getConversations();
}

export async function getOrCreateDefaultConversation(): Promise<ConversationRecord> {
  const existing = localStore.getConversations()[0];
  if (existing) return existing;
  const c: ConversationRecord = {
    id: uid(),
    title: "Command Center Chat",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  localStore.addConversation(c);
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    await supabase.from("conversations").insert({ id: c.id, title: c.title });
  }
  return c;
}

export async function fetchMessages(conversationId: string): Promise<MessageRecord[]> {
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (data?.length) return data as MessageRecord[];
  }
  return localStore.getMessages(conversationId);
}

export async function sendMessage(conversationId: string, content: string, role: "user" | "assistant", agentName?: string) {
  const msg: MessageRecord = {
    id: uid(),
    conversation_id: conversationId,
    role,
    content,
    agent_name: agentName,
    created_at: new Date().toISOString(),
  };
  localStore.addMessage(msg);
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      role,
      content,
      agent_name: agentName,
    });
  }
  if (role === "user") {
    await logActivity(`User message in conversation`, agentName, "conversation");
  }
  return msg;
}

export async function fetchDocuments(): Promise<DocumentRecord[]> {
  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (data?.length) {
      const mapped = data.map((d) => mapDocRow(d as Record<string, unknown>));
      localStore.setDocuments(mapped);
      return mapped;
    }
  }
  try {
    const remote = await api<DocumentRecord[]>("/api/documents");
    localStore.setDocuments(remote);
    return remote;
  } catch {
    return localStore.getDocuments();
  }
}

function mapDocRow(row: Record<string, unknown>): DocumentRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    file_type: String(row.file_type || "pdf"),
    file_size: Number(row.file_size) || 0,
    status: (row.status as DocumentRecord["status"]) || "ready",
    summary: row.summary as string | undefined,
    insights: row.insights as string[] | undefined,
    embedding_progress: Number(row.embedding_progress) || 100,
    created_at: String(row.created_at || new Date().toISOString()),
  };
}

export async function uploadDocument(name: string, fileType: string, fileSize: number): Promise<DocumentRecord> {
  const doc: DocumentRecord = {
    id: uid(),
    name,
    file_type: fileType,
    file_size: fileSize,
    status: "uploading",
    embedding_progress: 0,
    created_at: new Date().toISOString(),
  };
  const docs = [doc, ...localStore.getDocuments()];
  localStore.setDocuments(docs);

  const supabase = getSupabase();
  if (supabase && isSupabaseEnabled()) {
    await supabase.from("documents").insert({
      id: doc.id,
      name: doc.name,
      file_type: fileType,
      status: "uploading",
    });
  }

  await logActivity(`Document uploaded: ${name}`, undefined, "document");

  // Simulate embedding pipeline with persisted state updates
  const stages: Array<{ status: DocumentRecord["status"]; progress: number; delay: number }> = [
    { status: "embedding", progress: 35, delay: 800 },
    { status: "indexing", progress: 72, delay: 1200 },
    { status: "ready", progress: 100, delay: 1000 },
  ];

  let current = { ...doc };
  for (const stage of stages) {
    await new Promise((r) => setTimeout(r, stage.delay));
    current = {
      ...current,
      status: stage.status,
      embedding_progress: stage.progress,
      ...(stage.status === "ready"
        ? {
            summary: `Executive summary: ${name} analyzed with high-confidence extraction. Key themes identified across financial and operational sections.`,
            insights: ["Revenue trend +23% YoY", "Churn reduced 5.2%", "Q4 targets on track", "3 action items flagged"],
          }
        : {}),
    };
    localStore.updateDocument(doc.id, current);
    if (supabase && isSupabaseEnabled()) {
      await supabase.from("documents").update({ status: current.status, summary: current.summary }).eq("id", doc.id);
    }
  }

  await logActivity(`Document indexed: ${name}`, "Analytics AI", "document");
  return localStore.getDocuments().find((d) => d.id === doc.id)!;
}

export function saveExecution(exec: WorkflowExecutionRecord) {
  return localStore.addExecution(exec);
}

export function getExecutions() {
  return localStore.getExecutions();
}

export { localStore };
