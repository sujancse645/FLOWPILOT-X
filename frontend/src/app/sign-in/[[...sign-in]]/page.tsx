import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignInPage() {
  if (!isClerkEnabled()) {
    return (
      <AuthShell title="Development access" subtitle="Clerk is not configured. Continue to the neural command center.">
        <div className="p-6 text-center">
          <p className="text-sm text-secondary">
            Add Clerk keys to <code className="text-violet-300">.env.local</code> for Google, GitHub, and organization auth.
          </p>
          <Link href="/dashboard" className="inline-block mt-6">
            <Button className="w-full">Enter workspace</Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Enter the neural OS" subtitle="Sign in with Google, GitHub, or your enterprise account.">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full",
            card: "bg-transparent shadow-none border-0",
            headerTitle: "text-white",
            headerSubtitle: "text-secondary",
            socialButtonsBlockButton: "border border-white/10 bg-white/5 hover:bg-white/10",
            formButtonPrimary: "bg-gradient-to-r from-violet-600 to-cyan-500",
          },
        }}
        signUpUrl="/sign-up"
      />
    </AuthShell>
  );
}
