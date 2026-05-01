import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { marked } from "marked";
import { DocsNav } from "./DocsNav";
import { DocsSidebar } from "./DocsSidebar";
import { DocsContent } from "./DocsContent";
import { getPageBySlug } from "./config";
import { useLanguage } from "../i18n/LanguageContext";

const markdownFiles = import.meta.glob("/docs/**/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

function getMarkdownHtml(slug: string, lang: string): string | null {
  if (lang !== "en") {
    const langKey = `/docs/${lang}/${slug}.md`;
    const langRaw = markdownFiles[langKey];
    if (langRaw) return marked.parse(langRaw) as string;
  }
  const key = `/docs/${slug}.md`;
  const raw = markdownFiles[key];
  if (!raw) return null;
  return marked.parse(raw) as string;
}

export function DocsLayout() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => { setSidebarOpen(false); }, [slug]);

  if (!slug) return <Navigate to="/docs/installation" replace />;

  const html = getMarkdownHtml(slug, lang);
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
