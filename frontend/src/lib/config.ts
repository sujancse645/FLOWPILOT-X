/** REST API — proxied through Next.js in the browser to avoid CORS */
export function getApiBase(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "/api/backend";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
}

/** Socket.io must connect directly to the backend server */
export function getSocketUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SOCKET_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:4000"
  );
}

export const isClerkEnabled = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_"));
