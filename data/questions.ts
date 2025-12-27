export enum Scale {
  TRAIT_E = "TRAIT_E",
  TRAIT_C = "TRAIT_C",
  TRAIT_O = "TRAIT_O",
  TRAIT_A = "TRAIT_A",
  TRAIT_EM = "TRAIT_EM",
  TRAIT_H = "TRAIT_H",
  ATT_ANX = "ATT_ANX",
  ATT_AVD = "ATT_AVD",
  SDT_AUT = "SDT_AUT",
  SDT_COM = "SDT_COM",
  SDT_REL = "SDT_REL",
  QUALITY = "QUALITY",
}

export type Question = {
  id: number;
  text: string;
  scale: Scale;
  reversed?: boolean;
  pageIndex: number; // 0-3
};

export const questions: Question[] = [
  // Page 1 (0)
  {
    id: 1,
    text: "初対面でも自分から話しかける",
    scale: Scale.TRAIT_E,
    pageIndex: 0,
  },
  {
    id: 2,
    text: "周りを楽しませようとする",
    scale: Scale.TRAIT_E,
    pageIndex: 0,
  },
  {
    id: 3,
    text: "予定や締切をきっちり守る",
    scale: Scale.TRAIT_C,
    pageIndex: 0,
  },
  {
    id: 4,
    text: "持ち物や部屋を整理整頓している",
    scale: Scale.TRAIT_C,
    pageIndex: 0,
  },
  {
    id: 5,
    text: "新しいアイデアや表現にワクワクする",
    scale: Scale.TRAIT_O,
    pageIndex: 0,
  },
  {
    id: 6,
    text: "知らない分野でもまず試してみる",
    scale: Scale.TRAIT_O,
    pageIndex: 0,
  },
  {
    id: 7,
    text: "人の気持ちを汲んで行動できる",
    scale: Scale.TRAIT_A,
    pageIndex: 0,
  },
  {
    id: 8,
    text: "困っている人を放っておけない",
    scale: Scale.TRAIT_A,
    pageIndex: 0,
  },
  {
    id: 9,
    text: "落ち込みやすく気分が変わりやすい",
    scale: Scale.TRAIT_EM,
    reversed: true,
    pageIndex: 0,
  },
  {
    id: 10,
    text: "大事な場面でも緊張しすぎない",
    scale: Scale.TRAIT_EM,
    pageIndex: 0,
  },
  {
    id: 11,
    text: "嘘やズルをするのは嫌い",
    scale: Scale.TRAIT_H,
    pageIndex: 0,
  },
  {
    id: 12,
    text: "小さな約束でも守る",
    scale: Scale.TRAIT_H,
    pageIndex: 0,
  },

  // Page 2 (1)
  {
    id: 13,
    text: "誘われるより自分から企画する",
    scale: Scale.TRAIT_E,
    pageIndex: 1,
  },
  {
    id: 14,
    text: "にぎやかな場所が好き",
    scale: Scale.TRAIT_E,
    pageIndex: 1,
  },
  {
    id: 15,
    text: "計画通りに進まないと落ち着かない",
    scale: Scale.TRAIT_C,
    reversed: true,
    pageIndex: 1,
  },
  {
    id: 16,
    text: "細かい作業をコツコツ続けられる",
    scale: Scale.TRAIT_C,
    pageIndex: 1,
  },
  {
    id: 17,
    text: "美術・音楽・文章などの表現が好き",
    scale: Scale.TRAIT_O,
    pageIndex: 1,
  },
  {
    id: 18,
    text: "日常の中に新しい刺激を求める",
    scale: Scale.TRAIT_O,
    pageIndex: 1,
  },
  {
    id: 19,
    text: "対立よりも歩み寄りを選ぶ",
    scale: Scale.TRAIT_A,
    pageIndex: 1,
  },
  {
    id: 20,
    text: "人の成功を素直に祝える",
    scale: Scale.TRAIT_A,
    pageIndex: 1,
  },
  {
    id: 21,
    text: "心配ごとを引きずりやすい",
    scale: Scale.TRAIT_EM,
    reversed: true,
    pageIndex: 1,
  },
  {
    id: 22,
    text: "感情の浮き沈みが少ない",
    scale: Scale.TRAIT_EM,
    pageIndex: 1,
  },
  {
    id: 23,
    text: "人の前で自慢したり誇張することがある",
    scale: Scale.TRAIT_H,
    reversed: true,
    pageIndex: 1,
  },
  {
    id: 24,
    text: "自分の利益よりも誠実さを優先する",
    scale: Scale.TRAIT_H,
    pageIndex: 1,
  },

  // Page 3 (2)
  {
    id: 25,
    text: "相手がすぐ返事をくれないと不安になる",
    scale: Scale.ATT_ANX,
    pageIndex: 2,
  },
  {
    id: 26,
    text: "拒否されることを強く恐れる",
    scale: Scale.ATT_ANX,
    pageIndex: 2,
  },
  {
    id: 27,
    text: "一人の時間がないと息苦しい",
    scale: Scale.ATT_AVD,
    pageIndex: 2,
  },
  {
    id: 28,
    text: "深い関係よりも距離感を保つ方が楽",
    scale: Scale.ATT_AVD,
    pageIndex: 2,
  },
  {
    id: 29,
    text: "自分で決める余白があるとワクワクする",
    scale: Scale.SDT_AUT,
    pageIndex: 2,
  },
  {
    id: 30,
    text: "行動を細かく指示されるとやる気が落ちる",
    scale: Scale.SDT_AUT,
    pageIndex: 2,
  },
  {
    id: 31,
    text: "得意分野で成長を感じると元気になる",
    scale: Scale.SDT_COM,
    pageIndex: 2,
  },
  {
    id: 32,
    text: "努力が報われている実感がある",
    scale: Scale.SDT_COM,
    pageIndex: 2,
  },
  {
    id: 33,
    text: "大切に思える仲間が近くにいる",
    scale: Scale.SDT_REL,
    pageIndex: 2,
  },
  {
    id: 34,
    text: "相談できる人がいると安心する",
    scale: Scale.SDT_REL,
    pageIndex: 2,
  },
  {
    id: 35,
    text: "指定の回答を選んでください（注意問題: 2を選ぶ）",
    scale: Scale.QUALITY,
    pageIndex: 2,
  },
  {
    id: 36,
    text: "睡眠は十分に取れている",
    scale: Scale.QUALITY,
    pageIndex: 2,
  },

  // Page 4 (3)
  {
    id: 37,
    text: "集まりでは話し手より聞き手になることが多い",
    scale: Scale.TRAIT_E,
    reversed: true,
    pageIndex: 3,
  },
  {
    id: 38,
    text: "静かな時間がないと疲れる",
    scale: Scale.TRAIT_EM,
    reversed: true,
    pageIndex: 3,
  },
  {
    id: 39,
    text: "即興よりも事前準備を重視する",
    scale: Scale.TRAIT_C,
    pageIndex: 3,
  },
  {
    id: 40,
    text: "伝統的なやり方より新しいやり方を試したい",
    scale: Scale.TRAIT_O,
    pageIndex: 3,
  },
  {
    id: 41,
    text: "相手の立場に立って考える",
    scale: Scale.TRAIT_A,
    pageIndex: 3,
  },
  {
    id: 42,
    text: "小さなズルでも罪悪感を覚える",
    scale: Scale.TRAIT_H,
    pageIndex: 3,
  },
  {
    id: 43,
    text: "相手の気持ちを考えすぎて疲れる",
    scale: Scale.ATT_ANX,
    pageIndex: 3,
  },
  {
    id: 44,
    text: "人に頼るより自分で解決したい",
    scale: Scale.ATT_AVD,
    pageIndex: 3,
  },
  {
    id: 45,
    text: "自分の意思で選択できている",
    scale: Scale.SDT_AUT,
    pageIndex: 3,
  },
  {
    id: 46,
    text: "チャレンジが成長につながっていると感じる",
    scale: Scale.SDT_COM,
    pageIndex: 3,
  },
  {
    id: 47,
    text: "誰かと一緒に過ごす時間が大事",
    scale: Scale.SDT_REL,
    pageIndex: 3,
  },
  {
    id: 48,
    text: "最近ほとんど眠れていない",
    scale: Scale.QUALITY,
    reversed: true,
    pageIndex: 3,
  },
];

export const questionsByPage = [0, 1, 2, 3].map((pageIndex) =>
  questions.filter((q) => q.pageIndex === pageIndex),
);

export const pageCount = 4;

export type Answers = Record<number, number>;
