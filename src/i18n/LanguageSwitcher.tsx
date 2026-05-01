import { Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "pt" : "en")}
      className="flex items-center gap-1.5 text-on-surface-muted hover:text-vibrant-red transition-colors px-2 py-1 rounded-lg"
      aria-label={lang === "en" ? "Mudar para Português" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-bold uppercase tracking-wide">{lang === "en" ? "EN" : "PT"}</span>
    </button>
  );
}
