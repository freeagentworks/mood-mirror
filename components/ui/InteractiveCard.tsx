"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export function InteractiveCard({ children, href, className = "" }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = (0.5 - (e.clientY - rect.top) / rect.height) * 10;
    setTilt({ x, y });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  const content = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative transition will-change-transform ${className}`}
      style={{
        transform: reduced
          ? undefined
          : `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-white/0 to-cyan-300/10 opacity-0 transition hover:opacity-100" />
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
