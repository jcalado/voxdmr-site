# Changelog

Release notes for VoxDMR. Each release page on GitHub has the full commit list and the signed binaries; this is the human summary.

## v0.12.0

::platforms[desktop mobile]

_Released June 2026. Desktop (now incl. macOS) + Android._

Two headline changes: VoxDMR now rides out connection drops on its own, and macOS gets its first official build.

- **Auto-reconnect.** When the link drops unexpectedly — a timeout, a server-side error, or a network change (Wi-Fi ↔ cellular) — VoxDMR reconnects on its own with exponential backoff (~2 s growing to a ~60 s cap, jittered, unlimited retries) and re-subscribes to your last talkgroup, so you land back where you were. It stops only on a deliberate disconnect or an authentication failure. On by default; toggle it in **Settings → Connection** on desktop or **Settings** on Android. Shared by both frontends. See [Auto-reconnect](./auto-reconnect).
- **macOS desktop build.** macOS is now a release target — a native Apple Silicon (arm64) `.app` shipped in a `.dmg`, with an in-app microphone-permission prompt on first launch and smooth CoreAudio receive playback. This clears the "macOS isn't a release target yet" limitation noted back in v0.7.0. Intel Macs aren't built yet.

`config.toml` (desktop) and the Android settings gain an `auto_reconnect` flag, defaulting to on; older configs without it pick up that default. No other config, paths, or protocol semantics changed.

## v0.10.0

::platforms[desktop mobile]

_Released May 2026. Desktop + Android._

The headline change: VoxDMR is no longer BrandMeister-only, and no longer single-server. You can configure as many profiles as you want, each pinned to its own network and credentials, and switch between them with a tap.

