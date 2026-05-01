# Documentation Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed-sidebar documentation section to the VoxLink site with 8 markdown-authored pages covering the app's user guide.

**Architecture:** React Router handles `/docs/:slug` routes. Markdown files are imported via Vite's `import.meta.glob` with `?raw`, parsed with `marked`, and rendered inside a sidebar layout that reuses the existing design tokens.

**Tech Stack:** react-router-dom, marked, Vite glob imports, Tailwind CSS v4

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install react-router-dom and marked**

```bash
npm install react-router-dom marked
npm install -D @types/marked
```

- [ ] **Step 2: Verify installation**

```bash
npm run lint
```

Expected: Clean pass, no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add react-router-dom and marked dependencies"
```

---

### Task 2: Extract shared Logo component

The `Logo` component and `LOGO_URL` constant currently live in `App.tsx`. The docs nav needs the same Logo. Extract them to a shared file.

**Files:**
- Create: `src/Logo.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/Logo.tsx`**

```tsx
const LOGO_URL = "https://lh3.googleusercontent.com/aida/ADBb0ugJLbKj5ZRS0MOFKG68Bw2kbCmsH5T3-vhwohu7pL7uvWIOlHRknjufa2aLfK36N253mn7Nvi4Cnf2gdXnaCow0na8x78qyV0gc3-XQtpo-SNZ-01IlqMeoOA5ZWpWpsP1Aj9ilyHSE9sbayEC2Mk6g63tqGGYeiULfBLLLOi3RLAIU9PJtKeP4i9CQeEg04s9fYXb-Go9GHPkKqZoDH6uGLqX4X-SXzVdR3kLD8mwtt3la4bwUYhNkg-s1p25Xo7e8mx-Y7L03Gw";

const logoSizes = {
  sm: { container: "h-8 w-8 rounded-lg", img: "h-10 w-10" },
  md: { container: "h-10 w-10 lg:h-12 lg:w-12 rounded-xl", img: "h-12 w-12 lg:h-14 lg:w-14" },
  lg: { container: "h-20 w-20 lg:h-24 lg:w-24 rounded-2xl", img: "h-24 w-24 lg:h-28 lg:w-28" },
} as const;

export function Logo({ size = "md", className = "" }: { size?: keyof typeof logoSizes; className?: string }) {
  const s = logoSizes[size];
  return (
    <div className={`${s.container} bg-surface-raised overflow-hidden flex items-center justify-center ${className}`}>
      <img alt="VoxLink Logo" className={`${s.img} object-cover`} src={LOGO_URL} referrerPolicy="no-referrer" />
    </div>
  );
}
```

- [ ] **Step 2: Update `src/App.tsx`**

Remove the `LOGO_URL` constant, `logoSizes` object, and `Logo` function from App.tsx. Add this import at the top:

```tsx
import { Logo } from "./Logo";
```

- [ ] **Step 3: Verify**

```bash
npm run lint
```

Expected: Clean pass.

- [ ] **Step 4: Commit**

```bash
git add src/Logo.tsx src/App.tsx
git commit -m "refactor: extract Logo component to shared file"
```

---

### Task 3: Add routing to main.tsx

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Update `src/main.tsx` with router**

Replace the entire file contents with:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import { DocsLayout } from "./docs/DocsLayout.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<Navigate to="/docs/installation" replace />} />
        <Route path="/docs/:slug" element={<DocsLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
```

Note: This will not compile yet — `DocsLayout` doesn't exist. That's fine, we build it in the next tasks.

- [ ] **Step 2: Commit**

```bash
git add src/main.tsx
git commit -m "feat: add react-router with docs routes"
```

---

### Task 4: Create docs config

**Files:**
- Create: `src/docs/config.ts`

- [ ] **Step 1: Create `src/docs/config.ts`**

