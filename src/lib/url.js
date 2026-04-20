import { siteMeta } from "../data.js";

export function normalizeCanonicalPath(pathname = "/") {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function toAbsoluteSiteUrl(pathname) {
  return new URL(normalizeCanonicalPath(pathname), siteMeta.siteUrl).toString();
}
