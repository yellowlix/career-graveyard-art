import { careers } from "../../../data";
import { CareerDetailContent } from "./CareerDetailContent";

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export default async function CareerPage({ params }) {
  const { slug } = await params;
  return <CareerDetailContent slug={slug} />;
}
