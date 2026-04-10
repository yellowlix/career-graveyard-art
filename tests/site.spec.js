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

/** Mirrors `getArchivePageSize()` in app.js (≥1440px → 16, else 12). */
function getExpectedArchivePageSize(testInfo) {
  return getViewportTier(testInfo) === "desktop-1440" ? 16 : 12;
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

async function expectSharedHorizontalBounds(page, leftSelector, rightSelector) {
  const { leftDiff, rightDiff } = await page.evaluate(
    ({ leftSelector: left, rightSelector: right }) => {
      const leftNode = document.querySelector(left);
      const rightNode = document.querySelector(right);

      if (!leftNode || !rightNode) {
        return { leftDiff: Number.POSITIVE_INFINITY, rightDiff: Number.POSITIVE_INFINITY };
      }

      const leftRect = leftNode.getBoundingClientRect();
      const rightRect = rightNode.getBoundingClientRect();

      return {
        leftDiff: Math.abs(leftRect.left - rightRect.left),
        rightDiff: Math.abs(leftRect.right - rightRect.right)
      };
    },
    { leftSelector, rightSelector }
  );

  expect(leftDiff).toBeLessThanOrEqual(1);
  expect(rightDiff).toBeLessThanOrEqual(1);
}

async function getComputedStyles(locator, properties) {
  return locator.evaluate((element, keys) => {
    const styles = window.getComputedStyle(element);
    return Object.fromEntries(keys.map((key) => [key, styles.getPropertyValue(key)]));
  }, properties);
}

async function getViewportRect(locator) {
  return locator.evaluate((element) => {
    const { top, bottom, height } = element.getBoundingClientRect();
    return { top, bottom, height };
  });
}

async function scrollHomeShellToNextPanel(page) {
  await page.locator(".page-main--home").evaluate((shell) => {
    const careersPanel = shell.querySelector('[data-home-panel="careers"]');
    if (!careersPanel) {
      return;
    }

    shell.scrollTo({
      top: careersPanel.offsetTop,
      behavior: "auto"
    });
  });
  await page.waitForTimeout(250);
}

test("home page defaults to Chinese-only navigation and metadata", async ({ page }, testInfo) => {
  await visit(page, "/");
  const viewportTier = getViewportTier(testInfo);
  const homeShell = page.locator(".page-main--home");
  const careersPanel = page.locator('[data-home-panel="careers"]');
  const viewportHeight = await page.evaluate(() => window.innerHeight);

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

  const homeShellStyles = await getComputedStyles(homeShell, ["overflow-y", "scroll-snap-type"]);
  const careersPanelRect = await getViewportRect(careersPanel);

  expect(homeShellStyles["overflow-y"]).toBe("auto");
  expect(homeShellStyles["scroll-snap-type"]).toBe("y mandatory");
  expect(careersPanelRect.top).toBeGreaterThanOrEqual(viewportHeight * 0.85);

  await expect(page).toHaveScreenshot("home-page.png", {
    animations: "disabled",
    caret: "hide"
  });
});

test("home page reveals the careers panel only after segmented scroll on desktop and tablet", async ({
  page
}, testInfo) => {
  await visit(page, "/");
  const viewportTier = getViewportTier(testInfo);

  const careersPanel = page.locator('[data-home-panel="careers"]');
  const careersGrid = page.locator(".career-grid--home");
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  const beforeScrollRect = await getViewportRect(careersPanel);
  expect(beforeScrollRect.top).toBeGreaterThanOrEqual(viewportHeight * 0.85);

  await scrollHomeShellToNextPanel(page);

  const afterScrollRect = await getViewportRect(careersPanel);
  expect(afterScrollRect.bottom).toBeGreaterThan(viewportHeight * 0.5);
  expect(afterScrollRect.top).toBeLessThanOrEqual(viewportHeight * 0.25);
  await expect(careersGrid).toBeVisible();
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
  await expect(page.locator(".career-card")).toHaveCount(
    Math.min(getExpectedArchivePageSize(testInfo), careers.length)
  );
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
    page.getByRole("heading", {
      name: pick(careers.find((career) => career.slug === "cram-school-teacher").name, "zh")
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: pick(careers.find((career) => career.slug === "offline-tour-guide").name, "zh")
    })
  ).toBeVisible();
});

