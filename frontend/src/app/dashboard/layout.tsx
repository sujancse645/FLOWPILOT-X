"use client";

import { useState } from "react";
import { SceneShell } from "@/components/fx/SceneShell";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { ConnectionBanner } from "@/components/dashboard/ConnectionBanner";
import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { connected, error } = useSocket();

  return (
    <SceneShell neural className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[272px] min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} connected={connected} />
        <ConnectionBanner error={error} connected={connected} />
        <main className="p-3 lg:p-6 pt-2">{children}</main>
      </div>
    </SceneShell>
  );
}
