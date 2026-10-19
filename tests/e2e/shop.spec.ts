import { expect, test } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("filters the catalog and completes the add-to-cart flow", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/shop");
  await expect(page).toHaveTitle(/المتجر/);
  await expect(page.getByRole("heading", { name: "قطع جاهزة، اختيرت بعناية" })).toBeVisible();
  await expect(page.getByText("حقيبة وادي", { exact: true })).toBeVisible();

  await page.getByLabel("النوع").selectOption("tote");
  await expect(page.getByText("حقيبة رمل", { exact: true })).toBeVisible();
  await expect(page.getByText("حقيبة وادي", { exact: true })).toBeHidden();

  await page.getByLabel("النوع").selectOption("all");
  await page.getByRole("button", { name: "أضيفي حقيبة وادي إلى السلة" }).click();
  await expect(page.getByRole("link", { name: /السلة، 1 منتجات/ })).toBeVisible();

  await page.getByRole("link", { name: /السلة، 1 منتجات/ }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("heading", { name: "سلتك" })).toBeVisible();
  await expect(page.getByText("حقيبة وادي", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "زيادة الكمية" }).click();
  await expect(page.getByRole("region", { name: "منتجات السلة" }).getByText("2", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /السلة، 2 منتجات/ })).toBeVisible();

  expect(runtimeErrors).toEqual([]);
  await page.screenshot({ path: join(tmpdir(), "tafarrud-cart-desktop.png"), fullPage: true });
});

test("shop remains usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "قطع جاهزة، اختيرت بعناية" })).toBeVisible();
  await expect(page.getByLabel("النوع")).toBeVisible();
  await expect(page.getByText("حقيبة وادي", { exact: true })).toBeVisible();
  await page.screenshot({ path: join(tmpdir(), "tafarrud-shop-mobile.png"), fullPage: true });
});
