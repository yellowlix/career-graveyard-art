"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLocale, t } from "../../../lib/i18n";
import { careers, siteCopy, siteMeta, statusMeta } from "../../../data";
import { CareerCard } from "../../../components/CareerCard";
import { NotFoundPanel } from "../../../components/NotFoundPanel";
import { PageMarker } from "../../../components/PageMarker";
import { PageJsonLd } from "../../../components/PageJsonLd";
import { CopyPageLinkButton } from "../../../components/CopyPageLinkButton";
import { buildBreadcrumbSchema, toAbsoluteUrl } from "../../../lib/seo";
import { t as translate } from "../../../lib/translate";

function buildRelatedCareers(currentCareer) {
  const sameStatus = careers.filter(
    (c) => c.slug !== currentCareer.slug && c.status === currentCareer.status
  );
  if (sameStatus.length >= 2) return sameStatus.slice(0, 4);
  return careers.filter((c) => c.slug !== currentCareer.slug).slice(0, 4);
}

function interpolate(template, values, locale) {
  return t(template, locale).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export function CareerDetailContent({ slug }) {
  const { locale } = useLocale();
  const career = useMemo(() => careers.find((c) => c.slug === slug) ?? null, [slug]);

  if (!career) {
    const bodyText = {
      zh: interpolate(siteCopy.notFound.detailBodyTemplate, { slug }, "zh"),
      en: interpolate(siteCopy.notFound.detailBodyTemplate, { slug }, "en")
    };
    return (
      <main id="main-content" className="page-main page-main--detail">
        <PageMarker page="detail" />
        <NotFoundPanel
          config={{
            eyebrow: siteCopy.notFound.eyebrow,
            heading: siteCopy.notFound.detailTitle,
            body: bodyText
          }}
        />
      </main>
    );
  }

  const related = buildRelatedCareers(career);

  return (
    <main id="main-content" className="page-main page-main--detail">
      <PageMarker page="detail" />
      <PageJsonLd
        buildSchemas={(loc) => [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: translate(career.name, loc),
            description: translate(career.summary, loc),
            url: toAbsoluteUrl(`/career/${career.slug}`),
            inLanguage: loc === "zh" ? "zh-CN" : "en",
            publisher: {
              "@type": "Organization",
              name: translate(siteMeta.siteName, loc),
              url: siteMeta.siteUrl
            }
          },
          buildBreadcrumbSchema([
            { name: translate(siteMeta.siteName, loc), url: siteMeta.siteUrl },
            { name: translate(siteCopy.archive.title, loc), url: toAbsoluteUrl("/archive") },
            { name: translate(career.name, loc), url: toAbsoluteUrl(`/career/${career.slug}`) }
          ])
        ]}
      />
      <header className="detail-header reveal">
        <div className="detail-header__row">
          <div>
            <h1>{t(career.name, locale)}</h1>
            <p className="detail-summary">{t(career.summary, locale)}</p>
            <div className="detail-header__share">
              <CopyPageLinkButton
                label={t(siteCopy.detail.shareButton, locale)}
                className="outline-button outline-button--compact"
                trackPayload={{ from: "header", slug: career.slug }}
              />
            </div>
          </div>
          <div className="detail-header__status">
            <p className="section-eyebrow">{t(siteCopy.detail.statusEyebrow, locale)}</p>
            <span>{t(statusMeta[career.status]?.label, locale)}</span>
          </div>
        </div>
        <div className="detail-header__rule">
          <div className="detail-header__marker" aria-hidden="true" />
        </div>
      </header>

      <section className="detail-layout">
        <aside className="detail-timeline reveal" style={{ "--stagger": "0.1s" }}>
          <p className="section-eyebrow">{t(siteCopy.detail.timelineEyebrow, locale)}</p>
          <div className="timeline-list">
            {career.timeline.map((item, i) => (
              <article key={i} className="timeline-item">
                <div className="timeline-item__dot" aria-hidden="true" />
                <p className="timeline-item__year">{t(item.year, locale)}</p>
                <h4>{t(item.title, locale)}</h4>
                <p className="timeline-item__text">{t(item.text, locale)}</p>
              </article>
            ))}
          </div>
        </aside>

        <div className="detail-content">
          <section className="detail-section reveal" style={{ "--stagger": "0.14s" }}>
            <p className="section-eyebrow">{t(siteCopy.detail.profileEyebrow, locale)}</p>
            <p className="detail-summary">{t(career.summary, locale)}</p>
          </section>

          <section className="detail-section reveal" style={{ "--stagger": "0.18s" }}>
            <p className="section-eyebrow">{t(siteCopy.detail.factorsEyebrow, locale)}</p>
            <div className="factor-grid">
              {career.factors.map((factor, i) => (
                <article key={i} className="factor-card">
                  <h4>{t(factor.title, locale)}</h4>
                  <p>{t(factor.text, locale)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-section reveal" style={{ "--stagger": "0.22s" }}>
            <p className="section-eyebrow">{t(siteCopy.detail.voicesEyebrow, locale)}</p>
            <div className="voice-list">
              {career.voices.map((voice, i) => (
                <article key={i} className="voice-card">
                  <p className="voice-card__text">{t(voice.text, locale)}</p>
                  <div className="voice-card__meta">
                    <span>{t(voice.author, locale)}</span>
                    <span>{t(voice.date, locale)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div className="detail-memorial-cta reveal" style={{ "--stagger": "0.24s" }}>
        <p className="detail-memorial-cta__text">
          {t(siteCopy.detail.memorialVoicesBlurb, locale)}
        </p>
        <Link
          className="outline-button"
          href={`/memorial/?career=${encodeURIComponent(career.slug)}`}
        >
          {t(siteCopy.detail.memorialCta, locale)}
        </Link>
      </div>

      <section className="related-section reveal" style={{ "--stagger": "0.28s" }}>
        <p className="section-eyebrow section-eyebrow--centered">
          {t(siteCopy.detail.relatedEyebrow, locale)}
        </p>
        <div className="career-grid career-grid--related">
          {related.map((item) => (
            <CareerCard key={item.slug} career={item} variant="related" />
          ))}
        </div>
      </section>
    </main>
  );
}
