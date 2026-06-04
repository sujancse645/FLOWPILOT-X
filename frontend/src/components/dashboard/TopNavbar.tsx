"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Activity, User, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { AIPulse } from "@/components/shared/AIPulse";
import { SidebarToggle } from "./Sidebar";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";
import { isClerkEnabled } from "@/lib/config";
import { useNotifications } from "@/providers/NotificationProvider";

interface TopNavbarProps {
  onMenuClick: () => void;
  connected?: boolean;
}

export function TopNavbar({ onMenuClick, connected }: TopNavbarProps) {
  const { notifications, unread, markRead, markAllRead } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-3 z-30 mx-3 lg:mx-6 mt-3 flex h-14 items-center gap-4 rounded-2xl bg-background-secondary px-4 border border-white/10 shadow-sm"
    >
      <SidebarToggle onClick={onMenuClick} />

      <div className="relative flex-1 max-w-md hidden sm:block group">
        <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted group-focus-within:text-cyan-400 transition-colors" />
        <input
          readOnly
          onClick={() => window.dispatchEvent(new Event("fpx:open-command"))}
          placeholder="AI Command — ⌘K"
          className="w-full h-10 rounded-xl border border-white/10 bg-black/30 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <AutonomousToggle />
        <CommandPalette />
        <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 text-xs border border-white/10">
          <AIPulse size="sm" />
          <span className={connected ? "text-cyan-400" : "text-amber-400"}>
            {connected ? "Neural Link" : "Reconnecting"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] text-text-muted">
          <Activity className="h-3 w-3 text-cyan-400" />
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 rounded-xl hover:bg-white/5 text-text-secondary hover:text-text-primary border border-transparent hover:border-cyan-500/30 transition-all"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-black">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </motion.button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-background-secondary border border-white/10 shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-sm font-semibold text-text-primary">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-cyan-400 hover:text-cyan-300">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-text-muted">No notifications yet</p>
                ) : (
                  notifications.slice(0, 8).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                        !n.read ? "bg-cyan-500/5" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-text-primary">{n.title}</p>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{n.body}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {isClerkEnabled() ? (
          <UserButton appearance={{ elements: { avatarBox: "h-9 w-9 ring-2 ring-cyan-500/30" } }} />
        ) : (
          <Link
            href="/dashboard/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary ring-1 ring-white/10 hover:ring-cyan-500/50 transition-all text-text-primary hover:text-cyan-400"
          >
            <User className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.header>
  );
}
