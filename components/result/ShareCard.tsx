"use client";

import { Result } from "@/lib/scoring";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";

export function ShareCard({ result }: { result: Result }) {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ref.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "mood-mirror.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert("画像の生成に失敗しました。再試行してください。");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/70 via-cyan-400/50 to-amber-200/60 p-5 text-slate-950 shadow-2xl"
        style={{ width: 480 }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900/70">
            Mood Mirror
          </p>
          <h3 className="text-2xl font-bold text-slate-950">
            {result.archetype.label}
          </h3>
          <p className="text-sm text-slate-900/80">{result.archetype.description}</p>
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-900/80">
            {[
              { label: "外向", value: result.scores.E },
              { label: "誠実", value: result.scores.C },
              { label: "開放", value: result.scores.O },
              { label: "協調", value: result.scores.A },
              { label: "情緒", value: result.scores.Em },
              { label: "誠謙", value: result.scores.H },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/40 px-2 py-1 text-center">
                <p>{item.label}</p>
                <p className="text-lg font-bold text-slate-900">{Math.round(item.value)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white/50 px-3 py-2 text-xs text-slate-900/80">
            <p className="font-semibold">Attachment: {result.derived.attachmentStyle}</p>
            <p>SDT平均: {result.derived.needsMean.toFixed(1)} / 最低値: {result.derived.needsBottleneck.toFixed(1)}</p>
          </div>
          {result.quality.reasons.length > 0 && (
            <p className="text-xs text-amber-900">
              ※ 品質チェックにより結果は参考表示: {result.quality.reasons.join(" / ")}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {downloading ? "生成中..." : "画像を保存"}
      </button>
    </div>
  );
}
