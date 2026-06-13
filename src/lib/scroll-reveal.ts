/**
 * Shared scroll-reveal utility — the static replacement for Framer Motion's
 * `whileInView` entrance fades. Any `.astro` section opts in by adding the
 * `scroll-reveal` class (CSS lives in `src/index.css`); elements fade/slide in
 * once when they scroll into view.
 *
 * Per-item stagger (the old `delay: i * 0.1`) is reproduced at the call site
 * with an inline `style="transition-delay: 100ms"` on each `.scroll-reveal`.
 *
 * Reduced motion: the CSS `@media (prefers-reduced-motion: reduce)` block
 * already neutralizes the transform/opacity, but we also short-circuit here
 * (reveal everything immediately, no observer) for safety.
 */
export function initScrollReveal(): void {
  if (typeof window === "undefined") return;

  const els = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
  if (els.length === 0) return;

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));
}
