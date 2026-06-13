import type { Lang } from './t';

/** Resolve the active locale from a URL pathname (Portuguese lives under `/pt`). */
export function localeFromUrl(pathname: string): Lang {
  return pathname === '/pt' || pathname.startsWith('/pt/') ? 'pt' : 'en';
}

/**
 * Map the current pathname to the same page in the other locale.
 * English is at the root; Portuguese is prefixed with `/pt`.
 */
export function altLocalePath(pathname: string): string {
  const cur = localeFromUrl(pathname);
  if (cur === 'pt') {
    // Strip the `/pt` prefix to get back to the English (default) URL.
    return pathname.replace(/^\/pt/, '') || '/';
  }
  return pathname === '/' ? '/pt/' : '/pt' + pathname;
}

/**
 * Build a locale-correct href from a root-relative English path.
 * `localizePath('/docs', 'pt')` → `/pt/docs`; anchors/external untouched.
 */
export function localizePath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  if (!path.startsWith('/')) return path; // anchors, external, mailto, etc.
  if (path === '/') return '/pt/';
  return '/pt' + path;
}
