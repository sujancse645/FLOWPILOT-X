"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Download, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  installs: number;
  trending: boolean;
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    api<MarketplaceItem[]>("/api/marketplace").then(setItems).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">AI Marketplace</h1>
        <p className="text-sm text-[#94a3b8]">Install pre-built workflow automation packs</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card glow className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="purple" className="capitalize">{item.category}</Badge>
                {item.trending && (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <TrendingUp className="h-3 w-3" /> Trending
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-[#94a3b8] mt-2 flex-1">{item.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-[#64748b]">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> {item.rating}</span>
                <span className="flex items-center gap-1"><Download className="h-4 w-4" /> {item.installs.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Install</Button>
                <Button size="sm" variant="outline">Preview</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
