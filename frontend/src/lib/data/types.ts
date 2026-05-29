export type AgentRecord = {
  id: string;
  name: string;
  type: string;
  status: "idle" | "active" | "thinking" | "executing";
  intelligence_score: number;
  tasks: number;
  avatar: string;
  memory?: string[];
  task_history?: TaskRecord[];
  org_id?: string;
  updated_at?: string;
};

export type TaskRecord = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export type MessageRecord = {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agent_name?: string;
  created_at: string;
};

export type ConversationRecord = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type DocumentRecord = {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  status: "uploading" | "embedding" | "indexing" | "ready" | "error";
  summary?: string;
  insights?: string[];
  embedding_progress?: number;
  created_at: string;
};

export type ActivityRecord = {
  id: string;
  event_type: string;
  agent_name?: string;
  message: string;
  payload?: Record<string, unknown>;
  created_at: string;
};

export type WorkflowRecord = {
  id: string;
  name: string;
  nodes: unknown[];
  edges: unknown[];
  status: string;
  execution_count: number;
  updated_at: string;
};

export type WorkflowExecutionRecord = {
  id: string;
  workflow_id: string;
  status: string;
  timeline: ExecutionStep[];
  started_at: string;
  completed_at?: string;
};

export type ExecutionStep = {
  node_id: string;
  label: string;
  status: "pending" | "running" | "completed" | "failed";
  started_at: string;
  completed_at?: string;
  reasoning?: string;
};

export type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};

export type WorkspaceSettings = {
  org_name: string;
  onboarding_complete: boolean;
  autonomous_default: boolean;
};
