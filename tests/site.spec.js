import { expect, test } from "@playwright/test";
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
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /职业墓场记录/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://career-graveyard.art/"
  );
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
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://career-graveyard.art/career.html?slug=graphic-designer"
  );
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

test("invalid detail slug shows a not found state instead of falling back", async ({ page }) => {
  await visit(page, "/career.html?slug=does-not-exist");

  await expect(page).toHaveTitle(/未找到职业/);
  await expect(page.getByRole("heading", { level: 1, name: "未找到这座墓碑" })).toBeVisible();
  await expect(page.getByRole("link", { name: "返回归档" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "平面设计师" })).toHaveCount(0);
});

test("memorial page builds an email draft and shows curated static tributes", async ({ page }) => {
  await visit(page, "/memorial.html");

  await expect(page.getByRole("heading", { level: 1, name: /祭奠/ })).toBeVisible();
  await expect(page.getByText("当前版本不提供在线留言存储")).toBeVisible();
  await expect(page.getByText("Curated Tributes / 示例悼词")).toBeVisible();
  await expect(page.getByText("静态示例")).toBeVisible();
  await expect(page.getByRole("option", { name: "其他职业" })).toHaveCount(0);

  await page.getByLabel("Signature / 称呼").fill("Playwright Visitor");
  await page
    .getByLabel("Memorial Text / 悼词文字")
    .fill("测试留下了一段新的悼词，确认页面可以接收并渲染新的数据。");

  await expect(page.getByText("mahrovandrei@gmail.com")).toBeVisible();
  await expect(page.locator("#memorial-subject-preview")).toContainText(
    "[Career Graveyard Memorial] 平面设计师 - Playwright Visitor"
  );
  await expect(page.locator("#memorial-body-preview")).toContainText("职业：平面设计师");
  await expect(page.locator("#memorial-body-preview")).toContainText("署名：Playwright Visitor");
  await expect(page.locator("#memorial-body-preview")).toContainText(
    "悼词：测试留下了一段新的悼词，确认页面可以接收并渲染新的数据。"
  );
  await expect(page.locator("#memorial-mailto-link")).toHaveAttribute(
    "href",
    /mailto:mahrovandrei%40gmail\.com\?subject=/
  );
});

test("about page renders methodology, legal, policy and contact sections", async ({ page }) => {
  await visit(page, "/about.html");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("记录那些正在消逝的职业灵魂");
  await expect(page.getByText("Methodology / 评估准则")).toBeVisible();
  await expect(page.locator("#legal")).toContainText("这是一个公开展示的静态项目");
  await expect(page.locator("#policy")).toContainText("当前版本是静态展示站");
  await expect(page.locator("#contact")).toContainText("mahrovandrei@gmail.com");
  await expect(page.locator("#contact")).toContainText("GitHub");
  await expect(page.locator("#contact")).toContainText("Email / 邮箱投稿");
  await expect(page.locator("#contact")).toContainText("GitHub / 协作仓库");
  await expect(page.getByText("42,901")).toHaveCount(0);
});

test("footer links land on valid information anchors", async ({ page }) => {
  await visit(page, "/");

  await page.getByRole("link", { name: "Legal" }).click();
  await expect(page).toHaveURL(/\/about\.html#legal$/);
  await expect(page.locator("#legal")).toBeVisible();

  await page.goto("/about.html");
  await page.getByRole("link", { name: "Policy" }).click();
  await expect(page).toHaveURL(/\/about\.html#policy$/);

  await page.goto("/about.html");
  await page.getByRole("link", { name: "Connect" }).click();
  await expect(page).toHaveURL(/\/about\.html#contact$/);
});

test("404 page is reachable as a standalone route", async ({ page }) => {
  await visit(page, "/404.html");

  await expect(page).toHaveTitle(/404/);
  await expect(page.getByRole("heading", { level: 1, name: "这座墓碑暂未找到" })).toBeVisible();
});

test("robots sitemap and favicon are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<urlset");

  const favicon = await request.get("/favicon.svg");
  expect(favicon.ok()).toBeTruthy();
  expect(await favicon.text()).toContain("<svg");
});
