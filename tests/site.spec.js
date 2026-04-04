import { test, expect } from "@playwright/test";
import { careers } from "../src/data.js";

async function visit(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

test("home page renders the cemetery landing view", async ({ page }) => {
  await visit(page, "/");

  await expect(page).toHaveTitle(/职业墓场/);
  await expect(page.getByRole("heading", { level: 1, name: "职业墓场" })).toBeVisible();
  await expect(page.getByRole("link", { name: "ARCHIVE / 归档" })).toBeVisible();
  await expect(page.locator(".career-card")).toHaveCount(6);
  await expect(page).toHaveScreenshot("home-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });
});

test("home page keeps navigation readable across design baselines", async ({ page }) => {
  await visit(page, "/");

  await expect(page.getByRole("link", { name: "ARCHIVE / 归档" })).toBeVisible();
  await expect(page.locator(".site-nav")).toHaveScreenshot("home-nav.png", {
    animations: "disabled",
    caret: "hide"
  });
});

test("archive page can filter careers by status", async ({ page }) => {
  await visit(page, "/archive.html");

  await expect(page.getByRole("heading", { level: 1, name: /归档/ })).toBeVisible();
  await expect(page.locator(".career-card")).toHaveCount(careers.length);
  await expect(page).toHaveScreenshot("archive-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });

  await page.getByRole("button", { name: "FROZEN" }).click();

  await expect(page.locator(".career-card")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "教培名师" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "线下导游" })).toBeVisible();
});

test("career detail page renders selected career content", async ({ page }) => {
  await visit(page, "/career.html?slug=graphic-designer");

  await expect(page).toHaveTitle(/平面设计师/);
  await expect(page.getByRole("heading", { level: 1, name: "平面设计师" })).toBeVisible();
  await expect(page.getByText("技术降维")).toBeVisible();
  await expect(page.getByText("前 4A 公司美术指导")).toBeVisible();
  await expect(page).toHaveScreenshot("career-detail-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });
});

test("career detail back returns to the previous page when navigated from archive", async ({ page }) => {
  await visit(page, "/archive.html");
  await page.locator(".career-card").first().click();

  await expect(page).toHaveURL(/\/career\.html\?slug=/);
  await page.locator(".site-nav__back").click();

  await expect(page).toHaveURL(/\/archive\.html$/);
  await expect(page.locator(".career-card").first()).toBeVisible();
});

test("memorial page accepts a new tribute", async ({ page }) => {
  await visit(page, "/memorial.html");
  await page.evaluate(() => localStorage.clear());
  await visit(page, "/memorial.html");

  await expect(page.getByRole("heading", { level: 1, name: /祭奠/ })).toBeVisible();

  await page.getByLabel("Signature / 称呼").fill("Playwright Visitor");
  await page
    .getByLabel("Memorial Text / 悼唁文字")
    .fill("测试留下了一段新的悼词，确认页面可以接收并渲染新的数据。");
  await page.getByRole("button", { name: /Submit to Cemetery/ }).click();

  await expect(page.getByText("Playwright Visitor")).toBeVisible();
  await expect(
    page.getByText("测试留下了一段新的悼词，确认页面可以接收并渲染新的数据。")
  ).toBeVisible();
});

test("about page renders project context and contributors", async ({ page }) => {
  await visit(page, "/about.html");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("记录那些正在消逝的职业灵魂");
  await expect(page.getByText("Methodology / 评估准则")).toBeVisible();
  await expect(page.getByText("Elias Chen")).toBeVisible();
});
