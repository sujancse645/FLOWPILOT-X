"use client";

import type {
  AgentRecord,
  ActivityRecord,
  ConversationRecord,
  DocumentRecord,
  MessageRecord,
  NotificationRecord,
  WorkflowExecutionRecord,
  WorkflowRecord,
  WorkspaceSettings,
} from "./types";

const KEYS = {
  agents: "fpx_agents",
  conversations: "fpx_conversations",
  messages: "fpx_messages",
  documents: "fpx_documents",
  activities: "fpx_activities",
  workflows: "fpx_workflows",
  executions: "fpx_executions",
  notifications: "fpx_notifications",
  settings: "fpx_settings",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(`fpx:${key}`, { detail: value }));
}

const DEFAULT_AGENTS: AgentRecord[] = [
  { id: "1", name: "Support AI", type: "support", status: "active", intelligence_score: 94, tasks: 12, avatar: "🎧", memory: ["Ticket patterns", "Refund policy v2"], task_history: [], updated_at: new Date().toISOString() },
  { id: "2", name: "Sales AI", type: "sales", status: "active", intelligence_score: 91, tasks: 8, avatar: "💼", memory: ["Lead scoring model"], task_history: [], updated_at: new Date().toISOString() },
  { id: "3", name: "HR AI", type: "hr", status: "idle", intelligence_score: 88, tasks: 3, avatar: "👥", memory: [], task_history: [], updated_at: new Date().toISOString() },
  { id: "4", name: "Finance AI", type: "finance", status: "active", intelligence_score: 96, tasks: 15, avatar: "📊", memory: ["Invoice rules"], task_history: [], updated_at: new Date().toISOString() },
  { id: "5", name: "Analytics AI", type: "analytics", status: "thinking", intelligence_score: 97, tasks: 6, avatar: "📈", memory: [], task_history: [], updated_at: new Date().toISOString() },
  { id: "6", name: "Research AI", type: "research", status: "idle", intelligence_score: 92, tasks: 4, avatar: "🔬", memory: [], task_history: [], updated_at: new Date().toISOString() },
  { id: "7", name: "Email AI", type: "email", status: "active", intelligence_score: 89, tasks: 22, avatar: "✉️", memory: [], task_history: [], updated_at: new Date().toISOString() },
  { id: "8", name: "Workflow AI", type: "workflow", status: "executing", intelligence_score: 95, tasks: 18, avatar: "⚡", memory: [], task_history: [], updated_at: new Date().toISOString() },
];

export function initLocalStore() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEYS.agents)) write(KEYS.agents, DEFAULT_AGENTS);
  if (!localStorage.getItem(KEYS.settings)) {
    write(KEYS.settings, { org_name: "My Organization", onboarding_complete: false, autonomous_default: false } satisfies WorkspaceSettings);
  }
}

export const localStore = {
  getAgents: () => read<AgentRecord[]>(KEYS.agents, DEFAULT_AGENTS),
  setAgents: (v: AgentRecord[]) => write(KEYS.agents, v),
  updateAgent: (id: string, patch: Partial<AgentRecord>) => {
    const agents = localStore.getAgents().map((a) => (a.id === id ? { ...a, ...patch, updated_at: new Date().toISOString() } : a));
    write(KEYS.agents, agents);
    return agents;
  },

  getConversations: () => read<ConversationRecord[]>(KEYS.conversations, []),
  addConversation: (c: ConversationRecord) => {
    const list = [c, ...localStore.getConversations()];
    write(KEYS.conversations, list);
    return list;
  },

  getMessages: (conversationId?: string) => {
    const all = read<MessageRecord[]>(KEYS.messages, []);
    return conversationId ? all.filter((m) => m.conversation_id === conversationId) : all;
  },
  addMessage: (m: MessageRecord) => {
    const list = [...localStore.getMessages(), m];
    write(KEYS.messages, list);
    return list;
  },

  getDocuments: () => read<DocumentRecord[]>(KEYS.documents, []),
  setDocuments: (v: DocumentRecord[]) => write(KEYS.documents, v),
  updateDocument: (id: string, patch: Partial<DocumentRecord>) => {
    const docs = localStore.getDocuments().map((d) => (d.id === id ? { ...d, ...patch } : d));
    write(KEYS.documents, docs);
    return docs;
  },

  getActivities: () => read<ActivityRecord[]>(KEYS.activities, []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ),
  addActivity: (a: ActivityRecord) => {
    const list = [a, ...read<ActivityRecord[]>(KEYS.activities, [])].slice(0, 200);
    write(KEYS.activities, list);
    return list;
  },

  getWorkflows: () => read<WorkflowRecord[]>(KEYS.workflows, []),
  setWorkflows: (v: WorkflowRecord[]) => write(KEYS.workflows, v),

  getExecutions: () => read<WorkflowExecutionRecord[]>(KEYS.executions, []),
  addExecution: (e: WorkflowExecutionRecord) => {
    const list = [e, ...read<WorkflowExecutionRecord[]>(KEYS.executions, [])].slice(0, 50);
    write(KEYS.executions, list);
    return list;
  },
  updateExecution: (id: string, patch: Partial<WorkflowExecutionRecord>) => {
    const list = localStore.getExecutions().map((e) => (e.id === id ? { ...e, ...patch } : e));
    write(KEYS.executions, list);
    return list;
  },

  getNotifications: () => read<NotificationRecord[]>(KEYS.notifications, []),
  addNotification: (n: NotificationRecord) => {
    const list = [n, ...read<NotificationRecord[]>(KEYS.notifications, [])].slice(0, 30);
    write(KEYS.notifications, list);
    return list;
  },
  markNotificationRead: (id: string) => {
    const list = localStore.getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    write(KEYS.notifications, list);
    return list;
  },

  getSettings: () =>
    read<WorkspaceSettings>(KEYS.settings, { org_name: "My Organization", onboarding_complete: false, autonomous_default: false }),
  setSettings: (s: WorkspaceSettings) => write(KEYS.settings, s),

  subscribe: (key: keyof typeof KEYS, cb: () => void) => {
    const handler = () => cb();
    window.addEventListener(`fpx:${KEYS[key]}`, handler);
    return () => window.removeEventListener(`fpx:${KEYS[key]}`, handler);
  },
};
