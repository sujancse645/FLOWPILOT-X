"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { getSocketUrl } from "@/lib/config";

type Activity = { agent: string; action: string; timestamp: string };

type SocketContextValue = {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
  activities: Activity[];
  emit: (event: string, data?: unknown) => void;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const url = getSocketUrl();
    const s = io(url, {
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 15,
      reconnectionDelay: 1000,
      timeout: 15000,
      withCredentials: true,
    });

    setTimeout(() => setSocket(s), 0);

    s.on("connect", () => {
      setConnected(true);
      setError(null);
    });

    s.on("disconnect", (reason) => {
      setConnected(false);
      if (reason === "io server disconnect") {
        s.connect();
      }
    });

    s.on("connect_error", (err) => {
      setConnected(false);
      setError(
        `Cannot reach API at ${url}. Start the backend: cd backend && npm run dev`
      );
      console.warn("[FlowPilot] Socket connect_error:", err.message);
    });

    s.on("ai:activity", (data: Activity) => {
      setActivities((prev) => [data, ...prev].slice(0, 50));
    });

    return () => {
      s.removeAllListeners();
      s.disconnect();
    };
  }, []);

  const emit = useCallback(
    (event: string, data?: unknown) => {
      socket?.emit(event, data);
    },
    [socket]
  );

  const value = useMemo(
    () => ({ socket, connected, error, activities, emit }),
    [socket, connected, error, activities, emit]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return ctx;
}
