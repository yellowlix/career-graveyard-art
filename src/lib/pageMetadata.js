export function buildPageMetadata({ title, description, path, robots }) {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
      languages: {
        zh: path,
        en: path,
        "x-default": path
      }
    },
    ...(robots ? { robots } : {})
  };
}
