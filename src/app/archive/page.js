import ArchivePageClient from "./ArchivePageClient";
import { siteCopy } from "../../data";
import { buildPageMetadata } from "../../lib/pageMetadata";

export const metadata = buildPageMetadata({
  title: siteCopy.archive.title.zh,
  description: siteCopy.pageDescriptions.archive.zh,
  path: "/archive"
});

export default function ArchivePage() {
  return <ArchivePageClient />;
}
