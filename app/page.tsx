import { Reveal } from "@/components/ui/Reveal";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { InteractiveButton } from "@/components/ui/InteractiveButton";

export default function Home() {
  return (
    <main className="glass-card space-y-8 p-5 text-center sm:p-10">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">Mood Mirror</p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            キラッとわかる、わたしの今の気分
          </h1>
          <p className="text-base text-slate-200/85">
            MBTIよりちょっと深め。科学モデルで今のわたしをふわっと教えてくれるかも。
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-200/85 list-disc list-inside text-left inline-block">
            <li>5分でサクッと、でも精度はしっかりめ</li>
            <li>結果カードをすぐ画像保存、かわいくシェア</li>
            <li>動きはきらっと、疲れたらやさしく静かに</li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <InteractiveButton
            href="/test"
            className="text-base font-semibold"
          >
            診断する（5分）
          </InteractiveButton>
          <InteractiveButton
            href="/result"
            className="glass-card border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10 text-center"
          >
            結果サンプルを見る
          </InteractiveButton>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-200/80">
          <InteractiveCard
            href="/privacy"
            className="glass-card border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white transition hover:border-cyan-300/60 hover:bg-white/10"
          >
            プライバシー
          </InteractiveCard>
          <InteractiveCard
            href="/faq"
            className="glass-card border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white transition hover:border-cyan-300/60 hover:bg-white/10"
          >
            FAQ
          </InteractiveCard>
          <InteractiveCard
            href="/test"
            className="glass-card border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white transition hover:border-cyan-300/60 hover:bg-white/10"
          >
            診断する
          </InteractiveCard>
          <InteractiveCard
            href="/result"
            className="glass-card border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white transition hover:border-cyan-300/60 hover:bg-white/10"
          >
            結果ビューを見る
          </InteractiveCard>
        </div>
      </Reveal>
    </main>
  );
}
