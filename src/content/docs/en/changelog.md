# Changelog

Release notes for VoxDMR. Each release page on GitHub has the full commit list and the signed binaries; this is the human summary.

## v0.13.2

::platforms[desktop mobile]

_Released July 2026. Desktop + Android._

A small bugfix and polish release across both platforms.

- **Scan notification tracks the active talkgroup (Android).** While scanning, the
  playback notification now updates to show the talkgroup you're actually hearing instead
  of the armed set. See [Talkgroups](./talkgroups).
- **Accessibility disclosure (Android).** The About screen now surfaces the accessibility
  disclosure.
- **Windows DMR ID database update fixed (desktop).** Updating the offline DMR ID database
  no longer fails on Windows with "os error 5" (access denied). See
  [Talkgroups](./talkgroups).
- **About blurb broadened (desktop).** The About text now describes VoxDMR beyond
  BrandMeister, reflecting support for other DMR networks.

No config, paths, or protocol semantics changed.

## v0.13.1

::platforms[desktop mobile]

_Released July 2026. Desktop + Android._

A bugfix release for Homebrew ("Others") networks.

- **Homebrew audio routing.** Fixed audio routing on Homebrew ("Others") networks, so
  transmissions now bridge correctly between masters on the network — ADN, TGIF, FreeDMR, and
  similar. Affects both desktop and Android. See [Server profiles](./server-profiles).

No config, paths, or protocol semantics changed.

## v0.13.0

::platforms[desktop mobile]

_Released July 2026. Desktop + Android._

A big follow-up to v0.12.0: VoxDMR can now watch a whole set of talkgroups at once,
resolve callsigns offline, drive from a glanceable car screen, and it grew a proper
activity log — plus a wave of PoC-radio hardware support and desktop settings that
finally match Android.

- **Talkgroup scan.** Flag any of your favourites for scan, arm it, and VoxDMR monitors
  them all at once — it locks onto the first talkgroup that goes active, plays it, holds
  briefly to catch a reply, then resumes (first-come-wins). Your own DMR ID is always
  monitored and takes priority. Keying PTT during the hang window commits to that
  talkgroup; you can also stop scan mid-call to park on what you're hearing. Hold time is
  a slider (**0–30 s, default 4 s**). See [Talkgroups](./talkgroups).
- **Always receive private calls.** VoxDMR now permanently subscribes to your own DMR ID
  alongside the selected talkgroup, so a private call addressed to you is no longer
  dropped while you're listening to a group. Automatic, no setting.
- **Offline DMR ID database.** An optional, downloadable copy of the radioid.net user
  database so DMR IDs resolve to callsigns instantly and offline. Opt-in — download,
  update, or delete it from **Settings → DMR IDs** on desktop or the **DMR ID database**
  screen on Android. Lookups fall back to the radioid.net API when an ID isn't local.
- **Car mode (Android).** A large, glanceable full-screen driving mode: big RX callsign,
  idle → RX → TX colour states, tap-to-PTT, and auto-enter on charge, on a chosen
  Bluetooth device, on app start, or via a bound hardware key. Under **Settings → Car mode**.
- **PTT talk-permit tones.** An opt-in setting (**off by default**) that plays a rising
  beep when you key up and a falling beep when you release — synthesised locally, never
  sent on-air. Desktop: **Settings → Audio → Transmit**; Android: **Settings →
  Push-to-talk**. On Android the TOT time-out warning now beeps too.
- **Homebrew, overhauled.** The **Others** protocol grows up: the old three-entry server
  list is replaced by the community Pi-Star `DMR_Hosts.txt` directory (~1200 grouped,
  searchable entries with password prefill and an *Account required* note), the login
  hash format defaults to **Auto**, and profiles gain static talkgroups, an ESSID/peer ID,
  a default timeslot, and editable dashboard identity. You now actually *hear* your static
  talkgroups scanner-style, and cross-master TX/RX works. See [Server profiles](./server-profiles).
- **Activity log.** Desktop and Android converge on one event log (connection, scan,
  TX/RX, profile, backup, firmware, DMR-ID-database events) with a **Verbose** toggle (off
  by default) and copy/share for bug reports. Desktop gets an on-screen **Event Log** card
  (Settings → Connection); the QSO log gains a Time / Callsign / Name / Talkgroup column
  chooser on both platforms.
- **More PoC & keypad radios (Android).** Lock-screen and backgrounded hardware PTT (via an
  accessibility service, for the Hytera P50 and similar), rotary-knob talkgroup cycling
  (Meig P50/P60), scanCode binding for keycode-0 GPIO buttons (Motorola LEX L11e), a
  Bluetooth-headset mic option, a menu-toggle key, wake-on-key, and launch-on-boot for
  Always-on mode. See [Radios](../radios).
- **Desktop parity.** Push-to-talk settings move to a dedicated **PTT** tab (with bindable
  next/prev-talkgroup and scan-toggle hotkeys), and desktop picks up the scan hang-time
  slider, level-meter/dB toggles, and the QSO-log column chooser to match Android.
