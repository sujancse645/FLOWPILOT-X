"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type DemoLog = {
  id: string;
  phase: string;
  message: string;
  agent?: string;
  timestamp: string;
};

type AutonomousContextValue = {
  autonomous: boolean;
  setAutonomous: (v: boolean) => void;
  demoRunning: boolean;
  logs: DemoLog[];
  runDemo: () => void;
  stopDemo: () => void;
};

const DEMO_SCRIPT: Omit<DemoLog, "id" | "timestamp">[] = [
  { phase: "trigger", message: "Customer complaint #8842 received via support channel", agent: "System" },
  { phase: "analysis", message: "Sentiment analysis: negative (0.82) — urgency high", agent: "Support AI" },
  { phase: "workflow", message: "Workflow 'Support Triage' activated autonomously", agent: "Workflow AI" },
  { phase: "collab", message: "Delegating payment validation to Finance AI", agent: "Support AI" },
  { phase: "collab", message: "Transaction verified — refund eligibility confirmed", agent: "Finance AI" },
  { phase: "action", message: "Drafting personalized response with empathy model", agent: "Email AI" },
  { phase: "complete", message: "Ticket resolved — CSAT prediction: 4.7/5", agent: "Analytics AI" },
  { phase: "insight", message: "ROI impact: $340 saved · 12min manual work avoided", agent: "System" },
];

const AutonomousContext = createContext<AutonomousContextValue | null>(null);

export function AutonomousProvider({ children }: { children: React.ReactNode }) {
  const [autonomous, setAutonomous] = useState(false);
  const [demoRunning, setDemoRunning] = useState(false);
  const [logs, setLogs] = useState<DemoLog[]>([]);
  const [step, setStep] = useState(0);

  const runDemo = useCallback(() => {
    setDemoRunning(true);
    setLogs([]);
    setStep(0);
  }, []);

  const stopDemo = useCallback(() => {
    setDemoRunning(false);
    setStep(0);
  }, []);

  useEffect(() => {
    if (!demoRunning || step >= DEMO_SCRIPT.length) {
      if (demoRunning && step >= DEMO_SCRIPT.length) {
        const t = setTimeout(() => setDemoRunning(false), 2000);
        return () => clearTimeout(t);
      }
      return;
    }
    const t = setTimeout(() => {
      const entry = DEMO_SCRIPT[step];
      setLogs((prev) => [
        {
          ...entry,
          id: `${step}-${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
      setStep((s) => s + 1);
    }, autonomous ? 2200 : 1800);
    return () => clearTimeout(t);
  }, [demoRunning, step, autonomous]);

  useEffect(() => {
    if (!autonomous || demoRunning) return;
    const iv = setInterval(() => {
      if (Math.random() > 0.7) runDemo();
    }, 25000);
    return () => clearInterval(iv);
  }, [autonomous, demoRunning, runDemo]);

  const value = useMemo(
    () => ({ autonomous, setAutonomous, demoRunning, logs, runDemo, stopDemo }),
    [autonomous, demoRunning, logs, runDemo, stopDemo]
  );

  return (
    <AutonomousContext.Provider value={value}>{children}</AutonomousContext.Provider>
  );
}

export function useAutonomous() {
  const ctx = useContext(AutonomousContext);
  if (!ctx) throw new Error("useAutonomous must be used within AutonomousProvider");
  return ctx;
}