```ts
export interface DocPage {
  slug: string;
  title: string;
}

export interface DocGroup {
  label: string;
  pages: DocPage[];
}

export const docsConfig: DocGroup[] = [
  {
    label: "Getting Started",
    pages: [
      { slug: "installation", title: "Installation" },
      { slug: "first-connection", title: "First Connection" },
    ],
  },
  {
    label: "Using VoxLink",
    pages: [
      { slug: "ptt-modes", title: "PTT Modes" },
      { slug: "audio-settings", title: "Audio Settings" },
      { slug: "server-profiles", title: "Server Profiles" },
      { slug: "talkgroups-nodes", title: "Talkgroups & Nodes" },
    ],
  },
  {
    label: "Reference",
    pages: [
      { slug: "background-operation", title: "Background Operation" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
];

const allPages = docsConfig.flatMap((g) => g.pages);

export function getPageBySlug(slug: string): DocPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export function getAdjacentPages(slug: string): { prev?: DocPage; next?: DocPage } {
  const idx = allPages.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? allPages[idx - 1] : undefined,
    next: idx < allPages.length - 1 ? allPages[idx + 1] : undefined,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/docs/config.ts
git commit -m "feat: add docs config with page metadata and nav helpers"
```

---

### Task 5: Create DocsNav component

**Files:**
- Create: `src/docs/DocsNav.tsx`

- [ ] **Step 1: Create `src/docs/DocsNav.tsx`**

```tsx
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../Logo";

export function DocsNav({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <nav className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-on-surface-muted hover:text-white transition-colors p-1"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/" className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="font-headline font-bold text-white text-sm">VoxLink</span>
        </Link>
        <span className="text-on-surface-muted text-sm">/ Docs</span>
      </div>
      <Link to="/" className="text-on-surface-muted text-sm hover:text-white transition-colors">
        ← Back to site
      </Link>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/docs/DocsNav.tsx
git commit -m "feat: add DocsNav component"
```

---

### Task 6: Create DocsSidebar component

**Files:**
- Create: `src/docs/DocsSidebar.tsx`

- [ ] **Step 1: Create `src/docs/DocsSidebar.tsx`**

```tsx
import { Link } from "react-router-dom";
import { docsConfig } from "./config";

export function DocsSidebar({
  activeSlug,
  open,
  onClose,
}: {
  activeSlug: string;
  open: boolean;
  onClose: () => void;
}) {
  const sidebar = (
    <div className="w-60 h-full bg-surface border-r border-border p-4 overflow-y-auto">
      {docsConfig.map((group) => (
        <div key={group.label} className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-vibrant-orange mb-2 px-2">
            {group.label}
          </div>
          {group.pages.map((page) => {
            const isActive = page.slug === activeSlug;
            return (
              <Link
                key={page.slug}
                to={`/docs/${page.slug}`}
                onClick={onClose}
                className={`block text-sm rounded-lg px-3 py-2 mb-0.5 transition-colors ${
                  isActive
                    ? "bg-vibrant-blue text-community-bg font-semibold"
                    : "text-on-surface-muted hover:bg-surface-raised/40"
                }`}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="relative z-50 h-full">
            {sidebar}
          </aside>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/docs/DocsSidebar.tsx
git commit -m "feat: add DocsSidebar with desktop sticky and mobile drawer"
```

---

### Task 7: Create DocsContent component and prose styles

**Files:**
- Create: `src/docs/DocsContent.tsx`
- Create: `src/docs/docs.css`

- [ ] **Step 1: Create `src/docs/docs.css`**

```css
.prose {
  color: #94A3B8;
  font-size: 0.875rem;
  line-height: 1.75;
}

.prose h1 {
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.prose h2 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2.5rem 0 0.75rem 0;
}

.prose h3 {
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 2rem 0 0.5rem 0;
}

.prose p {
  margin: 0 0 1rem 0;
}

.prose a {
  color: #38BDF8;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}

.prose ul,
.prose ol {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose code {
  color: #38BDF8;
  font-family: "Space Mono", monospace;
  font-size: 0.8125rem;
  background: #0F172A;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
}

.prose pre {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 0 0 1.5rem 0;
  overflow-x: auto;
}

.prose pre code {
  background: none;
  padding: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
}

.prose blockquote {
  background: #1E293B;
  border-radius: 0.75rem;
  border-left: 3px solid #FB923C;
  padding: 1rem 1.25rem;
  margin: 0 0 1.5rem 0;
}

.prose blockquote p {
  margin: 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 1.5rem 0;
  font-size: 0.8125rem;
}

.prose th {
  color: white;
  font-weight: 600;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.prose td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.prose hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: 2rem 0;
}

.prose img {
  max-width: 100%;
  border-radius: 0.75rem;
}

.prose strong {
  color: white;
  font-weight: 600;
}
```

