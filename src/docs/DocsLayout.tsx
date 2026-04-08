import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { marked } from "marked";
import { DocsNav } from "./DocsNav";
import { DocsSidebar } from "./DocsSidebar";
import { DocsContent } from "./DocsContent";
import { getPageBySlug } from "./config";

const markdownFiles = import.meta.glob("/docs/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

function getMarkdownHtml(slug: string): string | null {
  const key = `/docs/${slug}.md`;
  const raw = markdownFiles[key];
  if (!raw) return null;
  return marked.parse(raw) as string;
}

export function DocsLayout() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setSidebarOpen(false); }, [slug]);

  if (!slug) return <Navigate to="/docs/installation" replace />;

  const html = getMarkdownHtml(slug);
  const page = getPageBySlug(slug);

  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans">
      <DocsNav sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <DocsSidebar activeSlug={slug} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {page && html ? <DocsContent slug={slug} html={html} /> : <DocsContent slug={slug} html="" />}
      </div>
    </div>
  );
}
