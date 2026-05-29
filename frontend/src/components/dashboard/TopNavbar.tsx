"use client";

import Link from "next/link";
import { Bell, Activity, User, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { AIPulse } from "@/components/shared/AIPulse";
import { SidebarToggle } from "./Sidebar";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { isClerkEnabled } from "@/lib/config";

interface TopNavbarProps {
  onMenuClick: () => void;
  connected?: boolean;
}

export function TopNavbar({ onMenuClick, connected }: TopNavbarProps) {
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 rounded-xl hover:bg-white/5 text-[#94a3b8] hover:text-white border border-transparent hover:border-[#7C3AED]/30 transition-all"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#7C3AED] animate-pulse" />
        </motion.button>
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