- [ ] **Step 2: Create `src/docs/DocsContent.tsx`**

```tsx
import { Link } from "react-router-dom";
import { getAdjacentPages, getPageBySlug } from "./config";
import "./docs.css";

export function DocsContent({ slug, html }: { slug: string; html: string }) {
  const page = getPageBySlug(slug);
  const { prev, next } = getAdjacentPages(slug);

  if (!page) {
    return (
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-[680px]">
          <h1 className="text-2xl font-headline font-bold text-white mb-4">Page not found</h1>
          <p className="text-on-surface-muted mb-6">
            The doc page "{slug}" doesn't exist.
          </p>
          <Link to="/docs/installation" className="text-vibrant-blue hover:underline">
            Go to Installation →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:py-10 lg:px-12 overflow-y-auto bg-community-bg">
      <div className="max-w-[680px]">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <div className="flex justify-between items-start mt-12 pt-6 border-t border-border">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="group">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">Previous</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">← {prev.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={`/docs/${next.slug}`} className="group text-right">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-muted mb-1">Next</div>
                <div className="text-vibrant-blue font-semibold text-sm group-hover:underline">{next.title} →</div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/docs/DocsContent.tsx src/docs/docs.css
git commit -m "feat: add DocsContent component with prose styles and prev/next nav"
```

---

### Task 8: Create DocsLayout (the shell that wires everything together)

**Files:**
- Create: `src/docs/DocsLayout.tsx`

- [ ] **Step 1: Create `src/docs/DocsLayout.tsx`**

```tsx
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { marked } from "marked";
import { DocsNav } from "./DocsNav";
import { DocsSidebar } from "./DocsSidebar";
import { DocsContent } from "./DocsContent";
import { getPageBySlug } from "./config";

const markdownFiles = import.meta.glob("/docs/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function getMarkdownHtml(slug: string): string | null {
  const key = `/docs/${slug}.md`;
  const raw = markdownFiles[key];
  if (!raw) return null;
  return marked.parse(raw) as string;
}

export function DocsLayout() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [slug]);

  if (!slug) return <Navigate to="/docs/installation" replace />;

  const html = getMarkdownHtml(slug);
  const page = getPageBySlug(slug);

  return (
    <div className="min-h-screen bg-community-bg text-on-surface font-sans">
      <DocsNav sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <DocsSidebar activeSlug={slug} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {page && html ? (
          <DocsContent slug={slug} html={html} />
        ) : (
          <DocsContent slug={slug} html="" />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build compiles**

```bash
npm run lint
```

Expected: Clean pass. (Will need at least one .md file in `/docs/` to avoid runtime issues, but type-check should pass.)

- [ ] **Step 3: Commit**

```bash
git add src/docs/DocsLayout.tsx
git commit -m "feat: add DocsLayout shell with markdown rendering"
```

---

### Task 9: Write the 8 markdown doc pages

**Files:**
- Create: `docs/installation.md`
- Create: `docs/first-connection.md`
- Create: `docs/ptt-modes.md`
- Create: `docs/audio-settings.md`
- Create: `docs/server-profiles.md`
- Create: `docs/talkgroups-nodes.md`
- Create: `docs/background-operation.md`
- Create: `docs/troubleshooting.md`

Write each page using the app feature details from the project memory. Each page should have:
- An `# H1` title matching the config title
- A one-line description paragraph
- 2-4 `## H2` sections with practical instructions
- Use `> blockquote` for tips (rendered as orange callout boxes via prose CSS)
- Use code blocks for any config values, ADB commands, etc.

