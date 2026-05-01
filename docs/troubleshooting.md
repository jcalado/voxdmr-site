# Troubleshooting

A short index of the things most likely to break and how to fix them. The bottom-bar log line in VoxDMR is the first place to look. Most failures print there. The full activity log is in the [logs directory](./installation) (`~/.local/state/voxdmr/logs/` on Linux, `%LOCALAPPDATA%\voxdmr\logs\` on Windows).

## Connection

### Stuck at "Authenticating…" then back to Disconnected

The log shows `Authentication FAILED - check password`.

The hotspot security password is wrong, or you're using your BrandMeister account password by mistake. Open [BrandMeister SelfCare](https://brandmeister.network/) → your profile → **Hotspot security password**. That's the one VoxDMR wants. Account passwords don't authenticate to masters.

If you've never set a hotspot security password in SelfCare, set one now and re-enter it in **Settings → Connection**.

### Stuck at "Connecting…" indefinitely

VoxDMR can't reach the master at all. Possible causes:

- **Wrong host or port.** Default port is `54006`. Some masters use a different one. Confirm both in **Settings → Connection** and on the master's status page.
- **Firewall is blocking outbound UDP.** The Rewind protocol is UDP-based. Corporate or restrictive home firewalls sometimes drop UDP. Try a different network.
- **The master is offline.** The master picker is populated from the live BrandMeister API at startup, but a master can go down between launches. Pick another one.

### "Error: Invalid DMR ID"

The DMR ID field has to be a 7-digit number. No spaces, no dashes, no callsign. Just the digits from [radioid.net](https://radioid.net).

### Disconnects every few minutes

Usually a NAT timeout on a UDP-blocking-ish router. The Rewind protocol pings periodically to keep the NAT mapping alive, but some routers age UDP entries aggressively. Workarounds:

- Use a wired connection if possible.
- Try a different master (regional ones tend to be closer and more reliable).
- Some consumer routers have a "UDP timeout" setting in advanced NAT/firewall. Increase it if available.

## Audio

### You can't hear other stations

Check in this order:

1. **Are you actually subscribed to a talkgroup?** The status indicator must read **Ready**, not just **Connected**. Pick a TG from the picker if it's not.
2. **Is the right output device selected?** **Settings → Audio → Output device**. If your headphones are plugged in but the system default is still the built-in speakers, the picker won't auto-switch. Pick them explicitly.
3. **Is RX gain too low?** Default is 4×. Bump it up to 10× and see if quiet stations come through.
4. **System volume.** Obvious, but easy to miss after an OS update resets it.

### Other stations can't hear you

1. **Is your microphone selected?** **Settings → Audio → Input device**. If the picker is empty, your OS isn't exposing any input devices to VoxDMR. Check OS-level mic permissions (see below).
2. **Is TX gain non-zero?** It defaults to 0.5×. If somebody changed it to 0.1× and you speak quietly, the encoder gets near-silence.
3. **Watch the TX meter.** Turn on **Monitor mic level off-air** in **Settings → Audio**. Speak. If the meter doesn't move, the mic isn't being captured at all. Check device selection and mic permissions. If it moves but stays in green only, raise TX gain until your peaks hit yellow.

### Your transmissions sound distorted to others

The CLIP indicator on the right of the TX meter latches red when peaks saturate. Drop TX gain in 0.1 steps until clip stops triggering, then click CLIP to reset the latch. See [Audio Settings](./audio-settings) for the full meter explanation.

### Microphone permissions

- **Linux**: most distros expose all input devices to all apps. If you're on a sandboxed Flatpak or Snap (not how VoxDMR is currently distributed), the sandbox needs to grant audio access.
- **Windows**: open **Settings → Privacy & security → Microphone**. Make sure "Let apps access your microphone" is on, and that VoxDMR (or "Desktop apps") is allowed. After changing this, restart VoxDMR.

## PTT

### Pressing the PTT key does nothing

- **Is the main window focused?** VoxDMR doesn't grab a global hotkey. The window has to have keyboard focus. Click the title bar, then try again.
- **Is the right key bound?** Check **Settings → Interface → PTT key**. Spacebar is the default but might have been changed.
- **Is something else eating the key?** Some game launchers and screen recorders intercept Spacebar globally. Bind PTT to something less common (F8, F12, Insert). See [PTT Modes](./ptt-modes).

### TX never stops in toggle mode

You toggled TX on and forgot to toggle it off. Tap your PTT key once more, or click the on-screen TX button.

If a key event got swallowed and TX seems stuck on with no way to toggle it off, disconnect from BrandMeister, TX cuts automatically when subscription is lost.

## Firmware

### "Firmware not found" or stuck on the setup card

The vocoder firmware isn't installed yet, or the install location isn't where VoxDMR is looking. The setup card lets you fix this two ways:

- **Download (≈2 MB)**: the easy path; works on any machine with internet access to `md380.org` and `raw.githubusercontent.com`.
- **Choose existing files**: for offline machines or restrictive networks. Point VoxDMR at `D002.032.bin` and `d02032-core.img` on disk.

If you have the files in a non-default location, set `VOXDMR_FIRMWARE_DIR` to point at the directory before launching:

```bash
VOXDMR_FIRMWARE_DIR=/path/to/firmware ./VoxDMR-linux-x86_64
```

### "SHA-256 mismatch" / firmware shows ✗ in Settings

A firmware file got corrupted (partial download, disk error, accidentally edited). Open **Settings → Firmware** and click **Reinstall…**. Same flow as first-launch: download or pick from disk.

### Auto-download fails behind a corporate proxy

`ureq` (the HTTPS client VoxDMR uses) doesn't read system proxy settings. Either use the **Choose existing files** path with manually-downloaded files, or run VoxDMR from a network that allows direct outbound HTTPS to the two source hosts.

## Activity dots stay gray

The live last-heard feed comes from `api.brandmeister.network` over a WebSocket. If your network blocks it, the dots in the favorites list stay gray. Everything else (RX, TX, subscribing, talking) still works. The activity feed is purely informational.

To check whether your machine can reach it:

```bash
curl -I https://api.brandmeister.network/lh/socket.io/
```

A `200` or `400` response means the host is reachable. A timeout means it's blocked upstream.

## Crashes / blank window / weird UI behaviour

VoxDMR is built on iced + wgpu. On rare GPU-driver combinations the renderer doesn't initialise correctly and you get a blank window or a crash on startup.

1. Check the log file (path above) for `wgpu` or `panic` lines.
2. On Linux, try forcing the software renderer:
   ```bash
   WGPU_BACKEND=gl ./VoxDMR-linux-x86_64
   ```
3. On Windows, update the GPU drivers. Old vendor drivers sometimes ship a broken Vulkan implementation.

## Still stuck?

- Read the full log file (`~/.local/state/voxdmr/logs/` on Linux, `%LOCALAPPDATA%\voxdmr\logs\` on Windows).
- Open an issue on [GitHub](https://github.com/jcalado/voxdmr-site/issues) with the log and a description of what you were trying to do.
