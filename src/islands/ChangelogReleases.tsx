import { useEffect, useState } from "react";
import type { ChangelogRelease } from "@/src/lib/changelog";

/**
 * The changelog as a version rail plus collapsible release cards. Every release
 * body is server-rendered inside its card — the island only folds them, so the
 * page still reads (and indexes) with JavaScript off, and a `#v0-14-0` deep
 * link still lands on its release.
 */
export function ChangelogReleases({
  releases,
  latestLabel,
  changesLabel,
  changeLabel,
}: {
  releases: ChangelogRelease[];
  /** Badge on the newest release, e.g. "Latest". */
  latestLabel: string;
  /** Collapsed-card hint, with `{count}` for the number of entries. */
  changesLabel: string;
  /** Singular form of the same hint — v0.13.1 shipped exactly one thing. */
  changeLabel: string;
}) {
  // Version numbers are language-independent, so the open set survives a
  // language switch. The newest release starts open; the rest are one click
  // away, which is the point of the rail.
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(releases.slice(0, 1).map((r) => r.version)),
  );

  // A link straight to an older release has to arrive open, or it lands on a
  // collapsed card and looks broken.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      const target = releases.find((r) => r.id === id);
      if (target) setOpen((prev) => new Set(prev).add(target.version));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [releases]);

  const toggle = (version: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(version)) next.delete(version);
      else next.add(version);
      return next;
    });

  const jump = (release: ChangelogRelease) => {
    setOpen((prev) => new Set(prev).add(release.version));
    // Let the card expand before scrolling to it.
    requestAnimationFrame(() => {
      document.getElementById(release.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {releases.map((r, i) => (
          <button
            key={r.version}
            type="button"
            onClick={() => jump(r)}
            className={`btn-press rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              i === 0
                ? "bg-vibrant-red text-white"
                : "bg-surface-raised/50 text-on-surface-muted hover:bg-surface-raised hover:text-white"
            }`}
          >
            {r.version}
            {i === 0 && (
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wide opacity-80">
                {latestLabel}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {releases.map((r, i) => {
          const isOpen = open.has(r.version);
          return (
            <section
              key={r.version}
              id={r.id}
              className="scroll-mt-20 rounded-3xl border border-border bg-surface-raised/30 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(r.version)}
                aria-expanded={isOpen}
                aria-controls={`${r.id}-body`}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="font-headline font-bold text-white text-xl">{r.version}</span>
                  {i === 0 && (
                    <span className="rounded-full bg-vibrant-red/15 text-vibrant-red text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                      {latestLabel}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-3 shrink-0">
                  {!isOpen && r.entryCount > 0 && (
                    <span className="hidden sm:inline text-xs text-on-surface-muted">
                      {(r.entryCount === 1 ? changeLabel : changesLabel).replace(
                        "{count}",
                        String(r.entryCount),
                      )}
                    </span>
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`w-5 h-5 text-on-surface-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div id={`${r.id}-body`} hidden={!isOpen} className="px-5 pb-5">
                {r.badgesHtml && <div dangerouslySetInnerHTML={{ __html: r.badgesHtml }} />}
                <div dangerouslySetInnerHTML={{ __html: r.bodyHtml }} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
