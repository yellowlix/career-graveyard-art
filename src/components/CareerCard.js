"use client";
import Link from "next/link";
import { useLocale, t } from "../lib/i18n";
import { careers } from "../data";

export function CareerCard({ career, variant = "home" }) {
  const { locale } = useLocale();
  const HeadingTag = variant === "related" ? "h4" : "h2";
  const index = careers.findIndex((c) => c.slug === career.slug);

  return (
    <Link
      className={`career-card career-card--${variant} reveal`}
      style={{
        "--slab-height": `${career.slabHeight}px`,
        "--stagger": `${0.08 * Math.max(0, index)}s`
      }}
      href={`/career/${career.slug}`}
    >
      <div className="career-card__cross">
        <span className="career-card__bar career-card__bar--top" aria-hidden="true" />
        <HeadingTag className="career-card__title">{t(career.name, locale)}</HeadingTag>
        <span className="career-card__bar career-card__bar--bottom" aria-hidden="true" />
      </div>
      <div className="career-card__teaser">
        <p>{t(career.teaser, locale)}</p>
      </div>
    </Link>
  );
}