- [ ] **Step 1: Create `docs/installation.md`**

```markdown
# Installation

Get VoxLink running on your Android device.

## Requirements

- Android 8.0 (Oreo) or higher
- A working internet connection (WiFi or mobile data)
- A SvxLink reflector address to connect to

## Download from Google Play

Search for "VoxLink" on the Google Play Store, or use the direct link on the VoxLink website.

## Sideloading the APK

If you prefer to install manually, download the latest APK from the releases page.

> **Tip:** You'll need to enable "Install from unknown sources" in your Android settings before sideloading.

Once downloaded, open the APK file to install. If using ADB:

`​`​`
adb install voxlink-latest.apk
`​`​`

## Permissions

VoxLink will ask for microphone access on first launch. This is required for PTT transmission. No other permissions are needed.
```

- [ ] **Step 2: Create `docs/first-connection.md`**

```markdown
# First Connection

Connect to a SvxLink reflector and make your first transmission.

## Adding a Server

1. Open VoxLink and tap the **Servers** tab in the bottom navigation
2. Tap the **+** button to add a new server
3. Enter the reflector hostname (e.g. `vps.ngen.org`)
4. Enter the talkgroup number (e.g. `999`)
5. If the reflector requires authentication, enter the auth key
6. Tap **Save**

> **Tip:** You can import server configs from JSON files shared by your club. Use the import button on the Servers screen.

## Connecting

Tap the server entry to connect. The status indicator will turn green when connected. You'll see the reflector name and talkgroup number on the PTT screen.

## Your First Transmission

1. Switch to the **PTT** tab
2. Press and hold the PTT button to transmit (default mode is Hold)
3. Speak normally — the RX/TX meters will show your audio levels
4. Release the button to stop transmitting

You should see your callsign appear in the active talker display while transmitting.
```

- [ ] **Step 3: Create `docs/ptt-modes.md`**

```markdown
# PTT Modes

VoxLink supports three push-to-talk modes. Choose the one that fits how you operate.

## Latch

Tap the PTT button once to start transmitting. Tap again to stop. Good for longer transmissions where holding the button is uncomfortable.

## Hold

Press and hold the PTT button to transmit. Release to stop. This is the default mode and the most familiar to radio operators.

## VOX (Voice-Activated)

Transmits automatically when you speak. Configure the sensitivity threshold and hang time in Settings to tune it for your environment.

- **Sensitivity**: How loud you need to speak to trigger transmission. Lower values = more sensitive.
- **Hang time**: How long VoxLink keeps transmitting after you stop speaking. Prevents cutting off between sentences.

> **Tip:** VOX works best in quiet environments. In noisy settings, use Latch or Hold to avoid accidental transmissions.

## Timeout Timer (TOT)

All three modes support a configurable timeout timer. When your transmission exceeds the set duration:

1. Your device vibrates as a warning
2. A countdown appears on screen
3. Transmission stops automatically when the timer expires

Configure the TOT duration in **Settings → Transmission → Timeout Timer**.
```

- [ ] **Step 4: Create `docs/audio-settings.md`**

```markdown
# Audio Settings

VoxLink uses the Opus codec at 16 kHz mono with 20 ms frames and 20 kbps variable bitrate for clear, low-latency audio.

## Level Metering

The PTT screen displays RX and TX audio levels in real time, measured in dB (RMS). Use these to check that your mic is picking up properly and that incoming audio is at a good level.

## Mic Gain

Adjust your microphone gain in **Settings → Audio → Mic Gain**. The range is 0–200%. Start at 100% and adjust based on feedback from other operators.

## RX Volume

Control incoming audio volume from 0–200% in **Settings → Audio → RX Volume**. This is independent of your device's system volume.

## Output Routes

Choose where you hear incoming audio:

- **Speaker** — the device loudspeaker (default)
- **Earpiece** — the phone earpiece, for private listening
- **Bluetooth** — a paired Bluetooth audio device

## Input Sources

Choose your microphone source:

- **Voice Comms** — optimized for voice calls (recommended)
- **Microphone** — standard microphone input
- **Voice Recognition** — uses the voice recognition pipeline

> **Tip:** The "Voice Comms" source applies echo cancellation and noise suppression automatically, making it the best choice for most operators.

## Audio Processing

VoxLink applies an audio limiter at -1 dB with a 10:1 ratio to prevent clipping. A polyphase FIR resampler handles sample rate adaptation between the Opus codec and your device's native audio hardware. An adaptive jitter buffer with packet loss concealment smooths out network irregularities.
```

