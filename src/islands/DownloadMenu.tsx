import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Cpu, Download, Monitor, Smartphone, Terminal } from "lucide-react";
import { getT, type Lang } from "@/src/i18n/t";
import { type Download as DownloadTarget } from "@/src/downloads";

const ICONS: Record<DownloadTarget["key"], LucideIcon> = {
  playStore: Smartphone,
  windows: Monitor,
  linuxAppImage: Terminal,
  apk32: Cpu,
};

type DownloadMenuProps = {
  lang: Lang;
  /** Resolved at build time against the latest release (see lib/release.ts). */
  downloads: DownloadTarget[];
  /** Classes for the trigger button so it can match each call site's CTA style. */
  triggerClassName: string;
  /** Wrapper classes — used to inherit sizing (e.g. `w-full sm:w-auto`). */
  className?: string;
  /** Which edge the menu aligns to. */
  align?: "left" | "right";
};

export default function DownloadMenu({
  lang,
  downloads,
  triggerClassName,
  className,
  align = "left",
}: DownloadMenuProps) {
  const t = getT(lang);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  /** Which item to focus once the menu mounts, or null for a mouse open. */
  const focusOnOpen = useRef<"first" | "last" | null>(null);

  const MENU_WIDTH = 256; // matches w-64

  const menuItems = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("[role='menuitem']") ?? []);

  /** Close and hand focus back to the trigger — the expected exit for Escape. */
  function closeAndRestore() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function openWithFocus(focus: "first" | "last" | null) {
    focusOnOpen.current = focus;
    setOpen(true);
  }

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
      if (e.key === "Escape") {
        e.preventDefault();
        closeAndRestore();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // The menu is portaled to <body>, so it is nowhere near the trigger in the
  // tab order. Moving focus into it on a keyboard open is what makes it
  // reachable at all; Tab out then closes it and resumes from the trigger.
  useEffect(() => {
    if (!open || !focusOnOpen.current) return;
    const items = menuItems();
    const target = focusOnOpen.current === "last" ? items[items.length - 1] : items[0];
    focusOnOpen.current = null;
    target?.focus();
  }, [open]);

  // A menu left open behind the user is worse than one that closes: its
  // document-level Escape handler would otherwise yank focus back to the
  // trigger from wherever they had tabbed on to.
  function onFocusOut(e: React.FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget as Node | null;
    if (!next) return; // Focus left the window entirely; leave the menu alone.
    if (!triggerRef.current?.contains(next) && !menuRef.current?.contains(next)) {
      setOpen(false);
    }
  }

  /** Roving arrow-key movement between menu items, per the ARIA menu pattern. */
  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = menuItems();
    if (!items.length) return;
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    } else if (e.key === " ") {
      // Native anchors ignore Space; the ARIA menu pattern expects it to
      // activate the item just like Enter does.
      e.preventDefault();
      (document.activeElement as HTMLAnchorElement | null)?.click();
    } else if (e.key === "Tab") {
      // Let Tab do its normal thing, but from the trigger — otherwise focus
      // would land wherever the portal sits at the end of <body>.
      closeAndRestore();
    }
  }

  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const edge = e.key === "ArrowDown" ? "first" : "last";
    if (!open) {
      openWithFocus(edge);
      return;
    }
    const items = menuItems();
    (edge === "first" ? items[0] : items[items.length - 1])?.focus();
  }

  return (
    <div className={className} onBlur={onFocusOut}>
      <button
        ref={triggerRef}
        id={`${menuId}-trigger`}
        type="button"
        // Enter and Space on a button arrive as a click, not a keydown, so this
        // — not onKeyDown — is the path most keyboard users take. `detail === 0`
        // marks a click the browser synthesised from a key press, which is what
        // distinguishes it from a real pointer click.
        onClick={(e) => {
          if (open) setOpen(false);
          else openWithFocus(e.detail === 0 ? "first" : null);
        }}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
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
            id={menuId}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            onKeyDown={onMenuKeyDown}
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
                  {external && <span className="sr-only"> ({t("a11y.newTab")})</span>}
                </a>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
