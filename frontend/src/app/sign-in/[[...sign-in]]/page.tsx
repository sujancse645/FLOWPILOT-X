import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  if (!isClerkEnabled()) {
    return (
      <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-4 gap-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-white">Dev Mode</h1>
          <p className="mt-2 text-sm text-[#94a3b8]">
            Clerk keys are not configured. You can open the dashboard directly for local development.
          </p>
          <Link href="/dashboard" className="inline-block mt-6">
            <Button>Go to Dashboard</Button>
          </Link>
          <p className="mt-4 text-xs text-[#64748b]">
            Add Clerk keys to <code className="text-[#a78bfa]">.env.local</code> for production auth.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 to-transparent" />
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "glass border border-white/10 shadow-2xl",
          },
        }}
      />
    </div>
  );
}
