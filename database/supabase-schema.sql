-- FlowPilot X — Supabase schema (run in Supabase SQL editor)

-- Organizations & users (sync with Clerk via webhook in production)
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  clerk_org_id text unique,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  email text,
  full_name text,
  avatar_url text,
  org_id uuid references organizations(id),
  role text default 'member',
  created_at timestamptz default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  name text not null,
  type text not null,
  config jsonb default '{}',
  status text default 'idle',
  intelligence_score int default 85,
  created_at timestamptz default now()
);

create table if not exists workflows (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  name text not null,
  nodes jsonb default '[]',
  edges jsonb default '[]',
  status text default 'draft',
  created_at timestamptz default now()
);

create table if not exists workflow_executions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid references workflows(id) on delete cascade,
  status text default 'running',
  timeline jsonb default '[]',
  result jsonb,
  started_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  title text,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  name text not null,
  storage_path text,
  status text default 'processing',
  summary text,
  created_at timestamptz default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id),
  event_type text not null,
  agent_name text,
  message text,
  payload jsonb default '{}',
  created_at timestamptz default now()
);

alter publication supabase_realtime add table activity_logs;
