/**
 * The download targets, shared by the `DownloadMenu` island, the mobile nav and
 * the footer so they can't drift apart.
 *
 * These are the **fallback** URLs. `src/lib/release.ts` resolves them against
 * the real assets of the latest GitHub release at build time and is what the
 * pages actually render; this list is what ships if the API is unreachable.
 * Keep it working on its own: the desktop entries go through GitHub's
 * `/releases/latest/download/<asset>` redirect so they survive a version bump,
 * and the APK — whose filename is version-stamped and so cannot be guessed —
 * points at the releases page.
 *
 * Everything here is serialized into the DownloadMenu island's props, so it
 * must stay JSON-safe (the asset-matching patterns live in release.ts).
 */
const RELEASES = "https://github.com/jcalado/voxdmr-site/releases";

export interface Download {
  /** Stable id; also picks the icon in `DownloadMenu`. */
  key: "playStore" | "windows" | "linuxAppImage" | "apk32";
  /** i18n key for the visible label, e.g. "download.windows". */
  labelKey: string;
  href: string;
  /** Open in a new tab (store / releases pages). Direct asset links download in place. */
  external?: boolean;
}

export const downloads: Download[] = [
  {
    key: "playStore",
    labelKey: "download.playStore",
    href: "https://play.google.com/store/apps/details?id=com.jcalado.voxdmr",
    external: true,
  },
  {
    key: "windows",
    labelKey: "download.windows",
    href: `${RELEASES}/latest/download/VoxDMR-windows-x86_64.exe`,
  },
  {
    key: "linuxAppImage",
    labelKey: "download.linuxAppImage",
    href: `${RELEASES}/latest/download/VoxDMR-linux-x86_64.AppImage`,
  },
  {
    key: "apk32",
    labelKey: "download.apk32",
    href: `${RELEASES}/latest`,
    external: true,
  },
];
