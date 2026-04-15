"use client";

export function trackEvent(eventName, payload) {
  if (typeof window === "undefined") return;

  const umami = window.umami;

  if (!umami?.track || !eventName) return;

  if (payload && typeof payload === "object") {
    umami.track(eventName, payload);
    return;
  }

  umami.track(eventName);
}
