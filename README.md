# Mood Mirror (Next.js 16)

`docs/` にまとまったPRD/UX/スコアリング仕様に沿って作る、性格診断アプリのMVPベース。Next.js 16 App Router + TypeScript + Tailwind 4構成です。

## ディレクトリ
- `app/` : ルーティング（/ /test /result /privacy /faq）
- `components/ui/` : UIコンポーネント（shadcnラップを想定）
- `components/three/` : R3F用Client Components。reduced-motion / WebGL不可フォールバック必須
- `lib/` : scoring / storage / analytics などの純関数ユーティリティ
- `data/questions.ts` : 48問データ（I-100）
- `docs/` : 仕様・プロンプト・開発計画（`docs/README.md`参照）

## コマンド（pnpm）
- `pnpm dev` — 開発サーバー
- `pnpm build` — 本番ビルド
- `pnpm lint` — ESLint (core-web-vitals)
- `pnpm test` — Vitest（scoringコアの単体テスト）
- `pnpm test:e2e` — TODO: Playwright診断フローE2E（I-610）

## 着手順の目安
1. 設問データ `data/questions.ts` 実装（I-100）
2. スコア計算 `lib/scoring` + unit test（I-110）
3. /test UI 12問×4ページ + localStorage復元（I-200〜I-210）
4. /result 骨組み + シェア導線（I-220 / I-500）
5. アニメーション/3Dは最後に追加（I-300以降 / I-400以降）

## ポリシー（抜粋）
- PIIを送らない。Analyticsは同意トグルでOFFでも壊れない設計
- 断定禁止：「傾向」「参考」「変化可能」を文言に含める
- prefers-reduced-motion / WebGL不可を先に判定し、UIを壊さない
