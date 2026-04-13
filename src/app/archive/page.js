"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, t } from "../../lib/i18n";
import { careers, siteCopy, statusMeta } from "../../data";
import { CareerCard } from "../../components/CareerCard";

const ARCHIVE_PAGE_SIZE_DEFAULT = 12;
const ARCHIVE_PAGE_SIZE_WIDE = 16;
const ARCHIVE_VIEWPORT_WIDE_MIN = 1440;

const statusOrder = Object.entries(statusMeta)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([key]) => key);

function normalizeForSearch(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function getCareerSearchHaystack(career, locale) {
  return normalizeForSearch(
    `${t(career.name, locale)} ${t(career.teaser, locale)} ${t(career.summary, locale)}`
  );
}

function careerMatchesQuery(career, normalizedQuery, locale) {
  if (!normalizedQuery) return true;
  return getCareerSearchHaystack(career, locale).includes(normalizedQuery);
}

function ArchiveContent() {
  const { locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "alphabetical";
  const q = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const [searchDraft, setSearchDraft] = useState(q);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(ARCHIVE_PAGE_SIZE_DEFAULT);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchDraft(q);
  }, [q]);

  useEffect(() => {
    function updatePageSize() {
      const next =
        window.innerWidth >= ARCHIVE_VIEWPORT_WIDE_MIN
          ? ARCHIVE_PAGE_SIZE_WIDE
          : ARCHIVE_PAGE_SIZE_DEFAULT;
      setPageSize(next);
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const updateUrl = useCallback(
    (overrides) => {
      const next = {
        status: overrides.status ?? status,
        sort: overrides.sort ?? sort,
        q: overrides.q ?? q,
        page: overrides.page ?? page
      };
      const params = new URLSearchParams();
      if (next.status !== "all") params.set("status", next.status);
      if (next.sort !== "alphabetical") params.set("sort", next.sort);
      const trimQ = next.q.trim();
      if (trimQ) params.set("q", trimQ);
      if (next.page > 1) params.set("page", String(next.page));
      const qs = params.toString();
      router.replace(`/archive${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [status, sort, q, page, router]
  );

  const collator = useMemo(
    () => new Intl.Collator(locale === "zh" ? "zh-Hans-CN" : "en", { sensitivity: "base" }),
    [locale]
  );

  const filtered = useMemo(() => {
    let list = status === "all" ? [...careers] : careers.filter((c) => c.status === status);
    const nq = normalizeForSearch(q);
    if (nq) list = list.filter((c) => careerMatchesQuery(c, nq, locale));
    if (sort === "timeline") {
      list.sort((a, b) => b.declineYear - a.declineYear);
    } else {
      list.sort((a, b) => collator.compare(t(a.name, locale), t(b.name, locale)));
    }
    return list;
  }, [status, sort, q, locale, collator]);

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize) || 1);
  const safePage = totalCount === 0 ? 1 : Math.min(Math.max(1, page), totalPages);
  const from = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = totalCount === 0 ? 0 : Math.min(safePage * pageSize, totalCount);
  const pageItems = totalCount === 0 ? [] : filtered.slice(from - 1, to);
  const showTail = totalCount > 0 && safePage === totalPages;

  useEffect(() => {
    if (page !== safePage && totalCount > 0) {
      updateUrl({ page: safePage });
    }
  }, [page, safePage, totalCount, updateUrl]);

  const suggestions = useMemo(() => {
    const nd = normalizeForSearch(searchDraft);
    if (!nd) return [];
    let list = status === "all" ? [...careers] : careers.filter((c) => c.status === status);
    list = list.filter((c) => careerMatchesQuery(c, nd, locale));
    if (sort === "timeline") {
      list.sort((a, b) => b.declineYear - a.declineYear);
    } else {
      list.sort((a, b) => collator.compare(t(a.name, locale), t(b.name, locale)));
    }
    return list.slice(0, 10);
  }, [searchDraft, status, sort, locale, collator]);

  function commitSearch(value) {
    const trimmed = (value ?? searchDraft).trim();
    setSearchDraft(trimmed);
    setSuggestionsOpen(false);
    updateUrl({ q: trimmed, page: 1 });
  }

  function handleSuggestionClick(career) {
    const name = t(career.name, locale);
    setSearchDraft(name);
    setSuggestionsOpen(false);
    updateUrl({ q: name, page: 1 });
  }

  function handleClear() {
    setSearchDraft("");
    setSuggestionsOpen(false);
    updateUrl({ q: "", page: 1 });
    inputRef.current?.focus();
  }

  const statusOptions = [
    { value: "all", label: t(siteCopy.archive.all, locale) },
    ...statusOrder.map((key) => ({
      value: key,
      label: t(statusMeta[key].label, locale)
    }))
  ];

  const sortOptions = [
    { value: "alphabetical", label: t(siteCopy.archive.alphabetical, locale) },
    { value: "timeline", label: t(siteCopy.archive.timeline, locale) }
  ];

  function interpolate(template, values) {
    return t(template, locale).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }

  const summary =
    totalCount > 0
      ? interpolate(siteCopy.archive.paginationSummary, {
          from: String(from),
          to: String(to),
          total: String(totalCount)
        })
      : "";

  const pageStatus =
    totalPages > 1
      ? interpolate(siteCopy.archive.paginationPageStatus, {
          page: String(safePage),
          totalPages: String(totalPages)
        })
      : "";

  return (
    <main id="main-content" className="page-main page-main--exhibition">
      <header className="page-header reveal">
        <h1>{t(siteCopy.archive.title, locale)}</h1>
        <p className="page-header__subtitle">{t(siteCopy.archive.subtitle, locale)}</p>
        <div className="page-header__marker" aria-hidden="true" />
      </header>

      <section className="archive-controls reveal" style={{ "--stagger": "0.12s" }}>
        <div className="archive-controls__filters">
          <div className="archive-controls__group">
            <p className="section-eyebrow">{t(siteCopy.archive.filterEyebrow, locale)}</p>
            <div className="archive-controls__actions">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`text-toggle${status === opt.value ? " is-active" : ""}`}
                  type="button"
                  onClick={() => updateUrl({ status: opt.value, page: 1 })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="archive-controls__group archive-controls__group--right">
            <p className="section-eyebrow">{t(siteCopy.archive.sortEyebrow, locale)}</p>
            <div className="archive-controls__actions">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`text-toggle${sort === opt.value ? " is-active" : ""}`}
                  type="button"
                  onClick={() => updateUrl({ sort: opt.value, page: 1 })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="archive-controls__search">
          <p className="section-eyebrow">{t(siteCopy.archive.searchEyebrow, locale)}</p>
          <form
            ref={formRef}
            id="archive-search-form"
            className="archive-search-form"
            action="#"
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              commitSearch();
            }}
          >
            <div className="archive-search-row">
              <div
                className={`archive-search-input-wrap${searchDraft.trim() ? " is-nonempty" : ""}`}
                data-archive-search-wrap=""
              >
                <input
                  ref={inputRef}
                  id="archive-search-input"
                  className="archive-search-input"
                  type="text"
                  name="q"
                  inputMode="search"
                  enterKeyHint="search"
                  role="searchbox"
                  aria-label={t(siteCopy.archive.searchAriaLabel, locale)}
                  aria-autocomplete="list"
                  aria-controls="archive-search-suggestions"
                  aria-expanded={suggestionsOpen && suggestions.length > 0 ? "true" : "false"}
                  placeholder={t(siteCopy.archive.searchPlaceholder, locale)}
                  value={searchDraft}
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchDraft(e.target.value);
                    setSuggestionsOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && suggestionsOpen) {
                      e.preventDefault();
                      setSuggestionsOpen(false);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (formRef.current && !formRef.current.contains(document.activeElement)) {
                        setSearchDraft(q);
                        setSuggestionsOpen(false);
                      }
                    }, 0);
                  }}
                />
                <button
                  type="button"
                  className="archive-search-clear"
                  aria-label={t(siteCopy.archive.searchClearAriaLabel, locale)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClear}
                >
                  <span className="archive-search-clear__glyph" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <button
                type="submit"
                className="archive-search-submit outline-button outline-button--compact"
              >
                {t(siteCopy.archive.searchSubmit, locale)}
              </button>
            </div>
            <ul
              id="archive-search-suggestions"
              className="archive-search-suggestions"
              role="listbox"
              hidden={!suggestionsOpen || suggestions.length === 0}
              aria-label={t(siteCopy.archive.searchSuggestionsLabel, locale)}
              onMouseDown={(e) => {
                const option = e.target.closest("[data-suggestion-slug]");
                if (!option) return;
                e.preventDefault();
                const slug = option.getAttribute("data-suggestion-slug");
                const career = careers.find((c) => c.slug === slug);
                if (career) handleSuggestionClick(career);
              }}
            >
              {suggestions.map((career) => (
                <li key={career.slug} role="presentation">
                  <button
                    type="button"
                    className="archive-search-suggestions__option"
                    role="option"
                    data-suggestion-slug={career.slug}
                  >
                    {t(career.name, locale)}
                  </button>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </section>

      <section className="career-grid career-grid--archive">
        {totalCount === 0 ? (
          <p className="archive-empty reveal" role="status">
            {t(siteCopy.archive.emptyResults, locale)}
          </p>
        ) : (
          <>
            {pageItems.map((career) => (
              <CareerCard key={career.slug} career={career} variant="archive" />
            ))}
            {showTail && (
              <div
                className="archive-tail archive-tail--end reveal"
                style={{ "--stagger": "0.16s" }}
              >
                <p>{t(siteCopy.archive.tail, locale)}</p>
              </div>
            )}
          </>
        )}
      </section>

      {totalCount > 0 && (
        <div className="archive-pagination reveal" style={{ "--stagger": "0.14s" }}>
          <p className="archive-pagination__summary">{summary}</p>
          {totalPages > 1 && (
            <nav
              className="archive-pagination__nav"
              aria-label={t(siteCopy.archive.paginationNavAria, locale)}
            >
              <button
                type="button"
                className="text-button text-button--inline"
                disabled={safePage <= 1}
                onClick={() => updateUrl({ page: Math.max(1, safePage - 1) })}
              >
                {t(siteCopy.archive.paginationPrev, locale)}
              </button>
              <span className="archive-pagination__page">{pageStatus}</span>
              <button
                type="button"
                className="text-button text-button--inline"
                disabled={safePage >= totalPages}
                onClick={() => updateUrl({ page: safePage + 1 })}
              >
                {t(siteCopy.archive.paginationNext, locale)}
              </button>
            </nav>
          )}
        </div>
      )}
    </main>
  );
}

export default function ArchivePage() {
  return (
    <Suspense>
      <ArchiveContent />
    </Suspense>
  );
}
