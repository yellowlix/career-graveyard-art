"use client";
import Link from "next/link";
import { useLocale, t } from "../lib/i18n";
import { siteMeta, siteCopy, careers, homeQuote } from "../data";
import { CareerCard } from "../components/CareerCard";
import { PageMarker } from "../components/PageMarker";
import { PageJsonLd } from "../components/PageJsonLd";
import { buildWebSiteSchema } from "../lib/seo";

export default function HomePage() {
  const { locale } = useLocale();
  const featured = careers.slice(0, 6);

  return (
    <main id="main-content" className="page-main page-main--home">
      <PageMarker page="home" />
      <PageJsonLd buildSchemas={(loc) => buildWebSiteSchema(loc)} />
      <div className="home-snap-shell" aria-label={t(siteCopy.pageDescriptions.home, locale)}>
        <section className="home-panel home-panel--hero" data-home-panel="hero">
          <div className="home-panel__inner home-panel__inner--hero">
            <section className="hero">
              <div className="hero__inner reveal">
                <h1>{t(siteMeta.siteName, locale)}</h1>
                <p className="hero__subtitle">{t(siteCopy.home.subtitle, locale)}</p>
              </div>
            </section>
            <section className="hero-axis reveal" style={{ "--stagger": "0.18s" }}>
              <p className="hero__question-copy">{t(siteCopy.home.question, locale)}</p>
            </section>
          </div>
        </section>

        <section
          className="home-panel home-panel--careers"
          data-home-panel="careers"
          aria-labelledby="home-panel-careers-title"
        >
          <div className="home-panel__inner home-panel__inner--careers">
            <h2 id="home-panel-careers-title" className="sr-only">
              {t(siteCopy.navigation.archive, locale)}
            </h2>
            <section className="career-grid career-grid--home">
              {featured.map((career) => (
                <CareerCard key={career.slug} career={career} variant="home" />
              ))}
            </section>
          </div>
        </section>

        <section className="home-panel home-panel--quote" data-home-panel="quote">
          <div className="home-panel__inner home-panel__inner--quote">
            <section className="home-quote reveal" style={{ "--stagger": "0.35s" }}>
              <p className="section-eyebrow section-eyebrow--centered">
                {t(siteCopy.home.quoteEyebrow, locale)}
              </p>
              <div className="home-quote__inner">
                <blockquote>{t(homeQuote.text, locale)}</blockquote>
                <p className="home-quote__author">{t(homeQuote.author, locale)}</p>
              </div>
              <Link className="outline-button" href="/archive">
                {t(siteCopy.home.cta, locale)}
              </Link>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
