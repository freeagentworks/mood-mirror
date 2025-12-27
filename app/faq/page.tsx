import Link from "next/link";

const faqs = [
  {
    q: "登録やメールアドレスはいりますか？",
    a: "不要です。ログインなしで遊べて、回答はブラウザの中だけに残ります。",
  },
  {
    q: "回答や結果はどこに保存される？",
    a: "スマホ/PCのブラウザに自動保存されます。機種変や別ブラウザでは引き継がれず、シークレットモードでは閉じると消えます。",
  },
  {
    q: "途中で閉じてもやり直せる？",
    a: "同じ端末・ブラウザなら途中保存から再開できます。迷ったら一度戻って確認してもOKです。",
  },
  {
    q: "どんな診断方法？ MBTIと何が違う？",
    a: "HEXACO（Big Fiveの5軸に誠実さ・謙虚さを足した6軸）に、対人関係を見るアタッチメント、やる気の土台を測る自己決定理論（SDT）を組み合わせています。研究で使われる指標なので、タイプを固定するMBTIより再現性が高く、変化もしっかり捉えやすいのが特徴です。",
  },
  {
    q: "シェアすると何が共有される？",
    a: "端末内で作った画像カードだけを自分で選んでシェアします。回答の生データや個人情報が勝手に送られることはありません。",
  },
  {
    q: "匿名の利用データを送らない設定はある？",
    a: "スタート前の同意トグルでいつでもOFFにできます。OFFのままでも全機能を使えます。",
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
        <h1 className="text-2xl font-semibold text-white">みんなからよくある質問</h1>
        <p className="text-sm text-slate-200/80">
          女子高生・女子大生のみんなが安心して使えるように、気になるポイントをまとめました。
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
