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
const page = document.body.dataset.page ?? "home";
const defaultLocale = "zh";
const localeStorageKey = "career-graveyard-locale";
const supportedLocales = ["zh", "en"];
const statusOrder = Object.entries(statusMeta)
  .sort(([, left], [, right]) => left.order - right.order)
  .map(([key]) => key);

const routes = {
  home: "/",
  archive: "/archive.html",
  memorial: "/memorial.html",
  about: "/about.html",
  detail: (slug) => `/career.html?slug=${encodeURIComponent(slug)}`,
  notFound: "/404.html"
};

const uiState = {
  archive: {
    status: "all",
    sort: "alphabetical"
  },
  memorial: {
    activeMode: "existing",
    existing: {
      careerSlug: careers[0]?.slug ?? "",
      signature: "",
      text: ""
    },
    unlisted: {
      careerName: "",
      introduction: "",
      signature: "",
      text: "",
      references: ""
    }
  }
};

let currentLocale = readStoredLocale();

function readStoredLocale() {
  const stored = window.localStorage.getItem(localeStorageKey);
  return supportedLocales.includes(stored) ? stored : defaultLocale;
}

function persistLocale(locale) {
  window.localStorage.setItem(localeStorageKey, locale);
}

function t(value, locale = currentLocale) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value ?? "";
  }

  if ("zh" in value || "en" in value) {
    return value[locale] ?? value[defaultLocale] ?? "";
  }

  return value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toAbsoluteUrl(pathname) {
  return new URL(pathname, siteMeta.siteUrl).toString();
}

function ensureHeadElement(selector, tagName, attributes = {}) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.append(element);
  }

  return element;
}

function getHtmlLang(locale = currentLocale) {
  return locale === "zh" ? "zh-CN" : "en";
}

function applyLocaleDocumentState(locale = currentLocale) {
  document.documentElement.lang = getHtmlLang(locale);
  document.body.dataset.locale = locale;
}

function setPageMetadata({
  title,
  description = siteMeta.defaultDescription,
  path = window.location.pathname + window.location.search,
  type = "website",
  robots = "index,follow"
}) {
  const pageTitle = title ? `${title} | ${t(siteMeta.siteName)}` : t(siteMeta.siteName);
  const pageDescription = t(description);
  const absoluteUrl = toAbsoluteUrl(path);

  document.title = pageTitle;
  ensureHeadElement('meta[name="description"]', "meta", { name: "description" }).setAttribute(
    "content",
    pageDescription
  );
  ensureHeadElement('meta[name="theme-color"]', "meta", { name: "theme-color" }).setAttribute(
    "content",
    siteMeta.themeColor
  );
  ensureHeadElement('meta[name="robots"]', "meta", { name: "robots" }).setAttribute("content", robots);
  ensureHeadElement('meta[property="og:site_name"]', "meta", { property: "og:site_name" }).setAttribute(
    "content",
    t(siteMeta.siteName)
  );
  ensureHeadElement('meta[property="og:title"]', "meta", { property: "og:title" }).setAttribute(
    "content",
    pageTitle
  );
  ensureHeadElement('meta[property="og:description"]', "meta", {
    property: "og:description"
  }).setAttribute("content", pageDescription);
  ensureHeadElement('meta[property="og:type"]', "meta", { property: "og:type" }).setAttribute(
    "content",
    type
  );
  ensureHeadElement('meta[property="og:url"]', "meta", { property: "og:url" }).setAttribute(
    "content",
    absoluteUrl
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
    pageTitle
  );
  ensureHeadElement('meta[name="twitter:description"]', "meta", {
    name: "twitter:description"
  }).setAttribute("content", pageDescription);
  ensureHeadElement('meta[name="twitter:image"]', "meta", { name: "twitter:image" }).setAttribute(
    "content",
    siteMeta.socialImage
  );
  ensureHeadElement('link[rel="canonical"]', "link", { rel: "canonical" }).setAttribute("href", absoluteUrl);
  ensureHeadElement('link[rel="icon"]', "link", { rel: "icon", type: "image/svg+xml" }).setAttribute(
    "href",
    "/favicon.svg"
  );
}

function setLocale(locale) {
  if (!supportedLocales.includes(locale) || locale === currentLocale) {
    return;
  }

  currentLocale = locale;
  persistLocale(locale);
  applyLocaleDocumentState(locale);
  renderCurrentPage();
}

function getStatusLabel(statusKey) {
  return t(statusMeta[statusKey]?.label ?? statusKey);
}

function getCareerName(career) {
  return t(career?.name ?? "");
}

function getCareerBySlug(slug) {
  return careers.find((career) => career.slug === slug) ?? null;
}

