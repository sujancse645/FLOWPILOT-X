"use client";

import { useState, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";
import { SocketProvider } from "./SocketProvider";
import { BootSequence } from "@/components/fx/BootSequence";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { CommandPalette } from "@/components/fx/CommandPalette";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("fpx-booted");
    if (seen) {
      setShowBoot(false);
      setBooted(true);
    }
  }, []);

  const onBootComplete = () => {
    sessionStorage.setItem("fpx-booted", "1");
    setShowBoot(false);
    setBooted(true);
  };

  const inner = (
    <SocketProvider>
      {showBoot && !booted && <BootSequence onComplete={onBootComplete} />}
      <CursorGlow />
      <CommandPalette />
      {children}
    </SocketProvider>
  );

  if (!isClerkEnabled()) return inner;
  return <ClerkProvider>{inner}</ClerkProvider>;
}
