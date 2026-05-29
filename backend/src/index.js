import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
].filter(Boolean);

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Mock data store
const store = {
  agents: [],
  workflows: [],
  activities: [],
  documents: [],
};

// Seed default agents
const defaultAgents = [
  { id: "1", name: "Support AI", type: "support", status: "active", intelligence_score: 94, tasks: 12, avatar: "🎧" },
  { id: "2", name: "Sales AI", type: "sales", status: "active", intelligence_score: 91, tasks: 8, avatar: "💼" },
  { id: "3", name: "HR AI", type: "hr", status: "idle", intelligence_score: 88, tasks: 3, avatar: "👥" },
  { id: "4", name: "Finance AI", type: "finance", status: "active", intelligence_score: 96, tasks: 15, avatar: "📊" },
  { id: "5", name: "Analytics AI", type: "analytics", status: "thinking", intelligence_score: 97, tasks: 6, avatar: "📈" },
  { id: "6", name: "Research AI", type: "research", status: "idle", intelligence_score: 92, tasks: 4, avatar: "🔬" },
  { id: "7", name: "Email AI", type: "email", status: "active", intelligence_score: 89, tasks: 22, avatar: "✉️" },
  { id: "8", name: "Workflow AI", type: "workflow", status: "active", intelligence_score: 95, tasks: 18, avatar: "⚡" },
];
store.agents = defaultAgents;

// Health
app.get("/api/health", (_, res) => res.json({ status: "ok", service: "FlowPilot X API" }));

// Dashboard stats
app.get("/api/dashboard/stats", (_, res) => {
  res.json({
    totalAgents: 8,
    activeWorkflows: 24,
    tasksCompleted: 1847,
    aiAccuracy: 97.3,
    customerSatisfaction: 4.8,
    automationRate: 78.5,
  });
});

// Agents
app.get("/api/agents", (_, res) => res.json(store.agents));
app.get("/api/agents/:id", (req, res) => {
  const agent = store.agents.find((a) => a.id === req.params.id);
  if (!agent) return res.status(404).json({ error: "Not found" });
  res.json(agent);
});
app.post("/api/agents", (req, res) => {
  const agent = { id: uuidv4(), ...req.body, status: "idle", tasks: 0 };
  store.agents.push(agent);
  io.emit("agent:created", agent);
  res.json(agent);
});
app.patch("/api/agents/:id", (req, res) => {
  const idx = store.agents.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  store.agents[idx] = { ...store.agents[idx], ...req.body };
  io.emit("agent:updated", store.agents[idx]);
  res.json(store.agents[idx]);
});

// Workflows
app.get("/api/workflows", (_, res) => res.json(store.workflows));
app.post("/api/workflows", (req, res) => {
  const workflow = { id: uuidv4(), ...req.body, status: "draft", createdAt: new Date().toISOString() };
  store.workflows.push(workflow);
  res.json(workflow);
});
app.post("/api/workflows/:id/execute", (req, res) => {
  const executionId = uuidv4();
  io.emit("workflow:execution:start", { workflowId: req.params.id, executionId });
  const nodes = ["trigger", "ai-analysis", "classification", "email"];
  nodes.forEach((node, i) => {
    setTimeout(() => {
      io.emit("workflow:execution:step", {
        executionId,
        workflowId: req.params.id,
        node,
        status: "completed",
        progress: ((i + 1) / nodes.length) * 100,
      });
    }, (i + 1) * 1500);
  });
  setTimeout(() => {
    io.emit("workflow:execution:complete", { executionId, workflowId: req.params.id });
  }, nodes.length * 1500 + 500);
  res.json({ executionId, status: "running" });
});

// Documents
app.get("/api/documents", (_, res) => res.json(store.documents));
app.post("/api/documents", (req, res) => {
  const doc = {
    id: uuidv4(),
    ...req.body,
    status: "processing",
    createdAt: new Date().toISOString(),
  };
  store.documents.push(doc);
  io.emit("document:processing", doc);
  setTimeout(() => {
    doc.status = "ready";
    doc.summary = "AI-generated summary: Key insights extracted from document with high confidence.";
    doc.insights = ["Revenue increased 23%", "Customer churn down 5%", "Q4 targets on track"];
    io.emit("document:ready", doc);
  }, 3000);
  res.json(doc);
});

