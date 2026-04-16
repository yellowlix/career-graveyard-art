import { careers, siteCopy } from "../../../data";
import { CareerDetailContent } from "./CareerDetailContent";
import { buildPageMetadata } from "../../../lib/pageMetadata";

function interpolate(template, values) {
  return String(template ?? "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);

  if (!career) {
    return buildPageMetadata({
      title: siteCopy.notFound.detailTitle.zh,
      description: interpolate(siteCopy.notFound.detailBodyTemplate.zh, { slug }),
      path: "/archive",
      robots: {
        index: false,
        follow: true
      }
    });
  }

  return buildPageMetadata({
    title: career.name.zh,
    description: career.summary.zh,
    path: `/career/${career.slug}`,
    type: "article"
  });
}

export default async function CareerPage({ params }) {
  const { slug } = await params;
  return <CareerDetailContent slug={slug} />;
}
