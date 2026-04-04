import "./styles.css";
import {
  aboutData,
  baseMemorialCount,
  careers,
  homeQuote,
  initialMemorials,
  statusMeta
} from "./data.js";

const app = document.querySelector("#app");
const page = document.body.dataset.page;
const memorialStorageKey = "career-graveyard-memorials";
const statusOrder = Object.keys(statusMeta);

const routes = {
  home: "/",
  archive: "/archive.html",
  memorial: "/memorial.html",
  about: "/about.html",
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

function setDocumentTitle(title) {
  document.title = title;
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
              ? `<a class="site-nav__back" href="${backHref}"><span aria-hidden="true">←</span><span>BACK / 返回</span></a>`
              : ""
          }
          <a class="site-nav__logo" href="${routes.home}">职业墓场</a>
        </div>
        <div class="site-nav__links">
          <a class="${linkClass("archive")}" href="${routes.archive}">ARCHIVE / 归档</a>
          <a class="${linkClass("memorial")}" href="${routes.memorial}">MEMORIAL / 祭奠</a>
          <a class="${linkClass("about")}" href="${routes.about}">INFO / 关于</a>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__copy">© 2024 CAREER CEMETERY / 职业墓场</div>
        <div class="site-footer__links">
          <a href="${routes.about}#legal">Legal</a>
          <a href="${routes.about}#methodology">Policy</a>
          <a href="${routes.about}#contributors">Connect</a>
        </div>
      </div>
    </footer>
  `;
}

function renderShell(content, options = {}) {
  app.innerHTML = `
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

function renderHome() {
  setDocumentTitle("职业墓场");
  const featured = careers.slice(0, 6);

  renderShell(
    `
      <main class="page-main page-main--home">
        <header class="hero">
          <div class="hero__inner reveal" style="--stagger:0.05s">
            <h1>职业墓场</h1>
            <p class="hero__subtitle">THE CEMETERY OF CAREERS</p>
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
          <a class="outline-button" href="${routes.archive}">View All Slabs / 查看全部</a>
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
  setDocumentTitle("职业归档");

  renderShell(
    `
      <main class="page-main page-main--wide">
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
          <p>More records are being unearthed...</p>
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

function renderDetail() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const career = careers.find((item) => item.slug === slug) ?? careers[0];
  const status = statusMeta[career.status];
  const related = buildRelatedCareers(career);

  setDocumentTitle(`职业详情 | ${career.name} - 职业墓场`);

  renderShell(
    `
      <main class="page-main page-main--detail">
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
              <h3 class="section-eyebrow">Factors / 消逝因子</h3>
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
              <h3 class="section-eyebrow">Voices / 悼唁录</h3>
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
    { active: "", showBack: true, backHref: routes.home }
  );
}

function readStoredMemorials() {
  try {
    const raw = localStorage.getItem(memorialStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredMemorials(items) {
  localStorage.setItem(memorialStorageKey, JSON.stringify(items));
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

function renderMemorial() {
  const storedMemorials = readStoredMemorials();
  const allMemorials = [...storedMemorials, ...initialMemorials];
  let visibleCount = Math.max(4, Math.min(allMemorials.length, 4));

  setDocumentTitle("祭奠 | 职业墓场");

  renderShell(
    `
      <main class="page-main page-main--detail">
        <header class="detail-header reveal" style="--stagger:0.05s">
          <div class="detail-header__row">
            <h1>祭奠 / Memorial</h1>
            <div class="detail-header__status">
              <p class="section-eyebrow">Volume</p>
              <span>${(baseMemorialCount + storedMemorials.length).toLocaleString("en-US")} TRIBUTES / 悼唁</span>
            </div>
          </div>
          <div class="detail-header__rule">
            <div class="detail-header__marker"></div>
          </div>
        </header>

        <div class="memorial-layout">
          <section class="memorial-form reveal" style="--stagger:0.1s">
            <div class="memorial-form__sticky">
              <h3 class="section-eyebrow">Leave a Message / 留下悼唁</h3>
              <form id="memorial-form" class="memorial-form__fields">
                <label>
                  <span>Select Career / 选择职业</span>
                  <select class="memorial-input" name="career" aria-label="Select Career / 选择职业">
                    ${careers
                      .map((career) => `<option value="${escapeHtml(career.name)}">${escapeHtml(career.name)}</option>`)
                      .join("")}
                    <option value="其他职业">其他职业</option>
                  </select>
                </label>
                <label>
                  <span>Signature / 称呼</span>
                  <input class="memorial-input" name="signature" aria-label="Signature / 称呼" placeholder="匿名 或 你的职业身份" required />
                </label>
                <label>
                  <span>Memorial Text / 悼唁文字</span>
                  <textarea class="memorial-input memorial-input--area" name="text" rows="6" aria-label="Memorial Text / 悼唁文字" placeholder="写下你对这个消逝职业的最后告别..." required></textarea>
                </label>
                <button class="outline-button outline-button--full" type="submit">Submit to Cemetery / 提交</button>
              </form>
            </div>
          </section>

          <section class="memorial-feed reveal" style="--stagger:0.14s">
            <h3 class="section-eyebrow">Recent Tributes / 最近悼唁</h3>
            <div class="memorial-feed__list" id="memorial-list"></div>
            <div class="memorial-feed__actions" id="memorial-actions"></div>
          </section>
        </div>
      </main>
    `,
    { active: "memorial", showBack: false }
  );

  const list = document.querySelector("#memorial-list");
  const actions = document.querySelector("#memorial-actions");
  const form = document.querySelector("#memorial-form");

  function redrawFeed() {
    list.innerHTML = renderMemorialList(allMemorials.slice(0, visibleCount));
    actions.innerHTML =
      visibleCount < allMemorials.length
        ? '<button class="text-button" id="load-more-memorials" type="button">Load More / 加载更多</button>'
        : "";

    const loadMore = document.querySelector("#load-more-memorials");
    if (loadMore) {
      loadMore.addEventListener("click", () => {
        visibleCount = Math.min(visibleCount + 4, allMemorials.length);
        redrawFeed();
      });
    }
  }

  redrawFeed();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nextEntry = {
      career: String(formData.get("career") || "其他职业").trim(),
      signature: String(formData.get("signature") || "匿名").trim(),
      text: String(formData.get("text") || "").trim(),
      date: new Date().toISOString().slice(0, 10).replaceAll("-", ".")
    };

    if (!nextEntry.text || !nextEntry.signature) {
      return;
    }

    storedMemorials.unshift(nextEntry);
    allMemorials.unshift(nextEntry);
    writeStoredMemorials(storedMemorials);
    visibleCount = Math.min(Math.max(4, visibleCount), allMemorials.length);
    form.reset();
    redrawFeed();

    const volume = document.querySelector(".detail-header__status span");
    volume.textContent = `${(baseMemorialCount + storedMemorials.length).toLocaleString("en-US")} TRIBUTES / 悼唁`;
  });
}

function renderAbout() {
  setDocumentTitle("关于 & 信息 | 职业墓场");

  renderShell(
    `
      <main class="page-main page-main--detail page-main--about">
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
      </main>
    `,
    { active: "about", showBack: false }
  );
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
    default:
      renderHome();
  }
}

boot();
