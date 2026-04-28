# Changelog

## 1.2.0

### New

- **Audio file playback** — transmit a pre-recorded audio file over the air from the PTT screen. Tap the file-playback button next to the PTT button to pick a file; a progress card shows playback while it streams. Disabled in VOX mode and while another station is talking. Local monitoring plays the file on the speaker as you transmit.
- **Talkgroups** entry in the active server's menu — jump straight to preset management without opening the edit form
- Optional onboarding to set up talkgroup presets right after adding a new server
- Step through presets directly on the PTT screen with new ‹ / › chevron buttons (when the server has two or more presets)
- Monitor an arbitrary talkgroup from the picker via **Monitor another TG…**, no preset required
- Per-preset **Monitor by default** flag in the talkgroup presets screen — pin specific talkgroups to always be monitored when connecting
- `voxlink://` deep links / QR codes that prefill the new-server form (`voxlink://host:port/?name=&user=&pass=&tg=`)
- Live audio-output picker in Settings that lists the actual devices currently available (built-in speaker, wired headset, paired Bluetooth headset, etc.) instead of a fixed enum
- Auto-rerouting: when **Audio output** is set to **Auto**, plugging in or removing a headset / Bluetooth device switches the route on the fly and shows a toast if the chosen device disappears

### Changed

- PTT screen header now shows the server **name** (with host as fallback) instead of the raw hostname
- Audio output and audio input rows in Settings stack the device/source name below the label so long names don't wrap awkwardly

### Fixed

- Snackbars on the Servers and Recordings screens now auto-dismiss when an Android accessibility service is active (previously they stayed on screen forever, and recordings deleted via the snackbar were never cleaned from disk)
- "Connection timed out" warning no longer lingers on the PTT screen after a successful auto-reconnect
- Reflector no longer reconnects in a loop after a protocol-level error such as **Access denied**

## 1.1.0

### New

- Welcome screen to help you get started on first launch
- Auto-connect now works — automatically connects to your last server when opening the app
- Option to fully close the app when pressing back (Settings > Connection > Quit on exit)
- Extra vibration warning when transmission timeout reaches 5 seconds

### Fixed

- Crash when dismissing the server import dialog
- Color picker menu was cut off on smaller screens
- Improved Portuguese translations
- Screen titles now align consistently across all tabs

## 1.0.0 — First release!

A push-to-talk client for SvxLink amateur radio reflectors.

- Push-to-talk with hold, latch, and VOX modes
- High-quality Opus audio with adaptive jitter buffer
- Multiple server profiles with JSON import/export
- Live node list with callsign, name, and location
- Talkgroup selection and monitoring
- TX/RX audio level metering
- Configurable time-out timer with vibration warning
- Conversation recording and playback
