"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAgents, logActivity, localStore } from "@/lib/data/data-service";
import type { AgentRecord } from "@/lib/data/types";

export function usePersistedAgents() {
  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchAgents();
    setAgents(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(() => refresh(), 0);
    return localStore.subscribe("agents", () => setAgents(localStore.getAgents()));
  }, [refresh]);

  const updateStatus = useCallback(async (id: string, status: AgentRecord["status"]) => {
    localStore.updateAgent(id, { status });
    setAgents(localStore.getAgents());
    await logActivity(`Agent status → ${status}`, localStore.getAgents().find((a) => a.id === id)?.name, "agent");
  }, []);

  return { agents, loading, refresh, updateStatus };
}
