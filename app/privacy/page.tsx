import Link from "next/link";

export default function PrivacyPage() {
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
          データとプライバシー
        </p>
        <h1 className="text-2xl font-semibold text-white">プライバシーポリシー（ドラフト）</h1>
        <p className="text-sm text-slate-200/80">
          PIIを収集せず、回答はローカル保存がデフォルトです。匿名Analyticsは同意制でOFFでも壊れません。
        </p>
      </header>

      <section className="space-y-1 text-sm text-slate-100/80">
        <ul className="list-disc list-inside space-y-1">
          <li>回答データはブラウザローカルに保持し、同意なしで外部送信しない</li>
          <li>シェアカード生成はクライアント内で完結し、サーバに保存しない</li>
          <li>匿名イベント（start/complete/shareなど）は同意トグルでいつでも停止可能</li>
          <li>未成年利用を想定し、医療・診断ではない旨を明記する</li>
        </ul>
      </section>
    </main>
  );
}
