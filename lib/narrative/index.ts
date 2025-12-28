import { Result } from "@/lib/scoring";

type Narrative = {
  headline: string;
  summary: string;
  strengths: string[];
  watchout: string;
  actions: string[];
};

const archetypeText: Record<string, { headline: string; summary: string; strengths: string; watchout: string }> = {
  radiant_connector: {
    headline: "みんなをつなぐ光",
    summary: "明るさと安心感で周りを巻き込むタイプ。",
    strengths: "場を和ませ、みんなを動かす推進力",
    watchout: "自分の疲れに気づきにくい",
  },
  truehearted_builder: {
    headline: "信頼で積み上げる職人",
    summary: "計画性と誠実さで目標を形にするタイプ。",
    strengths: "約束を守り、安定感を与える",
    watchout: "完璧を目指しすぎて固くなりやすい",
  },
  cosmic_creator: {
    headline: "世界を彩るクリエイター",
    summary: "新しいアイデアで景色を変えるタイプ。",
    strengths: "発想力と好奇心でチームを前進",
    watchout: "やることを広げすぎて疲れやすい",
  },
  spark_guardian: {
    headline: "優しさで守る火種",
    summary: "共感力で周りを支えるタイプ。",
    strengths: "細やかな気づきとケア",
    watchout: "心配をため込みすぎる",
  },
  vigil_planner: {
    headline: "慎重なナビゲーター",
    summary: "準備と計画で安全に進めるタイプ。",
    strengths: "抜け漏れを防ぐ設計力",
    watchout: "動き出しが遅くなること",
  },
  feeling_weaver: {
    headline: "感性で結ぶストーリーテラー",
    summary: "感受性と想像力で人に寄り添うタイプ。",
    strengths: "言葉や表現で気持ちをつなぐ",
    watchout: "感情の波を受けやすい",
  },
  lone_pathfinder: {
    headline: "マイペースな開拓者",
    summary: "自分のリズムで成果を出すタイプ。",
    strengths: "自律心と集中力",
    watchout: "頼るのが遅れて抱え込みやすい",
  },
  quiet_anchor: {
    headline: "静かな支柱",
    summary: "落ち着きと誠実さで周囲を安定させるタイプ。",
    strengths: "一貫性と信頼感",
    watchout: "変化を後回しにしがち",
  },
  cool_navigator: {
    headline: "俯瞰するクールナビ",
    summary: "合理性で最短ルートを描くタイプ。",
    strengths: "分析と判断の速さ",
    watchout: "感情のケアが薄くなりがち",
  },
  soft_mender: {
    headline: "そっと癒やすメンダー",
    summary: "繊細さと優しさで場を整えるタイプ。",
    strengths: "小さなケアと気遣い",
    watchout: "自分の疲れを後回しにしがち",
  },
  dawn_seeker: {
    headline: "夜明けを探すシーカー",
    summary: "内省しながらも変化を求めるタイプ。",
    strengths: "学びとアップデート意欲",
    watchout: "不安を抱えたまま一人で悩むこと",
  },
  ember_keeper: {
    headline: "火種を守るキーパー",
    summary: "慎重さと真面目さで安全に進むタイプ。",
    strengths: "リスク管理と丁寧さ",
    watchout: "挑戦を後回しにしがち",
  },
};

const attachmentText: Record<Result["derived"]["attachmentStyle"], string> = {
  Secure: "安心安全のベースがあり、人との距離感を柔軟に調整できます。",
  Anxious: "つながりを強く求める時期。安心を増やす約束やセルフケアが効果的。",
  Avoidant: "自分のペースを大切にしたい時期。信頼できる人を一人だけ決めると安心。",
  Fearful: "不安と距離取りの両方が強い時期。小さく安全な関わりから慣らすと◎。",
};

const sdtBottleneckText: Record<"Aut" | "Com" | "Rel", string> = {
  Aut: "今日は自分で決めた小さな一歩を入れてみよう。",
  Com: "すぐ終わるタスクで達成感を積み上げてみよう。",
  Rel: "安心できる人に一言メッセージを送ってみよう。",
};

export function buildNarrative(result: Result): Narrative {
  const arche = archetypeText[result.archetype.key] ?? {
    headline: result.archetype.label,
    summary: result.archetype.description,
    strengths: "自分らしさ",
    watchout: "無理をしすぎないで",
  };

  const traitTop = topTraits(result);
  const bottleneckKey = bottleneck(result);

  const summaryDetail = `${arche.summary} 上位の強みは「${traitTop.join("・")}` +
    `」。Attachmentは${result.derived.attachmentStyle}、やる気の土台平均は${result.derived.needsMean.toFixed(1)}。`;

  const watchoutDetail = `${arche.watchout}。${attachmentText[result.derived.attachmentStyle]} ` +
    `やる気の土台で詰まりやすいのは「${labelBottleneck(bottleneckKey)}」です。`;

  return {
    headline: arche.headline,
    summary: `${summaryDetail}（${result.archetype.label}）` ,
    strengths: [
      arche.strengths,
      `特に伸びている軸: ${traitTop.join(" / ")}`,
      `やる気の土台平均: ${result.derived.needsMean.toFixed(1)} / Attachment: ${result.derived.attachmentStyle}`,
    ],
    watchout: watchoutDetail ,
    actions: [
      sdtBottleneckText[bottleneckKey],
      "無理をしすぎず、こまめに休憩を挟もう",
      "結果は今の傾向。気分や環境で変わるので定期的に振り返ってみてね",
    ],
  };
}

function bottleneck(result: Result): "Aut" | "Com" | "Rel" {
  const scores = [
    { key: "Aut" as const, value: result.scores.Aut },
    { key: "Com" as const, value: result.scores.Com },
    { key: "Rel" as const, value: result.scores.Rel },
  ];
  return scores.sort((a, b) => a.value - b.value)[0].key;
}

function topTraits(result: Result) {
  const entries = [
    { label: "外向", value: result.scores.E },
    { label: "誠実", value: result.scores.C },
    { label: "開放", value: result.scores.O },
    { label: "協調", value: result.scores.A },
    { label: "情緒安定", value: result.scores.Em },
    { label: "誠実/謙虚", value: result.scores.H },
  ].sort((a, b) => b.value - a.value);
  return entries.slice(0, 2).map((e) => e.label);
}

function labelBottleneck(k: "Aut" | "Com" | "Rel") {
  if (k === "Aut") return "自律";
  if (k === "Com") return "有能感";
  return "関係性";
}
