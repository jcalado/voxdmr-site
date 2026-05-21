import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { detectDefaultPlatform, storePlatform, type Platform } from "./platform";

interface PlatformContextValue {
  platform: Platform;
  setPlatform: (p: Platform) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatformState] = useState<Platform>(() => detectDefaultPlatform());

  useEffect(() => {
    storePlatform(platform);
  }, [platform]);

  return (
    <PlatformContext.Provider value={{ platform, setPlatform: setPlatformState }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformContextValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used inside <PlatformProvider>");
  return ctx;
}
