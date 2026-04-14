import { careers, siteCopy } from "../../../data";
import { CareerDetailContent } from "./CareerDetailContent";

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
    return {
      title: siteCopy.notFound.detailTitle.zh,
      description: interpolate(siteCopy.notFound.detailBodyTemplate.zh, { slug }),
      alternates: {
        canonical: "/archive"
      },
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return {
    title: career.name.zh,
    description: career.summary.zh,
    alternates: {
      canonical: `/career/${career.slug}`
    }
  };
}

export default async function CareerPage({ params }) {
  const { slug } = await params;
  return <CareerDetailContent slug={slug} />;
}
