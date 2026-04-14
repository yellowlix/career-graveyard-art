import { careers, siteMeta } from "../data";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: siteMeta.siteUrl,
      priority: 1
    },
    {
      url: `${siteMeta.siteUrl}/archive`,
      priority: 0.9
    },
    {
      url: `${siteMeta.siteUrl}/memorial`,
      priority: 0.7
    },
    {
      url: `${siteMeta.siteUrl}/about`,
      priority: 0.6
    },
    ...careers.map((career) => ({
      url: `${siteMeta.siteUrl}/career/${career.slug}`,
      priority: 0.8
    }))
  ];
}
