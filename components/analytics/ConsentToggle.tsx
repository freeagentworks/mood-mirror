"use client";

import { useState } from "react";
import { ConsentState, getConsent, setConsent } from "@/lib/analytics";

export function ConsentToggle() {
  const [consent, setLocalConsent] = useState<ConsentState>(() => getConsent());

  const toggle = (next: ConsentState) => {
    setLocalConsent(next);
    setConsent(next);
  };

  return (
    <div className="pill flex items-center gap-2 px-3 py-1.5 text-xs text-slate-100">
      <span className="text-[11px] uppercase tracking-[0.15em] text-cyan-200/90">Analytics</span>
      <button
        type="button"
        onClick={() => toggle(consent === "granted" ? "denied" : "granted")}
        className={`rounded-full px-2 py-1 text-[11px] font-semibold transition ${
          consent === "granted"
            ? "bg-emerald-400 text-slate-950"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        {consent === "granted" ? "ON" : "OFF"}
      </button>
      <span className="text-[11px] text-slate-200/70">同意しても回答は送信しません</span>
    </div>
  );
}
