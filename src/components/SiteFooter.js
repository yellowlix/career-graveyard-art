"use client";
import Link from "next/link";
import { useLocale, t } from "../lib/i18n";
import { siteMeta, siteCopy } from "../data";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className={`site-footer${isHome ? " site-footer--home" : ""}`}>
      <div className="site-footer__inner">
        <p className="site-footer__copy">{t(siteCopy.footer.copyright, locale)}</p>
        <div className="site-footer__contact">
          <span className="site-footer__contact-label">
            {t(siteCopy.footer.contactLabel, locale)}
          </span>
          <a className="site-footer__contact-email" href={`mailto:${siteMeta.contactEmail}`}>
            {siteMeta.contactEmail}
          </a>
        </div>
        <div className="site-footer__links">
          <Link href="/about#legal">{t(siteCopy.footer.legal, locale)}</Link>
          <Link href="/about#policy">{t(siteCopy.footer.policy, locale)}</Link>
          <Link href="/about#contact">{t(siteCopy.footer.connect, locale)}</Link>
          <Link href="/about#support">{t(siteCopy.footer.support, locale)}</Link>
        </div>
      </div>
    </footer>
  );
}
