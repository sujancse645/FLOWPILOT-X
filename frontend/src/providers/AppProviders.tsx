"use client";

import { useState, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";
import { SocketProvider } from "./SocketProvider";
import { AutonomousProvider } from "./AutonomousProvider";
import { BootSequence } from "@/components/fx/BootSequence";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { NotificationProvider } from "./NotificationProvider";
import { ScenarioEngineProvider } from "./ScenarioEngineProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("fpx-booted");
    if (seen) {
      setTimeout(() => {
        setShowBoot(false);
        setBooted(true);
      }, 0);
    }
  }, []);

  const onBootComplete = () => {
    sessionStorage.setItem("fpx-booted", "1");
    setShowBoot(false);
    setBooted(true);
  };

  const inner = (
    <SocketProvider>
      <NotificationProvider>
        <ScenarioEngineProvider>
        <AutonomousProvider>
          {showBoot && !booted && <BootSequence onComplete={onBootComplete} />}
          <CursorGlow />
          <CommandPalette />
          {children}
        </AutonomousProvider>
        </ScenarioEngineProvider>
      </NotificationProvider>
    </SocketProvider>
  );

  if (!isClerkEnabled()) return inner;
  return <ClerkProvider>{inner}</ClerkProvider>;
}
