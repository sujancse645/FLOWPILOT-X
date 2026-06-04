"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Bot, GitBranch, Zap, FileText, BarChart3, Rocket, Users, Mic, Plug,
} from "lucide-react";

const features = [
  { icon: Bot, title: "AI Agents", desc: "Deploy specialized agents with custom prompts, tools, and autonomous mode." },
  { icon: GitBranch, title: "Workflow Builder", desc: "Drag-and-drop neural automation with live execution streams." },
  { icon: Zap, title: "AI Automation", desc: "Pre-built templates for support, leads, resumes, emails, and reports." },
  { icon: FileText, title: "Document Intelligence", desc: "Upload, embed, summarize, and query with ChromaDB + LangChain." },
  { icon: BarChart3, title: "Analytics Engine", desc: "Enterprise insights on efficiency, savings, and AI performance." },
  { icon: Rocket, title: "Autonomous Execution", desc: "CrewAI multi-agent orchestration with delegation and memory." },
  { icon: Users, title: "Team Collaboration", desc: "Multi-agent chat with shared memory and real-time feeds." },
  { icon: Mic, title: "Voice Commands", desc: "Speech interface with reactive AI orb and waveform." },
  { icon: Plug, title: "API Integrations", desc: "Slack, CRM, email, databases, and marketplace packs." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4">
              Platform Capabilities
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Every module engineered for autonomous enterprise AI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-background-secondary rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all">
                <f.icon className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
