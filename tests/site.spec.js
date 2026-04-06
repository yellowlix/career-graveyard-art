import { expect, test } from "@playwright/test";
import { aboutData, careers, siteCopy, siteMeta, statusMeta } from "../src/data.js";

function pick(value, locale) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value ?? "";
  }

  return value[locale] ?? value.zh ?? "";
}

async function visit(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-shell")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function switchLocale(page, locale) {
  await page.getByRole("button", { name: locale === "zh" ? "中文" : "EN", exact: true }).click();
}

function getViewportTier(testInfo) {
  const projectName = testInfo.project.name;

  if (projectName.includes("mobile")) {
    return "mobile";
  }
  if (projectName.includes("tablet")) {
    return "tablet";
  }
  if (projectName.includes("1440")) {
    return "desktop-1440";
  }

  return "desktop-1280";
}

async function expectGridTrackCount(locator, expectedCount) {
  const trackCount = await locator.evaluate((element) => {
    const template = window.getComputedStyle(element).gridTemplateColumns;
    return template.split(" ").filter(Boolean).length;
  });

  expect(trackCount).toBe(expectedCount);
}

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test("home page defaults to Chinese-only navigation and metadata", async ({ page }, testInfo) => {
  await visit(page, "/");
  const viewportTier = getViewportTier(testInfo);

  await expect(page).toHaveTitle(pick(siteMeta.siteName, "zh"));
  await expect(page.getByRole("heading", { level: 1, name: pick(siteMeta.siteName, "zh") })).toBeVisible();
  await expect(
    page.getByRole("link", { name: pick(siteCopy.navigation.archive, "zh"), exact: true })
  ).toBeVisible();
  await expect(page.locator(".site-nav__links")).toContainText(pick(siteCopy.navigation.memorial, "zh"));
  await expect(page.locator(".site-nav__links")).toContainText(pick(siteCopy.navigation.about, "zh"));
  await expect(page.locator(".site-nav__links")).not.toContainText("/");
  await expect(page.locator(".career-card")).toHaveCount(6);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    pick(siteCopy.pageDescriptions.home, "zh")
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://career-graveyard.art/"
  );
  await expectGridTrackCount(
    page.locator(".career-grid--home"),
    viewportTier === "mobile" ? 2 : viewportTier === "tablet" ? 3 : 6
  );
  await expect(page).toHaveScreenshot("home-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });
});

test("home navigation stays readable with the locale switcher", async ({ page }) => {
  await visit(page, "/");

  await expect(page.getByRole("button", { name: "中文", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "EN", exact: true })).toBeVisible();
  await expect(page.locator(".site-nav")).toHaveScreenshot("home-nav.png", {
    animations: "disabled",
    caret: "hide"
  });
});

test("locale preference persists across navigation and reload", async ({ page }) => {
  await visit(page, "/");
  await switchLocale(page, "en");

  await expect(page).toHaveTitle(pick(siteMeta.siteName, "en"));
  await expect(
    page.getByRole("link", { name: pick(siteCopy.navigation.archive, "en"), exact: true })
  ).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    pick(siteCopy.pageDescriptions.home, "en")
  );

  await page.getByRole("link", { name: pick(siteCopy.navigation.archive, "en"), exact: true }).click();
  await expect(page).toHaveURL(/\/archive\.html$/);
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.archive.title, "en") })).toBeVisible();

  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.archive.title, "en") })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("archive page can filter careers by localized status", async ({ page }, testInfo) => {
  await visit(page, "/archive.html");
  const viewportTier = getViewportTier(testInfo);

  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.archive.title, "zh") })).toBeVisible();
  await expect(page.locator(".career-card")).toHaveCount(careers.length);
  await expectGridTrackCount(
    page.locator(".career-grid--archive"),
    viewportTier === "mobile" ? 2 : viewportTier === "tablet" ? 4 : viewportTier === "desktop-1440" ? 8 : 6
  );
  await expect(page).toHaveScreenshot("archive-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });

  await page.getByRole("button", { name: pick(statusMeta.frozen.label, "zh"), exact: true }).click();

  await expect(page.locator(".career-card")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: pick(careers.find((career) => career.slug === "cram-school-teacher").name, "zh") })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: pick(careers.find((career) => career.slug === "offline-tour-guide").name, "zh") })
  ).toBeVisible();
});