function interpolateTemplate(template, values) {
  return t(template).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function renderLanguageSwitch() {
  return `
    <div class="site-nav__locale-switch" role="group" aria-label="${escapeHtml(
      t(siteCopy.localeSwitch.ariaLabel)
    )}">
      <button
        class="site-nav__locale-button${currentLocale === "zh" ? " is-active" : ""}"
        type="button"
        data-set-locale="zh"
      >
        ${escapeHtml(siteCopy.localeSwitch.zh)}
      </button>
      <button
        class="site-nav__locale-button${currentLocale === "en" ? " is-active" : ""}"
        type="button"
        data-set-locale="en"
      >
        ${escapeHtml(siteCopy.localeSwitch.en)}
      </button>
    </div>
  `;
}

function renderNavigation({ active = "", showBack = false, backHref = routes.home } = {}) {
  const navLinks = [
    {
      key: "archive",
      href: routes.archive,
      label: t(siteCopy.navigation.archive),
      hint: t(siteCopy.navigationHints.archive)
    },
    {
      key: "memorial",
      href: routes.memorial,
      label: t(siteCopy.navigation.memorial),
      hint: t(siteCopy.navigationHints.memorial)
    },
    {
      key: "about",
      href: routes.about,
      label: t(siteCopy.navigation.about),
      hint: t(siteCopy.navigationHints.about)
    }
  ];

  return `
    <nav class="site-nav site-nav--${page === "home" ? "home" : "page"}" aria-label="Primary">
      <div class="site-nav__inner">
        <div class="site-nav__cluster">
          ${
            showBack
              ? `<a class="site-nav__back" href="${backHref}" data-back-link>&larr; ${escapeHtml(
                  t(siteCopy.navigation.back)
                )}</a>`
              : `<a class="site-nav__logo" href="${routes.home}">${escapeHtml(t(siteMeta.siteName))}</a>`
          }
        </div>
        <div class="site-nav__controls">
          <div class="site-nav__links">
            ${navLinks
              .map(
                (link) => `
                  <span class="site-nav__item">
                    <a class="site-nav__link${active === link.key ? " is-active" : ""}" href="${link.href}">
                      <span class="site-nav__link-label">${escapeHtml(link.label)}</span>
                    </a>
                    <span class="site-nav__hint" id="site-nav-hint-${link.key}" role="tooltip">${escapeHtml(
                      link.hint
                    )}</span>
                  </span>
                `
              )
              .join("")}
          </div>
          ${renderLanguageSwitch()}
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer${page === "home" ? " site-footer--home" : ""}">
      <div class="site-footer__inner">
        <p class="site-footer__copy">${escapeHtml(t(siteCopy.footer.copyright))}</p>
        <div class="site-footer__links">
          <a href="${routes.about}#legal">${escapeHtml(t(siteCopy.footer.legal))}</a>
          <a href="${routes.about}#policy">${escapeHtml(t(siteCopy.footer.policy))}</a>
          <a href="${routes.about}#contact">${escapeHtml(t(siteCopy.footer.connect))}</a>
        </div>
      </div>
    </footer>
  `;
}

function bindHistoryBackLinks() {
  document.querySelectorAll("[data-back-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });
  });
}

function bindLocaleSwitches() {
  document.querySelectorAll("[data-set-locale]").forEach((button) => {
    button.addEventListener("click", () => {
      setLocale(button.getAttribute("data-set-locale"));
    });
  });
}

function bindShellInteractions() {
  bindHistoryBackLinks();
  bindLocaleSwitches();
}

function renderShell(content, options = {}) {
  const {
    active = "",
    showBack = false,
    backHref = routes.home,
    mainClassName = "",
    mainId = "main-content",
    footerInMain = false
  } = options;

  applyLocaleDocumentState();

  app.innerHTML = `
    <div class="site-shell">
      <a class="skip-link" href="#${mainId}">${escapeHtml(t(siteCopy.skipLink))}</a>
      <div class="grain"></div>
      ${renderNavigation({ active, showBack, backHref })}
      <main id="${mainId}" class="page-main ${mainClassName}">
        ${content}
        ${footerInMain ? renderFooter() : ""}
      </main>
      ${footerInMain ? "" : renderFooter()}
    </div>
  `;

  bindShellInteractions();
}

function renderCareerCard(career, variant = "home") {
  const headingTag = variant === "related" ? "h4" : "h2";
  return `
    <a
      class="career-card career-card--${variant} reveal"
      style="--slab-height:${career.slabHeight}px; --stagger:${0.08 * careers.indexOf(career)}s;"
      href="${routes.detail(career.slug)}"
    >
      <div class="career-card__heading">
        <p class="career-card__status">${escapeHtml(getStatusLabel(career.status))}</p>
        <${headingTag}>${escapeHtml(getCareerName(career))}</${headingTag}>
      </div>
      <div class="career-card__slab" aria-hidden="true"></div>
      <div class="career-card__teaser">
        <p>${escapeHtml(t(career.teaser))}</p>
      </div>
    </a>
  `;
}

function renderNotFound(config = {}) {
  const eyebrow = config.eyebrow ?? siteCopy.notFound.eyebrow;
  const heading = config.heading ?? siteCopy.notFound.heading;
  const body = config.body ?? siteCopy.notFound.body;
  const primaryHref = config.primaryHref ?? routes.archive;
  const primaryLabel = config.primaryLabel ?? siteCopy.notFound.primaryLabel;
  const secondaryHref = config.secondaryHref ?? routes.home;
  const secondaryLabel = config.secondaryLabel ?? siteCopy.notFound.secondaryLabel;

  return `
    <section class="not-found-panel reveal">
      <p class="section-eyebrow">${escapeHtml(t(eyebrow))}</p>
      <h1>${escapeHtml(t(heading))}</h1>
      <p class="not-found-panel__body">${escapeHtml(t(body))}</p>
      <div class="not-found-panel__actions">
        <a class="outline-button" href="${primaryHref}">${escapeHtml(t(primaryLabel))}</a>
        <a class="text-button text-button--inline" href="${secondaryHref}">${escapeHtml(t(secondaryLabel))}</a>
      </div>
    </section>
  `;
}

