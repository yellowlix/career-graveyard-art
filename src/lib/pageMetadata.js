import { siteMeta } from "../data";
import { t } from "./translate";

const DEFAULT_LOCALE = "zh";

export const defaultSocialImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Career Graveyard social preview"
};

function buildLanguageAlternates(path) {
  return {
    zh: path,
    en: path,
    "x-default": path
  };
}

function buildSocialImage(image, fallbackAlt) {
  if (typeof image === "string") {
    return {
      ...defaultSocialImage,
      url: image,
      alt: fallbackAlt ?? defaultSocialImage.alt
    };
  }

  return {
    ...defaultSocialImage,
    ...image,
    alt: image?.alt ?? fallbackAlt ?? defaultSocialImage.alt
  };
}

function buildSocialTitle(title, locale) {
  const siteName = t(siteMeta.siteName, locale);
  if (!title) return siteName;
  return `${t(title, locale)} | ${siteName}`;
}

export function buildRootMetadata(locale = DEFAULT_LOCALE) {
  const siteName = t(siteMeta.siteName, locale);
  const description = t(siteMeta.defaultDescription, locale);
  const socialTitle = buildSocialTitle(null, locale);
  const socialImage = buildSocialImage(defaultSocialImage, socialTitle);

  return {
    metadataBase: new URL(siteMeta.siteUrl),
    title: {
      template: `%s | ${siteName}`,
      default: siteName
    },
    description,
    openGraph: {
      title: socialTitle,
      description,
      url: "/",
      siteName,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [socialImage]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url]
    },
    icons: { icon: "/favicon.svg" },
    alternates: {
      languages: buildLanguageAlternates("/")
    }
  };
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  robots,
  locale = DEFAULT_LOCALE,
  image = defaultSocialImage,
  type = "website"
}) {
  const resolvedTitle = title ? t(title, locale) : undefined;
  const resolvedDescription = t(description ?? siteMeta.defaultDescription, locale);
  const siteName = t(siteMeta.siteName, locale);
  const socialTitle = buildSocialTitle(title, locale);
  const socialImage = buildSocialImage(image, socialTitle);

  return {
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    description: resolvedDescription,
    alternates: {
      canonical: path,
      languages: buildLanguageAlternates(path)
    },
    openGraph: {
      title: socialTitle,
      description: resolvedDescription,
      url: path,
      siteName,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type,
      images: [socialImage]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: resolvedDescription,
      images: [socialImage.url]
    },
    ...(robots ? { robots } : {})
  };
}
