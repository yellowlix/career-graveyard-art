"use client";
import { usePathname } from "next/navigation";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { useLocale, t } from "../lib/i18n";
import { siteCopy } from "../data";

export function Shell({ children }) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const showFooter = pathname !== "/";

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {t(siteCopy.skipLink, locale)}
      </a>
      <div className="grain" />
      <SiteNav />
      {children}
      {showFooter ? <SiteFooter /> : null}
    </div>
  );
}
