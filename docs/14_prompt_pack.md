# 14 Prompt Pack (v1.0)
Generated: 2025-12-27

目的: 各IssueをAIに投げるための“そのままコピペ”プロンプト集。
**ルール: 1プロンプト=1PR（または1コミット）**。差分が大きくなったら分割。

---

## 共通システム指示（毎回先頭に貼る）
あなたはシニアフロントエンドエンジニア兼テックリードです。
- Next.js 16 App Router + TypeScript
- 3Dは Client Component に隔離（RSCでSSRしない）
- センシティブ配慮: 断定禁止、医療ではない
- パフォーマンス: LCP/INP/CLSに悪影響を出さない
- prefers-reduced-motion: 動きを大幅に減らす
- セキュリティ: dangerouslySetInnerHTML禁止
- 変更点は最小に。既存コードの意図を壊さない。
出力は「変更内容の説明」→「ファイル差分（コード）」→「手動確認手順」。

---

## Prompt: I-000（初期化）
### Goal
Next.js 16 App Router + TS のプロジェクトを初期化し、/ /test /result /privacy /faq を用意する。

### Prompt
- 依存: tailwind + shadcn/ui を入れる
- レイアウト: 背景色/コンテナ幅を用意
- ページはプレースホルダで良い
- 実行コマンドと注意点も書く

---

## Prompt: I-100（設問データ）
### Goal
48問をTSデータとして実装。id/text/scale/reversed/pageIndex を持つ。

### Prompt
- lib/questions.ts を作成
- Scale enum: TRAIT_E, TRAIT_C, ... / ATT_ANX / SDT_AUT ... / QUALITY
- 12問×4ページに割り当て
- reversedフラグが必要な設問にはtrue
- 既存UIは変えず、読み込みだけできるように

---

## Prompt: I-110（Scoring + unit test）
### Goal
スコアリング関数とunit testを実装（逆転/平均/0-100/Attachment4象限/SDT派生）

### Prompt
- lib/scoring/index.ts を作成
- 入力: answers { [questionId]: 1..5 }
- 出力: {
  scores: {E,C,O,A,Em,H, Anx,Avd, Aut,Com,Rel},
  derived: { attachmentStyle, needsMean, needsBottleneck }
}
- reversed設問は 6-raw
- Jest or Vitest どちらか一つに統一
- テスト: 逆転が効く、4象限が正しく出る、needsMeanが合う

---

## Prompt: I-200（/test UI）
### Goal
12問×4ページ、進捗、次へ/戻る、未回答ブロックを実装。

### Prompt
- app/test/page.tsx（Client）で実装
- 1〜5の選択はボタン群（モバイルで押しやすい）
- ページ内未回答があれば次へ不可（エラー文）
- 状態はローカルstate（保存は次Issue）

---

## Prompt: I-210（localStorage）
### Goal
途中保存・復帰、リセット。

### Prompt
- lib/storage.ts を作り、safeにlocalStorageを扱う（SSR注意）
- /test で回答が保存され、リロードで復帰
- /result で result_latest を保存
- “リセット”で全削除

---

## Prompt: I-220（結果A〜D）
### Goal
結果画面テンプレを実装し、スコアを分かりやすく表示。

### Prompt
- app/result/page.tsx で result_latest から表示
- Result A: archetype + strengths3 + watchout1 + share CTA
- Result B: trait 6 bars（0-100）
- Result C: attachment 4象限カード + 1 tip
- Result D: SDT 3ゲージ + 今日の一手3
- 断定禁止文言/免責を必ず表示

---

## Prompt: I-300（Hover / Tilt / Magnetic）
### Goal
Awwwardsっぽい軽いホバーをカード/ボタンに追加（reduced-motion対応）。

### Prompt
- components/ui/InteractiveCard.tsx を作る
- pointermoveでtilt（軽く）
- hoverでglow、押下でspring
- reduced-motion では tilt無効、影だけ
- 依存を増やすならFramer Motionのみ

---

## Prompt: I-400（3D background）
### Goal
R3Fで軽量背景（粒子+オーブ）をlayout共有、遅延ロード、フォールバック。

### Prompt
- components/three/Scene.tsx（Client）
- dynamic importで初回LCPを守る
- mobileでparticleCountを半分
- WebGL不可は静止背景（CSSグラデ or PNG）
- reduced-motion でアニメ停止

---

## Prompt: I-500（Share card PNG）
### Goal
結果をPNGにしてダウンロード/シェアできる。

### Prompt
- components/result/ShareCard.tsx を作る
- SVGでレイアウト→toDataURLでPNG化（retina 2x）
- “画像を保存”ボタン
- 文字が折り返しで崩れないように
- 失敗時のエラーハンドリング

---

## デバッグ用共通プロンプト（困ったら）
「今の挙動がこうで、期待はこう。原因候補を3つ挙げ、最小差分で直して。再現手順と確認手順も書いて。」
