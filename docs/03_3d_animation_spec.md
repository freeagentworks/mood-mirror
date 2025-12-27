# 03 3D / Animation Spec

## 前提
- Three.js + React Three Fiberで背景3D
- Next.js 16 App Routerで3DはClient Componentに隔離

## MVP 3D
- 浮遊粒子 + 低速回転オーブ（軽量）
- hover(card)で近傍粒子が反応
- scrollで状態を少し変える（やりすぎない）

## パフォーマンス予算
- desktop: 55+ FPS目標
- mobile: 粒子半分、postFX OFF
- WebGL不可: 静止背景へフォールバック

## prefers-reduced-motion
- 常時アニメ停止、ホバーは色/影のみ
