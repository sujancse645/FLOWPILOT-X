"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Bot, Brain, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { GlowPanel } from "@/components/elite/GlowPanel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import {
  fetchMessages,
  getOrCreateDefaultConversation,
  localStore,
  sendMessage,
} from "@/lib/data/data-service";
import type { MessageRecord } from "@/lib/data/types";

const AGENTS = ["Support AI", "Sales AI", "Analytics AI", "Workflow AI"];

export default function ConversationsPage() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [reasoning, setReasoning] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const conv = await getOrCreateDefaultConversation();
    setConversationId(conv.id);
    const msgs = await fetchMessages(conv.id);
    if (msgs.length === 0) {
      const welcome = await sendMessage(
        conv.id,
        "Hello! I'm your multi-agent command center. How can our AI workforce assist you today?",
        "assistant",
        "Support AI"
      );
      setMessages([welcome]);
    } else {
      setMessages(msgs);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      load();
    }, 0);
  }, [load]);

  useEffect(() => {
    if (!conversationId) return;
    return localStore.subscribe("messages", async () => {
      setMessages(await fetchMessages(conversationId));
    });
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, reasoning]);

  const send = async () => {
    if (!input.trim() || !conversationId) return;
    const text = input;
    setInput("");
    await sendMessage(conversationId, text, "user");
    setMessages(await fetchMessages(conversationId));
    setTyping(true);
    const phases = [
      "Retrieving context from semantic memory...",
      "Running sentiment analysis...",
      "Delegating to agent cluster...",
      "Routing workflow execution...",
    ];
    for (const p of phases) {
      setReasoning(p);
      await new Promise((r) => setTimeout(r, 450));
    }
    try {
      const res = await api<{ reply: string; agent: string }>("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, agentType: "support" }),
      });
      await sendMessage(conversationId, res.reply, "assistant", res.agent || AGENTS[Math.floor(Math.random() * AGENTS.length)]);
    } catch {
      await sendMessage(
        conversationId,
        "Processing across our agent network. Support AI and Workflow AI are collaborating on your request.",
        "assistant",
        "Workflow AI"
      );
    } finally {
      setReasoning("");
      setTyping(false);
      setMessages(await fetchMessages(conversationId));
    }
  };

  const memory = localStore.getAgents().flatMap((a) => a.memory || []).slice(0, 6);

  return (
    <div className="relative space-y-6 h-[calc(100vh-8rem)] flex flex-col">

      <PageHeader
        eyebrow="Neural Dialogue"
        title="Conversations"
        description="Multi-agent collaboration with persistent memory and live reasoning streams."
      />

      <div className="flex-1 grid lg:grid-cols-4 gap-4 min-h-0 relative z-10">
        <GlowPanel className="hidden lg:block p-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-violet-300 mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">Memory</span>
          </div>
          {memory.length === 0 ? (
            <p className="text-xs text-muted">Agents will build memory as you collaborate.</p>
          ) : (
            <ul className="space-y-2">
              {memory.map((m) => (
                <motion.li
                  key={m}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-secondary rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                >
                  {m}
                </motion.li>
              ))}
            </ul>
          )}
        </GlowPanel>

        <GlowPanel glow className="lg:col-span-2 flex flex-col overflow-hidden p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                        : "holo-panel border border-white/10"
                    }`}
                  >
                    {msg.agent_name && (
                      <div className="flex items-center gap-1.5 text-xs text-violet-300 mb-1">
                        <Bot className="h-3 w-3" /> {msg.agent_name}
                      </div>
                    )}
                    <p className="text-sm text-white/90">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="space-y-2">
                <div className="flex gap-1.5 holo-panel rounded-2xl px-4 py-3 w-fit border border-white/10">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-violet-500"
                      animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                {reasoning && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-cyan-400 flex items-center gap-2"
                  >
                    <Sparkles className="h-3 w-3 animate-pulse" /> {reasoning}
                  </motion.p>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-white/5 p-4 flex gap-2">
            <Button variant="ghost" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Message your AI workforce..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1"
            />
            <Button onClick={send}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </GlowPanel>

        <GlowPanel className="hidden lg:block p-4">
          <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">Live context</p>
          <div className="space-y-3 text-xs text-secondary">
            <p>Active agents: {AGENTS.length}</p>
            <p>Messages: {messages.length}</p>
            <p>Memory nodes: {memory.length}</p>
          </div>
        </GlowPanel>
      </div>
    </div>
  );
}
