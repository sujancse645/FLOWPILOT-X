"use client";

import { PageHeader } from "@/components/elite/PageHeader";
import { NeuralCommandCenter } from "@/components/neural/NeuralCommandCenter";
import { MemoryGraph } from "@/components/neural/MemoryGraph";
import { AutonomousToggle } from "@/components/elite/AutonomousToggle";
import { NeuralScene3D } from "@/components/neural/NeuralScene3D";

export default function CommandCenterPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="God Mode"
        title="Neural Command Center"
        description="Fullscreen intelligence operations — run the live demo for judges."
        action={<AutonomousToggle />}
      />
      <NeuralCommandCenter height={600} showControls />
      <div className="grid lg:grid-cols-2 gap-6">
        <MemoryGraph height={360} />
        <div className="holo-panel rounded-2xl overflow-hidden p-4">
          <h3 className="font-display font-semibold text-white mb-4">Spatial Neural Core</h3>
          <NeuralScene3D className="h-[320px]" />
        </div>
      </div>
    </div>
  );
}
