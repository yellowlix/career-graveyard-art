import { careers, siteMeta } from "../src/data.js";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const base = siteMeta.siteUrl;

const urls = [
  { loc: `${base}/`, priority: "1.0" },
  { loc: `${base}/archive`, priority: "0.9" },
  { loc: `${base}/memorial`, priority: "0.7" },
  { loc: `${base}/about`, priority: "0.6" },
  ...careers.map((c) => ({ loc: `${base}/career/${c.slug}`, priority: "0.8" }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;

const outDir = resolve(import.meta.dirname, "../out");
writeFileSync(resolve(outDir, "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${urls.length} URLs`);