- **Manual audio levels by default.** The RX/TX auto-leveler introduced in v0.12.0 now
  defaults **off** on a fresh install, and the TX AGC toggle was removed entirely — the TX
  slider is now always a plain manual mic gain (2 dB/step, 7 = 0 dB, ±12 dB), with the soft
  limiter still applied. RX AGC stays available as an opt-in. See [Audio settings](./audio-settings).
- **Reliability.** Auto-reconnect always restores your last talkgroup (the hardware knob no
  longer goes dead after a reconnect), and BrandMeister (Rewind) DMR IDs are capped at 7
  digits in the profile editor.

`config.toml` (desktop) and the Android settings gain scan (`scan_talkgroups`,
`scan_hang_secs` — default 4, `scan_toggle_key`/`next_tg_key`/`prev_tg_key`),
`ptt_tones_enabled` (off), `log_verbose` (off), the `qso_col_*` toggles, the Homebrew
fields, and — on Android — the `car_mode_*` keys. `rx_agc` and `tx_agc` now default **off**
(see the note under v0.12.0). The offline DMR ID database is a downloaded file, not a config
key. Desktop crates are `voxdmr 0.13.0` / `voxdmr-core 0.2.0`.

## v0.12.0

::platforms[desktop mobile]

_Released June 2026. Desktop (now incl. macOS) + Android._

The biggest release yet: VoxDMR now rides out connection drops on its own, macOS gets its first official build, the audio engine levels itself, transmitting respects an active call, your profiles are portable, and keypad/PoC radios get full D-pad navigation.

- **Auto-reconnect.** When the link drops unexpectedly — a timeout, a server-side error, or a network change (Wi-Fi ↔ cellular) — VoxDMR reconnects on its own with exponential backoff (~2 s growing to a ~60 s cap, jittered, unlimited retries) and re-subscribes to your last talkgroup, so you land back where you were. It stops only on a deliberate disconnect or an authentication failure. On by default; toggle it in **Settings → Connection** on desktop or **Settings** on Android. Shared by both frontends. See [Auto-reconnect](./auto-reconnect).
- **macOS desktop build.** macOS is now a release target — a native Apple Silicon (arm64) `.app` shipped in a `.dmg`, with an in-app microphone-permission prompt on first launch and smooth CoreAudio receive playback. This clears the "macOS isn't a release target yet" limitation noted back in v0.7.0. Intel Macs aren't built yet.
- **Self-levelling audio.** An always-on auto-leveler now sits on both the transmit and receive paths — an AGC with an adaptive noise gate and a soft limiter — so a hot microphone no longer over-drives the vocoder and quiet stations come up to a consistent level. The TX/RX level sliders nudge the target up or down (±dB) rather than acting as a raw gain. Prefer to set levels yourself? Each direction has an **AGC toggle** that switches to a plain manual gain _(changed in v0.13.0 — the leveler now defaults off and the TX toggle was removed; see the v0.13.0 entry above)_. See [Audio settings](./audio-settings).
- **Half-duplex busy lockout.** Pressing PTT while a call is coming in no longer cuts off the inbound audio. Transmit is held until the channel clears, with a *"Receiving — wait to transmit"* cue — standard half-duplex etiquette, on both desktop and Android.
- **Profile backup & restore.** Export your server profiles to a file and import them back, with per-conflict resolution and an optional include-passwords toggle. The format is shared between desktop and Android, so profiles move freely between them. See [Server profiles](./server-profiles).
- **Per-profile favourites.** Talkgroup favourites are now scoped to the active profile (your existing global favourites are migrated automatically), so each network keeps its own list.
- **Built for keypad & PoC radios (Android).** Full D-pad navigation with a visible focus ring on every control, a scroll/select mode for long lists, a rotary TG-cycle knob debounce (one detent = one favourite), an optional "Hide status bar" setting, and a searchable drill-down settings layout — so VoxDMR is fully usable without a touchscreen.
- **Refreshed UI.** A redesigned connection screen merges your identity into a single hero card with quick-swap profiles and friendly server labels; the talkgroup picker moves private-call onto a per-row menu; and the QSO log pins to the newest call with a wider source column.
- **Identity reported to networks.** VoxDMR now reports a platform- and architecture-aware version string to DMR masters (e.g. `VoxDMR 0.12.0 (android32)` or `(linux)`), with the project URL pointing at voxdmr.com.

`config.toml` (desktop) and the Android settings gain the `auto_reconnect`, `rx_agc`, and `tx_agc` flags. `auto_reconnect` defaults on; `rx_agc` and `tx_agc` shipped defaulting on in v0.12.0 but **now default off as of v0.13.0** (and `tx_agc` no longer has any effect). Older configs without them pick up those defaults. No other config, paths, or protocol semantics changed.

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
