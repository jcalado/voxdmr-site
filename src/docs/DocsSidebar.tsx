import { Link } from "react-router-dom";
import { docsConfig } from "./config";

export function DocsSidebar({ activeSlug, open, onClose }: { activeSlug: string; open: boolean; onClose: () => void }) {
  const sidebar = (
    <div className="docs-sidebar w-60 h-full bg-surface-raised/30 backdrop-blur-xl border-r border-border p-4 overflow-y-auto">
      {docsConfig.map((group) => (
        <div key={group.label} className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-vibrant-orange mb-2 px-2">{group.label}</div>
          {group.pages.map((page) => {
            const isActive = page.slug === activeSlug;
            return (
              <Link key={page.slug} to={`/docs/${page.slug}`} onClick={onClose} className={`block text-sm rounded-lg px-3 py-2 mb-0.5 transition-colors ${isActive ? "bg-vibrant-blue text-community-bg font-semibold" : "text-on-surface-muted hover:bg-surface-raised/40"}`}>
                {page.title}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 top-14 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="relative z-50 h-full">{sidebar}</aside>
        </div>
      )}
    </>
  );
}
