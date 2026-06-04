"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { localStore } from "@/lib/data/data-service";
import type { NotificationRecord } from "@/lib/data/types";

type NotificationContextValue = {
  notifications: NotificationRecord[];
  unread: number;
  add: (title: string, body: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  const refresh = useCallback(() => setNotifications(localStore.getNotifications()), []);

  useEffect(() => {
    setTimeout(() => refresh(), 0);
    return localStore.subscribe("notifications", refresh);
  }, [refresh]);

  useEffect(() => {
    const iv = setInterval(() => {
      const events = [
        { title: "Workflow completed", body: "Lead nurture pipeline finished successfully" },
        { title: "Agent collaboration", body: "Support AI delegated task to Finance AI" },
        { title: "Document indexed", body: "New knowledge added to semantic memory" },
      ];
      if (Math.random() > 0.92) {
        const e = events[Math.floor(Math.random() * events.length)];
        const n: NotificationRecord = {
          id: `${Date.now()}`,
          title: e.title,
          body: e.body,
          read: false,
          created_at: new Date().toISOString(),
        };
        localStore.addNotification(n);
        refresh();
      }
    }, 12000);
    return () => clearInterval(iv);
  }, [refresh]);

  const add = useCallback(
    (title: string, body: string) => {
      localStore.addNotification({
        id: `${Date.now()}`,
        title,
        body,
        read: false,
        created_at: new Date().toISOString(),
      });
      refresh();
    },
    [refresh]
  );

  const markRead = useCallback(
    (id: string) => {
      localStore.markNotificationRead(id);
      refresh();
    },
    [refresh]
  );

  const markAllRead = useCallback(() => {
    localStore.getNotifications().forEach((n) => localStore.markNotificationRead(n.id));
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      add,
      markRead,
      markAllRead,
    }),
    [notifications, add, markRead, markAllRead]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications requires NotificationProvider");
  return ctx;
}
