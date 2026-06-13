import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, X, ExternalLink, ArrowUpNarrowWide, ArrowDownWideNarrow, Info } from "lucide-react";
import { FaceDissatisfied } from "@carbon/icons-react";
import { getT, type Lang } from "@/src/i18n/t";
import { radios, performanceScore, scoreParts, type Radio, type RadioStatus, type AudioQuality, type Support } from "@/src/radios";

type StatusFilter = RadioStatus | "all";
type SortKey = "featured" | "performance" | "name" | "brand" | "model";
type SortDir = "asc" | "desc";

type TFn = (key: string) => string;

const STATUS_FILTERS: StatusFilter[] = ["all", "full", "partial", "experimental", "pending"];
const SORT_KEYS: SortKey[] = ["featured", "performance", "name", "brand", "model"];

const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });

// Distinct manufacturers, for the brand filter.
const BRANDS: string[] = [...new Set(radios.map((r) => r.maker).filter((m): m is string => Boolean(m)))].sort(
  (a, b) => collator.compare(a, b),
);

// The direction each key snaps to when first selected: A→Z for text, best-first for performance.
const DEFAULT_DIR: Record<SortKey, SortDir> = {
  featured: "asc",
  performance: "desc",
  name: "asc",
  brand: "asc",
  model: "asc",
};

function sortRadios(list: Radio[], key: SortKey, dir: SortDir): Radio[] {
  if (key === "featured") {
    // "asc" keeps the curated order from radios.ts; "desc" reverses it.
    return dir === "asc" ? list : [...list].reverse();
  }
  const mul = dir === "asc" ? 1 : -1;
  const sorted = [...list];
  switch (key) {
    case "name":
      sorted.sort((a, b) => mul * collator.compare(a.name, b.name));
      break;
    case "brand":
      sorted.sort(
        (a, b) =>
          mul * (collator.compare(a.maker ?? "", b.maker ?? "") || collator.compare(a.name, b.name)),
      );
      break;
    case "model":
      sorted.sort((a, b) => mul * collator.compare(a.model ?? a.name, b.model ?? b.name));
      break;
    case "performance":
      sorted.sort((a, b) => {
        const sa = performanceScore(a);
        const sb = performanceScore(b);
        // Untested radios have no score, so they stay last in both directions.
        if (sa === null && sb === null) return collator.compare(a.name, b.name);
        if (sa === null) return 1;
        if (sb === null) return -1;
        return mul * (sa - sb); // asc: lowest first, desc: best fit first
      });
      break;
  }
  return sorted;
}

function scoreBarColor(score: number): string {
  if (score >= 75) return "bg-emerald-400";
  if (score >= 50) return "bg-amber-400";
  return "bg-rose-400";
}

function formatDate(iso: string, lang: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === "pt" ? "pt-PT" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_BADGE: Record<RadioStatus, string> = {
  full: "bg-emerald-500/15 text-emerald-300",
  partial: "bg-amber-500/15 text-amber-300",
  experimental: "bg-indigo-500/15 text-indigo-300",
  pending: "bg-slate-500/15 text-slate-300",
};

const AUDIO_BADGE: Record<AudioQuality, string> = {
  good: "bg-emerald-500/15 text-emerald-300",
  ok: "bg-amber-500/15 text-amber-300",
  poor: "bg-rose-500/15 text-rose-300",
};

function BoolCell({ value, t }: { value: Support; t: TFn }) {
  if (value === "yes")
    return (
      <span className="flex items-center text-emerald-400">
        <Check className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">{t("radios.yes")}</span>
      </span>
    );
  if (value === "no")
    return (
      <span className="flex items-center text-rose-400">
        <X className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">{t("radios.no")}</span>
      </span>
    );
  if (value === "na")
    return (
      <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-muted/70">
        {t("radios.na")}
      </span>
    );
  return (
    <span className="text-on-surface-muted">
      —<span className="sr-only">{t("radios.unknown")}</span>
    </span>
  );
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-on-surface-muted">{label}</dt>
      <dd className="flex items-center">{children}</dd>
    </div>
  );
}

