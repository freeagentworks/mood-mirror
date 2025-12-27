# 16 Dev Onboarding & Workflow

目的: `13_issue_breakdown.md` のI-タスクをこなす際に迷わないよう、Next.js 16 App Router前提のローカル開発セットアップとリポジトリ運用の指針をまとめる。

## 環境・セットアップ
- Node.js 20+ / pnpm 9+（推奨）
- 初回: `pnpm install` → `pnpm dev` で `/` が表示されることを確認
- 品質ゲート: `pnpm lint` / `pnpm test`（scoringのunit） / `pnpm test:e2e`（診断完走）
- 依存追加時は `package.json` に理由コメントを残し、`pnpm why <pkg>` で重複を避ける

## ディレクトリの役割（作成時の指針）
- `app/` : ルーティング（/ /test /result /privacy /faq）とServer/Clientの分離を徹底
- `components/ui/` : shadcn/uiのラップ。3D以外のUIはここにまとめる
- `components/three/` : R3FのClient Components。`reduced-motion`と`WebGL不可`のフォールバックを必ず持つ
- `data/questions.ts` : 設問定義（id/text/scale/reversed/pageIndex）。`I-100`のスコープ
- `lib/scoring/` : `04_scoring_spec.md`準拠の純関数群（逆転→平均→0-100変換→11軸算出→派生値）。Unit Test必須
- `lib/archetype/` : `I-120`の判定ロジック。タイブレーク規則を固定値で保持
- `lib/storage/` : localStorageブリッジ。`I-210`のanswers_draft/result_latestの永続化
- `lib/analytics/` : 同意状態を含む匿名イベント送信。環境変数でOFFにできるよう設計

## 作業フロー（推奨）
- 1機能=1PR/コミット（`09_vibe_coding_playbook.md`）を徹底し、`I-XXX`でブランチ/PR名を揃える
- 実装順は `I-000 → I-010 → I-100 → I-110 → I-200 → I-210 → I-220 → I-120 → I-130` をベースに、3D/シェアは後乗せ
- 3Dやアニメーションは `prefers-reduced-motion` / WebGL不可の分岐を先に置き、メイン処理に影響させない
- 文言は断定禁止。「傾向」「参考」「変化可能」を結果に必ず含める（`00_overview.md`）

## テスト戦略（最短で壊さないために）
- scoring: パラメータ化テストで逆転/平均/閾値/4象限の代表値を押さえる
- UI: Playwrightで「開始→回答→結果→シェアDL」だけ先に作り、モーションや3Dは後からstub差し替え
- a11y/perf: `reduced-motion`フラグとWebGL未対応のときにレイアウトが崩れないことをスナップショットで担保

## よく使うスニペット
- フォールバック判定: `const isWebGLSupported = typeof window !== "undefined" && !!window.WebGLRenderingContext;`
- reduced-motion: `const prefersReducedMotion = useReducedMotion()`（framer-motion）を最初に分岐
- ローカル保存キー: `answers_draft`, `result_latest`, `consent_analytics`

このファイルは開発用メモなので、実装中に気づいた落とし穴や運用Tipsを追記OK。
