import { test, expect } from "@playwright/test";

const questionPages = [
  Array.from({ length: 12 }, (_, i) => i + 1), // 1-12
  Array.from({ length: 12 }, (_, i) => i + 13), // 13-24
  Array.from({ length: 12 }, (_, i) => i + 25), // 25-36
  Array.from({ length: 12 }, (_, i) => i + 37), // 37-48
];

test("診断を完走して結果とシェアを表示できる", async ({ page }) => {
  await page.goto("/test");

  for (let pageIndex = 0; pageIndex < questionPages.length; pageIndex++) {
    for (const qId of questionPages[pageIndex]) {
      await page.getByTestId(`q-${qId}-opt-3`).click();
    }

    if (pageIndex < questionPages.length - 1) {
      await page.getByRole("button", { name: "次へ" }).click();
    }
  }

  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page).toHaveURL(/.*result/);
  await expect(page.getByRole("heading", { name: "あなたのプロフィール" })).toBeVisible();
  await expect(page.getByRole("button", { name: "画像を保存" })).toBeVisible();
});