- [ ] **Step 5: Create `docs/server-profiles.md`**

```markdown
# Server Profiles

Manage multiple reflector connections and switch between them quickly.

## Adding a Profile

1. Go to the **Servers** tab
2. Tap **+** to create a new profile
3. Enter the reflector hostname, talkgroup, and optional auth key
4. Save the profile

You can add as many profiles as you need — one per reflector or talkgroup you use.

## Quick Switching

Tap any saved profile to connect to it. VoxLink disconnects from the current server and connects to the new one automatically.

## Import / Export

Share server configs with other operators using JSON files.

**Exporting:**
1. Long-press a server profile
2. Tap **Export**
3. Share the JSON file via your preferred method

**Importing:**
1. Tap the import button on the Servers screen
2. Select a JSON file
3. The server profile is added to your list

> **Tip:** This is a great way to share your club's reflector configs with new members. Export all your profiles and send the JSON file.

## Authentication

Reflectors using HMAC-SHA1 authentication require an auth key. Enter this in the server profile settings. The key is stored locally on your device and transmitted securely during connection.
```

- [ ] **Step 6: Create `docs/talkgroups-nodes.md`**

```markdown
# Talkgroups & Nodes

Monitor who's connected and select which talkgroup you're on.

## Talkgroup Selection

Each reflector can host multiple talkgroups. Select your talkgroup when configuring a server profile, or switch talkgroups from the PTT screen after connecting.

## Connected Nodes

The **Stations** tab shows all nodes currently connected to the reflector. This updates in real time as nodes join and leave.

## Active Talker

When someone transmits, VoxLink displays:

- **Callsign** — the operator's callsign (e.g. CT2GNH-M)
- **Name** — the operator's name, if available
- **Location** — the operator's location, if available

This information appears on the PTT screen during reception.

> **Tip:** The active talker display helps you identify who you're speaking with, especially on busy reflectors with many connected nodes.
```

- [ ] **Step 7: Create `docs/background-operation.md`**

```markdown
# Background Operation

VoxLink can run in the background so you stay connected while using other apps.

## Foreground Service

When connected, VoxLink runs as an Android foreground service with a persistent notification. This keeps the app alive and lets you receive transmissions even when the screen is off or you're in another app.

## Wake Lock & WiFi Lock

VoxLink holds a wake lock and WiFi lock while connected to prevent:

- The CPU from sleeping and dropping the connection
- WiFi from disconnecting in low-power states

## Battery Optimization

Android may restrict background apps to save battery. For reliable operation:

1. Go to **Android Settings → Apps → VoxLink → Battery**
2. Select **Unrestricted** (or disable battery optimization for VoxLink)

> **Tip:** If you notice VoxLink disconnecting when the screen is off, battery optimization is almost always the cause. Exempting VoxLink from optimization fixes this.

## Network Changes

VoxLink monitors network changes (e.g., switching from WiFi to mobile data) and auto-reconnects when connectivity is restored. The connection uses TCP/UDP heartbeats at 5-second intervals with a 15-second timeout to detect disconnections quickly.
```

- [ ] **Step 8: Create `docs/troubleshooting.md`**

