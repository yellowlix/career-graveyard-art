import "./styles.css";
import {
  aboutData,
  careers,
  homeQuote,
  initialMemorials,
  siteCopy,
  siteMeta,
  statusMeta
} from "./data.js";

const app = document.querySelector("#app");
const page = document.body.dataset.page;
const statusOrder = Object.keys(statusMeta);

const routes = {
  home: "/",
  archive: "/archive.html",
  memorial: "/memorial.html",
  about: "/about.html",
  notFound: "/404.html",
  detail: (slug) => `/career.html?slug=${encodeURIComponent(slug)}`
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizePath(path) {
  if (!path || path === "/index.html") {
    return "/";
  }
  return path;
}

function toAbsoluteUrl(path) {
  return `${siteMeta.siteUrl}${normalizePath(path)}`;
}

function ensureHeadElement(selector, tagName, attributes = {}) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.append(node);
  }
  return node;
}

function setPageMetadata({
  title,
  description = siteMeta.defaultDescription,
  path = window.location.pathname + window.location.search,
  type = "website",
  robots = "index,follow"
}) {
  const canonicalUrl = toAbsoluteUrl(path);

  document.title = title;

  ensureHeadElement('meta[name="description"]', "meta", { name: "description" }).setAttribute(
    "content",
    description
  );
  ensureHeadElement('meta[name="theme-color"]', "meta", { name: "theme-color" }).setAttribute(
    "content",
    siteMeta.themeColor
  );
  ensureHeadElement('meta[name="robots"]', "meta", { name: "robots" }).setAttribute(
    "content",
    robots
  );

  ensureHeadElement('meta[property="og:site_name"]', "meta", { property: "og:site_name" }).setAttribute(
    "content",
    siteMeta.siteName
  );
  ensureHeadElement('meta[property="og:title"]', "meta", { property: "og:title" }).setAttribute(
    "content",
    title
  );
  ensureHeadElement(
    'meta[property="og:description"]',
    "meta",
    { property: "og:description" }
  ).setAttribute("content", description);
  ensureHeadElement('meta[property="og:type"]', "meta", { property: "og:type" }).setAttribute(
    "content",
    type
  );
  ensureHeadElement('meta[property="og:url"]', "meta", { property: "og:url" }).setAttribute(
    "content",
    canonicalUrl
  );
  ensureHeadElement('meta[property="og:image"]', "meta", { property: "og:image" }).setAttribute(
    "content",
    siteMeta.socialImage
  );

  ensureHeadElement('meta[name="twitter:card"]', "meta", { name: "twitter:card" }).setAttribute(
    "content",
    "summary_large_image"
  );
  ensureHeadElement('meta[name="twitter:title"]', "meta", { name: "twitter:title" }).setAttribute(
    "content",
    title
  );
  ensureHeadElement(
    'meta[name="twitter:description"]',
    "meta",
    { name: "twitter:description" }
  ).setAttribute("content", description);
  ensureHeadElement('meta[name="twitter:image"]', "meta", { name: "twitter:image" }).setAttribute(
    "content",
    siteMeta.socialImage
  );

  ensureHeadElement('link[rel="canonical"]', "link", { rel: "canonical" }).setAttribute(
    "href",
    canonicalUrl
  );
  ensureHeadElement('link[rel="icon"]', "link", {
    rel: "icon",
    type: "image/svg+xml"
  }).setAttribute("href", "/favicon.svg");
}

function bindHistoryBackLinks() {
  document.querySelectorAll(".site-nav__back").forEach((link) => {
    link.addEventListener("click", (event) => {
      const referrer = document.referrer;
      const hasSameOriginReferrer =
        referrer && new URL(referrer, window.location.origin).origin === window.location.origin;

      if (window.history.length > 1 && hasSameOriginReferrer) {
        event.preventDefault();
        window.history.back();
      }
    });
  });
}

