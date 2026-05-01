import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { getAdjacentPages, getPageBySlug } from "./config";
import { useLanguage } from "../i18n/LanguageContext";
import "./docs.css";

const pageTitleKeys: Record<string, string> = {
  "installation": "docs.page.installation",
  "first-connection": "docs.page.firstConnection",
  "ptt-modes": "docs.page.pttModes",
  "audio-settings": "docs.page.audioSettings",
  "talkgroups": "docs.page.talkgroups",
  "troubleshooting": "docs.page.troubleshooting",
};

function startViewTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="doc-modal-backdrop" onClick={onClose}>
      <img src={src} alt={alt} className="doc-modal-img" style={{ viewTransitionName: "doc-image" }} />
    </div>
  );
}

export function DocsContent({ slug, html }: { slug: string; html: string }) {
  const { t } = useLanguage();
  const page = getPageBySlug(slug);
  const { prev, next } = getAdjacentPages(slug);
  const [modalImg, setModalImg] = useState<{ src: string; alt: string } | null>(null);
  const activeImgRef = useRef<HTMLImageElement | null>(null);

  const openModal = useCallback((img: HTMLImageElement) => {
    // Tag the source image for the view transition
    img.style.viewTransitionName = "doc-image";
    activeImgRef.current = img;
    startViewTransition(() => {
      img.style.viewTransitionName = "";
      setModalImg({ src: img.src, alt: img.alt });
    });
  }, []);

  const closeModal = useCallback(() => {
    const img = activeImgRef.current;
    startViewTransition(() => {
      setModalImg(null);
      if (img) {
        img.style.viewTransitionName = "doc-image";
        requestAnimationFrame(() => { img.style.viewTransitionName = ""; });
      }
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      openModal(target as HTMLImageElement);
    }
  }, [openModal]);

  if (!page) {
    return (
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-[680px]">
          <h1 className="text-2xl font-headline font-bold text-white mb-4">{t("docs.pageNotFound")}</h1>
          <p className="text-on-surface-muted mb-6">{t("docs.pageNotFoundText").replace("{slug}", slug)}</p>
          <Link to="/docs/installation" className="text-vibrant-blue hover:underline">{t("docs.goToInstallation")}</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:py-10 lg:px-12 overflow-y-auto bg-community-bg">
      <div className="max-w-[680px]">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} onClick={handleClick} />
        {(prev || next) && (
          <div className="flex justify-between items-start mt-12 pt-6 border-t border-border">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="group">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">{t("docs.previous")}</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">← {t(pageTitleKeys[prev.slug] ?? prev.title)}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/docs/${next.slug}`} className="group text-right">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">{t("docs.next")}</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">{t(pageTitleKeys[next.slug] ?? next.title)} →</div>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
      {modalImg && <ImageModal src={modalImg.src} alt={modalImg.alt} onClose={closeModal} />}
    </main>
  );
}
