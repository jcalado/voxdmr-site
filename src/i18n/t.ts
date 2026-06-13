import en from './en.json';
import pt from './pt.json';

export type Lang = 'en' | 'pt';

const dict: Record<Lang, Record<string, string>> = { en, pt };

/**
 * Translate a flat i18n key for the given language, with English fallback,
 * then the key itself if missing. Supports `{name}` placeholder substitution.
 * Pure — usable from .astro frontmatter and React islands alike.
 */
export function t(key: string, lang: Lang, vars?: Record<string, string>): string {
  let s = dict[lang]?.[key] ?? dict.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, v);
    }
  }
  return s;
}

/**
 * Curried form: `const tr = getT(lang); tr('nav.docs')`.
 * Convenient inside islands that already hold the active language as a prop.
 */
export function getT(lang: Lang) {
  return (key: string, vars?: Record<string, string>): string => t(key, lang, vars);
}