test("career detail page localizes content and invalid slugs stay explicit", async ({ page }) => {
  const designer = careers.find((career) => career.slug === "graphic-designer");

  await visit(page, "/career.html?slug=graphic-designer");

  await expect(page).toHaveTitle(new RegExp(pick(designer.name, "zh")));
  await expect(page.getByRole("heading", { level: 1, name: pick(designer.name, "zh") })).toBeVisible();
  await expect(page.getByText(pick(designer.factors[0].title, "zh"))).toBeVisible();
  await expect(page.getByText(pick(designer.voices[0].author, "zh"))).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://career-graveyard.art/career.html?slug=graphic-designer"
  );
  await expect(page).toHaveScreenshot("career-detail-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });

  await visit(page, "/career.html?slug=does-not-exist");
  await expect(page).toHaveTitle(new RegExp(pick(siteCopy.notFound.detailTitle, "zh")));
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.notFound.detailTitle, "zh") })).toBeVisible();
  await expect(page.getByRole("link", { name: pick(siteCopy.notFound.primaryLabel, "zh") })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://career-graveyard.art/archive.html"
  );

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.notFound.detailTitle, "en") })).toBeVisible();
  await expect(page.getByText('slug "does-not-exist"')).toBeVisible();
});

test("career detail back returns to the previous page when navigated from archive", async ({ page }) => {
  await visit(page, "/archive.html");
  await page.locator(".career-card").first().click();

  await expect(page).toHaveURL(/\/career\.html\?slug=/);
  await page.locator(".site-nav__back").click();

  await expect(page).toHaveURL(/\/archive\.html$/);
  await expect(page.locator(".career-card").first()).toBeVisible();
});

test("memorial page builds localized email drafts and keeps static tributes", async ({ page }) => {
  const designer = careers.find((career) => career.slug === "graphic-designer");

  await visit(page, "/memorial.html");

  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "zh") })).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.noticeText, "zh"))).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.curatedEyebrow, "zh"))).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.curatedNote, "zh"))).toBeVisible();

  await page.getByLabel(pick(siteCopy.memorial.signatureLabel, "zh")).fill("Playwright Visitor");
  await page.getByLabel(pick(siteCopy.memorial.textLabel, "zh")).fill("测试留下了一段新的悼词，用来确认页面会同步更新邮件草稿。");

  await expect(page.locator("#memorial-subject-preview")).toContainText(
    `${pick(siteCopy.memorialEmail.subjectPrefix, "zh")} ${pick(designer.name, "zh")} - Playwright Visitor`
  );
  await expect(page.locator("#memorial-body-preview")).toContainText(`职业：${pick(designer.name, "zh")}`);
  await expect(page.locator("#memorial-body-preview")).toContainText("署名：Playwright Visitor");
  await expect(page.locator("#memorial-body-preview")).toContainText("悼词：测试留下了一段新的悼词");

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "en") })).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.curatedEyebrow, "en"))).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.curatedNote, "en"))).toBeVisible();
  await expect(page.locator("#memorial-subject-preview")).toContainText(
    `${pick(siteCopy.memorialEmail.subjectPrefix, "en")} ${pick(designer.name, "en")} - Playwright Visitor`
  );
  await expect(page.locator("#memorial-body-preview")).toContainText(`Career: ${pick(designer.name, "en")}`);
  await expect(page.locator("#memorial-body-preview")).toContainText("Signature: Playwright Visitor");
  await expect(page.locator("#memorial-mailto-link")).toHaveAttribute(
    "href",
    /mailto:mahrovandrei%40gmail\.com\?subject=/
  );
});

