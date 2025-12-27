import Link from "next/link";

const faqs = [
  {
    q: "テストデータはどこにありますか？",
    a: "`data/questions.ts` に48問を実装します（I-100）。",
  },
  {
    q: "スコア計算はどのファイルに置きますか？",
    a: "`lib/scoring/` 配下の純関数で実装し、逆転/平均/0-100をテストで保証します（I-110）。",
  },
  {
    q: "3Dはいつ入れますか？",
    a: "UIとスコアが安定した後、`components/three` に遅延ロードで追加します（I-400以降）。",
  },
  {
    q: "reduced-motionやWebGL非対応の扱いは？",
    a: "常にフォールバックを先に分岐し、3D/アニメは無効化してからUIを描画します。",
  },
];

export default function FaqPage() {
  return (
    <main className="glass-card space-y-4 p-5 sm:p-10">
      <div className="flex justify-between">
        <Link
          href="/"
          className="text-sm text-cyan-200 underline-offset-4 transition hover:underline"
        >
          ← ホームにもどる
        </Link>
      </div>
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
          FAQ
        </p>
        <h1 className="text-2xl font-semibold text-white">開発でよく聞かれること</h1>
        <p className="text-sm text-slate-200/80">
          詳細仕様は `docs/` を参照してください。足りない質問はIssue/PRにメモを追加してください。
        </p>
      </header>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
          >
            <p className="text-base font-semibold text-white">{faq.q}</p>
            <p className="mt-1 text-sm text-slate-200/80">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
