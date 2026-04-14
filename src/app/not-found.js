"use client";
import { NotFoundPanel } from "../components/NotFoundPanel";
import { PageMarker } from "../components/PageMarker";

export default function NotFound() {
  return (
    <main id="main-content" className="page-main page-main--exhibition">
      <PageMarker page="not-found" />
      <NotFoundPanel />
    </main>
  );
}
