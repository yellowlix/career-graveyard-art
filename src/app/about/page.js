"use client";
import { useLocale, t } from "../../lib/i18n";
import { siteMeta, siteCopy, aboutData } from "../../data";
import { PageMarker } from "../../components/PageMarker";
import { PageJsonLd } from "../../components/PageJsonLd";
import { buildWebSiteSchema, buildBreadcrumbSchema, toAbsoluteUrl } from "../../lib/seo";
import { t as translate } from "../../lib/translate";

function InfoCard({ id, config, locale }) {
  return (
    <article id={id} className="info-card">
      <p className="section-eyebrow">{t(config.eyebrow, locale)}</p>
      <h3>{t(config.title, locale)}</h3>
      {config.paragraphs.map((p, i) => (
        <p key={i}>{t(p, locale)}</p>
      ))}
      {config.actions && config.actions.length > 0 && (
        <div className="info-card__actions">
          {config.actions.map((action, i) => (
            <a
              key={i}
              href={action.href}
              className="text-button text-button--inline"
              target={action.href.startsWith("http") ? "_blank" : "_self"}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {t(action.label, locale)}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <main id="main-content" className="page-main page-main--exhibition">
      <PageMarker page="about" />
      <PageJsonLd
        buildSchemas={(loc) => [
          buildWebSiteSchema(loc),
          buildBreadcrumbSchema([
            { name: translate(siteMeta.siteName, loc), url: siteMeta.siteUrl },
            { name: translate(siteCopy.navigation.about, loc), url: toAbsoluteUrl("/about") }
          ])
        ]}
      />
      <section className="about-hero reveal">
        <div className="about-hero__copy">
          <p className="section-eyebrow">{t(siteCopy.about.heroEyebrow, locale)}</p>
          <h1>{t(aboutData.missionTitle, locale)}</h1>
          <p>{t(aboutData.missionBody, locale)}</p>
        </div>
        <div className="about-hero__rule" aria-hidden="true" />
      </section>

      <section className="about-section reveal" style={{ "--stagger": "0.08s" }}>
        <p className="section-eyebrow section-eyebrow--centered">
          {t(siteCopy.about.methodologyEyebrow, locale)}
        </p>
        <div className="method-grid">
          {aboutData.methodology.map((item, i) => (
            <article key={i} className={`method-card${i === 0 ? " method-card--active" : ""}`}>
              <h3>{t(item.title, locale)}</h3>
              <p>{t(item.text, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section reveal" style={{ "--stagger": "0.12s" }}>
        <p className="section-eyebrow section-eyebrow--centered">
          {t(siteCopy.about.standardsEyebrow, locale)}
        </p>
        <div className="about-columns">
          <div className="standard-list">
            {aboutData.standards.map((item, i) => (
              <article key={i} className="standard-item">
                <strong>{t(item.label, locale)}</strong>
                <span>{t(item.value, locale)}</span>
              </article>
            ))}
          </div>
          <div className="project-timeline">
            {aboutData.timeline.map((item, i) => (
              <article key={i} className="project-timeline__item">
                <div
                  className={`project-timeline__dot${i === aboutData.timeline.length - 1 ? " is-active" : ""}`}
                  aria-hidden="true"
                />
                <p className="project-timeline__date">{t(item.date, locale)}</p>
                <p>{t(item.text, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band reveal" style={{ "--stagger": "0.16s" }}>
        {aboutData.stats.map((item, i) => (
          <article
            key={i}
            className={`stats-band__item${i === 1 ? " stats-band__item--bordered" : ""}`}
          >
            <p className="stats-band__value">{t(item.value, locale)}</p>
            <p className="stats-band__label">{t(item.label, locale)}</p>
          </article>
        ))}
      </section>

      <section className="about-section reveal" style={{ "--stagger": "0.2s" }}>
        <p className="section-eyebrow section-eyebrow--centered">
          {t(siteCopy.about.contributorsEyebrow, locale)}
        </p>
        <div className="contributors-grid">
          {aboutData.contributors.map((person, i) => (
            <article
              key={i}
              className={`contributor-card${i === aboutData.contributors.length - 1 ? " contributor-card--muted" : ""}`}
            >
              <h3>{t(person.name, locale)}</h3>
              <p>{t(person.role, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section reveal" style={{ "--stagger": "0.24s" }}>
        <div className="info-grid">
          {Object.entries(siteCopy.aboutInfo).map(([id, config]) => (
            <InfoCard key={id} id={id} config={config} locale={locale} />
          ))}
        </div>
      </section>

      {locale === "zh" && (
        <section
          id="support"
          className="about-section about-section--support reveal"
          style={{ "--stagger": "0.28s" }}
        >
          <div className="about-support">
            <p className="section-eyebrow section-eyebrow--centered">
              {t(siteCopy.about.supportEyebrow, locale)}
            </p>
            <div className="about-support__inner">
              <blockquote>{t(siteCopy.about.supportTitle, locale)}</blockquote>
              <p className="about-support__note">{t(siteCopy.about.supportBody, locale)}</p>
            </div>
            <div className="about-support__actions">
              <a
                className="outline-button"
                href={siteMeta.afdianUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t(siteCopy.about.supportCta, locale)}
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
