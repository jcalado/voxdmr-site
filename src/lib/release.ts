import { downloads, type Download } from "../downloads";

/**
 * Resolves the download targets against the actual assets of the latest GitHub
 * release, at build time.
 *
 * The alternative — calling the API from the browser — is a trap for a public
 * site: unauthenticated GitHub is 60 requests/hour *per IP*, so everyone behind
 * one corporate NAT or mobile carrier shares that budget, and there is no way
 * to raise it without shipping a token. Resolving here means one request per
 * build instead of one per visitor, the URLs land in static HTML, and the
 * download links keep working with JavaScript off.
 *
 * The trade-off is that a new release does not reach the site until the site
 * rebuilds — wire a repository_dispatch from the release workflow if that gap
 * matters.
 */

const REPO = "jcalado/voxdmr-site";
const API = `https://api.github.com/repos/${REPO}/releases/latest`;

/**
 * How to find each target among the release assets. Kept out of the `Download`
 * type on purpose: those objects are serialized into the DownloadMenu island's
 * props, and a RegExp does not survive JSON.
 *
 * Patterns are specific enough not to collide — the release carries both a bare
 * `VoxDMR-linux-x86_64` and a `.AppImage`, and three APKs of which only
 * armeabi-v7a is the 32-bit build.
 */
const ASSET_PATTERNS: Partial<Record<Download["key"], RegExp>> = {
  windows: /^VoxDMR-windows-.*\.exe$/i,
  linuxAppImage: /\.AppImage$/i,
  apk32: /armeabi-v7a\.apk$/i,
};

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

/** One fetch per process, not per page — Astro renders many pages per build. */
let cached: Promise<Download[]> | null = null;

async function fetchAssets(): Promise<ReleaseAsset[] | null> {
  try {
    const res = await fetch(API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "voxdmr-site-build",
      },
    });
    if (!res.ok) {
      console.warn(`[downloads] GitHub API returned ${res.status}; using fallback URLs.`);
      return null;
    }
    const release = (await res.json()) as { tag_name?: string; assets?: ReleaseAsset[] };
    console.log(`[downloads] resolved against release ${release.tag_name ?? "?"}`);
    return release.assets ?? [];
  } catch (err) {
    // An unreachable network must not break the build — a stale-but-valid URL
    // beats no site at all.
    console.warn(`[downloads] could not reach the GitHub API (${(err as Error).message}); using fallback URLs.`);
    return null;
  }
}

async function resolve(): Promise<Download[]> {
  const assets = await fetchAssets();
  if (!assets) return downloads;

  const missing: string[] = [];
  const resolved = downloads.map((d) => {
    const pattern = ASSET_PATTERNS[d.key];
    if (!pattern) return d; // Play Store isn't a GitHub asset.

    const match = assets.find((a) => pattern.test(a.name));
    if (!match) {
      missing.push(`${d.key} (no asset matching ${pattern})`);
      return d;
    }
    // A resolved asset is a direct file link, so it downloads in place rather
    // than opening a tab — this is what turns the version-stamped APK from a
    // "go and find it" page link into an actual download.
    return { ...d, href: match.browser_download_url, external: false };
  });

  if (missing.length) {
    const detail = missing.join(", ");
    const hint =
      `[downloads] the latest release has no asset for: ${detail}. ` +
      `Assets present: ${assets.map((a) => a.name).join(", ")}`;
    // The API answered, so this is real drift — an asset was renamed or
    // dropped — not a transient network problem. Fail the production build
    // rather than shipping links that 404.
    if (import.meta.env.PROD) throw new Error(hint);
    console.warn(hint);
  }

  return resolved;
}

export function resolveDownloads(): Promise<Download[]> {
  cached ??= resolve();
  return cached;
}
