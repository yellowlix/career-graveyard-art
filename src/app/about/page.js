import AboutPageClient from "./AboutPageClient";
import { siteCopy } from "../../data";
import { buildPageMetadata } from "../../lib/pageMetadata";

export const metadata = buildPageMetadata({
  title: siteCopy.navigation.about.zh,
  description: siteCopy.pageDescriptions.about.zh,
  path: "/about"
});

export default function AboutPage() {
  return <AboutPageClient />;
}
