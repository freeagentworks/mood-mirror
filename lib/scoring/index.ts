import { Answers, questions, Scale } from "@/data/questions";

type ScoreKey =
  | "E"
  | "C"
  | "O"
  | "A"
  | "Em"
  | "H"
  | "Anx"
  | "Avd"
  | "Aut"
  | "Com"
  | "Rel";

export type Scores = Record<ScoreKey, number>;

export type Derived = {
  attachmentStyle: "Secure" | "Anxious" | "Avoidant" | "Fearful";
  needsMean: number;
  needsBottleneck: number;
};

export type QualityFlags = {
  attentionFailed: boolean;
  inconsistency: boolean;
  reasons: string[];
};

export type Archetype = {
  key: string;
  label: string;
  description: string;
};

export type Result = {
  scores: Scores;
  derived: Derived;
  quality: QualityFlags;
  archetype: Archetype;
  answered: number;
  total: number;
  completedAt: string;
};

const scaleKeyMap: Record<Scale, ScoreKey> = {
  [Scale.TRAIT_E]: "E",
  [Scale.TRAIT_C]: "C",
  [Scale.TRAIT_O]: "O",
  [Scale.TRAIT_A]: "A",
  [Scale.TRAIT_EM]: "Em",
  [Scale.TRAIT_H]: "H",
  [Scale.ATT_ANX]: "Anx",
  [Scale.ATT_AVD]: "Avd",
  [Scale.SDT_AUT]: "Aut",
  [Scale.SDT_COM]: "Com",
  [Scale.SDT_REL]: "Rel",
  [Scale.QUALITY]: "E", // placeholder, not aggregated
};

const scoreKeys: ScoreKey[] = [
  "E",
  "C",
  "O",
  "A",
  "Em",
  "H",
  "Anx",
  "Avd",
  "Aut",
  "Com",
  "Rel",
];

const archetypeTable: Record<Derived["attachmentStyle"], Archetype[]> = {
  Secure: [
    { key: "radiant_connector", label: "Radiant Connector", description: "外向 + 安定。場を明るくする調整役。" },
    { key: "truehearted_builder", label: "Truehearted Builder", description: "誠実 + 計画性。信頼でチームを支える。" },
    { key: "cosmic_creator", label: "Cosmic Creator", description: "開放 + 探究。新しい発想で景色を変える。" },
  ],
  Anxious: [
    { key: "spark_guardian", label: "Spark Guardian", description: "共感 + 不安。誰かを守りたい気持ちが強い。" },
    { key: "vigil_planner", label: "Vigil Planner", description: "慎重 + 計画性。抜け漏れをなくし安心を作る。" },
    { key: "feeling_weaver", label: "Feeling Weaver", description: "感受性 + 想像力。繊細な気づきで寄り添う。" },
  ],
  Avoidant: [
    { key: "lone_pathfinder", label: "Lone Pathfinder", description: "自律 + 探究。自分のペースで成果を出す。" },
    { key: "quiet_anchor", label: "Quiet Anchor", description: "誠実 + 低刺激。落ち着きで周囲を安定。" },
    { key: "cool_navigator", label: "Cool Navigator", description: "合理 + 分析。俯瞰して最短ルートを描く。" },
  ],
  Fearful: [
    { key: "soft_mender", label: "Soft Mender", description: "繊細 + 優しさ。小さなケアで場を癒やす。" },
    { key: "dawn_seeker", label: "Dawn Seeker", description: "内省 + 変化志向。不安を抱えつつも光を探す。" },
    { key: "ember_keeper", label: "Ember Keeper", description: "真面目 + 慎重。安全を確かめながら進む。" },
  ],
};

const ATTACHMENT_THRESHOLD = 60;

export function scoreAnswers(answers: Answers): Result {
  const adjusted: Record<number, number> = {};
  questions.forEach((q) => {
    const raw = answers[q.id];
    if (!raw) return;
    adjusted[q.id] = q.reversed ? 6 - raw : raw;
  });

  const buckets = scoreKeys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as Record<ScoreKey, number[]>);

  questions.forEach((q) => {
    const val = adjusted[q.id];
    const key = scaleKeyMap[q.scale];
    if (!val || q.scale === Scale.QUALITY) return;
    buckets[key].push(val);
  });

  const scores = scoreKeys.reduce((acc, key) => {
    const vals = buckets[key];
    const mean = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
    acc[key] = Number((((mean - 1) / 4) * 100).toFixed(1));
    return acc;
  }, {} as Scores);

  const derived: Derived = {
    attachmentStyle: attachmentStyle(scores.Anx, scores.Avd),
    needsMean: Number((((scores.Aut + scores.Com + scores.Rel) / 3)).toFixed(1)),
    needsBottleneck: Number(Math.min(scores.Aut, scores.Com, scores.Rel).toFixed(1)),
  };

  const quality = qualityFlags(answers);
  const archetype = pickArchetype(scores, derived.attachmentStyle);

  return {
    scores,
    derived,
    quality,
    archetype,
    answered: Object.keys(answers).length,
    total: questions.length,
    completedAt: new Date().toISOString(),
  };
}

function attachmentStyle(anx: number, avd: number): Derived["attachmentStyle"] {
  const highAnx = anx >= ATTACHMENT_THRESHOLD;
  const highAvd = avd >= ATTACHMENT_THRESHOLD;
  if (!highAnx && !highAvd) return "Secure";
  if (highAnx && !highAvd) return "Anxious";
  if (!highAnx && highAvd) return "Avoidant";
  return "Fearful";
}

function qualityFlags(answers: Answers): QualityFlags {
  const reasons: string[] = [];
  const attn = answers[35] !== undefined && answers[35] !== 2;
  if (attn) reasons.push("注意問題の回答が異なります (Q35)");

  const sleepGood = answers[36];
  const sleepBad = answers[48];
  const inconsistent =
    sleepGood !== undefined &&
    sleepBad !== undefined &&
    sleepGood >= 4 &&
    sleepBad >= 4;
  if (inconsistent) reasons.push("睡眠の自己評価が矛盾しています (Q36/Q48)");

  return {
    attentionFailed: attn,
    inconsistency: inconsistent,
    reasons,
  };
}

function pickArchetype(
  scores: Scores,
  style: Derived["attachmentStyle"],
): Archetype {
  const primaryTrait = [
    { key: "E", value: scores.E },
    { key: "C", value: scores.C },
    { key: "O", value: scores.O },
    { key: "A", value: scores.A },
    { key: "Em", value: scores.Em },
    { key: "H", value: scores.H },
  ].sort((a, b) => b.value - a.value)[0].key;

  const pool = archetypeTable[style];
  const index = ["E", "C", "O", "A", "Em", "H"].indexOf(primaryTrait);
  return pool[index % pool.length];
}
