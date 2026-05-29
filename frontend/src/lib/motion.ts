/** Unified cinematic motion pacing across FlowPilot X */
export const motion = {
  fast: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  normal: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  slow: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  spring: { type: "spring" as const, stiffness: 120, damping: 18 },
  stagger: 0.08,
};

export const reasoningPhases = [
  { key: "memory", label: "Memory retrieval", icon: "◈" },
  { key: "sentiment", label: "Sentiment analysis", icon: "◎" },
  { key: "delegate", label: "Task delegation", icon: "⇄" },
  { key: "route", label: "Workflow routing", icon: "⬡" },
  { key: "collab", label: "AI collaboration", icon: "✦" },
  { key: "execute", label: "Execution planning", icon: "▶" },
] as const;
