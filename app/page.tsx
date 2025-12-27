import { Reveal } from "@/components/ui/Reveal";
import { InteractiveCard } from "@/components/ui/InteractiveCard";

const links = [
  { href: "/test", label: "診断フロー (/test)" },
  { href: "/result", label: "結果ビュー (/result)" },
  { href: "/privacy", label: "プライバシー (/privacy)" },
  { href: "/faq", label: "FAQ (/faq)" },
];

export default function Home() {
  return (
    <main className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur sm:p-10">
      <Reveal>
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Mood Mirror MVP scaffold
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Next.js 16 App Router ベースの診断アプリ土台
          </h1>
          <p className="max-w-3xl text-lg text-slate-200/80">
            `docs/` のPRD・UX・スコアリング仕様に沿って開発するための初期セットアップです。
            ルーティング骨組み、Tailwind 4、ESLint/TypeScriptを含みます。
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <section className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <InteractiveCard
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-base font-medium text-white shadow-sm transition hover:border-cyan-300/60 hover:bg-white/10"
            >
              <span>{link.label}</span>
              <span aria-hidden className="text-cyan-200">→</span>
            </InteractiveCard>
          ))}
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-sm text-slate-200/80">
          <p className="font-semibold text-white">次のステップ</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>設問データ `data/questions.ts` を実装（I-100）。</li>
            <li>スコアリング純関数 `lib/scoring/` とテスト（I-110）。</li>
            <li>/test UIを12問×4ページで構成し、ローカル保存を追加（I-200〜I-210）。</li>
            <li>結果ページA〜Dの骨組みとシェア導線を組み立てる（I-220 / I-500）。</li>
          </ul>
        </section>
      </Reveal>
    </main>
  );
}
