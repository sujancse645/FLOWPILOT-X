"use client";

import { useState } from "react";
import { User, Brain, Key, Bell, Palette, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "ai", label: "AI Preferences", icon: Brain },
  { id: "api", label: "API Keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "team", label: "Team", icon: Users },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#94a3b8]">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm whitespace-nowrap transition-all",
                active === tab.id ? "bg-[#7C3AED]/20 text-white border border-[#7C3AED]/30" : "text-[#94a3b8] hover:bg-white/5"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <Card className="flex-1">
          {active === "profile" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Profile Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="First name" defaultValue="Alex" />
                <Input placeholder="Last name" defaultValue="Rivera" />
              </div>
              <Input placeholder="Email" type="email" defaultValue="alex@company.com" />
              <Input placeholder="Company" defaultValue="TechFlow Inc" />
              <Button>Save Changes</Button>
            </div>
          )}
          {active === "ai" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">AI Preferences</h3>
              <div className="space-y-3">
                {["Default model: GPT-4o", "Temperature: 0.7", "Autonomous mode: Enabled", "Memory retention: 30 days"].map((pref) => (
                  <div key={pref} className="glass rounded-lg px-4 py-3 text-sm text-[#94a3b8]">{pref}</div>
                ))}
              </div>
            </div>
          )}
          {active === "api" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">API Keys</h3>
              <Input placeholder="OpenAI API Key" type="password" />
              <Input placeholder="Gemini API Key" type="password" />
              <Button>Save Keys</Button>
            </div>
          )}
          {active === "notifications" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Notification Settings</h3>
              {["Email notifications", "Workflow completion alerts", "Agent activity digest", "Weekly reports"].map((n) => (
                <label key={n} className="flex items-center justify-between glass rounded-lg px-4 py-3 cursor-pointer">
                  <span className="text-sm text-[#94a3b8]">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-[#7C3AED]" />
                </label>
              ))}
            </div>
          )}
          {active === "theme" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Theme</h3>
              <p className="text-sm text-[#94a3b8]">Dark futuristic theme is active (default)</p>
              <div className="flex gap-3">
                {["Dark", "Darker", "Midnight"].map((t, i) => (
                  <div key={t} className={`h-16 w-16 rounded-xl cursor-pointer ${i === 0 ? "ring-2 ring-[#7C3AED]" : ""}`} style={{ background: ["#050816", "#020410", "#0a0520"][i] }} title={t} />
                ))}
              </div>
            </div>
          )}
          {active === "security" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Security</h3>
              <Button variant="outline">Enable 2FA</Button>
              <Button variant="outline">Change Password</Button>
              <p className="text-xs text-[#64748b]">Last login: Today at 9:42 AM</p>
            </div>
          )}
          {active === "team" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Team Management</h3>
              <Button>Invite Team Member</Button>
              <div className="space-y-2">
                {["alex@company.com (Admin)", "jordan@company.com (Editor)", "sam@company.com (Viewer)"].map((m) => (
                  <div key={m} className="glass rounded-lg px-4 py-3 text-sm text-[#94a3b8]">{m}</div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