function renderNavigation({ active = "", showBack = false, backHref = routes.home } = {}) {
  const navClass = showBack ? "site-nav site-nav--page" : "site-nav site-nav--home";
  const linkClass = (key) => `site-nav__link ${active === key ? "is-active" : ""}`;

  return `
    <nav class="${navClass}" aria-label="主导航">
      <div class="site-nav__inner">
        <div class="site-nav__cluster">
          ${
            showBack
              ? `<a class="site-nav__back" href="${backHref}"><span aria-hidden="true">←</span><span>${siteCopy.navigation.back}</span></a>`
              : ""
          }
          <a class="site-nav__logo" href="${routes.home}">${siteMeta.siteName}</a>
        </div>
        <div class="site-nav__links">
          <a class="${linkClass("archive")}" href="${routes.archive}">${siteCopy.navigation.archive}</a>
          <a class="${linkClass("memorial")}" href="${routes.memorial}">${siteCopy.navigation.memorial}</a>
          <a class="${linkClass("about")}" href="${routes.about}">${siteCopy.navigation.about}</a>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__copy">${siteCopy.footer.copyright}</div>
        <div class="site-footer__links">
          <a href="${routes.about}#legal">${siteCopy.footer.legal}</a>
          <a href="${routes.about}#policy">${siteCopy.footer.policy}</a>
          <a href="${routes.about}#contact">${siteCopy.footer.connect}</a>
        </div>
      </div>
    </footer>
  `;
}

function renderShell(content, options = {}) {
  app.innerHTML = `
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="grain" aria-hidden="true"></div>
    <div class="site-shell">
      ${renderNavigation(options)}
      ${content}
      ${renderFooter()}
    </div>
  `;
  bindHistoryBackLinks();
}

function renderCareerCard(career, variant = "home") {
  const status = statusMeta[career.status];
  const slabWidth = variant === "archive" || variant === "related" ? 3 : 4;
  const slabHeight =
    variant === "archive"
      ? Math.round(career.slabHeight * 0.86)
      : variant === "related"
        ? Math.round(career.slabHeight * 0.5)
        : career.slabHeight;
  const teaser = variant === "archive" ? career.teaser.split("，")[0] : career.teaser;

  return `
    <a class="career-card career-card--${variant}" href="${routes.detail(career.slug)}">
      <div class="career-card__heading">
        <p class="career-card__status">${escapeHtml(status.label)}</p>
        <h2>${escapeHtml(career.name)}</h2>
      </div>
      <div class="career-card__slab" style="--slab-height:${slabHeight}px;--slab-width:${slabWidth}px"></div>
      ${
        variant === "related"
          ? ""
          : `<div class="career-card__teaser"><p>“${escapeHtml(teaser)}”</p></div>`
      }
    </a>
  `;
}

function renderNotFound({
  heading = siteCopy.notFound.heading,
  body = siteCopy.notFound.body,
  primaryHref = routes.archive,
  primaryLabel = siteCopy.notFound.primaryLabel,
  secondaryHref = routes.home,
  secondaryLabel = siteCopy.notFound.secondaryLabel
} = {}) {
  renderShell(
    `
      <main id="main-content" class="page-main page-main--detail">
        <section class="not-found-panel reveal" style="--stagger:0.05s">
          <p class="section-eyebrow">404 / Not Found</p>
          <h1>${escapeHtml(heading)}</h1>
          <p class="not-found-panel__body">${escapeHtml(body)}</p>
          <div class="not-found-panel__actions">
            <a class="outline-button" href="${primaryHref}">${escapeHtml(primaryLabel)}</a>
            <a class="text-button text-button--inline" href="${secondaryHref}">${escapeHtml(secondaryLabel)}</a>
          </div>
        </section>
      </main>
    `,
    { active: "", showBack: false }
  );
}

function renderHome() {
  const featured = careers.slice(0, 6);

  setPageMetadata({
    title: `${siteMeta.siteName} | ${siteMeta.siteNameEn}`,
    description: siteCopy.pageDescriptions.home,
    path: routes.home
  });

  renderShell(
    `
      <main id="main-content" class="page-main page-main--home">
        <header class="hero">
          <div class="hero__inner reveal" style="--stagger:0.05s">
            <h1>${siteMeta.siteName}</h1>
            <p class="hero__subtitle">${siteMeta.siteNameEn}</p>
          </div>
          <div class="hero__question">
            <p>这个职业还值不值得做？</p>
            <div class="hero__rule"></div>
          </div>
        </header>

        <section class="career-grid career-grid--home reveal" style="--stagger:0.12s">
          ${featured.map((career) => renderCareerCard(career, "home")).join("")}
        </section>

        <section class="home-quote reveal" style="--stagger:0.18s">
          <div class="home-quote__inner">
            <p class="section-eyebrow">Voices from the Silent</p>
            <blockquote>${escapeHtml(homeQuote.text)}</blockquote>
            <p class="home-quote__author">— ${escapeHtml(homeQuote.author).toUpperCase()}</p>
          </div>
          <a class="outline-button" href="${routes.archive}">查看全部墓碑 / View All</a>
        </section>
      </main>
    `,
    { active: "", showBack: false }
  );
}

