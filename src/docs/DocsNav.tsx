import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";

export function DocsNav({ sidebarOpen, onToggleSidebar }: { sidebarOpen: boolean; onToggleSidebar: () => void }) {
  return (
    <nav className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden text-on-surface-muted hover:text-white transition-colors p-1" aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/" className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="font-headline font-bold text-white text-sm">VoxLink</span>
        </Link>
        <span className="text-on-surface-muted text-sm">/ Docs</span>
      </div>
      <Link to="/" className="text-on-surface-muted text-sm hover:text-white transition-colors">← Back to site</Link>
    </nav>
  );
}
