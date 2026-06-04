"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { ConnectionBanner } from "@/components/dashboard/ConnectionBanner";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useSocket } from "@/hooks/useSocket";
import { localStore } from "@/lib/data/data-service";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { connected, error } = useSocket();

  useEffect(() => {
    const settings = localStore.getSettings();
    if (!settings.onboarding_complete) {
      setTimeout(() => setShowOnboarding(true), 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[272px] min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} connected={connected} />
        <ConnectionBanner error={error} connected={connected} />
        <main className="p-3 lg:p-6 pt-2">{children}</main>
      </div>
      <AnimatePresence>
        {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}
      </AnimatePresence>
    </div>
  );
}