test("memorial page adapts across the four viewport baselines", async ({ page }, testInfo) => {
  await visit(page, "/memorial.html");
  const viewportTier = getViewportTier(testInfo);

  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "zh") })).toBeVisible();
  await expect(page.locator(".memorial-form__fields")).toBeVisible();
  await expect(page.locator(".memorial-feed__list")).toBeVisible();
  await expect(page.locator(".site-footer__links")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expectGridTrackCount(
    page.locator(".memorial-layout"),
    viewportTier === "desktop-1280" || viewportTier === "desktop-1440" ? 2 : 1
  );
});

test("about page keeps repo-truth wording in both locales", async ({ page }) => {
  await visit(page, "/about.html");

  await expect(page.getByRole("heading", { level: 1, name: pick(aboutData.missionTitle, "zh") })).toBeVisible();
  await expect(page.locator("#legal")).toContainText(pick(siteCopy.aboutInfo.legal.title, "zh"));
  await expect(page.locator("#policy")).toContainText(pick(siteCopy.aboutInfo.policy.title, "zh"));
  await expect(page.locator("#contact")).toContainText(siteMeta.contactEmail);
  await expect(page.locator("#contact")).toContainText(pick(siteCopy.aboutInfo.contact.actions[0].label, "zh"));
  await expect(page.locator("#contact")).toContainText(pick(siteCopy.aboutInfo.contact.actions[1].label, "zh"));
  await expect(page.getByText("42,901")).toHaveCount(0);

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(aboutData.missionTitle, "en") })).toBeVisible();
  await expect(page.locator("#policy")).toContainText("does not store online submissions");
  await expect(page.locator("#contact")).toContainText("Submit by Email, Collaborate on GitHub");
});

test("about page adapts across the four viewport baselines", async ({ page }, testInfo) => {
  await visit(page, "/about.html");
  const viewportTier = getViewportTier(testInfo);

  await expect(page.getByRole("heading", { level: 1, name: pick(aboutData.missionTitle, "zh") })).toBeVisible();
  await expect(page.locator(".method-grid")).toBeVisible();
  await expect(page.locator(".info-grid")).toBeVisible();
  await expect(page.locator(".contributors-grid")).toBeVisible();
  await expect(page.locator(".site-footer__links")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expectGridTrackCount(
    page.locator(".about-columns"),
    viewportTier === "desktop-1280" || viewportTier === "desktop-1440" ? 2 : 1
  );
});

test("footer links land on valid information anchors", async ({ page }) => {
  await visit(page, "/");

  await page.getByRole("link", { name: pick(siteCopy.footer.legal, "zh"), exact: true }).click();
  await expect(page).toHaveURL(/\/about\.html#legal$/);
  await expect(page.locator("#legal")).toBeVisible();

  await page.goto("/about.html");
  await page.getByRole("link", { name: pick(siteCopy.footer.policy, "zh"), exact: true }).click();
  await expect(page).toHaveURL(/\/about\.html#policy$/);

  await page.goto("/about.html");
  await page.getByRole("link", { name: pick(siteCopy.footer.connect, "zh"), exact: true }).click();
  await expect(page).toHaveURL(/\/about\.html#contact$/);
});

test("404 page is reachable as a standalone route in both locales", async ({ page }) => {
  await visit(page, "/404.html");

  await expect(page).toHaveTitle(/404/);
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.notFound.heading, "zh") })).toBeVisible();

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.notFound.heading, "en") })).toBeVisible();
});

test("404 page stays readable across the four viewport baselines", async ({ page }) => {
  await visit(page, "/404.html");

  await expect(page.locator(".not-found-panel")).toBeVisible();
  await expect(page.locator(".not-found-panel__body")).toBeVisible();
  await expect(page.locator(".not-found-panel__actions")).toBeVisible();
  await expect(page.locator(".site-footer__links")).toBeVisible();
  await expectNoHorizontalOverflow(page);
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
