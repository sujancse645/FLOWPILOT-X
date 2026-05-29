# FlowPilot X

**Autonomous AI Workforce Operating System** — Deploy multiple AI agents that collaborate, automate workflows, and execute intelligent tasks in real time.

![FlowPilot X](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/API-Express-green?style=flat-square)
![CrewAI](https://img.shields.io/badge/AI-CrewAI-purple?style=flat-square)

## Features

- **AI Agents** — Support, Sales, HR, Finance, Analytics, Research, Email, Workflow agents
- **Workflow Builder** — Drag-and-drop React Flow visual orchestration
- **Document AI** — LangChain + ChromaDB embeddings, summarization, Q&A
- **Real-Time** — Socket.io live activity, workflow execution, agent collaboration
- **Multi-Agent Chat** — CrewAI-powered orchestration
- **Analytics** — Enterprise charts with Recharts
- **Voice AI** — Speech interface with animated voice orb
- **Marketplace** — Pre-built workflow automation packs
- **Clerk Auth** — Protected dashboard routes

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, ShadCN-style UI, Framer Motion, React Flow |
| Backend | Node.js Express, Socket.io REST APIs |
| AI | OpenAI, Gemini, CrewAI, LangChain, ChromaDB |
| Database | PostgreSQL / Supabase (`database/schema.sql`) |
| Auth | Clerk |

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
cd backend && npm install
```

### 2. Environment variables

Copy `frontend/.env.example` to `frontend/.env.local`:

```bash
cp frontend/.env.example frontend/.env.local
```

Add your [Clerk](https://clerk.com) keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Run development servers

**Terminal 1 — Backend API (port 4000):**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (port 3000):**
```bash
cd frontend
npm run dev
```

Or from root (after `npm install`):
```bash
npm run dev
```

### 4. Open the app

- **Landing:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard (Clerk optional in dev — see `.env.local`)
- **API Health:** http://localhost:4000/api/health
- **Proxied API:** http://localhost:3000/api/backend/health

## Troubleshooting "Connection failed"

1. **Start the backend first** (required for live data & WebSockets):
   ```bash
   cd backend && npm run dev
   ```
   You should see: `FlowPilot X API running on :4000`

2. **Then start the frontend** (restart after changing `.env.local`):
   ```bash
   cd frontend && npm run dev
   ```

3. **Clerk auth errors** — If sign-in shows "connection failed", you need Clerk keys in `frontend/.env.local`, **or** use dev mode: go directly to http://localhost:3000/dashboard (no keys required).

4. **Socket still offline?** Ensure `NEXT_PUBLIC_SOCKET_URL=http://127.0.0.1:4000` in `.env.local` and nothing is blocking port 4000.

## Project Structure

```
Flowzint/
├── frontend/          # Next.js 15 App Router
│   ├── src/app/       # Pages (public + dashboard)
│   ├── src/components/
│   └── src/hooks/
├── backend/           # Express + Socket.io API
├── ai-services/       # CrewAI + LangChain Python services
├── database/          # PostgreSQL schema
└── README.md
```

## Pages

### Public
- `/` — Landing page
- `/features` — Feature details
- `/pricing` — Pricing tiers
- `/about` — Mission, team, timeline
- `/contact` — Contact form

### Dashboard (protected)
- `/dashboard` — Command center
- `/dashboard/agents` — AI agent management
- `/dashboard/workflows` — Visual workflow builder
- `/dashboard/documents` — Document intelligence
- `/dashboard/conversations` — Multi-agent chat
- `/dashboard/automation` — Automation templates
- `/dashboard/analytics` — Analytics dashboard
- `/dashboard/voice` — Voice AI
- `/dashboard/marketplace` — Workflow marketplace
- `/dashboard/integrations` — Tool integrations
- `/dashboard/settings` — Account settings

## AI Services (Python)

```bash
cd ai-services
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...

python crew_orchestrator.py
python document_processor.py
```

## Database

Apply schema to PostgreSQL/Supabase:

```bash
psql $DATABASE_URL -f database/schema.sql
```

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Railway / Render |
| Database | Supabase |
| Vector DB | ChromaDB (self-hosted or cloud) |

### Vercel
```bash
cd frontend
vercel
```

Set environment variables in Vercel dashboard (Clerk keys, `NEXT_PUBLIC_API_URL`).

### Railway (Backend)
Deploy `backend/` folder, set `PORT=4000` and `FRONTEND_URL=https://your-app.vercel.app`.

## Design System

- **Background:** `#050816`
- **Primary:** `#7C3AED`
- **Secondary:** `#06B6D4`
- **Fonts:** Inter, Space Grotesk
- **Effects:** Glassmorphism, glow borders, particle backgrounds, AI pulse animations

## License

MIT
