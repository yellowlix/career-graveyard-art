import { siteMeta } from "../data";
import { t } from "./i18n";

export function buildWebSiteSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t(siteMeta.siteName, locale),
    url: siteMeta.siteUrl,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    description: t(siteMeta.defaultDescription, locale)
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function toAbsoluteUrl(pathname) {
  return new URL(pathname, siteMeta.siteUrl).toString();
}

export function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  return items.map((schema, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}

export function HreflangTags({ url }) {
  return ["zh", "en", "x-default"].map((lang) => (
    <link key={lang} rel="alternate" hrefLang={lang} href={url} />
  ));
}