```markdown
# Troubleshooting

Common issues and how to resolve them.

## Can't connect to a reflector

- **Check the hostname and port** — make sure they're correct in your server profile
- **Check your internet connection** — VoxLink needs a working network connection
- **Check the auth key** — if the reflector uses authentication, verify your key is correct
- **Try a different network** — some networks or firewalls block the UDP ports used for audio

## Connection drops when screen is off

This is almost always caused by Android battery optimization. See [Background Operation](/docs/background-operation) for how to fix it.

## No audio / can't hear anything

- **Check output route** — make sure the correct output is selected in Settings → Audio
- **Check RX volume** — it may be set to 0%
- **Check device volume** — your system media volume affects VoxLink audio
- **Try a different output** — switch between Speaker, Earpiece, and Bluetooth to isolate the issue

## Others can't hear me

- **Check microphone permission** — VoxLink needs mic access to transmit
- **Check mic gain** — it may be set too low in Settings → Audio
- **Check TX meter** — the TX level meter on the PTT screen should move when you speak. If it doesn't, your mic input isn't reaching VoxLink
- **Try a different input source** — switch between Voice Comms, Microphone, and Voice Recognition

## High latency or choppy audio

- **Use WiFi instead of mobile data** — WiFi typically has lower latency
- **Move closer to your router** — weak WiFi signal increases packet loss
- **Close other apps** — apps using the network heavily can compete for bandwidth
- **Check the RX meter** — if levels are very low, the issue may be on the transmitting end

## App crashes or freezes

1. Force stop VoxLink and reopen it
2. If the issue persists, clear the app cache in Android Settings → Apps → VoxLink → Storage
3. Check for app updates — the issue may be fixed in a newer version
```

- [ ] **Step 9: Commit all markdown files**

```bash
git add docs/installation.md docs/first-connection.md docs/ptt-modes.md docs/audio-settings.md docs/server-profiles.md docs/talkgroups-nodes.md docs/background-operation.md docs/troubleshooting.md
git commit -m "feat: add 8 markdown documentation pages"
```

---

### Task 10: Update landing page links

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update the nav "Docs" link**

In `src/App.tsx`, find the nav links section and change the Docs link `href` from `"/docs"` to use a regular anchor tag (it already works since the router handles `/docs`):

```tsx
<a className="font-medium text-on-surface-muted hover:text-vibrant-blue transition-colors px-2 py-1" href="/docs">Docs</a>
```

This already exists and points to `/docs` — no change needed.

- [ ] **Step 2: Update footer "Help Center" link to point to docs**

In the footer, change `"Help Center"` to `"Docs"` and make it link to `/docs`:

Replace the footer links array:
```tsx
{["About Us", "Help Center", "Privacy", "Twitter"].map((link) => (
```

With:
```tsx
{[
  { label: "About Us", href: "#" },
  { label: "Docs", href: "/docs" },
  { label: "Privacy", href: "#" },
  { label: "Twitter", href: "#" },
].map((link) => (
  <a
    key={link.label}
    className="text-sm font-semibold text-on-surface-muted hover:text-vibrant-blue transition-colors"
    href={link.href}
  >
    {link.label}
  </a>
))}
```

- [ ] **Step 3: Verify everything compiles and runs**

```bash
npm run lint
npm run dev
```

Visit `http://localhost:3000/docs` — should redirect to `/docs/installation` and render the docs layout with sidebar and content.

Visit `http://localhost:3000` — landing page should be unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: update footer to link to docs section"
```

---

### Task 11: Add Vite SPA fallback for docs routes

Client-side routing requires the dev server and production build to serve `index.html` for all routes. Vite dev server handles this by default, but production builds need explicit configuration.

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Confirm Vite dev server handles SPA fallback**

Vite's dev server supports SPA fallback out of the box via the `appType: 'spa'` default. No change needed for dev.

- [ ] **Step 2: Ensure the glob pattern for markdown doesn't conflict**

The `import.meta.glob('/docs/*.md')` pattern uses an absolute path from the project root. Verify this works by checking that the `docs/` folder is at the project root (not inside `src/`). It is — no change needed.

- [ ] **Step 3: Test production build**

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/docs/installation` — should work. If it 404s, the hosting platform needs to be configured to serve `index.html` for all routes (standard SPA deployment).

- [ ] **Step 4: Commit (if any changes were needed)**

If no changes needed, skip this commit.