- **Homebrew (MMDVM_HBP) protocol** alongside the existing Rewind protocol. That brings **TGIF Network, FreeDMR, ADN.systems**, and any other MMDVM-based DMR network into VoxDMR. The TX/RX path is the same — Homebrew traffic encodes audio with the same AMBE+2 vocoder and shows up in the same call card.
- **Curated Homebrew server list.** When you pick the **Others** protocol, the server picker offers TGIF Network, FreeDMR United Kingdom, and ADN Portugal (2681) out of the box, plus a *Custom server…* option for anything not listed. The list ships in the binary; PR additions on GitHub.
- **Hash format toggle** for Custom Homebrew servers — **Raw** (the HBlink/MMDVMHost convention used by every major network) or **Hex ASCII**, for the rare network that wants the old format. Curated entries default to Raw.
- **Server Profiles.** Settings → Connection grew a **PROFILES** card. Each profile bundles a label, DMR ID, callsign, protocol, server, password, and its own talkgroup favorites + aliases. Switching profiles disconnects, swaps the whole config, and reconnects.
- **Per-profile talkgroup aliases.** Right-click a TG (or long-press on Android) to give it a custom name that overrides the database. The alias is scoped to the active profile — your BrandMeister and TGIF profiles can label `91` differently. Falls back to the official name when no alias is set.
- **Sectioned TG picker.** The picker on the main window now groups results into **DMR ID** (when you type a numeric ID), **Favourites**, and **Results**. Headers appear only when they have rows. The DMR ID section exposes both *Use as talkgroup* and *Use as private call* affordances so custom IDs become first-class.
- **Android app.** The whole protocol/profile stack ships in the Android client too — same Rust core, Material 3 Flutter UI, bottom-sheet server pickers, long-press to rename. Available now on [Google Play](https://play.google.com/store/apps/details?id=com.jcalado.voxdmr).
- **Localisation.** Settings, the setup wizard, modals, toasts, and main-view labels are extracted into a string catalogue. English and Portuguese (Portugal) are available now; the language picker lives in Settings → Interface on desktop and Settings → About on Android.

Config migration: existing `config.toml` files get the active connection promoted to a single profile labelled "Default" with the Rewind protocol — your DMR ID, password, master, favorites, and aliases are preserved untouched.

## v0.9.0

::platforms[desktop]

_Released May 2026._

Adds **in-app auto-update**. VoxDMR now checks for new releases on launch and on demand, and can install them without leaving the app — no separate download trip, no installer to find.

- **Prompt on launch.** When a newer build is published, VoxDMR opens a modal with the version, a *What's new* link, and three choices: **Update now**, **Skip this version** (silenced forever), or **Remind me later** (24-hour cooldown).
- **Manual check.** Settings → About has a **Check for updates** button. The result — *Checking…*, *You're on the latest*, *Update available*, or an error — appears inline below the button so you don't have to glance away to read it.
- **Verified, atomic install.** The binary is downloaded with progress + cancel, SHA-256 verified against the release's `SHA256SUMS` file, and atomically swapped into place — Windows-safe, even with the `.exe` running. A mismatched checksum aborts and never overwrites the existing build.
- **Clear post-install state.** When the install finishes you get a one-click **Restart now**, or you can keep working and pick up the new build on next launch. If you dismissed the modal mid-flow, the footer status line confirms the install in green so the work isn't silent.
- **Footer-as-toast.** Transient update messages share the right-hand status slot in the footer for ~5 seconds instead of pushing the rest of the UI down.

Stable channel only — pre-releases are excluded. The check hits a fixed public repo (`jcalado/voxdmr-site`); no telemetry, no analytics, no registration. `config.toml` gains an `[updates]` section that records skipped versions and the *Remind me later* timestamp; older configs without it pick up the documented defaults.

## v0.8.0

::platforms[desktop]

_Released May 2026._

Adds a **Time-Out Timer (TOT)** so a stuck PTT or a long-winded transmission can't hold a talkgroup indefinitely — standard radio behavior, finally available client-side.

- **Four modes:** Off, Warn only, Warn then cutoff (default), Hard cutoff. Configurable in Settings → Interface.
- **Visual + audible warning.** The TX timer under the PTT button counts down (gray → amber → red); a short beep plays through your local audio output device at the warning threshold and again on cutoff. Sidetone never goes to the network.
- **Sensible defaults.** 180 s duration, 15 s warning lead, both warning surfaces on. Duration capped at 190 s — anything higher would be silently dropped by BrandMeister's own forwarding cutoff.
- **Auto-release on cutoff.** Reaching the duration triggers a clean PTT release for you; press fresh to keep talking.

Adjacent UX polish:

- The top status card now flips to **Transmitting → TG …** in red while you're keyed up, instead of staying on **Idle**.
- The settings window opens 150 px taller and the right-hand panel scrolls when content overflows, so growing tabs (Interface in particular) stay usable on smaller screens.

`config.toml` gains a new `[tot]` section; older configs without it pick up the documented defaults. No env vars, paths, or protocol semantics changed.

## v0.7.0 (first public release)

::platforms[desktop]

_Released April 2026. Linux x86_64 + Windows x86_64._

The first build of VoxDMR distributed as a downloadable binary. Everything before this was internal and not announced.

What ships:

- **BrandMeister DMR client** with full RX and TX over the Rewind protocol. Authenticate with your DMR ID and a hotspot security password, subscribe to talkgroups, transmit and receive AMBE+2 voice.
- **Runtime firmware loading.** The MD-380 firmware needed by the AMBE+2 vocoder is fetched from third-party sources on first launch (or supplied manually for offline machines). The binary itself contains zero firmware bytes, which is what makes shipping it possible. SHA-256 verified before being accepted.
- **Live talkgroup activity indicator.** Favorites show a colored dot driven by BrandMeister's last-heard WebSocket feed: green = active, amber = recent traffic with the speaker's callsign, gray = idle. 30-second TTL.
- **Configurable PTT.** Push-to-talk or toggle modes. Spacebar by default; rebind to almost any single key.
- **Audio meters.** 24-segment LED-style TX and RX meters with peak-hold, color zones (green / yellow / red), and a CLIP latch indicator.
- **Talkgroup picker.** Search the bundled BrandMeister database by name or ID, save favorites, drag-reorder, mark private-call destinations. Custom IDs accepted via Enter.
- **Live master directory.** The connection settings pull the current list of BrandMeister masters at launch, with a baked-in fallback if the API is unreachable.
- **Cross-platform.** Native Linux (ALSA / PipeWire / PulseAudio via cpal) and Windows (WASAPI). Single binary per platform; no installer, no system services.

Known limitations:

- macOS isn't a release target yet.
- The Windows binary isn't code-signed yet. SmartScreen will prompt on first launch. Click **More info** → **Run anyway**.
- HTTPS downloads (firmware fetch, master directory) don't honour system proxy settings. Use the manual-files path or run from an unproxied network.

See the [release page](https://github.com/jcalado/voxdmr-site/releases/tag/v0.7.0) for binaries and SHA-256 sums, and the [installation guide](./installation) to get going.
