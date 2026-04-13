"use client";
import { useEffect } from "react";

export function PageMarker({ page }) {
  useEffect(() => {
    document.body.dataset.page = page;
    return () => {
      delete document.body.dataset.page;
    };
  }, [page]);
  return null;
}
