"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Answers, pageCount, questionsByPage, Question, Scale } from "@/data/questions";
import { scoreAnswers } from "@/lib/scoring";
import { clearKey, loadJson, saveJson, STORAGE_KEYS } from "@/lib/storage";
import { track } from "@/lib/analytics";

const scaleLabels: Record<Scale, string> = {
  [Scale.TRAIT_E]: "外向性",
  [Scale.TRAIT_C]: "誠実性",
  [Scale.TRAIT_O]: "開放性",
  [Scale.TRAIT_A]: "協調性",
  [Scale.TRAIT_EM]: "情緒安定性",
  [Scale.TRAIT_H]: "誠実・謙虚",
  [Scale.ATT_ANX]: "不安傾向",
  [Scale.ATT_AVD]: "回避傾向",
  [Scale.SDT_AUT]: "自律",
  [Scale.SDT_COM]: "有能感",
  [Scale.SDT_REL]: "関係性",
  [Scale.QUALITY]: "品質",
};

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [page, setPage] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const draft = loadJson<Answers>(STORAGE_KEYS.answersDraft, {});
    const savedPage = loadJson<number | null>(STORAGE_KEYS.progressPage, null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(draft);
    if (savedPage !== null) {
      setPage(Math.min(Math.max(savedPage, 0), pageCount - 1));
    } else {
      setPage(computePageFromAnswers(draft));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveJson(STORAGE_KEYS.answersDraft, answers);
  }, [answers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveJson(STORAGE_KEYS.progressPage, page);
  }, [page, hydrated]);

  useEffect(() => {
    track({ type: "start" });
  }, []);

  const currentQuestions = useMemo(() => questionsByPage[page], [page]);

  const pageComplete = currentQuestions.every((q) => answers[q.id]);
  const allComplete = answersCount(answers) === 48;

  const handleSelect = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (page < pageCount - 1) setPage((p) => p + 1);
  };

  const handleBack = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  const handleSubmit = () => {
    const result = scoreAnswers(answers);
    saveJson(STORAGE_KEYS.resultLatest, result);
    saveJson(STORAGE_KEYS.progressPage, 0);
    track({ type: "complete", answered: answersCount(answers) });
    router.push("/result");
  };

  const handleReset = () => {
    setAnswers({});
    saveJson(STORAGE_KEYS.answersDraft, {});
    clearKey(STORAGE_KEYS.resultLatest);
    saveJson(STORAGE_KEYS.progressPage, 0);
    setPage(0);
  };

  return (
    <main className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur sm:p-10">
      <header className="space-y-3">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-sm text-cyan-200 underline-offset-4 transition hover:underline"
          >
            ← ホームにもどる
          </Link>
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
          診断フロー
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-white">48問テスト</h1>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100/80">
            {answersCount(answers)}/48 回答済み
          </span>
        </div>
        <p className="text-sm text-slate-200/80">
          未回答のまま次へ進めません。回答はブラウザに自動保存されます（再読み込みしても続きから再開）。
        </p>
      </header>

      <ProgressBar page={page} totalPages={pageCount} />

      <section className="space-y-4">
        {currentQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={handleSelect}
          />
        ))}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-200/70">
          <span className="rounded-full bg-white/10 px-2 py-1">ページ {page + 1} / 4</span>
          <span className="rounded-full bg-white/10 px-2 py-1">未回答 {missingCount(currentQuestions, answers)} 問</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-100 transition hover:border-white/40"
          >
            リセット
          </button>
          <button
            type="button"
            onClick={handleBack}
            disabled={page === 0}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-100 transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            戻る
          </button>
          {page < pageCount - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!pageComplete}
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              次へ
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allComplete}
              className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              結果を見る
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}

function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: Question;
  value?: number;
  onChange: (id: number, value: number) => void;
}) {
  const options = [1, 2, 3, 4, 5];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">
            Q{question.id}. {question.text}
          </p>
          <p className="text-xs text-slate-200/70">{scaleLabels[question.scale]}{question.reversed ? "（逆転）" : ""}</p>
        </div>
        {question.scale === Scale.QUALITY && (
          <span className="rounded-full bg-amber-500/20 px-2 py-1 text-[11px] text-amber-100">品質チェック</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-200/70">
        <span>そう思わない</span>
        <span className="text-xs text-slate-300/80">1〜5を選択</span>
        <span>とてもそう思う</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(question.id, opt)}
            data-testid={`q-${question.id}-opt-${opt}`}
            className={`w-12 rounded-full border px-3 py-2 text-sm transition text-center ${
              value === opt
                ? "border-cyan-300 bg-cyan-400/20 text-white"
                : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ page, totalPages }: { page: number; totalPages: number }) {
  const percent = Math.round(((page + 1) / totalPages) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

const answersCount = (a: Answers) => Object.keys(a).length;
const missingCount = (qs: Question[], a: Answers) =>
  qs.filter((q) => !a[q.id]).length;

function computePageFromAnswers(ans: Answers) {
  for (let i = 0; i < pageCount; i++) {
    const qs = questionsByPage[i];
    const incomplete = qs.some((q) => !ans[q.id]);
    if (incomplete) return i;
  }
  return pageCount - 1;
}
