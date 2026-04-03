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

const routes = {
  home: "/",
  archive: "/archive.html",
  memorial: "/memorial.html",
  about: "/about.html",
  detail: (slug) => `/career.html?slug=${slug}`
};

const statusOrder = Object.keys(statusMeta);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderNavigation(active, showBack, backHref) {
  return `
    <nav class="site-nav" aria-label="主导航">
      <div class="site-nav__cluster">
        ${showBack ? `<a class="nav-back" href="${backHref}">BACK / 返回</a>` : ""}
        <a class="nav-logo" href="${routes.home}">职业墓场</a>
      </div>
      <div class="site-nav__links">
        <a class="nav-link ${active === "archive" ? "is-active" : ""}" href="${routes.archive}">ARCHIVE / 归档</a>
        <a class="nav-link ${active === "memorial" ? "is-active" : ""}" href="${routes.memorial}">MEMORIAL / 祭奠</a>
        <a class="nav-link ${active === "about" ? "is-active" : ""}" href="${routes.about}">INFO / 关于</a>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="site-footer__copy">© 2024 CAREER CEMETERY / 职业墓场</div>
      <div class="site-footer__links">
        <a href="${routes.about}#legal">Legal</a>
        <a href="${routes.about}#methodology">Policy</a>
        <a href="${routes.about}#contributors">Connect</a>
      </div>
    </footer>
  `;
}

function renderShell(content, options = {}) {
  const { active = "", showBack = false, backHref = routes.home } = options;

  app.innerHTML = `
    <div class="grain"></div>
    <div class="page-shell">
      ${renderNavigation(active, showBack, backHref)}
      ${content}
      ${renderFooter()}
    </div>
  `;
}

function careerLink(slug) {
  return routes.detail(slug);
}

function renderMonolith(career, variant = "home") {
  const status = statusMeta[career.status];
  const classes =
    variant === "archive"
      ? "monolith monolith--archive"
      : variant === "related"
        ? "monolith monolith--related"
        : "monolith";

  return `
    <a class="career-card career-card--${variant}" href="${careerLink(career.slug)}">
      <div class="career-card__heading">
        <p class="eyebrow">${status.label}</p>
        <h2>${career.name}</h2>
      </div>
      <div class="${classes}" style="--slab-height:${career.slabHeight}px"></div>
      <div class="career-card__quote">
        <p>“${career.teaser}”</p>
      </div>
    </a>
  `;
}

function renderHome() {
  const featured = careers.slice(0, 6);

  renderShell(
    `
      <main class="page-main page-main--home">
        <header class="hero">
          <div class="hero__center reveal">
            <h1>职业墓场</h1>
            <p class="hero__subtitle">THE CEMETERY OF CAREERS</p>
          </div>
          <div class="hero__marker">
            <p>这个职业还值不值得做？</p>
            <div class="vertical-rule"></div>
          </div>
        </header>

        <section class="monolith-grid monolith-grid--home reveal">
          ${featured.map((career) => renderMonolith(career, "home")).join("")}
        </section>

        <section class="quote-section reveal">
          <div class="section-header section-header--centered">
            <p class="eyebrow eyebrow--wide">Voices from the Silent</p>
          </div>
          <blockquote>${homeQuote.text}</blockquote>
          <p class="quote-signature">${homeQuote.author}</p>
          <a class="outline-button" href="${routes.archive}">View All Slabs / 查看全部</a>
        </section>
      </main>
    `,
    { active: "" }
  );
}

function renderArchive() {
  renderShell(
    `
      <main class="page-main page-main--archive">
        <header class="page-header reveal">
          <h1>归档 / ARCHIVE</h1>
          <p class="lede">Complete list of the departed and the decaying</p>
          <div class="vertical-rule vertical-rule--short"></div>
        </header>

        <section class="archive-controls reveal">
          <div class="filter-group">
            <p class="eyebrow eyebrow--wide">Filter by status</p>
            <div class="pill-row" id="filter-row">
              <button class="pill is-active" data-status="all">All</button>
              ${statusOrder
                .map(
                  (key) =>
                    `<button class="pill" data-status="${key}">${statusMeta[key].label}</button>`
                )
                .join("")}
            </div>
          </div>
          <div class="sort-group">
            <p class="eyebrow eyebrow--wide">Sort by</p>
            <div class="sort-row">
              <button class="sort-toggle is-active" data-sort="alphabetical">Alphabetical</button>
              <button class="sort-toggle" data-sort="timeline">Timeline</button>
            </div>
          </div>
        </section>

        <section class="monolith-grid monolith-grid--archive reveal" id="archive-grid"></section>

        <section class="archive-tail reveal">
          <p>More records are being unearthed...</p>
        </section>
      </main>
    `,
    { active: "archive" }
  );

  const grid = document.querySelector("#archive-grid");
  const filterButtons = [...document.querySelectorAll("[data-status]")];
  const sortButtons = [...document.querySelectorAll("[data-sort]")];
  let currentStatus = "all";
  let currentSort = "alphabetical";

  function renderGrid() {
    const filtered =
      currentStatus === "all"
        ? [...careers]
        : careers.filter((career) => career.status === currentStatus);

    filtered.sort((left, right) => {
      if (currentSort === "timeline") {
        return left.declineYear - right.declineYear;
      }
      return left.name.localeCompare(right.name, "zh-Hans-CN");
    });

    grid.innerHTML = filtered
      .map((career) => renderMonolith(career, "archive"))
      .join("");
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentStatus = button.dataset.status;
      filterButtons.forEach((item) =>
        item.classList.toggle("is-active", item === button)
      );
      renderGrid();
    });
  });

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentSort = button.dataset.sort;
      sortButtons.forEach((item) =>
        item.classList.toggle("is-active", item === button)
      );
      renderGrid();
    });
  });

  renderGrid();
}

