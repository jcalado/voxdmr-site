/**
 * The download targets, shared by the `DownloadMenu` island and the mobile nav
 * so the two can't drift apart.
 *
 * The desktop assets resolve through GitHub's `/releases/latest/download/<asset>`
 * redirect, so these URLs never need a version bump. The APKs have
 * version-stamped filenames, so the 32-bit build links to the releases page
 * rather than a direct asset.
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
