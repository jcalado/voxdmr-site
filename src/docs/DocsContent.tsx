import { Link } from "react-router-dom";
import { getAdjacentPages, getPageBySlug } from "./config";
import "./docs.css";

export function DocsContent({ slug, html }: { slug: string; html: string }) {
  const page = getPageBySlug(slug);
  const { prev, next } = getAdjacentPages(slug);

  if (!page) {
    return (
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-[680px]">
          <h1 className="text-2xl font-headline font-bold text-white mb-4">Page not found</h1>
          <p className="text-on-surface-muted mb-6">The doc page "{slug}" doesn't exist.</p>
          <Link to="/docs/installation" className="text-vibrant-blue hover:underline">Go to Installation →</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:py-10 lg:px-12 overflow-y-auto bg-community-bg">
      <div className="max-w-[680px]">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        {(prev || next) && (
          <div className="flex justify-between items-start mt-12 pt-6 border-t border-border">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="group">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">Previous</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">← {prev.title}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/docs/${next.slug}`} className="group text-right">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">Next</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">{next.title} →</div>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </main>
  );
}
