export function t(value, locale) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && ("zh" in value || "en" in value)) {
    return value[locale] ?? value.zh ?? "";
  }
  return String(value);
}
