const isClient = () => typeof window !== "undefined";

export function loadJson<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T) {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

export function clearKey(key: string) {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

export const STORAGE_KEYS = {
  answersDraft: "answers_draft",
  resultLatest: "result_latest",
  consentAnalytics: "consent_analytics",
  progressPage: "progress_page",
} as const;
