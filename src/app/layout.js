import "./globals.css";
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
      <body>
        <LocaleProvider>
          <Shell>{children}</Shell>
        </LocaleProvider>
      </body>
    </html>
  );
}