test("archive clear button should clear committed query and reset listing", async ({ page }, testInfo) => {
  await visit(page, "/archive.html");

  const expectedPageSize = getExpectedArchivePageSize(testInfo);
  const searchInput = page.locator("#archive-search-input");
  const clearButton = page.locator("[data-archive-search-clear]");

  await searchInput.fill("平面");
  await page.getByRole("button", { name: pick(siteCopy.archive.searchSubmit, "zh"), exact: true }).click();

  await expect(page).toHaveURL(/\/archive\.html\?q=/);
  await expect(page.locator(".career-card")).toHaveCount(1);

  await clearButton.click();

  await expect(page).toHaveURL("/archive.html");
  await expect(searchInput).toHaveValue("");
  await expect(page.locator(".career-card")).toHaveCount(Math.min(expectedPageSize, careers.length));
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
    fullPage: true,
    maxDiffPixels: 100
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

test("memorial page switches between archived and new profession email drafts", async ({ page }) => {
  const designer = careers.find((career) => career.slug === "graphic-designer");

  await visit(page, "/memorial.html");

  const existingButton = page.getByRole("tab", {
    name: pick(siteCopy.memorial.modes.existing.tabLabel, "zh"),
    exact: true
  });
  const unlistedButton = page.getByRole("tab", {
    name: pick(siteCopy.memorial.modes.unlisted.tabLabel, "zh"),
    exact: true
  });
  const mailtoLink = page.locator("#memorial-mailto-link");
  const subjectPreview = page.locator("#memorial-subject-preview");
  const bodyPreview = page.locator("#memorial-body-preview");
  const memorialTabs = page.locator(".memorial-form__sticky .memorial-mode-switch");
  const memorialIntro = page.locator(".memorial-feed__intro").first();

  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "zh") })).toBeVisible();
  await expect(page.getByText(pick(siteCopy.memorial.noticeText, "zh"))).toBeVisible();
  await expect(memorialTabs).toBeVisible();
  await expect(existingButton).toHaveAttribute("aria-selected", "true");
  await expect(unlistedButton).toHaveAttribute("aria-selected", "false");
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.existing.introEyebrow, "zh"))).toBeVisible();
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.existing.introText, "zh"))).toBeVisible();
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.existing.curatedNote, "zh"))).toBeVisible();
  await expect(mailtoLink).toHaveAttribute("aria-disabled", "true");

  await page
    .getByLabel(pick(siteCopy.memorial.modes.existing.signatureLabel, "zh"))
    .fill("Playwright Visitor");
  await page
    .getByLabel(pick(siteCopy.memorial.modes.existing.textLabel, "zh"))
    .fill("测试留下了一段新的悼词，用来确认页面会同步更新邮件草稿。");

  await expect(mailtoLink).toHaveAttribute("aria-disabled", "false");
  await expect(subjectPreview).toContainText(
    `${pick(siteCopy.memorialEmail.subjectPrefix, "zh")} ${pick(designer.name, "zh")} - Playwright Visitor`
  );
  await expect(bodyPreview).toContainText(`职业：${pick(designer.name, "zh")}`);
  await expect(bodyPreview).toContainText("署名：Playwright Visitor");
  await expect(bodyPreview).toContainText("悼词：测试留下了一段新的悼词");

  await unlistedButton.click();
  await expect(unlistedButton).toHaveAttribute("aria-selected", "true");
  await expect(existingButton).toHaveAttribute("aria-selected", "false");
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.unlisted.introEyebrow, "zh"))).toBeVisible();
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.unlisted.introText, "zh"))).toBeVisible();
  await expect(memorialIntro.getByText(pick(siteCopy.memorial.modes.unlisted.curatedNote, "zh"))).toBeVisible();
  await expect(mailtoLink).toHaveAttribute("aria-disabled", "true");

  await page
    .getByLabel(pick(siteCopy.memorial.modes.unlisted.careerNameLabel, "zh"))
    .fill("提示词优化师");
  await page
    .getByLabel(pick(siteCopy.memorial.modes.unlisted.careerIntroLabel, "zh"))
    .fill("负责在内容团队和模型团队之间反复改写提示词，以维持稳定输出。");
  await page
    .getByLabel(pick(siteCopy.memorial.modes.unlisted.signatureLabel, "zh"))
    .fill("Prompt Archivist");
  await page
    .getByLabel(pick(siteCopy.memorial.modes.unlisted.textLabel, "zh"))
    .fill("当模板足够成熟之后，连调词的人也会一起被折叠进流程。");
  await page
    .getByLabel(pick(siteCopy.memorial.modes.unlisted.referencesLabel, "zh"))
    .fill("内部流程文档、岗位 JD");

  await expect(mailtoLink).toHaveAttribute("aria-disabled", "false");
  await expect(subjectPreview).toContainText(
    `${pick(siteCopy.contactEmail.subjectPrefix, "zh")} 提示词优化师 - Prompt Archivist`
  );
  await expect(bodyPreview).toContainText("职业名称：提示词优化师");
  await expect(bodyPreview).toContainText("职业简介：负责在内容团队和模型团队之间反复改写提示词，以维持稳定输出。");
  await expect(bodyPreview).toContainText("署名：Prompt Archivist");
  await expect(bodyPreview).toContainText("参考资料：内部流程文档、岗位 JD");

  await page.getByLabel(pick(siteCopy.memorial.modes.unlisted.referencesLabel, "zh")).fill("");
  await expect(bodyPreview).not.toContainText("参考资料：");

  await existingButton.click();
  await expect(page.getByLabel(pick(siteCopy.memorial.modes.existing.signatureLabel, "zh"))).toHaveValue(
    "Playwright Visitor"
  );

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "en") })).toBeVisible();
  await expect(page.getByRole("tab", { name: pick(siteCopy.memorial.modes.existing.tabLabel, "en") })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(subjectPreview).toContainText(
    `${pick(siteCopy.memorialEmail.subjectPrefix, "en")} ${pick(designer.name, "en")} - Playwright Visitor`
  );
  await expect(bodyPreview).toContainText(`Career: ${pick(designer.name, "en")}`);
  await expect(bodyPreview).toContainText("Signature: Playwright Visitor");
  await expect(mailtoLink).toHaveAttribute(
    "href",
    /mailto:mahrovandrei%40gmail\.com\?subject=/
  );
});

