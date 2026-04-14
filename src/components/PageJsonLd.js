"use client";
import { useLocale } from "../lib/i18n";
import { JsonLd } from "../lib/seo";

export function PageJsonLd({ buildSchemas }) {
  const { locale } = useLocale();
  const schemas = buildSchemas(locale);
  return <JsonLd data={schemas} />;
}
