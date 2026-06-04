"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Plus, Settings, MessageSquare, History, Cpu } from "lucide-react";
import { api } from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agentCreated?: {
    name: string;
    role: string;
    avatar: string;
    [key: string]: unknown;
  };
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am your FlowPilot AI Architect. You can chat with me, or ask me to build a specialized AI agent for you. (e.g., 'Build me a data scraping agent')",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      // Send to our backend API
      const res = await fetch("http://localhost:4000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: "assistant", 
          content: data.reply,
          agentCreated: data.agentCreated 
        }
      ]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "system", content: "Error connecting to AI service." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-[260px] bg-zinc-900 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-4">
          <button className="w-full flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-lg transition-colors">
            <Plus size={16} />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <p className="text-xs text-white/40 font-medium px-2 py-2">Today</p>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-sm text-left">
            <MessageSquare size={16} className="text-white/60" />
            <span className="truncate">Agent Builder Session</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-left">
            <MessageSquare size={16} className="text-white/60" />
            <span className="truncate">Data Analysis Task</span>
          </button>
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-left">
            <Cpu size={16} className="text-white/60" />
            <span>Active Agents</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-left">
            <Settings size={16} className="text-white/60" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-md z-10">
          <div className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="text-violet-400" size={20} />
            FlowPilot Architect
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-40">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Bot size={18} className="text-violet-400" />
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                  msg.role === "user" 
                    ? "bg-white/10 text-white" 
                    : msg.role === "system"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-transparent text-gray-200"
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  
                  {/* Dynamic Agent Card if built */}
                  {msg.agentCreated && (
                    <div className="mt-4 p-4 rounded-xl border border-violet-500/30 bg-violet-500/5 flex items-center gap-4">
                      <div className="text-4xl">{msg.agentCreated.avatar || "🤖"}</div>
                      <div>
                        <h4 className="font-semibold text-white">{msg.agentCreated.name}</h4>
                        <p className="text-sm text-gray-400">{msg.agentCreated.role}</p>
                        <div className="mt-2 text-xs bg-violet-600/20 text-violet-300 px-2 py-1 rounded inline-block">
                          Successfully Deployed
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <User size={18} className="text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                  <Sparkles size={16} className="text-violet-400 animate-pulse" />
                </div>
                <div className="px-5 py-3.5">
                  <div className="flex gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-8 px-4">
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex items-center rounded-2xl bg-white/5 border border-white/10 focus-within:border-white/30 focus-within:bg-white/10 transition-all shadow-2xl overflow-hidden">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message FlowPilot, or say 'Build an agent that...'"
                className="w-full bg-transparent text-white px-5 py-4 max-h-32 focus:outline-none resize-none"
                rows={1}
                style={{ minHeight: "56px" }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-3 p-2 rounded-xl bg-white text-black disabled:bg-white/20 disabled:text-white/40 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-center text-xs text-white/40 mt-3">
              FlowPilot Architect can dynamically build, deploy, and execute CrewAI agents.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
