import { loadJson, saveJson, STORAGE_KEYS } from "@/lib/storage";

export type AnalyticsEvent =
  | { type: "start" }
  | { type: "complete"; answered: number; durationMs?: number }
  | { type: "share" }
  | { type: "reduced_motion"; enabled: boolean }
  | { type: "webgl_supported"; supported: boolean };

export type ConsentState = "granted" | "denied";

const isClient = () => typeof window !== "undefined";

export function getConsent(): ConsentState {
  return loadJson<ConsentState>(STORAGE_KEYS.consentAnalytics, "denied");
}

export function setConsent(state: ConsentState) {
  saveJson(STORAGE_KEYS.consentAnalytics, state);
}

export function track(event: AnalyticsEvent) {
  if (!isClient()) return;
  if (getConsent() !== "granted") return;
  // MVP: ログ出力のみ。後続で送信先を追加。
  console.info("[analytics]", event);
}
