"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Scene = dynamic(() => import("./NeuralScene3DInner").then((m) => m.NeuralScene3DInner), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#050816]/80">
      <div className="h-12 w-12 rounded-full border-2 border-violet-500 border-t-cyan-400 animate-spin" />
    </div>
  ),
});

export function NeuralScene3D({ className = "h-64" }: { className?: string }) {
  return (
    <div className={`${className} rounded-xl overflow-hidden`}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
