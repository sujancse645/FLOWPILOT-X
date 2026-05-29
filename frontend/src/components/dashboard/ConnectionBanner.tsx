"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectionBannerProps {
  connected: boolean;
  error: string | null;
}

export function ConnectionBanner({ connected, error }: ConnectionBannerProps) {
  if (connected || !error) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mx-4 lg:mx-6 mt-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          <div className="flex items-start gap-2 flex-1">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <p className="font-medium text-amber-200">Backend connection failed</p>
              <p className="text-amber-100/80 mt-0.5">{error}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 border-amber-500/40 text-amber-100 hover:bg-amber-500/20"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
