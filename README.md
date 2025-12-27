# Mood Mirror (Next.js 16)

`docs/` にまとまったPRD/UX/スコアリング仕様に沿って作る、性格診断アプリのMVPベース。Next.js 16 App Router + TypeScript + Tailwind 4構成です。ホーム/診断/結果は女子高生・女子大生向けのUI/コピーに刷新済みで、シェアPNG・ナラティブ生成・SDTパネルを含みます。

## ディレクトリ
- `app/` : ルーティング（/ /test /result /privacy /faq）
- `components/ui/` : インタラクティブなボタン/カード/Reveal等
- `components/result/` : シェアカード、SDTパネル、結果UI
- `components/three/` : R3F背景（reduced-motion/WebGL不可フォールバックあり）
- `lib/` : scoring / storage / analytics / narrative / copy などの純関数ユーティリティ
- `data/questions.ts` : 48問データ（I-100）
- `docs/` : 仕様・プロンプト・開発計画（`docs/README.md`参照）

## コマンド（pnpm）
- `pnpm dev` — 開発サーバー
- `pnpm build` — 本番ビルド
- `pnpm lint` — ESLint (core-web-vitals)
- `pnpm test` — Vitest（scoringコアの単体テスト）
- `pnpm test:e2e` — Playwright診断フローE2E（開始→回答→結果→シェア）

## 着手順の目安
1. 設問データ `data/questions.ts`（済）
2. スコア計算 `lib/scoring` + unit test（済）
3. /test UI 12問×4ページ + localStorage復元（済）
4. /result ナラティブ・SDTパネル・シェアPNG（済）
5. E2E Playwright（追加済み `pnpm test:e2e`）
6. 3D背景・マイクロインタラクション（実装済み。reduced-motion対応）

## ポリシー（抜粋）
- PIIを送らない。Analyticsは同意トグルでOFFでも壊れない設計
- 断定禁止：「傾向」「参考」「変化可能」を文言に含める
- prefers-reduced-motion / WebGL不可を先に判定し、UIを壊さない
