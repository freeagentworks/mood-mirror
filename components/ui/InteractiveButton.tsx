"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function InteractiveButton({ children, className = "", disabled, onClick, href }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: clamp(dx * 0.08, -8, 8), y: clamp(dy * 0.08, -8, 8) });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const commonClass = ["cta-button inline-flex items-center justify-center gap-2", className]
    .filter(Boolean)
    .join(" ");

  const style = reduced
    ? undefined
    : {
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${pressed ? 0.98 : 1})`,
        boxShadow: pressed
          ? "0 6px 18px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.12)"
          : undefined,
      };

  const sharedProps = {
    onMouseMove: onMove,
    onMouseLeave: () => {
      reset();
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style,
    className: commonClass,
  } as const;

  if (href) {
    return (
      <a {...sharedProps} ref={ref as React.RefObject<HTMLAnchorElement>} href={href} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
