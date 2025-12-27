# 13 MVP Issue Breakdown (v1.0)
Generated: 2025-12-27

目的: **vibeコーディング（Codex / ClaudeCode / Gemini）**で迷子にならないように、
「1機能 = 1プロンプト = 1PR（または1コミット）」単位で分割した実装タスク。

---

## Epic 0: リポジトリ初期化・土台
### I-000: プロジェクト生成 & 基本設定
- Scope:
  - Next.js 16 App Router + TypeScript 初期化
  - Tailwind + shadcn/ui セットアップ
  - ESLint/Prettier、path alias（@/*）
  - base layout / routing stub（/ /test /result /privacy /faq）
- AC（受け入れ）:
  - `pnpm dev` で起動、ルート表示
  - 主要ページが404にならない
- Notes:
  - 3Dはまだ入れない（LCP守る）

### I-010: Design Tokens/Theme適用（最低限）
- Scope:
  - `11_design_tokens.md` の色・radius・shadowをTailwindに反映
  - 背景/カード/ボタンの基礎スタイル
- AC:
  - Landingでトーンが出る（bg/surface/border）

---

## Epic 1: データモデル・スコアリング（最優先）
### I-100: Question schema & 設問データ実装
- Scope:
  - 48問（Traits 24 + Attachment 8 + SDT 12 + Quality 4）をJSON/TSで定義
  - 設問: id, text, scale, reversed, pageIndex
- AC:
  - /test で設問を読み込める
  - reversedフラグが付く

### I-110: Scoring core（逆転・平均・0-100変換）
- Scope:
  - `04_scoring_spec.md`通りに計算関数を実装
  - 入力: answers{id:1..5} / 出力: scores(11軸) + derived
- AC:
  - Unit testで主要ケースが通る（逆転/平均/閾値/4象限）
  - TypeScript型が崩れない

### I-120: Archetype（12種）ルールベース付与
- Scope:
  - 12アーキタイプの判定ルールを実装（簡易条件分岐）
  - タイブレーク（同点）の決定規則を固定
- AC:
  - どんな入力でも必ず1つ返る
  - “キャラは参考”文言が結果に表示される

### I-130: Quality flags（注意問題・矛盾検知）
- Scope:
  - Attention check（指定回答の一致）
  - 睡眠矛盾（Q3/Q4）など簡易一貫性
- AC:
  - flagがonなら結果に「参考」バッジ + 再受検導線

---

## Epic 2: 診断フローUI（完走率を作る）
### I-200: /test UI（ページ分割 12問×4）
- Scope:
  - 進捗表示 / 次へ・戻る / 完了
  - 1〜5選択（モバイル親指で押せる）
- AC:
  - 全問未回答では次へ進めない（ただし“スキップ”はMVP無し）
  - 戻っても回答が保持される

### I-210: localStorage（途中保存・復帰）
- Scope:
  - answers_draft / result_latest の保存
  - リロードで復帰
- AC:
  - ブラウザ更新後も続きから回答できる
  - “リセット”ボタンで消せる

### I-220: 結果ページA〜Dの骨組み
- Scope:
  - Result A: アーキタイプ + 武器3 + 詰まり1 + シェア導線
  - Result B: Trait6軸（バー）
  - Result C: Attachment 4象限カード + 1アドバイス
  - Result D: SDTゲージ + 今日の一手3つ
- AC:
  - どの品質フラグ状態でも破綻しない
  - 断定禁止/医療ではない注意が見える

---

## Epic 3: Awwwards系 micro interaction（動きは“後乗せ”）
### I-300: Hover / Magnetic / Tilt（UIのみ）
- Scope:
  - ボタン・カードにhover効果（磁力/傾き/光）
  - reduced-motionでは弱める
- AC:
  - desktopで気持ちいい
  - reduced-motionで派手に動かない

### I-310: Scroll reveal（Landing & Result）
- Scope:
  - セクション単位のreveal
  - 使うライブラリは最小（Framer Motion推奨）
- AC:
  - CLS悪化を起こさない
  - モバイルで重くない

---

## Epic 4: 3D（最後に入れる・軽量）
### I-400: 3D Background（R3F）導入
- Scope:
  - Canvasをlayout共有（遅延ロード）
  - 粒子 + オーブ
  - pointermoveでparallax
- AC:
  - WebGL不可→静止背景
  - モバイルは粒子半分、FPSが落ちない

### I-410: UI同期（hover(card)で粒子が反応）
- Scope:
  - UI hoverイベントを3Dに渡す（context/store）
- AC:
  - hoverに対し遅延なく反応
  - reduced-motionで無効化

---

## Epic 5: シェア（バズ導線）
### I-500: Share card PNG（フロント生成）
- Scope:
  - Canvas/SVG→PNG（クライアント）でカード生成
- AC:
  - 主要ブラウザでDLできる
  - 文字が潰れない（retina対応）

### I-510: OG対応（任意）
- Scope:
  - 共有URLにOGメタ（固定でもOK）
- AC:
  - SNSでプレビューが出る（最低限）

---

## Epic 6: 計測・品質
### I-600: Analytics（匿名・同意）
- Scope:
  - start/complete/share/retry/reduced_motion/webgl_supported
- AC:
  - OFFでも動作
  - PIIや回答データを送らない

### I-610: E2E（Playwright）
- Scope:
  - 開始→回答→結果→シェア
- AC:
  - CI or ローカルで通る

---

## 推奨実装順（最短でMVPに到達）
1) I-000 → I-010 → I-100 → I-110 → I-200 → I-210 → I-220  
2) I-120 → I-130  
3) I-500（シェア）  
4) I-300/I-310（動き）  
5) I-400/I-410（3D）
