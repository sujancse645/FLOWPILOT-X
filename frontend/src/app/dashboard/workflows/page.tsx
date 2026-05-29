"use client";

import { PageHeader } from "@/components/elite/PageHeader";
import { WorkflowBuilder } from "@/components/dashboard/WorkflowBuilder";

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Neural Automation"
        title="Workflow Builder"
        description="Visual AI orchestration — drag, connect, execute with live energy streams."
      />
      <WorkflowBuilder />
    </div>
  );
}
