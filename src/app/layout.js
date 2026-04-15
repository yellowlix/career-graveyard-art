import "./globals.css";
import Script from "next/script";
import { LocaleProvider } from "../lib/i18n";
import { siteMeta } from "../data";
import { Shell } from "../components/Shell";

export const viewport = {
  themeColor: siteMeta.themeColor
};

export const metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: { template: "%s | 职业墓场", default: "职业墓场" },
  description: siteMeta.defaultDescription.zh,
  openGraph: {
    siteName: "职业墓场",
    images: [siteMeta.socialImage],
    type: "website"
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
  alternates: {
    languages: { zh: siteMeta.siteUrl, en: siteMeta.siteUrl, "x-default": siteMeta.siteUrl }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a8d5278c-3cdd-4802-875f-487bc0301ea8"
        />
      </head>
      <body>
        <LocaleProvider>
          <Shell>{children}</Shell>
        </LocaleProvider>
      </body>
    </html>
  );
}
