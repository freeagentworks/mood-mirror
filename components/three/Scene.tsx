"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ThreeBackground = dynamic(
  () => import("./ThreeBackground").then((m) => m.ThreeBackground),
  { ssr: false, loading: () => null },
);

const isClient = () => typeof window !== "undefined";

export function Scene() {
  const [ready, setReady] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    if (!isClient()) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compute = () => !media.matches && !!window.WebGLRenderingContext;
    setTimeout(() => {
      setCanRender3D(compute());
      setReady(true);
    }, 0);
    const handler = () => setCanRender3D(compute());
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const fallback = useMemo(() => <FallbackGradient />, []);

  const show3D = ready && canRender3D;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {show3D ? <ThreeBackground /> : fallback}
    </div>
  );
}

function FallbackGradient() {
  return (
    <div className="absolute inset-0">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-[-10%] top-10 h-96 w-96 rounded-full bg-amber-300/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
    </div>
  );
}
