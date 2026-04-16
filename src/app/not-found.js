import { siteCopy } from "../data";
import { buildPageMetadata } from "../lib/pageMetadata";
import { NotFoundPanel } from "../components/NotFoundPanel";
import { PageMarker } from "../components/PageMarker";

export const metadata = buildPageMetadata({
  title: siteCopy.notFound.heading.zh,
  description: siteCopy.pageDescriptions.notFound.zh,
  path: "/404",
  robots: {
    index: false,
    follow: true
  }
});

export default function NotFound() {
  return (
    <main id="main-content" className="page-main page-main--exhibition">
      <PageMarker page="not-found" />
      <NotFoundPanel />
    </main>
  );
}
