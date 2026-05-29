export const pricingTiers = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for small teams getting started with AI automation",
    features: [
      "5 AI Agents",
      "10 Workflows",
      "1,000 tasks/month",
      "Document AI (10 docs)",
      "Email support",
      "Basic analytics",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: 149,
    description: "For growing teams that need advanced AI orchestration",
    features: [
      "25 AI Agents",
      "Unlimited workflows",
      "50,000 tasks/month",
      "Unlimited documents",
      "Voice AI",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom AI workforce for large organizations",
    features: [
      "Unlimited AI agents",
      "Dedicated infrastructure",
      "Custom AI models",
      "SSO & SAML",
      "SLA guarantee",
      "Dedicated success manager",
      "On-premise option",
      "Custom training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const dashboardNav = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/agents", label: "AI Agents", icon: "Bot" },
  { href: "/dashboard/workflows", label: "Workflows", icon: "GitBranch" },
  { href: "/dashboard/automation", label: "Automation", icon: "Zap" },
  { href: "/dashboard/documents", label: "Documents", icon: "FileText" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/dashboard/conversations", label: "Conversations", icon: "MessageSquare" },
  { href: "/dashboard/voice", label: "Voice AI", icon: "Mic" },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: "Store" },
  { href: "/dashboard/integrations", label: "Integrations", icon: "Plug" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
];

export const workflowNodeTypes = [
  { type: "trigger", label: "Trigger", color: "#06B6D4" },
  { type: "ai-analysis", label: "AI Analysis", color: "#7C3AED" },
  { type: "sentiment", label: "Sentiment Detection", color: "#8B5CF6" },
  { type: "classification", label: "Classification", color: "#7C3AED" },
  { type: "email", label: "Email", color: "#06B6D4" },
  { type: "database", label: "Database Action", color: "#10B981" },
  { type: "slack", label: "Slack Message", color: "#F59E0B" },
  { type: "crm", label: "CRM Update", color: "#EC4899" },
  { type: "approval", label: "Approval", color: "#EF4444" },
  { type: "agent-task", label: "AI Agent Task", color: "#7C3AED" },
  { type: "condition", label: "Condition Logic", color: "#6366F1" },
];

export const faqItems = [
  { q: "What is FlowPilot X?", a: "FlowPilot X is an Autonomous AI Workforce Operating System that lets businesses deploy multiple AI agents that collaborate, automate workflows, and execute intelligent tasks in real time." },
  { q: "How do AI agents collaborate?", a: "Our CrewAI-powered multi-agent architecture enables agents to communicate, delegate tasks, share memory, and execute complex workflows autonomously." },
  { q: "Can I integrate with my existing tools?", a: "Yes! FlowPilot X integrates with Slack, CRM systems, email providers, databases, and hundreds of tools via our API and marketplace." },
  { q: "Is my data secure?", a: "Enterprise-grade security with encryption at rest and in transit, SOC 2 compliance, and optional on-premise deployment." },
  { q: "Do you offer a free trial?", a: "Yes, all plans include a 14-day free trial with full access to features." },
];

export const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechFlow Inc", content: "FlowPilot X transformed our operations. We deployed 8 AI agents and automated 78% of customer support within 2 weeks.", avatar: "SC" },
  { name: "Marcus Williams", role: "VP Operations, ScaleUp", content: "The workflow builder is incredible. What used to take our team days now runs autonomously in minutes.", avatar: "MW" },
  { name: "Elena Rodriguez", role: "CEO, InnovateLabs", content: "This isn't a chatbot — it's a full AI workforce. Our productivity increased 340% in the first quarter.", avatar: "ER" },
];

export const integrations = [
  "Slack", "Salesforce", "HubSpot", "Gmail", "Notion", "Zapier",
  "Microsoft Teams", "Stripe", "Shopify", "Airtable", "Jira", "GitHub",
];
