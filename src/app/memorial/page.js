import { Suspense } from "react";
import MemorialPageClient from "./MemorialPageClient";
import { siteCopy } from "../../data";
import { buildPageMetadata } from "../../lib/pageMetadata";

export const metadata = buildPageMetadata({
  title: siteCopy.memorial.title.zh,
  description: siteCopy.pageDescriptions.memorial.zh,
  path: "/memorial"
});

export default function MemorialPage() {
  return (
    <Suspense fallback={null}>
      <MemorialPageClient />
    </Suspense>
  );
}
