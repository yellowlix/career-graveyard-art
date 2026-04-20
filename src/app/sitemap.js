import { careers } from "../data";
import { toAbsoluteSiteUrl } from "../lib/url";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: toAbsoluteSiteUrl("/"),
      priority: 1
    },
    {
      url: toAbsoluteSiteUrl("/archive"),
      priority: 0.9
    },
    {
      url: toAbsoluteSiteUrl("/memorial"),
      priority: 0.7
    },
    {
      url: toAbsoluteSiteUrl("/about"),
      priority: 0.6
    },
    ...careers.map((career) => ({
      url: toAbsoluteSiteUrl(`/career/${career.slug}`),
      priority: 0.8
    }))
  ];
}
