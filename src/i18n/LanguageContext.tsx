import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import en from "./en.json";
import pt from "./pt.json";

type Lang = "en" | "pt";

const translations: Record<Lang, Record<string, string>> = { en, pt };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLanguage(): Lang {
  const stored = localStorage.getItem("voxdmr-lang");
  if (stored === "en" || stored === "pt") return stored;
  if (navigator.language.startsWith("pt")) return "pt";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("voxdmr-lang", l);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext value={{ lang, setLang, t }}>
      {children}
    </LanguageContext>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
