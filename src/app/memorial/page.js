"use client";
import { useState, useMemo, useCallback } from "react";
import { useLocale, t } from "../../lib/i18n";
import { siteMeta, siteCopy, careers, initialMemorials } from "../../data";

function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function buildMailtoUrl({ email, subject, body }) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getCareerBySlug(slug) {
  return careers.find((c) => c.slug === slug) ?? null;
}

function MemorialItem({ item, mode, locale }) {
  if (mode === "unlisted") {
    return (
      <article className="memorial-item memorial-item--unlisted">
        <div className="memorial-item__head">
          <h4>{t(item.careerName, locale)}</h4>
          <span>{t(item.date, locale)}</span>
        </div>
        <p className="memorial-item__intro">{t(item.introduction, locale)}</p>
        <p className="memorial-item__text">{t(item.text, locale)}</p>
        {item.references && (
          <p className="memorial-item__references">{t(item.references, locale)}</p>
        )}
        <p className="memorial-item__signature">{t(item.signature, locale)}</p>
      </article>
    );
  }

  const career = getCareerBySlug(item.careerSlug);
  return (
    <article className="memorial-item">
      <div className="memorial-item__head">
        <h4>{career ? t(career.name, locale) : item.careerSlug}</h4>
        <span>{t(item.date, locale)}</span>
      </div>
      <p className="memorial-item__text">{t(item.text, locale)}</p>
      <p className="memorial-item__signature">{t(item.signature, locale)}</p>
    </article>
  );
}