// AI Chat
app.post("/api/ai/chat", async (req, res) => {
  const { message, agentType = "support" } = req.body;
  const responses = {
    support: `I've analyzed your request: "${message?.slice(0, 50)}...". Based on our knowledge base, I recommend escalating to tier-2 with automated follow-up in 2 hours.`,
    sales: `Great opportunity detected! Lead score: 87/100. Suggested next action: personalized demo email with ROI calculator.`,
    default: `FlowPilot AI processed your query. Task delegated to ${agentType} agent. Estimated completion: 45 seconds.`,
  };
  const reply = responses[agentType] || responses.default;
  io.emit("ai:activity", { agent: agentType, action: "responded", message: reply.slice(0, 80) });
  res.json({ reply, agent: agentType, timestamp: new Date().toISOString() });
});

// Analytics
app.get("/api/analytics", (_, res) => {
  res.json({
    workflowCompletion: [
      { month: "Jan", completed: 120, failed: 8 },
      { month: "Feb", completed: 145, failed: 6 },
      { month: "Mar", completed: 178, failed: 5 },
      { month: "Apr", completed: 210, failed: 7 },
      { month: "May", completed: 245, failed: 4 },
    ],
    aiEfficiency: [
      { day: "Mon", score: 92 },
      { day: "Tue", score: 94 },
      { day: "Wed", score: 91 },
      { day: "Thu", score: 96 },
      { day: "Fri", score: 97 },
      { day: "Sat", score: 95 },
      { day: "Sun", score: 93 },
    ],
    usageTrends: [
      { date: "1", agents: 45, workflows: 32 },
      { date: "5", agents: 52, workflows: 38 },
      { date: "10", agents: 61, workflows: 45 },
      { date: "15", agents: 58, workflows: 52 },
      { date: "20", agents: 72, workflows: 61 },
      { date: "25", agents: 78, workflows: 68 },
      { date: "30", agents: 85, workflows: 74 },
    ],
    satisfaction: 4.8,
    savings: 124500,
    responseQuality: 97.3,
  });
});

// Marketplace
app.get("/api/marketplace", (_, res) => {
  res.json([
    { id: "1", name: "Support Automation Pack", category: "support", rating: 4.9, installs: 2340, trending: true, description: "Complete customer support automation" },
    { id: "2", name: "HR Onboarding Suite", category: "hr", rating: 4.7, installs: 1820, trending: true, description: "Automated employee onboarding" },
    { id: "3", name: "Finance Reconciliation", category: "finance", rating: 4.8, installs: 1560, trending: false, description: "Invoice and payment automation" },
    { id: "4", name: "CRM Lead Pipeline", category: "crm", rating: 4.6, installs: 2100, trending: true, description: "Lead scoring and nurturing" },
    { id: "5", name: "Email Campaign AI", category: "email", rating: 4.9, installs: 3200, trending: true, description: "Smart email sequences" },
  ]);
});

// Automations
app.get("/api/automations", (_, res) => {
  res.json([
    { id: "1", name: "Customer Support Triage", template_type: "customer_support", active: true, runs: 456 },
    { id: "2", name: "Lead Qualification", template_type: "lead_qualification", active: true, runs: 234 },
    { id: "3", name: "Resume Screening", template_type: "resume_screening", active: false, runs: 89 },
    { id: "4", name: "Email Drafting", template_type: "email_drafting", active: true, runs: 678 },
    { id: "5", name: "Report Generation", template_type: "report_generation", active: true, runs: 123 },
    { id: "6", name: "Invoice Processing", template_type: "invoice_processing", active: false, runs: 45 },
  ]);
});

// Activity feed
app.get("/api/activities", (_, res) => {
  res.json([
    { id: "1", type: "agent", message: "Support AI resolved ticket #4521", time: "2m ago", agent: "Support AI" },
    { id: "2", type: "workflow", message: "Lead nurture workflow completed", time: "5m ago", agent: "Workflow AI" },
    { id: "3", type: "agent", message: "Finance AI processed 12 invoices", time: "8m ago", agent: "Finance AI" },
    { id: "4", type: "system", message: "System optimization complete", time: "12m ago", agent: "System" },
    { id: "5", type: "agent", message: "Sales AI qualified 3 new leads", time: "15m ago", agent: "Sales AI" },
  ]);
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.emit("system:status", { status: "online", agents: store.agents.filter((a) => a.status === "active").length });

  socket.on("agent:thinking", (data) => {
    io.emit("agent:thinking", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// Simulate live AI activity
setInterval(() => {
  const agent = store.agents[Math.floor(Math.random() * store.agents.length)];
  const actions = ["analyzing data", "processing request", "delegating task", "updating memory", "executing workflow"];
  io.emit("ai:activity", {
    agent: agent.name,
    action: actions[Math.floor(Math.random() * actions.length)],
    timestamp: new Date().toISOString(),
  });
}, 8000);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`FlowPilot X API running on :${PORT}`));
