"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Bot, GitBranch, Zap, FileText, BarChart3,
  MessageSquare, Mic, Store, Plug, Settings, Zap as Logo, X, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNav } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Bot, GitBranch, Zap, FileText, BarChart3,
  MessageSquare, Mic, Store, Plug, Settings,
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed left-3 top-3 bottom-3 z-50 flex w-[248px] flex-col rounded-2xl holo-panel transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]"
              animate={{ boxShadow: ["0 0 20px rgba(124,58,237,0.4)", "0 0 35px rgba(6,182,212,0.4)", "0 0 20px rgba(124,58,237,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Logo className="h-4 w-4 text-white" />
            </motion.div>
            <div>
              <span className="font-display text-sm font-bold text-white block">FlowPilot X</span>
              <span className="text-[9px] uppercase tracking-widest text-[#64748b]">Mission Control</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {dashboardNav.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <motion.div
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm overflow-hidden",
                    active ? "text-white" : "text-[#94a3b8] hover:text-white"
                  )}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/10 border border-[#7C3AED]/40 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("h-4 w-4 shrink-0 relative z-10", active && "text-[#a78bfa]")} />
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <motion.div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-[#7C3AED]/30 flex items-center justify-center shrink-0"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="h-3 w-3 rounded-full bg-emerald-400 ai-pulse" />
            </motion.div>
            <div>
              <p className="text-xs font-medium text-white">AI Core</p>
              <p className="text-[10px] text-emerald-400">24 workflows active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5">
      <Menu className="h-5 w-5" />
    </button>
  );
}
