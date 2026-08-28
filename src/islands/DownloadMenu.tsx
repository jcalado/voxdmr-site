import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Cpu, Download, Monitor, Smartphone, Terminal } from "lucide-react";
import { getT, type Lang } from "@/src/i18n/t";
import { downloads, type Download as DownloadTarget } from "@/src/downloads";

const ICONS: Record<DownloadTarget["key"], LucideIcon> = {
  playStore: Smartphone,
  windows: Monitor,
  linuxAppImage: Terminal,
  apk32: Cpu,
};

type DownloadMenuProps = {
  lang: Lang;
  /** Classes for the trigger button so it can match each call site's CTA style. */
  triggerClassName: string;
  /** Wrapper classes — used to inherit sizing (e.g. `w-full sm:w-auto`). */
  className?: string;
  /** Which edge the menu aligns to. */
  align?: "left" | "right";
};

export default function DownloadMenu({
  lang,
  triggerClassName,
  className,
  align = "left",
}: DownloadMenuProps) {
  const t = getT(lang);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const MENU_WIDTH = 256; // matches w-64

  // The menu is portaled to <body> so no `overflow-hidden` ancestor (e.g. the
  // hero header) can clip it. Position it as a fixed box anchored to the
  // trigger, re-measuring on scroll/resize while open.
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const rawLeft = align === "right" ? r.right - MENU_WIDTH : r.left;
      const left = Math.max(8, Math.min(rawLeft, window.innerWidth - MENU_WIDTH - 8));
      setCoords({ top: r.bottom + 8, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={triggerClassName}
      >
        <Download className="w-5 h-5" />
        {t("download.label")}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ top: coords.top, left: coords.left, width: MENU_WIDTH }}
            className="fixed z-[60] origin-top rounded-2xl border border-border bg-slate-900/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            {downloads.map(({ key, labelKey, href, external }) => {
              const Icon = ICONS[key];
              return (
                <a
                  key={key}
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="w-4 h-4 shrink-0 text-vibrant-blue" />
                  {t(labelKey)}
                </a>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
