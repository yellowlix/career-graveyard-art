"use client";
import Link from "next/link";
import { useLocale, t } from "../lib/i18n";
import { siteCopy } from "../data";

export function NotFoundPanel({ config = {} }) {
  const { locale } = useLocale();
  const eyebrow = config.eyebrow ?? siteCopy.notFound.eyebrow;
  const heading = config.heading ?? siteCopy.notFound.heading;
  const body = config.body ?? siteCopy.notFound.body;
  const primaryHref = config.primaryHref ?? "/archive";
  const primaryLabel = config.primaryLabel ?? siteCopy.notFound.primaryLabel;
  const secondaryHref = config.secondaryHref ?? "/";
  const secondaryLabel = config.secondaryLabel ?? siteCopy.notFound.secondaryLabel;

  return (
    <section className="not-found-panel reveal">
      <p className="section-eyebrow">{t(eyebrow, locale)}</p>
      <h1>{t(heading, locale)}</h1>
      <p className="not-found-panel__body">{t(body, locale)}</p>
      <div className="not-found-panel__actions">
        <Link className="outline-button" href={primaryHref}>
          {t(primaryLabel, locale)}
        </Link>
        <Link className="text-button text-button--inline" href={secondaryHref}>
          {t(secondaryLabel, locale)}
        </Link>
      </div>
    </section>
  );
}
