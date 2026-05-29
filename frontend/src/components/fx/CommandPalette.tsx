"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Bot, GitBranch, FileText, Zap, BarChart3, Command } from "lucide-react";

const COMMANDS = [
  { id: "agents", label: "Open AI Agents", icon: Bot, href: "/dashboard/agents" },
  { id: "workflows", label: "Create Workflow", icon: GitBranch, href: "/dashboard/workflows" },
  { id: "documents", label: "Analyze Document", icon: FileText, href: "/dashboard/documents" },
  { id: "automation", label: "Activate Automation", icon: Zap, href: "/dashboard/automation" },
  { id: "analytics", label: "Generate Report", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "dashboard", label: "Mission Control", icon: Command, href: "/dashboard" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("fpx:open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("fpx:open-command", onOpen);
    };
  }, [toggle]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const run = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={toggle}
        className="hidden md:flex items-center gap-2 glass rounded-xl px-3 py-1.5 text-xs text-[#64748b] hover:text-white hover:border-[#7C3AED]/40 border border-transparent transition-all"
      >
        <Search className="h-3.5 w-3.5" />
        <span>AI Command</span>
        <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed left-1/2 top-[20%] z-[9999] w-full max-w-lg -translate-x-1/2 glow-border rounded-2xl p-[1px]"
            >
              <div className="holo-panel rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <Search className="h-5 w-5 text-[#7C3AED]" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Command the AI workforce..."
                    className="flex-1 bg-transparent text-white placeholder:text-[#64748b] outline-none text-sm"
                  />
                </div>
                <ul className="max-h-64 overflow-y-auto p-2">
                  {filtered.map((cmd, i) => (
                    <motion.li
                      key={cmd.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <button
                        onClick={() => run(cmd.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#94a3b8] hover:bg-[#7C3AED]/20 hover:text-white transition-colors"
                      >
                        <cmd.icon className="h-4 w-4 text-[#7C3AED]" />
                        {cmd.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
