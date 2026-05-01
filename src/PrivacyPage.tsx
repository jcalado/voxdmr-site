import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLanguage } from "./i18n/LanguageContext";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans">
      {/* Navigation */}
      <nav className="w-full top-0 sticky z-50 bg-slate-950/80 backdrop-blur-xl h-24 flex items-center border-b border-border">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <Link to="/" className="flex items-center gap-4 lg:gap-5">
            <Logo size="md" className="shadow-lg shadow-black/40" />
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-headline">VoxDMR</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-2 tracking-tight">{t("privacy.title")}</h1>
        <p className="text-on-surface-muted mb-12 text-sm">{t("privacy.lastUpdated")}</p>

        <div className="space-y-10 text-on-surface-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.overview.title")}</h2>
            <p>{t("privacy.overview.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.dataCollection.title")}</h2>
            <p>{t("privacy.dataCollection.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.dataStored.title")}</h2>
            <p className="mb-4">{t("privacy.dataStored.intro")}</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">{t("privacy.dataStored.serverProfiles")}</strong>: {t("privacy.dataStored.serverProfilesDesc")}</li>
              <li><strong className="text-white">{t("privacy.dataStored.appPreferences")}</strong>: {t("privacy.dataStored.appPreferencesDesc")}</li>
            </ul>
            <p className="mt-4">{t("privacy.dataStored.outro")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.microphone.title")}</h2>
            <p>{t("privacy.microphone.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.network.title")}</h2>
            <p className="mb-4">{t("privacy.network.intro")}</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">{t("privacy.network.tcp")}</strong>: {t("privacy.network.tcpDesc")}</li>
              <li><strong className="text-white">{t("privacy.network.udp")}</strong>: {t("privacy.network.udpDesc")}</li>
            </ul>
            <p className="mt-4">{t("privacy.network.outro")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.thirdParty.title")}</h2>
            <p>{t("privacy.thirdParty.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.reflectorServers.title")}</h2>
            <p>{t("privacy.reflectorServers.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.children.title")}</h2>
            <p>{t("privacy.children.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.changes.title")}</h2>
            <p>{t("privacy.changes.text")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold text-white mb-4">{t("privacy.contact.title")}</h2>
            <p>{t("privacy.contact.text")} <a href="mailto:voxdmr@jcalado.com" className="text-vibrant-blue hover:underline">voxdmr@jcalado.com</a></p>
          </section>
        </div>
      </main>
    </div>
  );
}
