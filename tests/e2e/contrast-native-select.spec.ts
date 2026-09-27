import { test, expect } from "@playwright/test";
import { expectReadable } from "./contrastProbe";

test("contrast probe measures a native select without treating hidden choices as painted text", async ({ page }) => {
  await page.setContent(`<style>body {background:#111;color:#fff} select {background:#222;color:#fff;font-size:16px}</style><svg style="position:absolute;left:0;top:0;width:1px;height:1px"></svg>${Array.from({ length: 11 }, (_, index) => `<select aria-label="Choice ${index}"><option>Visible choice</option><option>Hidden choice</option></select>`).join(" ")}`);
  const result = await expectReadable(page, "native select", []);
  expect(result.checked).toBe(11);
});
