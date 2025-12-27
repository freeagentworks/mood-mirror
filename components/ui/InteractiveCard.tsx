"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function InteractiveCard({ children, href, className = "" }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [highlight, setHighlight] = useState({ x: 50, y: 50 });
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const x = clamp((nx - 0.5) * 10, -6, 6);
    const y = clamp((0.5 - ny) * 10, -6, 6);
    setTilt({ x, y });
    setHighlight({ x: nx * 100, y: ny * 100 });
  };

  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHighlight({ x: 50, y: 50 });
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative transition will-change-transform ${className}`}
      style={
        reduced
          ? undefined
          : {
              transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`
            }
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-200"
        style={{
          background: reduced
            ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
            : `radial-gradient(400px at ${highlight.x}% ${highlight.y}%, rgba(255,255,255,0.16), rgba(255,255,255,0))`,
          opacity: reduced ? 1 : 1,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
