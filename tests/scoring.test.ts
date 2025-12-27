import { describe, expect, it } from "vitest";
import { questions, Answers } from "@/data/questions";
import { scoreAnswers } from "@/lib/scoring";

const buildAnswers = (overrides: Partial<Answers> = {}): Answers => {
  const base: Answers = {};
  questions.forEach((q) => {
    base[q.id] = overrides[q.id] ?? 3;
  });
  const filled: Answers = { ...base };
  Object.entries(overrides).forEach(([id, value]) => {
    if (typeof value === "number") {
      filled[Number(id)] = value;
    }
  });
  return filled;
};

describe("scoreAnswers", () => {
  it("applies reverse scoring correctly (情緒安定性)", () => {
    const answers = buildAnswers({
      9: 5, // reversed -> 1
      10: 5,
      21: 1, // reversed -> 5
      22: 3,
      38: 4, // reversed -> 2
      35: 2,
      36: 3,
      48: 1,
    });

    const result = scoreAnswers(answers);
    expect(result.scores.Em).toBeCloseTo(55.0, 1);
  });

  it("determines attachment style with threshold 60", () => {
    const answers = buildAnswers({
      25: 5,
      26: 5,
      43: 5, // 高い不安
      27: 1,
      28: 2,
      44: 1, // 低い回避
      35: 2,
      36: 3,
      48: 1,
    });

    const result = scoreAnswers(answers);
    expect(result.derived.attachmentStyle).toBe("Anxious");
  });

  it("flags quality issues for attention and inconsistency", () => {
    const answers = buildAnswers({
      35: 1, // 注意問題ミス
      36: 5,
      48: 5, // 矛盾
    });

    const result = scoreAnswers(answers);
    expect(result.quality.attentionFailed).toBe(true);
    expect(result.quality.inconsistency).toBe(true);
    expect(result.quality.reasons.length).toBeGreaterThanOrEqual(2);
  });
});
