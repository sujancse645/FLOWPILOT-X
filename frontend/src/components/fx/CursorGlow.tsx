"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-screen"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      aria-hidden
    >
      <div
        className="h-80 w-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