function renderHome() {
  setPageMetadata({
    title: "",
    description: siteCopy.pageDescriptions.home,
    path: routes.home
  });

  const featured = careers.slice(0, 6);

  renderShell(
    `
      <div class="home-snap-shell" aria-label="${escapeHtml(t(siteCopy.pageDescriptions.home))}">
        <section class="home-panel home-panel--hero" data-home-panel="hero">
          <div class="home-panel__inner home-panel__inner--hero">
            <section class="hero">
              <div class="hero__inner reveal">
                <h1>${escapeHtml(t(siteMeta.siteName))}</h1>
                <p class="hero__subtitle">${escapeHtml(t(siteCopy.home.subtitle))}</p>
              </div>
            </section>

            <section class="hero-axis reveal" style="--stagger:0.18s;">
              <p class="hero__question-copy">${escapeHtml(t(siteCopy.home.question))}</p>
              <div class="hero__rule" aria-hidden="true"></div>
            </section>
          </div>
        </section>

        <section
          class="home-panel home-panel--careers"
          data-home-panel="careers"
          aria-labelledby="home-panel-careers-title"
        >
          <div class="home-panel__inner home-panel__inner--careers">
            <h2 id="home-panel-careers-title" class="sr-only">${escapeHtml(
              t(siteCopy.navigation.archive)
            )}</h2>
            <section class="career-grid career-grid--home">
              ${featured.map((career) => renderCareerCard(career, "home")).join("")}
            </section>
          </div>
        </section>

        <section class="home-panel home-panel--quote" data-home-panel="quote">
          <div class="home-panel__inner home-panel__inner--quote">
            <section class="home-quote reveal" style="--stagger:0.35s;">
              <p class="section-eyebrow section-eyebrow--centered">${escapeHtml(
                t(siteCopy.home.quoteEyebrow)
              )}</p>
              <div class="home-quote__inner">
                <blockquote>${escapeHtml(t(homeQuote.text))}</blockquote>
                <p class="home-quote__author">${escapeHtml(t(homeQuote.author))}</p>
              </div>
              <a class="outline-button" href="${routes.archive}">${escapeHtml(t(siteCopy.home.cta))}</a>
            </section>
          </div>
        </section>
      </div>
    `,
    {
      active: "",
      showBack: false,
      mainClassName: "page-main--home",
      footerInMain: true
    }
  );
}

function getArchiveSorter() {
  return new Intl.Collator(currentLocale === "zh" ? "zh-Hans-CN" : "en", {
    sensitivity: "base"
  });
}

function getFilteredCareers() {
  const filtered =
    uiState.archive.status === "all"
      ? [...careers]
      : careers.filter((career) => career.status === uiState.archive.status);

  if (uiState.archive.sort === "timeline") {
    return filtered.sort((left, right) => right.declineYear - left.declineYear);
  }

  const collator = getArchiveSorter();
  return filtered.sort((left, right) => collator.compare(getCareerName(left), getCareerName(right)));
}

function renderArchiveGrid() {
  return getFilteredCareers()
    .map((career) => renderCareerCard(career, "archive"))
    .join("");
}

function renderArchiveActions(options, currentValue, attribute) {
  return options
    .map(
      (option) => `
        <button
          class="text-toggle${currentValue === option.value ? " is-active" : ""}"
          type="button"
          data-${attribute}="${option.value}"
        >
          ${escapeHtml(option.label)}
        </button>
      `
    )
    .join("");
}

function bindArchiveControls() {
  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.archive.status = button.getAttribute("data-status-filter") ?? "all";
      renderArchive();
    });
  });

  document.querySelectorAll("[data-sort-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.archive.sort = button.getAttribute("data-sort-mode") ?? "alphabetical";
      renderArchive();
    });
  });
}

function renderArchive() {
  setPageMetadata({
    title: t(siteCopy.archive.title),
    description: siteCopy.pageDescriptions.archive,
    path: routes.archive
  });

  const statusOptions = [
    { value: "all", label: t(siteCopy.archive.all) },
    ...statusOrder.map((statusKey) => ({
      value: statusKey,
      label: getStatusLabel(statusKey)
    }))
  ];
  const sortOptions = [
    { value: "alphabetical", label: t(siteCopy.archive.alphabetical) },
    { value: "timeline", label: t(siteCopy.archive.timeline) }
  ];

  renderShell(
    `
      <header class="page-header reveal">
        <h1>${escapeHtml(t(siteCopy.archive.title))}</h1>
        <p class="page-header__subtitle">${escapeHtml(t(siteCopy.archive.subtitle))}</p>
        <div class="page-header__marker" aria-hidden="true"></div>
      </header>

      <section class="archive-controls reveal" style="--stagger:0.12s;">
        <div class="archive-controls__group">
          <p class="section-eyebrow">${escapeHtml(t(siteCopy.archive.filterEyebrow))}</p>
          <div class="archive-controls__actions">
            ${renderArchiveActions(statusOptions, uiState.archive.status, "status-filter")}
          </div>
        </div>
        <div class="archive-controls__group archive-controls__group--right">
          <p class="section-eyebrow">${escapeHtml(t(siteCopy.archive.sortEyebrow))}</p>
          <div class="archive-controls__actions">
            ${renderArchiveActions(sortOptions, uiState.archive.sort, "sort-mode")}
          </div>
        </div>
      </section>

      <section class="career-grid career-grid--archive">
        ${renderArchiveGrid()}
      </section>

      <div class="archive-tail reveal" style="--stagger:0.18s;">
        <p>${escapeHtml(t(siteCopy.archive.tail))}</p>
      </div>
    `,
    {
      active: "archive",
      mainClassName: "page-main--exhibition"
    }
  );

  bindArchiveControls();
}

