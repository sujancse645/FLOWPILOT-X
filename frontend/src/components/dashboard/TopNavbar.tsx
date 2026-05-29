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
      className="sticky top-3 z-30 mx-3 lg:mx-6 mt-3 flex h-14 items-center gap-4 rounded-2xl holo-panel px-4 border border-white/10"
    >
      <SidebarToggle onClick={onMenuClick} />

      <div className="relative flex-1 max-w-md hidden sm:block group">
        <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C3AED] group-focus-within:text-[#06B6D4] transition-colors" />
        <input
          readOnly
          onClick={() => window.dispatchEvent(new Event("fpx:open-command"))}
          placeholder="AI Command — ⌘K"
          className="w-full h-10 rounded-xl border border-white/10 bg-black/30 pl-10 pr-4 text-sm text-white placeholder:text-[#64748b] focus:border-[#7C3AED]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 cursor-pointer transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <AutonomousToggle />
        <CommandPalette />
        <div className="hidden md:flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs border border-white/5">
          <AIPulse size="sm" />
          <span className={connected ? "text-emerald-400" : "text-amber-400"}>
            {connected ? "Neural Link" : "Reconnecting"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] text-[#64748b]">
          <Activity className="h-3 w-3 text-[#7C3AED]" />
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 rounded-xl hover:bg-white/5 text-[#94a3b8] hover:text-white border border-transparent hover:border-[#7C3AED]/30 transition-all"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </motion.button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl holo-panel border border-white/10 shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-violet-300 hover:text-white">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-muted">No notifications yet</p>
                ) : (
                  notifications.slice(0, 8).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                        !n.read ? "bg-violet-500/5" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-white">{n.title}</p>
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{n.body}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {isClerkEnabled() ? (
          <UserButton appearance={{ elements: { avatarBox: "h-9 w-9 ring-2 ring-[#7C3AED]/30" } }} />
        ) : (
          <Link
            href="/dashboard/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] ring-2 ring-white/10"
          >
            <User className="h-4 w-4 text-white" />
          </Link>
        )}
      </div>
    </motion.header>
  );
}
