"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useLocale, t } from "../lib/i18n";
import { siteCopy } from "../data";
import { trackEvent } from "../lib/analytics";

export function CopyPageLinkButton({ label, className, trackPayload }) {
  const { locale } = useLocale();
  const [toast, setToast] = useState(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const onClick = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToast("ok");
      trackEvent(
        "career-share-copy",
        trackPayload && typeof trackPayload === "object" ? trackPayload : {}
      );
    } catch {
      setToast("err");
    }
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, [trackPayload]);

  return (
    <span className="copy-page-link">
      <button type="button" className={className} onClick={onClick}>
        {label}
      </button>
      {toast === "ok" && (
        <span className="copy-page-link__toast" role="status">
          {t(siteCopy.detail.copyLinkToast, locale)}
        </span>
      )}
      {toast === "err" && (
        <span className="copy-page-link__toast copy-page-link__toast--error" role="alert">
          {t(siteCopy.detail.copyLinkFail, locale)}
        </span>
      )}
    </span>
  );
}
