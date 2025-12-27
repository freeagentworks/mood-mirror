import { Result } from "@/lib/scoring";

export type SdtCopy = {
  headline: string;
  fuelLabel: string;
  bottleneckLabel: string;
  tips: string[];
};

const fuelCopy: Record<"Aut" | "Com" | "Rel", string> = {
  Aut: "自分で決める余白がちょっと足りないかも",
  Com: "できた！の実感をもう少し積みたいかも",
  Rel: "つながりの温度を少し上げたいかも",
};

export function buildSdtCopy(result: Result): SdtCopy {
  const scores = [
    { key: "Aut" as const, value: result.scores.Aut, label: "自律" },
    { key: "Com" as const, value: result.scores.Com, label: "有能感" },
    { key: "Rel" as const, value: result.scores.Rel, label: "関係性" },
  ];

  const bottleneck = scores.sort((a, b) => a.value - b.value)[0];

  return {
    headline: "今の燃料ゲージ",
    fuelLabel: "自律 / 有能感 / 関係性を“今の燃料”として見える化しました。高いほど元気を感じやすいかも。",
    bottleneckLabel: `${bottleneck.label}が少し詰まり気味かも。今は「${fuelCopy[bottleneck.key]}」にやさしく注目。` ,
    tips: buildTips(bottleneck.key),
  };
}

function buildTips(key: "Aut" | "Com" | "Rel") {
  if (key === "Aut") {
    return [
      "小: 今日の予定に“自分で決めた一歩”を1つ入れる",
      "中: 30分だけ“やりたいこと枠”を確保してみる",
      "大: 週末に自由時間ブロックを作って好きに過ごす",
    ];
  }
  if (key === "Com") {
    return [
      "小: 5分で終わるタスクを完了→小さくガッツポーズ",
      "中: 得意なことを1つだけ誰かにシェアして褒め合う",
      "大: 新しいチャレンジを小さく試し、できたらメモ",
    ];
  }
  return [
    "小: 安心できる人に一言スタンプやメッセージを送る",
    "中: 15分おしゃべり時間を作って近況をゆるっと交換",
    "大: 会いたい人との予定を1件だけ決めてみる",
  ];
}
