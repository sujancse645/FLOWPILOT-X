import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030610] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">FlowPilot X</span>
            </div>
            <p className="text-sm text-[#64748b]">
              Autonomous AI Workforce Operating System for the enterprise.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Marketplace", "Integrations"] },
            { title: "Company", links: ["About", "Contact", "Careers", "Blog"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase()}`} className="text-sm text-[#64748b] hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-[#64748b]">© 2026 FlowPilot X. All rights reserved.</p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub", "Discord"].map((s) => (
              <span key={s} className="text-sm text-[#64748b] hover:text-white cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
