import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignUpPage() {
  if (!isClerkEnabled()) {
    return (
      <AuthShell title="Create your workspace" subtitle="Clerk is not configured — start building in dev mode.">
        <div className="p-6 text-center">
          <Link href="/dashboard" className="inline-block mt-2">
            <Button className="w-full">Enter workspace</Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Deploy your AI workforce" subtitle="Create an organization and invite your team.">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto w-full",
            card: "bg-transparent shadow-none border-0",
            formButtonPrimary: "bg-gradient-to-r from-violet-600 to-cyan-500",
            socialButtonsBlockButton: "border border-white/10 bg-white/5 hover:bg-white/10",
          },
        }}
        signInUrl="/sign-in"
      />
    </AuthShell>
  );
}
