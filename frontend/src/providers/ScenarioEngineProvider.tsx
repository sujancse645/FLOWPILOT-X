"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReasoningStep } from "@/components/neural/ReasoningTimeline";
import { logActivity } from "@/lib/data/data-service";
import { useNotifications } from "@/providers/NotificationProvider";

type ScenarioId = "complaint" | "invoice" | "lead" | "hr" | "escalation";

type ScenarioMetrics = { timeSaved: number; roi: number };

type ScenarioEngineContextValue = {
  running: ScenarioId | null;
  timeline: ReasoningStep[];
  metrics: ScenarioMetrics | null;
  activeLink: [number, number] | null;
  runScenario: (
    id: ScenarioId,
    onStep?: (step: ReasoningStep) => void
  ) => Promise<void>;
};

const SCRIPTS: Record<
  ScenarioId,
  { agent: string; steps: Omit<ReasoningStep, "id" | "active" | "done">[]; metrics: ScenarioMetrics }
> = {
  complaint: {
    agent: "Support AI",
    metrics: { timeSaved: 12, roi: 340 },
    steps: [
      { phase: "memory", message: "Loading customer history & prior tickets", agent: "Support AI" },
      { phase: "sentiment", message: "Negative sentiment 0.84 — priority escalation", agent: "Support AI" },
      { phase: "route", message: "Activating Support Triage workflow", agent: "Workflow AI" },
      { phase: "delegate", message: "Routing payment validation to Finance AI", agent: "Support AI" },
      { phase: "collab", message: "Finance AI confirms refund eligibility", agent: "Finance AI" },
      { phase: "execute", message: "Resolution drafted & ticket closed", agent: "Email AI" },
    ],
  },
  invoice: {
    agent: "Finance AI",
    metrics: { timeSaved: 28, roi: 890 },
    steps: [
      { phase: "memory", message: "Matching invoice against ERP records", agent: "Finance AI" },
      { phase: "sentiment", message: "Anomaly detected on line item #14", agent: "Analytics AI" },
      { phase: "route", message: "Invoice reconciliation workflow started", agent: "Workflow AI" },
      { phase: "collab", message: "Support AI notified vendor contact", agent: "Support AI" },
      { phase: "execute", message: "Payment hold released — ERP synced", agent: "Finance AI" },
    ],
  },
  lead: {
    agent: "Sales AI",
    metrics: { timeSaved: 18, roi: 1200 },
    steps: [
      { phase: "memory", message: "Enriching lead from CRM + web signals", agent: "Sales AI" },
      { phase: "sentiment", message: "Buying intent score: 0.91 (hot lead)", agent: "Analytics AI" },
      { phase: "delegate", message: "Personalized outreach sequence generated", agent: "Email AI" },
      { phase: "route", message: "Meeting scheduler workflow triggered", agent: "Workflow AI" },
      { phase: "execute", message: "Demo booked — AE notified", agent: "Sales AI" },
    ],
  },
  hr: {
    agent: "HR AI",
    metrics: { timeSaved: 45, roi: 620 },
    steps: [
      { phase: "memory", message: "Parsing resume — 847 skills extracted", agent: "HR AI" },
      { phase: "sentiment", message: "Culture fit model: strong alignment", agent: "HR AI" },
      { phase: "collab", message: "Research AI cross-references portfolio", agent: "Research AI" },
      { phase: "route", message: "Interview panel workflow scheduled", agent: "Workflow AI" },
      { phase: "execute", message: "Shortlist rank #2 — recruiter alerted", agent: "HR AI" },
    ],
  },
  escalation: {
    agent: "Support AI",
    metrics: { timeSaved: 22, roi: 510 },
    steps: [
      { phase: "memory", message: "SLA breach imminent — tier-3 context loaded", agent: "Support AI" },
      { phase: "sentiment", message: "Critical frustration detected — exec path", agent: "Support AI" },
      { phase: "delegate", message: "Workflow AI escalates to human + AI pair", agent: "Workflow AI" },
      { phase: "collab", message: "Analytics AI predicts churn risk 0.78", agent: "Analytics AI" },
      { phase: "execute", message: "Retention offer deployed — case resolved", agent: "Support AI" },
    ],
  },
};

/** Agent index pairs for neural mesh particle bursts */
const COLLAB_LINKS: Record<ScenarioId, [number, number]> = {
  complaint: [0, 3],
  invoice: [2, 3],
  lead: [1, 5],
  hr: [7, 3],
  escalation: [0, 4],
};

const ScenarioEngineContext = createContext<ScenarioEngineContextValue | null>(null);

export function ScenarioEngineProvider({ children }: { children: React.ReactNode }) {
  const [running, setRunning] = useState<ScenarioId | null>(null);
  const [timeline, setTimeline] = useState<ReasoningStep[]>([]);
  const [metrics, setMetrics] = useState<ScenarioMetrics | null>(null);
  const [activeLink, setActiveLink] = useState<[number, number] | null>(null);
  const { add: addNotification } = useNotifications();

  const runScenario = useCallback(
    async (id: ScenarioId, onStep?: (step: ReasoningStep) => void) => {
      const script = SCRIPTS[id];
      setRunning(id);
      setTimeline([]);
      setMetrics(null);
      setActiveLink(COLLAB_LINKS[id]);

      for (let i = 0; i < script.steps.length; i++) {
        const step: ReasoningStep = {
          ...script.steps[i],
          id: `${id}-${i}`,
          active: true,
          done: false,
        };
        setTimeline((prev) => [...prev.map((s) => ({ ...s, active: false, done: true })), step]);
        onStep?.(step);
        await logActivity(script.steps[i].message, script.steps[i].agent, "scenario");
        await new Promise((r) => setTimeout(r, 1300));
      }

      setMetrics(script.metrics);
      setActiveLink(null);
      addNotification(
        `${script.agent} scenario complete`,
        `Saved ${script.metrics.timeSaved}min · ROI $${script.metrics.roi}`
      );
      setRunning(null);
      setTimeline((prev) => prev.map((s) => ({ ...s, active: false, done: true })));
    },
    [addNotification]
  );

  const value = useMemo(
    () => ({ running, timeline, metrics, activeLink, runScenario }),
    [running, timeline, metrics, activeLink, runScenario]
  );

  return (
    <ScenarioEngineContext.Provider value={value}>{children}</ScenarioEngineContext.Provider>
  );
}

export function useScenarioEngine() {
  const ctx = useContext(ScenarioEngineContext);
  if (!ctx) throw new Error("useScenarioEngine requires ScenarioEngineProvider");
  return ctx;
}
