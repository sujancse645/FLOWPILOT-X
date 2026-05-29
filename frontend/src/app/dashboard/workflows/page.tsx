"use client";

import { PageHeader } from "@/components/elite/PageHeader";
import { WorkflowBuilder } from "@/components/dashboard/WorkflowBuilder";

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Neural Automation Engine"
        title="Workflow Builder"
        description="Holographic nodes, flowing execution energy, and cinematic replay — automation that feels alive."
      />
      <WorkflowBuilder />
    </div>
  );
}
