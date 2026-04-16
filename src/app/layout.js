import "./globals.css";
import Script from "next/script";
import { LocaleProvider } from "../lib/i18n";
import { siteMeta } from "../data";
import { Shell } from "../components/Shell";
import { buildRootMetadata } from "../lib/pageMetadata";

export const viewport = {
  themeColor: siteMeta.themeColor
};

export const metadata = buildRootMetadata();

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