function buildRelatedCareers(currentCareer) {
  const related = careers
    .filter((career) => career.slug !== currentCareer.slug && career.status === currentCareer.status)
    .slice(0, 4);

  if (related.length >= 2) {
    return related;
  }

  return careers.filter((career) => career.slug !== currentCareer.slug).slice(0, 4);
}

function renderDetailNotFound(slug) {
  setPageMetadata({
    title: t(siteCopy.notFound.detailTitle),
    description: siteCopy.pageDescriptions.notFound,
    path: routes.archive,
    robots: "noindex,follow"
  });

  renderShell(
    renderNotFound({
      eyebrow: siteCopy.notFound.eyebrow,
      heading: siteCopy.notFound.detailTitle,
      body: {
        zh: interpolateTemplate(siteCopy.notFound.detailBodyTemplate, { slug }),
        en: interpolateTemplate(siteCopy.notFound.detailBodyTemplate, { slug })
      }
    }),
    {
      active: "archive",
      showBack: true,
      backHref: routes.archive
    }
  );
}

function renderDetail() {
  const slug = new URLSearchParams(window.location.search).get("slug") ?? "";
  const career = getCareerBySlug(slug);

  if (!career) {
    renderDetailNotFound(slug);
    return;
  }

  setPageMetadata({
    title: getCareerName(career),
    description: career.summary,
    path: window.location.pathname + window.location.search,
    type: "article"
  });

  const related = buildRelatedCareers(career);

  renderShell(
    `
      <header class="detail-header reveal">
        <div class="detail-header__row">
          <div>
            <h1>${escapeHtml(getCareerName(career))}</h1>
            <p class="detail-summary">${escapeHtml(t(career.summary))}</p>
          </div>
          <div class="detail-header__status">
            <p class="section-eyebrow">${escapeHtml(t(siteCopy.detail.statusEyebrow))}</p>
            <span>${escapeHtml(getStatusLabel(career.status))}</span>
          </div>
        </div>
        <div class="detail-header__rule">
          <div class="detail-header__marker" aria-hidden="true"></div>
        </div>
      </header>

      <section class="detail-layout">
        <aside class="detail-timeline reveal" style="--stagger:0.1s;">
          <p class="section-eyebrow">${escapeHtml(t(siteCopy.detail.timelineEyebrow))}</p>
          <div class="timeline-list">
            ${career.timeline
              .map(
                (item) => `
                  <article class="timeline-item">
                    <div class="timeline-item__dot" aria-hidden="true"></div>
                    <p class="timeline-item__year">${escapeHtml(t(item.year))}</p>
                    <h4>${escapeHtml(t(item.title))}</h4>
                    <p class="timeline-item__text">${escapeHtml(t(item.text))}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </aside>

        <div class="detail-content">
          <section class="detail-section reveal" style="--stagger:0.14s;">
            <p class="section-eyebrow">${escapeHtml(t(siteCopy.detail.profileEyebrow))}</p>
            <p class="detail-summary">${escapeHtml(t(career.summary))}</p>
          </section>

          <section class="detail-section reveal" style="--stagger:0.18s;">
            <p class="section-eyebrow">${escapeHtml(t(siteCopy.detail.factorsEyebrow))}</p>
            <div class="factor-grid">
              ${career.factors
                .map(
                  (factor) => `
                    <article class="factor-card">
                      <h4>${escapeHtml(t(factor.title))}</h4>
                      <p>${escapeHtml(t(factor.text))}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>

          <section class="detail-section reveal" style="--stagger:0.22s;">
            <p class="section-eyebrow">${escapeHtml(t(siteCopy.detail.voicesEyebrow))}</p>
            <div class="voice-list">
              ${career.voices
                .map(
                  (voice) => `
                    <article class="voice-card">
                      <p class="voice-card__text">${escapeHtml(t(voice.text))}</p>
                      <div class="voice-card__meta">
                        <span>${escapeHtml(t(voice.author))}</span>
                        <span>${escapeHtml(t(voice.date))}</span>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        </div>
      </section>

      <section class="related-section reveal" style="--stagger:0.28s;">
        <p class="section-eyebrow section-eyebrow--centered">${escapeHtml(
          t(siteCopy.detail.relatedEyebrow)
        )}</p>
        <div class="career-grid career-grid--related">
          ${related.map((item) => renderCareerCard(item, "related")).join("")}
        </div>
      </section>
    `,
    {
      active: "archive",
      showBack: true,
      backHref: routes.archive,
      mainClassName: "page-main--detail"
    }
  );
}

function buildMailtoUrl({ email, subject, body }) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getMemorialModeCopy(modeKey = uiState.memorial.activeMode) {
  return siteCopy.memorial.modes[modeKey];
}

function getMemorialModeState(modeKey = uiState.memorial.activeMode) {
  return uiState.memorial[modeKey];
}

function buildExistingMemorialDraft({ careerSlug, signature, text }) {
  const career = getCareerBySlug(careerSlug) ?? careers[0];
  const safeSignature = signature.trim() || t(siteCopy.memorialEmail.emptySignature);
  const safeText = text.trim() || t(siteCopy.memorialEmail.emptyText);
  const careerName = getCareerName(career);

  return {
    subject: `${t(siteCopy.memorialEmail.subjectPrefix)} ${careerName} - ${safeSignature}`,
    body: interpolateTemplate(siteCopy.memorialEmail.bodyTemplate, {
      career: careerName,
      signature: safeSignature,
      text: safeText
    }),
    email: siteMeta.contactEmail
  };
}

function buildUnlistedMemorialDraft({ careerName, introduction, signature, text, references }) {
  const safeCareer = careerName.trim() || t(siteCopy.memorial.modes.unlisted.careerNamePlaceholder);
  const safeIntroduction = introduction.trim() || t(siteCopy.contactEmail.emptyIntroduction);
  const safeSignature = signature.trim() || t(siteCopy.contactEmail.emptySignature);
  const safeText = text.trim() || t(siteCopy.contactEmail.emptyText);
  const safeReferences = references.trim();
  const referencesBlock = safeReferences
    ? `${t(siteCopy.contactEmail.referencesLabel)}${currentLocale === "zh" ? "：" : ": "}${safeReferences}`
    : "";

  return {
    subject: `${t(siteCopy.contactEmail.subjectPrefix)} ${safeCareer} - ${safeSignature}`,
    body: interpolateTemplate(siteCopy.contactEmail.bodyTemplate, {
      career: safeCareer,
      introduction: safeIntroduction,
      signature: safeSignature,
      text: safeText,
      referencesBlock
    })
      .replace(/\n{2,}/g, "\n")
      .trim(),
    email: siteMeta.contactEmail
  };
}

function buildUnlistedMemorialDraftResolved({ careerName, introduction, signature, text, references }) {
  const safeCareer = careerName.trim() || t(siteCopy.memorial.modes.unlisted.careerNamePlaceholder);
  const safeIntroduction = introduction.trim() || t(siteCopy.contactEmail.emptyIntroduction);
  const safeSignature = signature.trim() || t(siteCopy.contactEmail.emptySignature);
  const safeText = text.trim() || t(siteCopy.contactEmail.emptyText);
  const safeReferences = references.trim();
  const referencesBlock = safeReferences
    ? `${t(siteCopy.contactEmail.referencesLabel)}${currentLocale === "zh" ? "：" : ": "}${safeReferences}`
    : "";

  return {
    subject: `${t(siteCopy.contactEmail.subjectPrefix)} ${safeCareer} - ${safeSignature}`,
    body: interpolateTemplate(siteCopy.contactEmail.bodyTemplate, {
      career: safeCareer,
      introduction: safeIntroduction,
      signature: safeSignature,
      text: safeText,
      referencesBlock
    })
      .replace(/\n{2,}/g, "\n")
      .trim(),
    email: siteMeta.contactEmail
  };
}

function isMemorialModeValid(modeKey, state) {
  if (modeKey === "existing") {
    return Boolean(state.signature.trim() && state.text.trim());
  }

  return Boolean(
    state.careerName.trim() && state.introduction.trim() && state.signature.trim() && state.text.trim()
  );
}

function buildMemorialDraft(modeKey = uiState.memorial.activeMode) {
  const state = getMemorialModeState(modeKey);
  const draft =
    modeKey === "existing" ? buildExistingMemorialDraft(state) : buildUnlistedMemorialDraftResolved(state);

  return {
    ...draft,
    isValid: isMemorialModeValid(modeKey, state)
  };
}

function renderMemorialList(items, modeKey) {
  return items
    .map((item) => {
      if (modeKey === "unlisted") {
        return `
          <article class="memorial-item memorial-item--unlisted">
            <div class="memorial-item__head">
              <h4>${escapeHtml(t(item.careerName))}</h4>
              <span>${escapeHtml(t(item.date))}</span>
            </div>
            <p class="memorial-item__intro">${escapeHtml(t(item.introduction))}</p>
            <p class="memorial-item__text">${escapeHtml(t(item.text))}</p>
            ${
              item.references
                ? `<p class="memorial-item__references">${escapeHtml(t(item.references))}</p>`
                : ""
            }
            <p class="memorial-item__signature">${escapeHtml(t(item.signature))}</p>
          </article>
        `;
      }

      const career = getCareerBySlug(item.careerSlug);
      return `
        <article class="memorial-item">
          <div class="memorial-item__head">
            <h4>${escapeHtml(career ? getCareerName(career) : item.careerSlug)}</h4>
            <span>${escapeHtml(t(item.date))}</span>
          </div>
          <p class="memorial-item__text">${escapeHtml(t(item.text))}</p>
          <p class="memorial-item__signature">${escapeHtml(t(item.signature))}</p>
        </article>
      `;
    })
    .join("");
}

function renderMemorialModeSwitcher() {
  const buttons = [
    { key: "existing", label: t(siteCopy.memorial.modes.existing.tabLabel) },
    { key: "unlisted", label: t(siteCopy.memorial.modes.unlisted.tabLabel) }
  ];

  return `
    <section class="memorial-mode-switch reveal" style="--stagger:0.04s;" aria-label="${escapeHtml(
      t(siteCopy.memorial.switcherLabel)
    )}">
      <div class="memorial-mode-switch__tabs" role="tablist" aria-label="${escapeHtml(
        t(siteCopy.memorial.switcherLabel)
      )}">
        ${buttons
          .map(
            (button) => `
              <button
                class="memorial-mode-switch__button${
                  uiState.memorial.activeMode === button.key ? " is-active" : ""
                }"
                type="button"
                role="tab"
                aria-selected="${uiState.memorial.activeMode === button.key ? "true" : "false"}"
                data-memorial-mode="${button.key}"
              >
                ${escapeHtml(button.label)}
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderExistingMemorialFields(modeCopy) {
  const state = getMemorialModeState("existing");

  return `
    <p class="section-eyebrow">${escapeHtml(t(modeCopy.formHeading))}</p>
    <p class="memorial-form__description">${escapeHtml(t(modeCopy.description))}</p>
    <label for="memorial-career">
      <span>${escapeHtml(t(modeCopy.careerLabel))}</span>
      <select id="memorial-career" class="memorial-input">
        ${careers
          .map(
            (career) => `
              <option value="${career.slug}"${state.careerSlug === career.slug ? " selected" : ""}>
                ${escapeHtml(getCareerName(career))}
              </option>
            `
          )
          .join("")}
      </select>
    </label>

    <label for="memorial-signature">
      <span>${escapeHtml(t(modeCopy.signatureLabel))}</span>
      <input
        id="memorial-signature"
        class="memorial-input"
        type="text"
        value="${escapeHtml(state.signature)}"
        placeholder="${escapeHtml(t(modeCopy.signaturePlaceholder))}"
      />
    </label>

    <label for="memorial-text">
      <span>${escapeHtml(t(modeCopy.textLabel))}</span>
      <textarea
        id="memorial-text"
        class="memorial-input memorial-input--area"
        rows="8"
        placeholder="${escapeHtml(t(modeCopy.textPlaceholder))}"
      >${escapeHtml(state.text)}</textarea>
    </label>
  `;
}

function renderUnlistedMemorialFields(modeCopy) {
  const state = getMemorialModeState("unlisted");

  return `
    <p class="section-eyebrow">${escapeHtml(t(modeCopy.formHeading))}</p>
    <p class="memorial-form__description">${escapeHtml(t(modeCopy.description))}</p>
    <label for="memorial-new-career">
      <span>${escapeHtml(t(modeCopy.careerNameLabel))}</span>
      <input
        id="memorial-new-career"
        class="memorial-input"
        type="text"
        value="${escapeHtml(state.careerName)}"
        placeholder="${escapeHtml(t(modeCopy.careerNamePlaceholder))}"
      />
    </label>

    <label for="memorial-new-introduction">
      <span>${escapeHtml(t(modeCopy.careerIntroLabel))}</span>
      <textarea
        id="memorial-new-introduction"
        class="memorial-input memorial-input--area"
        rows="5"
        placeholder="${escapeHtml(t(modeCopy.careerIntroPlaceholder))}"
      >${escapeHtml(state.introduction)}</textarea>
    </label>

    <label for="memorial-new-signature">
      <span>${escapeHtml(t(modeCopy.signatureLabel))}</span>
      <input
        id="memorial-new-signature"
        class="memorial-input"
        type="text"
        value="${escapeHtml(state.signature)}"
        placeholder="${escapeHtml(t(modeCopy.signaturePlaceholder))}"
      />
    </label>

    <label for="memorial-new-text">
      <span>${escapeHtml(t(modeCopy.textLabel))}</span>
      <textarea
        id="memorial-new-text"
        class="memorial-input memorial-input--area"
        rows="8"
        placeholder="${escapeHtml(t(modeCopy.textPlaceholder))}"
      >${escapeHtml(state.text)}</textarea>
    </label>

    <label for="memorial-new-references">
      <span>${escapeHtml(t(modeCopy.referencesLabel))}</span>
      <textarea
        id="memorial-new-references"
        class="memorial-input memorial-input--area"
        rows="4"
        placeholder="${escapeHtml(t(modeCopy.referencesPlaceholder))}"
      >${escapeHtml(state.references)}</textarea>
    </label>
  `;
}

function bindMemorialForm() {
  const modeButtons = document.querySelectorAll("[data-memorial-mode]");
  const mailtoLink = document.querySelector("#memorial-mailto-link");
  const subjectPreview = document.querySelector("#memorial-subject-preview");
  const bodyPreview = document.querySelector("#memorial-body-preview");
  const validationHint = document.querySelector("#memorial-validation-hint");

  const inputMap = {
    existing: {
      careerSlug: document.querySelector("#memorial-career"),
      signature: document.querySelector("#memorial-signature"),
      text: document.querySelector("#memorial-text")
    },
    unlisted: {
      careerName: document.querySelector("#memorial-new-career"),
      introduction: document.querySelector("#memorial-new-introduction"),
      signature: document.querySelector("#memorial-new-signature"),
      text: document.querySelector("#memorial-new-text"),
      references: document.querySelector("#memorial-new-references")
    }
  };

  const syncDraft = () => {
    const activeMode = uiState.memorial.activeMode;
    const activeInputs = inputMap[activeMode];
    const activeState = getMemorialModeState(activeMode);

    Object.entries(activeInputs).forEach(([key, field]) => {
      activeState[key] = field?.value ?? activeState[key] ?? "";
    });

    const draft = buildMemorialDraft(activeMode);
    if (mailtoLink) {
      mailtoLink.setAttribute("href", draft.isValid ? buildMailtoUrl(draft) : "#");
      mailtoLink.setAttribute("aria-disabled", draft.isValid ? "false" : "true");
      mailtoLink.classList.toggle("is-disabled", !draft.isValid);
    }
    if (subjectPreview) {
      subjectPreview.textContent = draft.subject;
    }
    if (bodyPreview) {
      bodyPreview.textContent = draft.body;
    }
    if (validationHint) {
      validationHint.hidden = draft.isValid;
    }
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.getAttribute("data-memorial-mode");
      if (!nextMode || nextMode === uiState.memorial.activeMode) {
        return;
      }

      uiState.memorial.activeMode = nextMode;
      renderMemorial();
    });
  });

  Object.values(inputMap[uiState.memorial.activeMode]).forEach((field) => {
    field?.addEventListener("input", syncDraft);
    field?.addEventListener("change", syncDraft);
  });

  mailtoLink?.addEventListener("click", (event) => {
    if (!buildMemorialDraft().isValid) {
      event.preventDefault();
    }
  });

  syncDraft();
}

function renderMemorial() {
  setPageMetadata({
    title: t(siteCopy.memorial.title),
    description: siteCopy.pageDescriptions.memorial,
    path: routes.memorial
  });

  const modeCopy = getMemorialModeCopy();
  const draft = buildMemorialDraft();
  const memorialExamples = initialMemorials[uiState.memorial.activeMode];

  renderShell(
    `
      <header class="page-header reveal">
        <h1>${escapeHtml(t(siteCopy.memorial.title))}</h1>
        <p class="page-header__subtitle">${escapeHtml(t(siteCopy.memorial.channelValue))}</p>
        <div class="page-header__marker" aria-hidden="true"></div>
      </header>

      <section class="memorial-main">
        <div class="memorial-layout">
          <aside class="memorial-form__sticky reveal" style="--stagger:0.08s;">
            ${renderMemorialModeSwitcher()}

            <div class="memorial-note">
              <p class="section-eyebrow">${escapeHtml(t(siteCopy.memorial.noticeEyebrow))}</p>
              <p class="memorial-note__text">${escapeHtml(t(siteCopy.memorial.noticeText))}</p>
            </div>

            <div class="memorial-form__fields">
              ${
                uiState.memorial.activeMode === "existing"
                  ? renderExistingMemorialFields(modeCopy)
                  : renderUnlistedMemorialFields(modeCopy)
              }
            </div>

            <div class="memorial-form__actions">
              <a
                id="memorial-mailto-link"
                class="outline-button outline-button--full${draft.isValid ? "" : " is-disabled"}"
                href="${draft.isValid ? buildMailtoUrl(draft) : "#"}"
                aria-disabled="${draft.isValid ? "false" : "true"}"
              >
                ${escapeHtml(t(modeCopy.submitLabel))}
              </a>
              <p id="memorial-validation-hint" class="memorial-form__hint"${draft.isValid ? " hidden" : ""}>
                ${escapeHtml(t(modeCopy.validationHint))}
              </p>
            </div>

            <div class="memorial-fallback">
              <p class="section-eyebrow">${escapeHtml(t(siteCopy.memorial.fallbackTitle))}</p>
              <p class="memorial-fallback__text">${escapeHtml(t(siteCopy.memorial.fallbackBody))}</p>
              <p class="memorial-fallback__hint">${escapeHtml(t(siteCopy.memorial.fallbackHint))}</p>
              <div class="memorial-fallback__meta">
                <div class="memorial-fallback__field">
                  <span>${escapeHtml(t(siteCopy.memorial.emailLabel))}</span>
                  <p class="memorial-fallback__link">${escapeHtml(siteMeta.contactEmail)}</p>
                </div>
                <div class="memorial-fallback__field">
                  <span>${escapeHtml(t(siteCopy.memorial.subjectLabel))}</span>
                  <p id="memorial-subject-preview" class="memorial-fallback__subject">${escapeHtml(
                    draft.subject
                  )}</p>
                </div>
                <div class="memorial-fallback__field">
                  <span>${escapeHtml(t(siteCopy.memorial.bodyLabel))}</span>
                  <pre id="memorial-body-preview" class="memorial-fallback__body">${escapeHtml(
                    draft.body
                  )}</pre>
                </div>
              </div>
            </div>
          </aside>

          <section class="memorial-feed reveal" style="--stagger:0.16s;">
            <div class="memorial-feed__intro">
              <p class="section-eyebrow">${escapeHtml(t(modeCopy.introEyebrow))}</p>
              <p class="memorial-feed__lede">${escapeHtml(t(modeCopy.introText))}</p>
              <p class="memorial-feed__note">${escapeHtml(t(modeCopy.curatedNote))}</p>
            </div>
            <div class="memorial-feed__list">
              ${renderMemorialList(memorialExamples, uiState.memorial.activeMode)}
            </div>
          </section>
        </div>
      </section>
    `,
    {
      active: "memorial",
      mainClassName: "page-main--exhibition"
    }
  );

  bindMemorialForm();
}

function renderAboutInfoSection(id, config) {
  return `
    <article id="${id}" class="info-card">
      <p class="section-eyebrow">${escapeHtml(t(config.eyebrow))}</p>
      <h3>${escapeHtml(t(config.title))}</h3>
      ${config.paragraphs.map((paragraph) => `<p>${escapeHtml(t(paragraph))}</p>`).join("")}
      ${
        config.actions
          ? `<div class="info-card__actions">
              ${config.actions
                .map(
                  (action) => `
                    <a class="text-button text-button--inline" href="${action.href}" target="${
                      action.href.startsWith("http") ? "_blank" : "_self"
                    }" rel="${action.href.startsWith("http") ? "noreferrer" : ""}">
                      ${escapeHtml(t(action.label))}
                    </a>
                  `
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
    title: t(siteCopy.navigation.about),
    description: siteCopy.pageDescriptions.about,
    path: routes.about
  });

  renderShell(
    `
      <section class="about-hero reveal">
        <div class="about-hero__copy">
          <p class="section-eyebrow">${escapeHtml(t(siteCopy.about.heroEyebrow))}</p>
          <h1>${escapeHtml(t(aboutData.missionTitle))}</h1>
          <p>${escapeHtml(t(aboutData.missionBody))}</p>
        </div>
        <div class="about-hero__rule" aria-hidden="true"></div>
      </section>

      <section class="about-section reveal" style="--stagger:0.08s;">
        <p class="section-eyebrow section-eyebrow--centered">${escapeHtml(
          t(siteCopy.about.methodologyEyebrow)
        )}</p>
        <div class="method-grid">
          ${aboutData.methodology
            .map(
              (item, index) => `
                <article class="method-card${index === 0 ? " method-card--active" : ""}">
                  <h3>${escapeHtml(t(item.title))}</h3>
                  <p>${escapeHtml(t(item.text))}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="about-section reveal" style="--stagger:0.12s;">
        <p class="section-eyebrow section-eyebrow--centered">${escapeHtml(
          t(siteCopy.about.standardsEyebrow)
        )}</p>
        <div class="about-columns">
          <div class="standard-list">
            ${aboutData.standards
              .map(
                (item) => `
                  <article class="standard-item">
                    <strong>${escapeHtml(t(item.label))}</strong>
                    <span>${escapeHtml(t(item.value))}</span>
                  </article>
                `
              )
              .join("")}
          </div>
          <div class="project-timeline">
            ${aboutData.timeline
              .map(
                (item, index) => `
                  <article class="project-timeline__item">
                    <div class="project-timeline__dot${index === aboutData.timeline.length - 1 ? " is-active" : ""}" aria-hidden="true"></div>
                    <p class="project-timeline__date">${escapeHtml(t(item.date))}</p>
                    <p>${escapeHtml(t(item.text))}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="stats-band reveal" style="--stagger:0.16s;">
        ${aboutData.stats
          .map(
            (item, index) => `
              <article class="stats-band__item${index === 1 ? " stats-band__item--bordered" : ""}">
                <p class="stats-band__value">${escapeHtml(t(item.value))}</p>
                <p class="stats-band__label">${escapeHtml(t(item.label))}</p>
              </article>
            `
          )
          .join("")}
      </section>

      <section class="about-section reveal" style="--stagger:0.2s;">
        <p class="section-eyebrow section-eyebrow--centered">${escapeHtml(
          t(siteCopy.about.contributorsEyebrow)
        )}</p>
        <div class="contributors-grid">
          ${aboutData.contributors
            .map(
              (person, index) => `
                <article class="contributor-card${index === aboutData.contributors.length - 1 ? " contributor-card--muted" : ""}">
                  <h3>${escapeHtml(t(person.name))}</h3>
                  <p>${escapeHtml(t(person.role))}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="about-section reveal" style="--stagger:0.24s;">
        <div class="info-grid">
          ${renderAboutInfoSection("legal", siteCopy.aboutInfo.legal)}
          ${renderAboutInfoSection("policy", siteCopy.aboutInfo.policy)}
          ${renderAboutInfoSection("contact", siteCopy.aboutInfo.contact)}
        </div>
      </section>
    `,
    {
      active: "about",
      mainClassName: "page-main--exhibition"
    }
  );
}

function renderSite404() {
  setPageMetadata({
    title: "404",
    description: siteCopy.pageDescriptions.notFound,
    path: routes.notFound,
    robots: "noindex,follow"
  });

  renderShell(renderNotFound(), {
    active: "",
    showBack: false
  });
}

function renderCurrentPage() {
  switch (page) {
    case "home":
      renderHome();
      break;
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
    case "404":
    default:
      renderSite404();
      break;
  }
}

renderCurrentPage();
