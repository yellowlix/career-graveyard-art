import HomePageClient from "./HomePageClient";
import { siteMeta } from "../data";
import { buildPageMetadata } from "../lib/pageMetadata";

export const metadata = buildPageMetadata({
  description: siteMeta.defaultDescription.zh,
  path: "/"
});

export default function HomePage() {
  return <HomePageClient />;
}
