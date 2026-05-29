"use client";

import { AuroraBackground } from "./AuroraBackground";
import { NeuralCanvas } from "./NeuralCanvas";

export function SceneShell({
  children,
  neural = true,
  className = "",
}: {
  children: React.ReactNode;
  neural?: boolean;
  className?: string;
}) {
  return (
    <div className={`os-shell noise-overlay ${className}`}>
      <AuroraBackground />
      {neural && <NeuralCanvas density={0.7} />}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