test("memorial page adapts across the four viewport baselines", async ({ page }, testInfo) => {
  await visit(page, "/memorial.html");
  const viewportTier = getViewportTier(testInfo);

  await expect(page.getByRole("heading", { level: 1, name: pick(siteCopy.memorial.title, "zh") })).toBeVisible();
  await expect(
    page.getByRole("tab", { name: pick(siteCopy.memorial.modes.existing.tabLabel, "zh"), exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("tab", { name: pick(siteCopy.memorial.modes.unlisted.tabLabel, "zh"), exact: true })
  ).toBeVisible();
  await expect(page.locator(".memorial-form__fields")).toBeVisible();
  await expect(page.locator(".memorial-feed__list")).toBeVisible();
  await expect(page.locator(".site-footer__links")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expectSharedHorizontalBounds(page, ".memorial-mode-switch", ".memorial-note");
  await expectGridTrackCount(
    page.locator(".memorial-layout"),
    viewportTier === "desktop-1280" || viewportTier === "desktop-1440" ? 2 : 1
  );
  await expect(page).toHaveScreenshot("memorial-page.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: true
  });
});

test("about page keeps repo-truth wording in both locales", async ({ page }) => {
  await visit(page, "/about.html");

  await expect(page.getByRole("heading", { level: 1, name: pick(aboutData.missionTitle, "zh") })).toBeVisible();
  await expect(page.locator("#legal")).toContainText(pick(siteCopy.aboutInfo.legal.title, "zh"));
  await expect(page.locator("#policy")).toContainText(pick(siteCopy.aboutInfo.policy.title, "zh"));
  await expect(page.locator("#contact")).toContainText(siteMeta.contactEmail);
  await expect(page.locator("#contact")).toContainText(pick(siteCopy.aboutInfo.contact.actions[0].label, "zh"));
  await expect(page.locator("#contact")).toContainText(pick(siteCopy.aboutInfo.contact.title, "zh"));
  await expect(page.locator("#contact")).not.toContainText("github.com/yellowlix");
  await expect(page.getByText("42,901")).toHaveCount(0);

  await switchLocale(page, "en");
  await expect(page.getByRole("heading", { level: 1, name: pick(aboutData.missionTitle, "en") })).toBeVisible();
  await expect(page.locator("#policy")).toContainText("does not store online submissions");
  await expect(page.locator("#contact")).toContainText(pick(siteCopy.aboutInfo.contact.title, "en"));
  await expect(page.locator("#contact")).not.toContainText("github.com/yellowlix");
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

  const legalLink = page.getByRole("link", { name: pick(siteCopy.footer.legal, "zh"), exact: true });
  await page.goto(await legalLink.getAttribute("href"));
  await expect(page).toHaveURL(/\/about\.html#legal$/);
  await expect(page.locator("#legal")).toBeVisible();

  await page.goto("/about.html");
  const policyLink = page.getByRole("link", { name: pick(siteCopy.footer.policy, "zh"), exact: true });
  await page.goto(await policyLink.getAttribute("href"));
  await expect(page).toHaveURL(/\/about\.html#policy$/);

  await page.goto("/about.html");
  const connectLink = page.getByRole("link", { name: pick(siteCopy.footer.connect, "zh"), exact: true });
  await page.goto(await connectLink.getAttribute("href"));
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
