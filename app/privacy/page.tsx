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
        <h1 className="text-2xl font-semibold text-white">あなたの答えを大切に守ります</h1>
        <p className="text-sm text-slate-200/80">
          ログインや個人情報なしで遊べる診断です。スマホやPCの中で完結し、イヤなときはすぐ消せます。
        </p>
      </header>

      <section className="space-y-3 text-sm text-slate-100/80">
        <div className="space-y-1">
          <p className="font-semibold text-white">ローカル保存が基本</p>
          <p>
            回答や結果はあなたのブラウザ内にだけ保存され、同意なしに外部へ送られません。
            シークレットモードではウィンドウを閉じると消えます。
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-white">シェアもその場で完結</p>
          <p>
            画像カードは端末内で生成され、サーバーに保存されません。SNSに出すかどうかは自分で決められます。
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-white">匿名の計測はいつでもOFF</p>
          <p>
            使い方のヒントにする匿名イベント（開始・完了など）は、スタート前の同意トグルでON/OFFを選べます。
            OFFのままでもアプリは普通に動きます。
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-white">安心して使うために</p>
          <p>
            この診断は医療行為ではなく、「いまのあなたの傾向」をゆるく知るためのものです。
            気分が落ち込んでいるときは無理せず休んでください。
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-white">診断のベースについて</p>
          <p>
            質問は心理学研究で使われるHEXACO（Big Fiveの5軸に誠実さ・謙虚さを足した6軸）と、
            アタッチメント、自己決定理論（SDT）を組み合わせています。
            どれも再現性が重視される指標で、タイプを固定するMBTIより科学的な裏付けが厚い方法です。
          </p>
        </div>
      </section>
    </main>
  );
}