function ScoreMeter({ radio, score, t }: { radio: Radio; score: number; t: TFn }) {
  const reduce = useReducedMotion();
  const parts = scoreParts(radio);
  return (
    <div className="mt-5 pt-4 border-t border-border">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="group/score relative inline-flex items-center gap-1 text-on-surface-muted">
          {t("radios.scoreLabel")}
          <button
            type="button"
            aria-label={t("radios.scoreHelp")}
            className="text-on-surface-muted/70 hover:text-on-surface focus:outline-none focus-visible:text-on-surface cursor-help"
          >
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[16rem] rounded-xl border border-border bg-surface p-3 text-left opacity-0 shadow-xl transition-opacity duration-200 group-hover/score:opacity-100 group-focus-within/score:opacity-100 z-20"
          >
            <span className="block font-semibold text-on-surface mb-2 normal-case">{t("radios.scoreHelp")}</span>
            {parts.map((p) => (
              <span key={p.key} className="flex items-center justify-between gap-6">
                <span className="text-on-surface-muted">{t(`radios.col.${p.key}`)}</span>
                {p.counted ? (
                  <span className={`tabular-nums font-semibold ${p.earned > 0 ? "text-emerald-300" : "text-on-surface-muted/60"}`}>
                    {p.earned}/{p.weight}
                  </span>
                ) : (
                  <span className="tabular-nums font-semibold text-on-surface-muted/60">{t("radios.na")}</span>
                )}
              </span>
            ))}
          </span>
        </span>
        <span className="font-semibold text-on-surface tabular-nums">{score}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full origin-left ${scoreBarColor(score)}`}
          style={{ width: `${score}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function RadioCard({
  radio,
  t,
  lang,
  index,
}: {
  radio: Radio;
  t: TFn;
  lang: string;
  index: number;
}) {
  const pending = radio.status === "pending";
  const reduce = useReducedMotion();
  const score = performanceScore(radio);
  return (
    <motion.div
      layout={reduce ? false : "position"}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -6 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-3xl border border-border bg-surface-raised/60 p-6 soft-shadow transition-[border-color,box-shadow] duration-300 hover:border-vibrant-red/40 hover:shadow-xl hover:shadow-vibrant-red/10"
    >
      {radio.image && (
        <div className="overflow-hidden rounded-2xl bg-white mb-4">
          <img
            src={radio.image}
            alt={radio.name}
            loading="lazy"
            className="w-full aspect-square object-contain p-4 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h2 className="text-xl font-headline font-bold text-white">{radio.name}</h2>
          {radio.maker &&
            (radio.makerUrl ? (
              <a
                href={radio.makerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-xs text-on-surface-muted hover:text-vibrant-red transition-colors"
              >
                {radio.maker}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                <span className="sr-only">{t("radios.makerAria")}</span>
              </a>
            ) : (
              <p className="mt-1 text-xs text-on-surface-muted">{radio.maker}</p>
            ))}
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${STATUS_BADGE[radio.status]}`}>
          {radio.status === "full" && (
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
          )}
          {t(`radios.status.${radio.status}`)}
        </span>
      </div>

      {pending ? (
        <div className="flex flex-col items-center text-center py-6 px-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-500/15 text-slate-300 mb-4">
            <FaceDissatisfied size={28} aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-on-surface mb-1">{t("radios.pendingTitle")}</h3>
          <p className="text-sm text-on-surface-muted leading-relaxed max-w-[15rem]">{t("radios.pendingDesc")}</p>
        </div>
      ) : (
        <>
          <dl className="space-y-2.5 text-sm">
            <DetailRow label={t("radios.col.ptt")}>
              <BoolCell value={radio.ptt} t={t} />
            </DetailRow>
            <DetailRow label={t("radios.col.knob")}>
              <BoolCell value={radio.knob} t={t} />
            </DetailRow>
            <DetailRow label={t("radios.col.sideKeys")}>
              <BoolCell value={radio.sideKeys} t={t} />
            </DetailRow>
            <DetailRow label={t("radios.col.audio")}>
              {radio.audio ? (
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${AUDIO_BADGE[radio.audio]}`}>
                  {t(`radios.audio.${radio.audio}`)}
                </span>
              ) : (
                <span className="text-on-surface-muted">—</span>
              )}
            </DetailRow>
            <DetailRow label={t("radios.col.android")}>
              <span className="text-on-surface">{radio.androidVersion ?? "—"}</span>
            </DetailRow>
            <DetailRow label={t("radios.col.version")}>
              <span className="text-on-surface">{radio.testedAppVersion ?? "—"}</span>
            </DetailRow>
            <DetailRow label={t("radios.col.tested")}>
              <span className="text-on-surface">{radio.testDate ? formatDate(radio.testDate, lang) : "—"}</span>
            </DetailRow>
          </dl>
          <p className="mt-4 text-sm text-on-surface-muted leading-relaxed">{t(`radios.notes.${radio.id}`)}</p>
          {score !== null && <ScoreMeter radio={radio} score={score} t={t} />}
        </>
      )}
    </motion.div>
  );
}

