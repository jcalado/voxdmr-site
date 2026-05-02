# Changelog

Release notes for VoxDMR. Each release page on GitHub has the full commit list and the signed binaries; this is the human summary.

## v0.9.0

_Released May 2026._

Adds **in-app auto-update**. VoxDMR now checks for new releases on launch and on demand, and can install them without leaving the app — no separate download trip, no installer to find.

- **Prompt on launch.** When a newer build is published, VoxDMR opens a modal with the version, a *What's new* link, and three choices: **Update now**, **Skip this version** (silenced forever), or **Remind me later** (24-hour cooldown).
- **Manual check.** Settings → About has a **Check for updates** button. The result — *Checking…*, *You're on the latest*, *Update available*, or an error — appears inline below the button so you don't have to glance away to read it.
- **Verified, atomic install.** The binary is downloaded with progress + cancel, SHA-256 verified against the release's `SHA256SUMS` file, and atomically swapped into place — Windows-safe, even with the `.exe` running. A mismatched checksum aborts and never overwrites the existing build.
- **Clear post-install state.** When the install finishes you get a one-click **Restart now**, or you can keep working and pick up the new build on next launch. If you dismissed the modal mid-flow, the footer status line confirms the install in green so the work isn't silent.
- **Footer-as-toast.** Transient update messages share the right-hand status slot in the footer for ~5 seconds instead of pushing the rest of the UI down.

Stable channel only — pre-releases are excluded. The check hits a fixed public repo (`jcalado/voxdmr-site`); no telemetry, no analytics, no registration. `config.toml` gains an `[updates]` section that records skipped versions and the *Remind me later* timestamp; older configs without it pick up the documented defaults.

## v0.8.0

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
