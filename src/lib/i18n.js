"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
export { t } from "./translate";

const STORAGE_KEY = "career-graveyard-locale";
const DEFAULT_LOCALE = "zh";
const SUPPORTED = ["zh", "en"];

const LocaleContext = createContext({ locale: DEFAULT_LOCALE, setLocale: () => {} });

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.body.dataset.locale = locale;
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return <LocaleContext value={{ locale, setLocale }}>{children}</LocaleContext>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