interface RadiosGridProps {
  lang: Lang;
}

export default function RadiosGrid({ lang }: RadiosGridProps) {
  const t = getT(lang);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [dir, setDir] = useState<SortDir>("asc");
  const reduce = useReducedMotion();

  const q = query.trim().toLowerCase();
  const matchesText = (r: Radio) => r.name.toLowerCase().includes(q);
  const matchesBrand = (r: Radio) => brandFilter === "all" || r.maker === brandFilter;

  const filtered = radios.filter(
    (r) => matchesText(r) && matchesBrand(r) && (statusFilter === "all" || r.status === statusFilter),
  );
  const visible = sortRadios(filtered, sort, dir);

  // Status counts respect the active text + brand filters, so each chip shows what it would reveal.
  const scoped = radios.filter((r) => matchesText(r) && matchesBrand(r));
  const statusCount = (s: StatusFilter) => (s === "all" ? scoped.length : scoped.filter((r) => r.status === s).length);

  const filtersActive = query !== "" || statusFilter !== "all" || brandFilter !== "all";
  const clearFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setBrandFilter("all");
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("radios.search.placeholder")}
            aria-label={t("radios.search.placeholder")}
            className="w-full sm:max-w-xs px-4 py-2.5 rounded-2xl bg-surface-raised/60 border border-border text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:border-vibrant-red transition-colors"
          />
          {BRANDS.length > 1 && (
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              aria-label={t("radios.brand.aria")}
              className="text-sm font-semibold rounded-2xl bg-surface-raised/60 border border-border text-on-surface px-3 py-2.5 cursor-pointer focus:outline-none focus:border-vibrant-red transition-colors"
            >
              <option value="all" className="bg-surface-raised text-on-surface">
                {t("radios.brand.all")}
              </option>
              {BRANDS.map((b) => (
                <option key={b} value={b} className="bg-surface-raised text-on-surface">
                  {b}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-center gap-2 sm:ml-auto">
            <label htmlFor="radio-sort" className="text-sm text-on-surface-muted whitespace-nowrap">
              {t("radios.sort.label")}
            </label>
            <select
              id="radio-sort"
              value={sort}
              onChange={(e) => {
                const key = e.target.value as SortKey;
                setSort(key);
                setDir(DEFAULT_DIR[key]);
              }}
              className="text-sm font-semibold rounded-2xl bg-surface-raised/60 border border-border text-on-surface px-3 py-2.5 cursor-pointer focus:outline-none focus:border-vibrant-red transition-colors"
            >
              {SORT_KEYS.map((k) => (
                <option key={k} value={k} className="bg-surface-raised text-on-surface">
                  {t(`radios.sort.${k}`)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
              aria-label={t(dir === "asc" ? "radios.sort.ascending" : "radios.sort.descending")}
              title={t(dir === "asc" ? "radios.sort.ascending" : "radios.sort.descending")}
              className="shrink-0 rounded-2xl bg-surface-raised/60 border border-border text-on-surface-muted hover:text-white p-2.5 cursor-pointer focus:outline-none focus:border-vibrant-red transition-colors"
            >
              {dir === "asc" ? (
                <ArrowUpNarrowWide className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ArrowDownWideNarrow className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => {
            const active = statusFilter === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                aria-pressed={active}
                className={`relative text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors duration-300 ${
                  active
                    ? "border-vibrant-red text-white"
                    : "border-border text-on-surface-muted hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="radioFilterActive"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="absolute inset-0 rounded-full bg-vibrant-red"
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {s === "all" ? t("radios.filter.all") : t(`radios.status.${s}`)}
                  <span className={`tabular-nums text-xs ${active ? "text-white/70" : "text-on-surface-muted/60"}`}>
                    {statusCount(s)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-on-surface-muted mb-5 tabular-nums">
        {filtersActive
          ? `${visible.length} ${t("radios.countOf")} ${radios.length} ${t("radios.unit")}`
          : `${radios.length} ${t("radios.unit")}`}
      </p>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-surface-raised/40 px-6 py-10">
          <p className="text-on-surface-muted">{t("radios.empty")}</p>
          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm font-semibold text-vibrant-red hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              {t("radios.clearFilters")}
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((r, i) => (
            <RadioCard key={r.id} radio={r} t={t} lang={lang} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
