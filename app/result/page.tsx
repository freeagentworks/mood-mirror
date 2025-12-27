"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Result } from "@/lib/scoring";
import { loadJson, STORAGE_KEYS } from "@/lib/storage";
import { ShareCard } from "@/components/result/ShareCard";
import { buildNarrative } from "@/lib/narrative";

type BarItem = { label: string; value: number; tone?: string };

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadJson<Result | null>(STORAGE_KEYS.resultLatest, null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(saved);
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <main className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur sm:p-10">
        <p className="text-sm text-slate-200/80">読み込み中...</p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur sm:p-10">
        <Link
          href="/"
          className="text-sm text-cyan-200 underline-offset-4 transition hover:underline"
        >
          ← ホームにもどる
        </Link>
        <h1 className="text-2xl font-semibold text-white">結果がまだありません</h1>
        <p className="text-sm text-slate-200/80">/test で全48問に回答すると結果が表示されます。</p>
        <Link
          href="/test"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-300"
        >
          診断を始める →
        </Link>
      </main>
    );
  }

  const traitBars: BarItem[] = [
    { label: "外向性", value: result.scores.E },
    { label: "誠実性", value: result.scores.C },
    { label: "開放性", value: result.scores.O },
    { label: "協調性", value: result.scores.A },
    { label: "情緒安定", value: result.scores.Em },
    { label: "誠実/謙虚", value: result.scores.H },
  ];

  const attachmentBars: BarItem[] = [
    { label: "不安", value: result.scores.Anx },
    { label: "回避", value: result.scores.Avd },
  ];

  const sdtBars: BarItem[] = [
    { label: "自律", value: result.scores.Aut },
    { label: "有能感", value: result.scores.Com },
    { label: "関係性", value: result.scores.Rel },
  ];

  const narrative = buildNarrative(result);

  return (
    <main className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur sm:p-10">
      <header className="space-y-3">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-sm text-cyan-200 underline-offset-4 transition hover:underline"
          >
            ← ホームにもどる
          </Link>
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
          結果
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-white">あなたのプロフィール</h1>
          {result.quality.reasons.length > 0 && (
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-100">
              品質注意: {result.quality.reasons.join(" / ")}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-200/80">
          この結果は「いまの傾向」を示す参考値です。状況や体調で変化します。医療・診断ではありません。
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
            Archetype
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{result.archetype.label}</h2>
          <p className="mt-1 text-sm text-slate-200/80">{narrative.summary}</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-200/80 list-disc list-inside">
            <li>強み: {narrative.strengths[0]}</li>
            <li>注意: {narrative.watchout}</li>
            <li>
              Attachment: {result.derived.attachmentStyle} / SDT平均 {result.derived.needsMean.toFixed(1)} / 最低値 {result.derived.needsBottleneck.toFixed(1)}
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">シェア</p>
          <p className="mt-1 text-sm text-slate-200/80">PNGを生成して保存・共有できます。</p>
          <ShareCard result={result} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">ストーリー</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{narrative.headline}</h2>
        <p className="mt-1 text-sm text-slate-200/80">{narrative.summary}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-200/85">
          <p className="font-semibold text-white">強み</p>
          <ul className="space-y-1 list-disc list-inside">
            {narrative.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-200/85">
          <p className="font-semibold text-white">気をつけたいこと</p>
          <p className="text-slate-200/80">{narrative.watchout}</p>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-200/85">
          <p className="font-semibold text-white">今日のアクション</p>
          <ul className="space-y-1 list-disc list-inside">
            {narrative.actions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ScoreBlock title="Trait 6軸" subtitle="0-100の連続スコア" items={traitBars} />
        <div className="space-y-4">
          <ScoreBlock title="Attachment" subtitle="不安/回避 4象限" items={attachmentBars} />
          <AttachmentHint style={result.derived.attachmentStyle} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ScoreBlock title="SDT 3欲求" subtitle="満たされ度" items={sdtBars} />
        <Advice needsMean={result.derived.needsMean} needsBottleneck={result.derived.needsBottleneck} />
      </section>

      <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 text-sm text-slate-200/80">
        <p className="font-semibold text-white">再受検のおすすめ</p>
        <p className="mt-1">気分や環境で結果は変わります。週に1回を目安に振り返ってみましょう。</p>
        <Link
          href="/test"
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-[1px]"
        >
          もう一度受ける →
        </Link>
      </div>
    </main>
  );
}

function ScoreBlock({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: BarItem[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">{title}</p>
      <p className="text-xs text-slate-300/80">{subtitle}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm text-slate-200/90">
              <span>{item.label}</span>
              <span className="font-semibold text-white">{item.value.toFixed(1)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200"
                style={{ width: `${Math.min(item.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttachmentHint({ style }: { style: Result["derived"]["attachmentStyle"] }) {
  const texts: Record<typeof style, string> = {
    Secure: "安心安全のベースがあり、人との距離感を柔軟に調整できます。",
    Anxious: "つながりを強く求める傾向。安心を得られる約束やセルフケアを。",
    Avoidant: "自分のペースを守りたい傾向。頼れる人を一人持つと安心です。",
    Fearful: "不安と距離取りの両方が強い時期。小さく安全な関わりから慣らしましょう。",
  } as const;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">解釈</p>
      <p className="mt-1 text-white">{style}</p>
      <p className="mt-1 text-sm text-slate-200/80">{texts[style]}</p>
    </div>
  );
}

function Advice({ needsMean, needsBottleneck }: { needsMean: number; needsBottleneck: number }) {
  const tips = [
    "自律: 今日の予定に“自分で決めた一歩”を1つ入れる",
    "有能感: 10分で終わるタスクを小さく完了させて自己効力感を積む",
    "関係性: 安心できる人に短いメッセージを送ってみる",
  ];
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">今日の一手</p>
      <p className="text-xs text-slate-300/80">SDT平均 {needsMean.toFixed(1)} / 最低値 {needsBottleneck.toFixed(1)} を底上げ</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-200/85">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-300/80">参考値として活用し、無理のない範囲で試してください。</p>
    </div>
  );
}
