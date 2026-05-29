import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowPilot X — Autonomous AI Workforce Platform",
  description:
    "Deploy multiple AI agents that collaborate, automate workflows, and execute intelligent tasks in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
        <body className="min-h-screen bg-[#050816] text-white antialiased font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
