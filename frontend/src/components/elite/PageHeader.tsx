"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5CF6] font-semibold mb-2">{eyebrow}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-secondary max-w-xl">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
