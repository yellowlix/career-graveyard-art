"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, t } from "../lib/i18n";
import { siteMeta, siteCopy } from "../data";
import { CopyPageLinkButton } from "./CopyPageLinkButton";

export function SiteNav() {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDetail = pathname.startsWith("/career/");

  const navLinks = [
    {
      key: "archive",
      href: "/archive",
      label: t(siteCopy.navigation.archive, locale),
      hint: t(siteCopy.navigationHints.archive, locale)
    },
    {
      key: "memorial",
      href: "/memorial",
      label: t(siteCopy.navigation.memorial, locale),
      hint: t(siteCopy.navigationHints.memorial, locale)
    },
    {
      key: "about",
      href: "/about",
      label: t(siteCopy.navigation.about, locale),
      hint: t(siteCopy.navigationHints.about, locale)
    }
  ];

  const activeKey = navLinks.find((l) => pathname.startsWith(l.href))?.key ?? "";

  return (
    <nav className={`site-nav site-nav--${isHome ? "home" : "page"}`} aria-label="Primary">
      <div className="site-nav__inner">
        <div className="site-nav__cluster">
          {isDetail ? (
            <Link className="site-nav__back" href="/archive">
              &larr; {t(siteCopy.navigation.back, locale)}
            </Link>
          ) : (
            <Link className="site-nav__logo" href="/">
              {t(siteMeta.siteName, locale)}
            </Link>
          )}
        </div>
        <div className="site-nav__controls">
          <div className="site-nav__links">
            {navLinks.map((link) => (
              <span className="site-nav__item" key={link.key}>
                <Link
                  className={`site-nav__link${activeKey === link.key ? " is-active" : ""}`}
                  href={link.href}
                >
                  <span className="site-nav__link-label">{link.label}</span>
                </Link>
                <span className="site-nav__hint" id={`site-nav-hint-${link.key}`} role="tooltip">
                  {link.hint}
                </span>
              </span>
            ))}
            <span className="site-nav__item site-nav__item--share">
              <CopyPageLinkButton
                label={t(siteCopy.navigation.share, locale)}
                className="site-nav__share text-button"
                trackPayload={{ from: "nav", path: pathname }}
              />
            </span>
          </div>
          <div
            className="site-nav__locale-switch"
            role="group"
            aria-label={t(siteCopy.localeSwitch.ariaLabel, locale)}
          >
            <button
              className={`site-nav__locale-button${locale === "zh" ? " is-active" : ""}`}
              type="button"
              onClick={() => setLocale("zh")}
            >
              {siteCopy.localeSwitch.zh}
            </button>
            <button
              className={`site-nav__locale-button${locale === "en" ? " is-active" : ""}`}
              type="button"
              onClick={() => setLocale("en")}
            >
              {siteCopy.localeSwitch.en}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
