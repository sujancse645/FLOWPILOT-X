/** Global cinematic motion language — FlowPilot X */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  instant: 0.15,
  fast: 0.28,
  normal: 0.48,
  slow: 0.85,
  scene: 1.2,
} as const;

export const motion = {
  fast: { duration: duration.fast, ease: ease.out },
  normal: { duration: duration.normal, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.cinematic },
  spring: { type: "spring" as const, stiffness: 110, damping: 20 },
  stagger: 0.07,
  hover: { scale: 1.02, y: -2, transition: { duration: duration.fast, ease: ease.out } },
  page: { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: duration.normal, ease: ease.cinematic } },
};

export const reasoningPhases = [
  { key: "thinking", label: "Thinking", icon: "◉" },
  { key: "memory", label: "Memory retrieval", icon: "◈" },
  { key: "context", label: "Context analysis", icon: "◎" },
  { key: "sentiment", label: "Sentiment analysis", icon: "△" },
  { key: "delegate", label: "Task delegation", icon: "⇄" },
  { key: "route", label: "Workflow routing", icon: "⬡" },
  { key: "collab", label: "AI collaboration", icon: "✦" },
  { key: "execute", label: "Task execution", icon: "▶" },
  { key: "resolve", label: "Resolution", icon: "✓" },
] as const;

export type ReasoningPhaseKey = (typeof reasoningPhases)[number]["key"];