function renderArchiveGrid(grid, status, sort) {
  const filtered =
    status === "all" ? [...careers] : careers.filter((career) => career.status === status);

  filtered.sort((left, right) => {
    if (sort === "timeline") {
      return left.declineYear - right.declineYear;
    }
    return left.name.localeCompare(right.name, "zh-Hans-CN");
  });

  grid.innerHTML = filtered.map((career) => renderCareerCard(career, "archive")).join("");
}

function renderArchive() {
  setPageMetadata({
    title: `归档 | ${siteMeta.siteName}`,
    description: siteCopy.pageDescriptions.archive,
    path: routes.archive
  });

  renderShell(
    `
      <main id="main-content" class="page-main page-main--wide">
        <header class="page-header reveal" style="--stagger:0.05s">
          <h1>归档 / ARCHIVE</h1>
          <p class="page-header__subtitle">Complete list of the departed and the decaying</p>
          <div class="page-header__marker"></div>
        </header>

        <section class="archive-controls reveal" style="--stagger:0.1s">
          <div class="archive-controls__group">
            <p class="section-eyebrow">Filter by status</p>
            <div class="archive-controls__actions" id="filter-row">
              <button class="text-toggle is-active" data-status="all">All</button>
              ${statusOrder
                .map(
                  (key) =>
                    `<button class="text-toggle" data-status="${key}">${statusMeta[key].label}</button>`
                )
                .join("")}
            </div>
          </div>
          <div class="archive-controls__group archive-controls__group--right">
            <p class="section-eyebrow">Sort by</p>
            <div class="archive-controls__actions">
              <button class="text-toggle is-active" data-sort="alphabetical">Alphabetical</button>
              <button class="text-toggle" data-sort="timeline">Timeline</button>
            </div>
          </div>
        </section>

        <section class="career-grid career-grid--archive reveal" id="archive-grid" style="--stagger:0.15s"></section>

        <section class="archive-tail reveal" style="--stagger:0.2s">
          <p>更多记录仍在被挖掘中……</p>
        </section>
      </main>
    `,
    { active: "archive", showBack: false }
  );

  const grid = document.querySelector("#archive-grid");
  const filterButtons = [...document.querySelectorAll("[data-status]")];
  const sortButtons = [...document.querySelectorAll("[data-sort]")];
  let currentStatus = "all";
  let currentSort = "alphabetical";

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentStatus = button.dataset.status;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderArchiveGrid(grid, currentStatus, currentSort);
    });
  });

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentSort = button.dataset.sort;
      sortButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderArchiveGrid(grid, currentStatus, currentSort);
    });
  });

  renderArchiveGrid(grid, currentStatus, currentSort);
}

function buildRelatedCareers(currentCareer) {
  return careers
    .filter((career) => career.slug !== currentCareer.slug)
    .sort((left, right) => statusMeta[left.status].order - statusMeta[right.status].order)
    .slice(0, 4);
}

function renderDetailNotFound(slug) {
  setPageMetadata({
    title: `未找到职业 | ${siteMeta.siteName}`,
    description: siteCopy.pageDescriptions.notFound,
    path: `${routes.detail(slug || "")}`,
    robots: "noindex,follow"
  });

  renderNotFound({
    heading: "未找到这座墓碑",
    body: `没有找到 slug 为“${slug || "空值"}”的职业条目。你可以返回归档继续浏览，或者从首页重新进入。`,
    primaryHref: routes.archive,
    primaryLabel: "返回归档",
    secondaryHref: routes.home,
    secondaryLabel: "回到首页"
  });
}

