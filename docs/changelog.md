# Changelog

Release notes for VoxDMR. Each release page on GitHub has the full commit list and the signed binaries; this is the human summary.

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

- macOS isn't a release target yet. Source builds work but aren't tested in CI.
- The Windows binary isn't code-signed yet. SmartScreen will prompt on first launch. Click **More info** → **Run anyway**.
- HTTPS downloads (firmware fetch, master directory) don't honour system proxy settings. Use the manual-files path or run from an unproxied network.

See the [release page](https://github.com/jcalado/dmr-input/releases/tag/v0.7.0) for binaries and SHA-256 sums, and the [installation guide](./installation) to get going.
