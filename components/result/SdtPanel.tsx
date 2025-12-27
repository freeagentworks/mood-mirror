import { Result } from "@/lib/scoring";
import { buildSdtCopy } from "@/lib/copy/sdt";

type Bar = {
  label: string;
  value: number;
};

export function SdtPanel({ result }: { result: Result }) {
  const bars: Bar[] = [
    { label: "自律", value: result.scores.Aut },
    { label: "有能感", value: result.scores.Com },
    { label: "関係性", value: result.scores.Rel },
  ];

  const copy = buildSdtCopy(result);

  return (
    <div className="glass-card border-white/10 bg-slate-950/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">SDT 3欲求</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{copy.headline}</h3>
      <p className="text-sm text-slate-200/80">{copy.fuelLabel}</p>

      <div className="mt-4 grid gap-3">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm text-slate-200/90">
              <span>{bar.label}</span>
              <span className="font-semibold text-white">{bar.value.toFixed(1)}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-0 bg-gradient-to-r from-pink-200 via-cyan-200 to-amber-200"
                style={{ width: `${Math.min(bar.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200/85">
        <p className="font-semibold text-white">今の詰まりポイント</p>
        <p className="text-slate-200/80">{copy.bottleneckLabel}</p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-200/85">
        <p className="font-semibold text-white">今日の一手</p>
        <ul className="space-y-1 list-disc list-inside">
          {copy.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
