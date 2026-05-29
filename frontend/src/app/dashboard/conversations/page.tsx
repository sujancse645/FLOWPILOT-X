"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
}

const agents = ["Support AI", "Sales AI", "Analytics AI"];

export default function ConversationsPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! I'm your multi-agent command center. How can our AI workforce assist you today?", agent: "Support AI" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    try {
      const res = await api<{ reply: string; agent: string }>("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: input, agentType: "support" }),
      });
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: "assistant", content: res.reply, agent: agents[Math.floor(Math.random() * agents.length)] },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "I'm processing your request across our agent network...", agent: "Workflow AI" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Conversations</h1>
        <p className="text-sm text-[#94a3b8]">Multi-agent collaboration interface</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden glow-border p-1">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white"
                  : "glass border border-white/10"
              }`}>
                {msg.agent && (
                  <div className="flex items-center gap-1.5 text-xs text-[#a78bfa] mb-1">
                    <Bot className="h-3 w-3" /> {msg.agent}
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-1.5 glass rounded-2xl px-4 py-3 w-fit">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="h-2 w-2 rounded-full bg-[#7C3AED]" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-white/5 p-4 flex gap-2">
          <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
          <Input
            placeholder="Message your AI workforce..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1"
          />
          <Button onClick={send}><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