function buildRelatedCareers(currentCareer) {
  return careers
    .filter((career) => career.slug !== currentCareer.slug)
    .filter((career) => career.status !== currentCareer.status)
    .slice(0, 4);
}

function renderDetail() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const career = careers.find((item) => item.slug === slug) ?? careers[0];
  const status = statusMeta[career.status];
  const related = buildRelatedCareers(career);

  document.title = `职业详情 | ${career.name} - 职业墓场`;

  renderShell(
    `
      <main class="page-main page-main--detail">
        <header class="detail-header reveal">
          <div class="detail-header__title">
            <h1>${career.name}</h1>
            <div class="detail-header__status">
              <p class="eyebrow eyebrow--wide">Status</p>
              <span>${status.label} / ${status.zh}</span>
            </div>
          </div>
          <div class="horizontal-rule">
            <div class="horizontal-rule__marker"></div>
          </div>
        </header>

        <div class="detail-layout">
          <section class="detail-side reveal">
            <h3 class="eyebrow eyebrow--wide">Timeline / 衰落轨迹</h3>
            <div class="timeline">
              ${career.timeline
                .map(
                  (item) => `
                    <article class="timeline__item">
                      <p class="timeline__year">${item.year} / ${item.title}</p>
                      <p>${item.text}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>

          <section class="detail-main reveal">
            <div class="detail-block">
              <h3 class="eyebrow eyebrow--wide">Profile / 职业讣告</h3>
              <p class="detail-summary">${career.summary}</p>
            </div>

            <div class="detail-block">
              <h3 class="eyebrow eyebrow--wide">Factors / 消逝因子</h3>
              <div class="factor-grid">
                ${career.factors
                  .map(
                    (factor) => `
                      <article class="factor-card">
                        <h4>${factor.title}</h4>
                        <p>${factor.text}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>

            <div class="detail-block">
              <h3 class="eyebrow eyebrow--wide">Voices / 悼亡回声</h3>
              <div class="voice-list">
                ${career.voices
                  .map(
                    (voice) => `
                      <article class="voice-card">
                        <p class="voice-card__text">“${voice.text}”</p>
                        <div class="voice-card__meta">
                          <span>${voice.author}</span>
                          <span>${voice.date}</span>
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </section>
        </div>

        <section class="related-section reveal">
          <h3 class="eyebrow eyebrow--wide">Similar Fates / 同病相怜</h3>
          <div class="monolith-grid monolith-grid--related">
            ${related.map((item) => renderMonolith(item, "related")).join("")}
          </div>
        </section>
      </main>
    `,
    { active: "", showBack: true, backHref: routes.home }
  );
}

function loadMemorials() {
  try {
    const raw = localStorage.getItem(memorialStorageKey);
    const stored = raw ? JSON.parse(raw) : [];
    return [...stored, ...initialMemorials];
  } catch {
    return [...initialMemorials];
  }
}

function saveMemorial(memorial) {
  const raw = localStorage.getItem(memorialStorageKey);
  const stored = raw ? JSON.parse(raw) : [];
  stored.unshift(memorial);
  localStorage.setItem(memorialStorageKey, JSON.stringify(stored));
}

function renderMemorialList(items) {
  return items
    .map(
      (item) => `
        <article class="memorial-entry">
          <div class="memorial-entry__head">
            <h4>${escapeHtml(item.career)}</h4>
            <span>${escapeHtml(item.date)}</span>
          </div>
          <p class="memorial-entry__text">“${escapeHtml(item.text)}”</p>
          <p class="memorial-entry__signature">${escapeHtml(item.signature)}</p>
        </article>
      `
    )
    .join("");
}

function renderMemorial() {
  const memorials = loadMemorials();
  const total = baseMemorialCount + memorials.length;

  renderShell(
    `
      <main class="page-main page-main--memorial">
        <header class="detail-header reveal">
          <div class="detail-header__title">
            <h1>祭奠 / Memorial</h1>
            <div class="detail-header__status">
              <p class="eyebrow eyebrow--wide">Volume</p>
              <span id="memorial-total">${total.toLocaleString("en-US")} TRIBUTES / 悼词</span>
            </div>
          </div>
          <div class="horizontal-rule">
            <div class="horizontal-rule__marker"></div>
          </div>
        </header>

        <div class="detail-layout detail-layout--memorial">
          <section class="memorial-form-wrap reveal">
            <div class="sticky-panel">
              <h3 class="eyebrow eyebrow--wide">Leave a Message / 留下悼词</h3>
              <form id="memorial-form" class="memorial-form">
                <label>
                  <span>Select Career / 选择职业</span>
                  <select name="career">
                    ${careers
                      .map(
                        (career) =>
                          `<option value="${career.name}">${career.name}</option>`
                      )
                      .join("")}
                  </select>
                </label>
                <label>
                  <span>Signature / 称呼</span>
                  <input name="signature" type="text" placeholder="匿名 / 你的职业身份" required />
                </label>
                <label>
                  <span>Memorial Text / 悼词文字</span>
                  <textarea name="text" rows="7" placeholder="写下你对这个消逝职业的最后告别..." required></textarea>
                </label>
                <button class="outline-button outline-button--full" type="submit">Submit to Cemetery / 提交</button>
              </form>
            </div>
          </section>

          <section class="memorial-stream reveal">
            <h3 class="eyebrow eyebrow--wide">Recent Tributes / 最近悼词</h3>
            <div id="memorial-list" class="memorial-list">${renderMemorialList(memorials)}</div>
          </section>
        </div>
      </main>
    `,
    { active: "memorial", showBack: true, backHref: routes.home }
  );

  const form = document.querySelector("#memorial-form");
  const list = document.querySelector("#memorial-list");
  const totalNode = document.querySelector("#memorial-total");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      career: String(formData.get("career")),
      signature: String(formData.get("signature")).trim(),
      text: String(formData.get("text")).trim(),
      date: new Date().toISOString().slice(0, 10).replaceAll("-", ".")
    };

    if (!entry.signature || !entry.text) {
      return;
    }

    saveMemorial(entry);
    const updated = loadMemorials();
    list.innerHTML = renderMemorialList(updated);
    totalNode.textContent = `${(baseMemorialCount + updated.length).toLocaleString(
      "en-US"
    )} TRIBUTES / 悼词`;
    form.reset();
  });
}

function renderAbout() {
  renderShell(
    `
      <main class="page-main page-main--about">
        <header class="about-hero reveal">
          <div class="about-hero__inner">
            <p class="eyebrow eyebrow--wide">Mission / 项目使命</p>
            <h1>${aboutData.missionTitle}</h1>
            <p class="detail-summary">${aboutData.missionBody}</p>
          </div>
          <div class="horizontal-rule horizontal-rule--spacious"></div>
        </header>

        <section id="methodology" class="about-section reveal">
          <h2 class="eyebrow eyebrow--wide">Methodology / 评估准则</h2>
          <div class="factor-grid factor-grid--about">
            ${aboutData.methodology
              .map(
                (item, index) => `
                  <article class="factor-card ${index === 0 ? "factor-card--dark" : ""}">
                    <h4>${item.title}</h4>
                    <p>${item.text}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="about-columns reveal">
          <div class="about-panel">
            <h2 class="eyebrow eyebrow--wide">Standards / 评估指标</h2>
            <div class="standard-list">
              ${aboutData.standards
                .map(
                  ([label, value]) => `
                    <div class="standard-row">
                      <span>${label}</span>
                      <strong>${value}</strong>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
          <div class="about-panel">
            <h2 class="eyebrow eyebrow--wide">Timeline / 项目简史</h2>
            <div class="timeline timeline--soft">
              ${aboutData.timeline
                .map(
                  ([year, text]) => `
                    <article class="timeline__item">
                      <p class="timeline__year">${year}</p>
                      <p>${text}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>

        <section class="stats-strip reveal">
          ${aboutData.stats
            .map(
              ([value, label]) => `
                <article class="stat-block">
                  <p>${value}</p>
                  <span>${label}</span>
                </article>
              `
            )
            .join("")}
        </section>

        <section id="contributors" class="about-section reveal">
          <h2 class="eyebrow eyebrow--wide">Contributors / 贡献者</h2>
          <div class="contributors-grid">
            ${aboutData.contributors
              .map(
                ([name, role]) => `
                  <article class="contributor-card ${name === "Join Us" ? "contributor-card--muted" : ""}">
                    <h3>${name}</h3>
                    <p>${role}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      </main>
    `,
    { active: "about", showBack: true, backHref: routes.home }
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
      break;
  }
}

boot();
