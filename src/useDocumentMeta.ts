import { useEffect } from "react";

/**
 * Sets the document title and meta description for a route, restoring the
 * previous values on unmount so other routes keep the defaults from index.html.
 *
 * Note: this updates the live DOM, which helps the browser tab and JS-capable
 * crawlers. Social scrapers that don't run JS still read index.html's static
 * tags; full per-route Open Graph would need prerendering.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? null;

    document.title = title;
    if (description && metaDesc) metaDesc.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