function renderDetail() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const career = careers.find((item) => item.slug === slug);

  if (!career) {
    renderDetailNotFound(slug);
    return;
  }

  const status = statusMeta[career.status];
  const related = buildRelatedCareers(career);

  setPageMetadata({
    title: `${career.name} | ${siteMeta.siteName}`,
    description: career.summary,
    path: routes.detail(career.slug),
    type: "article"
  });

  renderShell(
    `
      <main id="main-content" class="page-main page-main--detail">
        <header class="detail-header reveal" style="--stagger:0.05s">
          <div class="detail-header__row">
            <h1>${escapeHtml(career.name)}</h1>
            <div class="detail-header__status">
              <p class="section-eyebrow">Status</p>
              <span>${escapeHtml(status.label)} / ${escapeHtml(status.zh)}</span>
            </div>
          </div>
          <div class="detail-header__rule">
            <div class="detail-header__marker"></div>
          </div>
        </header>

        <div class="detail-layout">
          <section class="detail-timeline reveal" style="--stagger:0.1s">
            <h3 class="section-eyebrow">Timeline / 衰落轨迹</h3>
            <div class="timeline-list">
              ${career.timeline
                .map(
                  (item) => `
                    <article class="timeline-item">
                      <div class="timeline-item__dot"></div>
                      <p class="timeline-item__year">${escapeHtml(item.year)} — ${escapeHtml(item.title)}</p>
                      <p class="timeline-item__text">${escapeHtml(item.text)}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>

          <section class="detail-content">
            <div class="detail-section reveal" style="--stagger:0.14s">
              <h3 class="section-eyebrow">Profile / 职业讣告</h3>
              <p class="detail-summary">${escapeHtml(career.summary)}</p>
            </div>

            <div class="detail-section reveal" style="--stagger:0.18s">
              <h3 class="section-eyebrow">Factors / 消逝因素</h3>
              <div class="factor-grid">
                ${career.factors
                  .map(
                    (factor) => `
                      <article class="factor-card">
                        <h4>${escapeHtml(factor.title)}</h4>
                        <p>${escapeHtml(factor.text)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>

            <div class="detail-section reveal" style="--stagger:0.22s">
              <h3 class="section-eyebrow">Voices / 悼词节录</h3>
              <div class="voice-list">
                ${career.voices
                  .map(
                    (voice) => `
                      <article class="voice-card">
                        <p class="voice-card__text">“${escapeHtml(voice.text)}”</p>
                        <div class="voice-card__meta">
                          <span>— ${escapeHtml(voice.author)}</span>
                          <span>${escapeHtml(voice.date)}</span>
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </section>
        </div>

        <section class="related-section reveal" style="--stagger:0.26s">
          <h3 class="section-eyebrow section-eyebrow--centered">Similar Fates / 同病相怜</h3>
          <div class="career-grid career-grid--related">
            ${related.map((item) => renderCareerCard(item, "related")).join("")}
          </div>
        </section>
      </main>
    `,
    { active: "", showBack: true, backHref: routes.archive }
  );
}

function renderMemorialList(items) {
  return items
    .map(
      (entry) => `
        <article class="memorial-item">
          <div class="memorial-item__head">
            <h4>${escapeHtml(entry.career)}</h4>
            <span>${escapeHtml(entry.date)}</span>
          </div>
          <p class="memorial-item__text">“${escapeHtml(entry.text)}”</p>
          <p class="memorial-item__signature">— ${escapeHtml(entry.signature)}</p>
        </article>
      `
    )
    .join("");
}

function interpolateTemplate(template, values) {
  return Object.entries(values).reduce(
    (content, [key, value]) => content.replaceAll(`{${key}}`, String(value)),
    template
  );
}

function buildMemorialDraft({ career, signature, text }) {
  const normalizedSignature = signature.trim() || "匿名";
  const normalizedText = text.trim() || "（请在这里写下你的悼词）";
  const subject = `${siteCopy.memorialEmail.subjectPrefix} ${career} - ${normalizedSignature}`;
  const body = interpolateTemplate(siteCopy.memorialEmail.bodyTemplate, {
    career,
    signature: normalizedSignature,
    text: normalizedText
  });

  return { subject, body };
}

function buildMailtoUrl(email, subject, body) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function renderMemorial() {
  setPageMetadata({
    title: `祭奠 | ${siteMeta.siteName}`,
    description: siteCopy.pageDescriptions.memorial,
    path: routes.memorial
  });

  renderShell(
    `
      <main id="main-content" class="page-main page-main--detail">
        <header class="detail-header reveal" style="--stagger:0.05s">
          <div class="detail-header__row">
            <h1>祭奠 / Memorial</h1>
            <div class="detail-header__status">
              <p class="section-eyebrow">Channel</p>
              <span>EMAIL / 邮箱投稿</span>
            </div>
          </div>
          <div class="detail-header__rule">
            <div class="detail-header__marker"></div>
          </div>
        </header>

        <div class="memorial-layout">
          <section class="memorial-form reveal" style="--stagger:0.1s">
            <div class="memorial-form__sticky">
              <div class="memorial-note">
                <p class="section-eyebrow">${siteCopy.memorialNotice.eyebrow}</p>
                <p class="memorial-note__text">${escapeHtml(siteCopy.memorialNotice.text)}</p>
              </div>
              <h3 class="section-eyebrow">${siteCopy.memorialForm.heading}</h3>
              <form id="memorial-form" class="memorial-form__fields">
                <label>
                  <span>${siteCopy.memorialForm.careerLabel}</span>
                  <select class="memorial-input" name="career" aria-label="${siteCopy.memorialForm.careerLabel}">
                    ${careers
                      .map((career) => `<option value="${escapeHtml(career.name)}">${escapeHtml(career.name)}</option>`)
                      .join("")}
                  </select>
                </label>
                <label>
                  <span>${siteCopy.memorialForm.signatureLabel}</span>
                  <input class="memorial-input" name="signature" aria-label="${siteCopy.memorialForm.signatureLabel}" placeholder="${siteCopy.memorialForm.signaturePlaceholder}" required />
                </label>
                <label>
                  <span>${siteCopy.memorialForm.textLabel}</span>
                  <textarea class="memorial-input memorial-input--area" name="text" rows="6" aria-label="${siteCopy.memorialForm.textLabel}" placeholder="${siteCopy.memorialForm.textPlaceholder}" required></textarea>
                </label>
                <button class="outline-button outline-button--full" type="submit">${siteCopy.memorialForm.submitLabel}</button>
              </form>
              <div class="memorial-fallback" aria-live="polite">
                <p class="section-eyebrow">${siteCopy.memorialEmail.fallbackTitle}</p>
                <p class="memorial-fallback__text">${escapeHtml(siteCopy.memorialEmail.fallbackBody)}</p>
                <p class="memorial-fallback__hint">${escapeHtml(siteCopy.memorialEmail.manualCopyHint)}</p>
                <div class="memorial-fallback__meta">
                  <div class="memorial-fallback__field">
                    <span>Email / 邮箱</span>
                    <a class="memorial-fallback__link" href="mailto:${siteMeta.contactEmail}">${siteMeta.contactEmail}</a>
                  </div>
                  <div class="memorial-fallback__field">
                    <span>Subject / 主题预览</span>
                    <p class="memorial-fallback__subject" id="memorial-subject-preview"></p>
                  </div>
                </div>
                <div class="memorial-fallback__field">
                  <span>Body / 正文预览</span>
                  <pre class="memorial-fallback__body" id="memorial-body-preview"></pre>
                </div>
                <a class="text-button text-button--inline memorial-fallback__launch" id="memorial-mailto-link" href="#">
                  Open Email App / 打开邮件客户端
                </a>
              </div>
            </div>
          </section>

          <section class="memorial-feed reveal" style="--stagger:0.14s">
            <div class="memorial-feed__intro">
              <h3 class="section-eyebrow">Curated Tributes / 示例悼词</h3>
              <p class="memorial-feed__note">以下内容为静态示例，用于展示页面氛围，并非当前访客的实时投稿。</p>
            </div>
            <div class="memorial-feed__list" id="memorial-list"></div>
          </section>
        </div>
      </main>
    `,
    { active: "memorial", showBack: false }
  );

  const list = document.querySelector("#memorial-list");
  const form = document.querySelector("#memorial-form");
  const subjectPreview = document.querySelector("#memorial-subject-preview");
  const bodyPreview = document.querySelector("#memorial-body-preview");
  const mailtoLink = document.querySelector("#memorial-mailto-link");

  list.innerHTML = renderMemorialList(initialMemorials);

  function updateDraftPreview() {
    const formData = new FormData(form);
    const draft = buildMemorialDraft({
      career: String(formData.get("career") || careers[0]?.name || "").trim(),
      signature: String(formData.get("signature") || "").trim(),
      text: String(formData.get("text") || "").trim()
    });
    const href = buildMailtoUrl(siteMeta.contactEmail, draft.subject, draft.body);

    subjectPreview.textContent = draft.subject;
    bodyPreview.textContent = draft.body;
    mailtoLink.setAttribute("href", href);
    return href;
  }

  updateDraftPreview();
  form.addEventListener("input", updateDraftPreview);
  form.addEventListener("change", updateDraftPreview);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = updateDraftPreview();
  });
}

function renderAboutInfoSection(id, config) {
  return `
    <article class="info-card" id="${id}">
      <p class="section-eyebrow">${escapeHtml(config.eyebrow)}</p>
      <h3>${escapeHtml(config.title)}</h3>
      ${config.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${
        config.actions?.length
          ? `<div class="info-card__actions">
              ${config.actions
                .map(
                  (action) =>
                    `<a class="text-button text-button--inline" href="${escapeHtml(action.href)}"${action.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(action.label)}</a>`
                )
                .join("")}
            </div>`
          : ""
      }
    </article>
  `;
}

function renderAbout() {
  setPageMetadata({
    title: `信息 | ${siteMeta.siteName}`,
    description: siteCopy.pageDescriptions.about,
    path: routes.about
  });

  renderShell(
    `
      <main id="main-content" class="page-main page-main--detail page-main--about">
        <header class="about-hero reveal" style="--stagger:0.05s">
          <div class="about-hero__copy">
            <h2 class="section-eyebrow">Mission / 项目使命</h2>
            <h1>${escapeHtml(aboutData.missionTitle)}</h1>
            <p>${escapeHtml(aboutData.missionBody)}</p>
          </div>
          <div class="about-hero__rule"></div>
        </header>

        <section class="about-section reveal" style="--stagger:0.1s" id="methodology">
          <h2 class="section-eyebrow">Methodology / 评估准则</h2>
          <div class="method-grid">
            ${aboutData.methodology
              .map(
                (item, index) => `
                  <article class="method-card ${index === 0 ? "method-card--active" : ""}">
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.text)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="about-section reveal" style="--stagger:0.14s">
          <div class="about-columns">
            <div>
              <h2 class="section-eyebrow">Standards / 评估指标</h2>
              <div class="standard-list">
                ${aboutData.standards
                  .map(
                    ([label, value]) => `
                      <div class="standard-item">
                        <span>${escapeHtml(label)}</span>
                        <strong>${escapeHtml(value)}</strong>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
            <div>
              <h2 class="section-eyebrow">Timeline / 项目简史</h2>
              <div class="project-timeline">
                ${aboutData.timeline
                  .map(
                    ([date, text], index) => `
                      <article class="project-timeline__item">
                        <div class="project-timeline__dot ${index === 0 ? "is-active" : ""}"></div>
                        <p class="project-timeline__date">${escapeHtml(date).replace(" / ", " — ")}</p>
                        <p>${escapeHtml(text)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="stats-band reveal" style="--stagger:0.18s">
          ${aboutData.stats
            .map(
              ([value, label], index) => `
                <div class="stats-band__item ${index === 1 ? "stats-band__item--bordered" : ""}">
                  <p class="stats-band__value">${escapeHtml(value)}</p>
                  <p class="stats-band__label">${escapeHtml(label)}</p>
                </div>
              `
            )
            .join("")}
        </section>

        <section class="about-section reveal" style="--stagger:0.22s" id="contributors">
          <h2 class="section-eyebrow">Contributors / 贡献者</h2>
          <div class="contributors-grid">
            ${aboutData.contributors
              .map(
                ([name, role], index) => `
                  <article class="contributor-card ${index === aboutData.contributors.length - 1 ? "contributor-card--muted" : ""}">
                    <h3>${escapeHtml(name)}</h3>
                    <p>${escapeHtml(role)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="about-section reveal" style="--stagger:0.26s">
          <div class="info-grid">
            ${renderAboutInfoSection("legal", siteCopy.aboutInfo.legal)}
            ${renderAboutInfoSection("policy", siteCopy.aboutInfo.policy)}
            ${renderAboutInfoSection("contact", siteCopy.aboutInfo.contact)}
          </div>
        </section>
      </main>
    `,
    { active: "about", showBack: false }
  );
}

function renderSite404() {
  setPageMetadata({
    title: `404 | ${siteMeta.siteName}`,
    description: siteCopy.pageDescriptions.notFound,
    path: routes.notFound,
    robots: "noindex,follow"
  });
  renderNotFound();
}

function boot() {
  if (!app) {
    return;
  }

  switch (page) {
    case "archive":
      renderArchive();
      break;
    case "detail":
      renderDetail();
      break;
    case "memorial":
      renderMemorial();
      break;
    case "about":
      renderAbout();
      break;
    case "not-found":
      renderSite404();
      break;
    default:
      renderHome();
  }
}

boot();
