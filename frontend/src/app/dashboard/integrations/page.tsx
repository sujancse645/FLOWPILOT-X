"use client";

import { motion } from "framer-motion";
import { Plug, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { integrations } from "@/data/mock";

const connected = ["Slack", "Gmail", "Notion", "Stripe"];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Integrations</h1>
        <p className="text-sm text-[#94a3b8]">Connect your tools to the AI workforce</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((name, i) => {
          const isConnected = connected.includes(name);
          return (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
              <Card className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-[#7C3AED]/20 mb-3">
                  <Plug className="h-6 w-6 text-[#7C3AED]" />
                </div>
                <h3 className="font-medium text-white">{name}</h3>
                {isConnected ? (
                  <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-400">
                    <Check className="h-3 w-3" /> Connected
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="mt-3 w-full">Connect</Button>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