export default function MemorialPage() {
  const { locale } = useLocale();

  const [activeMode, setActiveMode] = useState("existing");

  const [existingFields, setExistingFields] = useState({
    careerSlug: careers[0]?.slug ?? "",
    signature: "",
    text: ""
  });

  const [unlistedFields, setUnlistedFields] = useState({
    careerName: "",
    introduction: "",
    signature: "",
    text: "",
    references: ""
  });

  const updateExisting = useCallback((field, value) => {
    setExistingFields((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateUnlisted = useCallback((field, value) => {
    setUnlistedFields((prev) => ({ ...prev, [field]: value }));
  }, []);

  const draft = useMemo(() => {
    if (activeMode === "existing") {
      const career = getCareerBySlug(existingFields.careerSlug) ?? careers[0];
      const careerName = t(career?.name ?? "", locale);
      const safeSignature =
        existingFields.signature.trim() || t(siteCopy.memorialEmail.emptySignature, locale);
      const safeText = existingFields.text.trim() || t(siteCopy.memorialEmail.emptyText, locale);

      const subject = `${t(siteCopy.memorialEmail.subjectPrefix, locale)} ${careerName} - ${safeSignature}`;
      const body = interpolate(t(siteCopy.memorialEmail.bodyTemplate, locale), {
        career: careerName,
        signature: safeSignature,
        text: safeText
      });

      const isValid = Boolean(existingFields.signature.trim() && existingFields.text.trim());
      return { subject, body, email: siteMeta.contactEmail, isValid };
    }

    const safeCareer =
      unlistedFields.careerName.trim() ||
      t(siteCopy.memorial.modes.unlisted.careerNamePlaceholder, locale);
    const safeIntroduction =
      unlistedFields.introduction.trim() || t(siteCopy.contactEmail.emptyIntroduction, locale);
    const safeSignature =
      unlistedFields.signature.trim() || t(siteCopy.contactEmail.emptySignature, locale);
    const safeText = unlistedFields.text.trim() || t(siteCopy.contactEmail.emptyText, locale);
    const safeReferences = unlistedFields.references.trim();
    const referencesBlock = safeReferences
      ? `${t(siteCopy.contactEmail.referencesLabel, locale)}${locale === "zh" ? "：" : ": "}${safeReferences}`
      : "";

    const subject = `${t(siteCopy.contactEmail.subjectPrefix, locale)} ${safeCareer} - ${safeSignature}`;
    const body = interpolate(t(siteCopy.contactEmail.bodyTemplate, locale), {
      career: safeCareer,
      introduction: safeIntroduction,
      signature: safeSignature,
      text: safeText,
      referencesBlock
    })
      .replace(/\n{2,}/g, "\n")
      .trim();

    const isValid = Boolean(
      unlistedFields.careerName.trim() &&
      unlistedFields.introduction.trim() &&
      unlistedFields.signature.trim() &&
      unlistedFields.text.trim()
    );

    return { subject, body, email: siteMeta.contactEmail, isValid };
  }, [activeMode, existingFields, unlistedFields, locale]);

  const modeCopy = siteCopy.memorial.modes[activeMode];
  const memorialExamples = initialMemorials[activeMode];

  const modes = [
    { key: "existing", label: t(siteCopy.memorial.modes.existing.tabLabel, locale) },
    { key: "unlisted", label: t(siteCopy.memorial.modes.unlisted.tabLabel, locale) }
  ];

  return (
    <main id="main-content" className="page-main page-main--exhibition">
      <header className="page-header reveal">
        <h1>{t(siteCopy.memorial.title, locale)}</h1>
        <p className="page-header__subtitle">{t(siteCopy.memorial.channelValue, locale)}</p>
        <div className="page-header__marker" aria-hidden="true" />
      </header>

      <section className="memorial-main">
        <div className="memorial-layout">
          <aside className="memorial-form__sticky reveal" style={{ "--stagger": "0.08s" }}>
            <section
              className="memorial-mode-switch reveal"
              style={{ "--stagger": "0.04s" }}
              aria-label={t(siteCopy.memorial.switcherLabel, locale)}
            >
              <div
                className="memorial-mode-switch__tabs"
                role="tablist"
                aria-label={t(siteCopy.memorial.switcherLabel, locale)}
              >
                {modes.map((m) => (
                  <button
                    key={m.key}
                    className={`memorial-mode-switch__button${activeMode === m.key ? " is-active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={activeMode === m.key ? "true" : "false"}
                    onClick={() => setActiveMode(m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            <div className="memorial-note">
              <p className="section-eyebrow">{t(siteCopy.memorial.noticeEyebrow, locale)}</p>
              <p className="memorial-note__text">{t(siteCopy.memorial.noticeText, locale)}</p>
            </div>

            <div className="memorial-form__fields">
              {activeMode === "existing" ? (
                <>
                  <p className="section-eyebrow">{t(modeCopy.formHeading, locale)}</p>
                  <p className="memorial-form__description">{t(modeCopy.description, locale)}</p>

                  <label htmlFor="memorial-career">
                    <span>{t(modeCopy.careerLabel, locale)}</span>
                    <select
                      id="memorial-career"
                      className="memorial-input"
                      value={existingFields.careerSlug}
                      onChange={(e) => updateExisting("careerSlug", e.target.value)}
                    >
                      {careers.map((career) => (
                        <option key={career.slug} value={career.slug}>
                          {t(career.name, locale)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor="memorial-signature">
                    <span>{t(modeCopy.signatureLabel, locale)}</span>
                    <input
                      id="memorial-signature"
                      className="memorial-input"
                      type="text"
                      value={existingFields.signature}
                      placeholder={t(modeCopy.signaturePlaceholder, locale)}
                      onChange={(e) => updateExisting("signature", e.target.value)}
                    />
                  </label>

                  <label htmlFor="memorial-text">
                    <span>{t(modeCopy.textLabel, locale)}</span>
                    <textarea
                      id="memorial-text"
                      className="memorial-input memorial-input--area"
                      rows={8}
                      placeholder={t(modeCopy.textPlaceholder, locale)}
                      value={existingFields.text}
                      onChange={(e) => updateExisting("text", e.target.value)}
                    />
                  </label>
                </>
              ) : (
                <>
                  <p className="section-eyebrow">{t(modeCopy.formHeading, locale)}</p>
                  <p className="memorial-form__description">{t(modeCopy.description, locale)}</p>

                  <label htmlFor="memorial-new-career">
                    <span>{t(modeCopy.careerNameLabel, locale)}</span>
                    <input
                      id="memorial-new-career"
                      className="memorial-input"
                      type="text"
                      value={unlistedFields.careerName}
                      placeholder={t(modeCopy.careerNamePlaceholder, locale)}
                      onChange={(e) => updateUnlisted("careerName", e.target.value)}
                    />
                  </label>

                  <label htmlFor="memorial-new-introduction">
                    <span>{t(modeCopy.careerIntroLabel, locale)}</span>
                    <textarea
                      id="memorial-new-introduction"
                      className="memorial-input memorial-input--area"
                      rows={5}
                      placeholder={t(modeCopy.careerIntroPlaceholder, locale)}
                      value={unlistedFields.introduction}
                      onChange={(e) => updateUnlisted("introduction", e.target.value)}
                    />
                  </label>

                  <label htmlFor="memorial-new-signature">
                    <span>{t(modeCopy.signatureLabel, locale)}</span>
                    <input
                      id="memorial-new-signature"
                      className="memorial-input"
                      type="text"
                      value={unlistedFields.signature}
                      placeholder={t(modeCopy.signaturePlaceholder, locale)}
                      onChange={(e) => updateUnlisted("signature", e.target.value)}
                    />
                  </label>

                  <label htmlFor="memorial-new-text">
                    <span>{t(modeCopy.textLabel, locale)}</span>
                    <textarea
                      id="memorial-new-text"
                      className="memorial-input memorial-input--area"
                      rows={8}
                      placeholder={t(modeCopy.textPlaceholder, locale)}
                      value={unlistedFields.text}
                      onChange={(e) => updateUnlisted("text", e.target.value)}
                    />
                  </label>

                  <label htmlFor="memorial-new-references">
                    <span>{t(modeCopy.referencesLabel, locale)}</span>
                    <textarea
                      id="memorial-new-references"
                      className="memorial-input memorial-input--area"
                      rows={4}
                      placeholder={t(modeCopy.referencesPlaceholder, locale)}
                      value={unlistedFields.references}
                      onChange={(e) => updateUnlisted("references", e.target.value)}
                    />
                  </label>
                </>
              )}
            </div>

            <div className="memorial-form__actions">
              <a
                id="memorial-mailto-link"
                className={`outline-button outline-button--full${draft.isValid ? "" : " is-disabled"}`}
                href={draft.isValid ? buildMailtoUrl(draft) : "#"}
                aria-disabled={draft.isValid ? "false" : "true"}
                onClick={(e) => {
                  if (!draft.isValid) e.preventDefault();
                }}
              >
                {t(modeCopy.submitLabel, locale)}
              </a>
              <p
                id="memorial-validation-hint"
                className="memorial-form__hint"
                hidden={draft.isValid}
              >
                {t(modeCopy.validationHint, locale)}
              </p>
            </div>

            <div className="memorial-fallback">
              <p className="section-eyebrow">{t(siteCopy.memorial.fallbackTitle, locale)}</p>
              <p className="memorial-fallback__text">{t(siteCopy.memorial.fallbackBody, locale)}</p>
              <p className="memorial-fallback__hint">{t(siteCopy.memorial.fallbackHint, locale)}</p>
              <div className="memorial-fallback__meta">
                <div className="memorial-fallback__field">
                  <span>{t(siteCopy.memorial.emailLabel, locale)}</span>
                  <p className="memorial-fallback__link">{siteMeta.contactEmail}</p>
                </div>
                <div className="memorial-fallback__field">
                  <span>{t(siteCopy.memorial.subjectLabel, locale)}</span>
                  <p id="memorial-subject-preview" className="memorial-fallback__subject">
                    {draft.subject}
                  </p>
                </div>
                <div className="memorial-fallback__field">
                  <span>{t(siteCopy.memorial.bodyLabel, locale)}</span>
                  <pre id="memorial-body-preview" className="memorial-fallback__body">
                    {draft.body}
                  </pre>
                </div>
              </div>
            </div>
          </aside>

          <section className="memorial-feed reveal" style={{ "--stagger": "0.16s" }}>
            <div className="memorial-feed__intro">
              <p className="section-eyebrow">{t(modeCopy.introEyebrow, locale)}</p>
              <p className="memorial-feed__lede">{t(modeCopy.introText, locale)}</p>
              <p className="memorial-feed__note">{t(modeCopy.curatedNote, locale)}</p>
            </div>
            <div className="memorial-feed__list">
              {memorialExamples.map((item, i) => (
                <MemorialItem key={i} item={item} mode={activeMode} locale={locale} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
