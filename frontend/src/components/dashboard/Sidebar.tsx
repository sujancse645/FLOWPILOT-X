"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Bot, GitBranch, Zap, FileText, BarChart3,
  MessageSquare, Mic, Store, Plug, Settings, Zap as Logo, X, Menu, Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNav } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Brain, Bot, GitBranch, Zap, FileText, BarChart3,
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
          "fixed left-3 top-3 bottom-3 z-50 flex w-[248px] flex-col rounded-2xl bg-background-secondary border border-white/10 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-black">
              <Logo className="h-4 w-4" />
            </div>
            <div>
              <span className="font-display text-sm font-bold text-text-primary block">FlowPilot X</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted">Mission Control</span>
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
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("h-4 w-4 shrink-0 relative z-10", active && "text-cyan-400")} />
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">AI Core</p>
              <p className="text-[10px] text-cyan-400">24 workflows active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="lg:hidden text-text-primary p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
      <Menu className="h-5 w-5" />
    </button>
  );
}
