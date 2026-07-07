# Troubleshooting

A short index of the things most likely to break and how to fix them. The bottom-bar log line on desktop (and the event log on the Android Connection tab) is the first place to look — most failures print there. The full activity log on desktop is in the [logs directory](./installation) (`~/.local/state/voxdmr/logs/` on Linux, `%LOCALAPPDATA%\voxdmr\logs\` on Windows); on Android it's accessible from **Settings → About**.

## Connection

### Stuck at "Authenticating…" then back to Disconnected

The log shows `Authentication FAILED - check password` (or `Login NAK` on Homebrew).

Depending on which network the active profile is set to:

- **BrandMeister.** The hotspot security password is wrong, or you're using your BrandMeister *account* password by mistake. Open [BrandMeister SelfCare](https://brandmeister.network/) → your profile → **Hotspot security password**. That's the one VoxDMR wants — account passwords don't authenticate to masters. If you've never set a hotspot security password in SelfCare, set one now and re-enter it in the profile.
- **TGIF / FreeDMR / ADN / other Homebrew network.** Re-check the published credentials. FreeDMR's canonical password is `passw0rd`; TGIF and ADN have their own. If the password is right but auth still fails, check the profile's **Hash format**. It defaults to **Auto**, which tries Raw first and retries Hex ASCII on a login rejection, so most networks just work — but you can pin it to **Raw** or **Hex ASCII** by hand under the profile's **Advanced** options if a stubborn legacy install needs it.

### Stuck at "Connecting…" indefinitely

VoxDMR can't reach the server at all. Possible causes:

- **Wrong host or port.** BrandMeister masters use `54006`; Homebrew masters typically use `62031`. Confirm both in the profile editor and on the operator's status page.
- **Firewall is blocking outbound UDP.** Both Rewind (BrandMeister) and Homebrew (MMDVM) are UDP-based. Corporate or restrictive home firewalls sometimes drop UDP. Try a different network.
- **The server is offline.** The BrandMeister master picker is live, but a master can go down between launches — pick another one. Homebrew masters on networks like TGIF, FreeDMR, or ADN occasionally have maintenance windows; check the operator's status page.

### "Error: Invalid DMR ID"

The DMR ID field has to be a 7-digit number. No spaces, no dashes, no callsign. Just the digits from [radioid.net](https://radioid.net).

### Disconnects every few minutes

Usually a NAT timeout on a UDP-blocking-ish router. Both Rewind and Homebrew ping periodically to keep the NAT mapping alive, but some routers age UDP entries aggressively. Workarounds:

- Use a wired connection if possible.
- Try a different master (regional ones tend to be closer and more reliable).
- Some consumer routers have a "UDP timeout" setting in advanced NAT/firewall. Increase it if available.

**On Android**, also check **Settings → Background → Ignore battery optimizations** and (on Xiaomi/Samsung/OnePlus/Huawei) the per-app **Autostart** setting. Android aggressively kills background apps; if VoxDMR is being killed during RX you'll see periodic disconnect-then-reconnect cycles tied to screen-off.

VoxDMR reconnects automatically after a drop (it's on by default), so a brief blip should heal itself without any action — see [Auto-reconnect](./auto-reconnect). If you'd rather it stay disconnected on a drop, you can turn the toggle off there.

## Audio

### You can't hear other stations

Check in this order:

1. **Are you actually subscribed to a talkgroup?** The status indicator must read **Ready**, not just **Connected**. Pick a TG from the picker if it's not.
2. **Is the right output device selected?** **Settings → Audio → Output device**. If your headphones are plugged in but the system default is still the built-in speakers, the picker won't auto-switch. Pick them explicitly.
3. **Is RX gain too low?** RX gain is a **−12 to +12 dB slider** (position 7 = 0 dB unity, 2 dB per step). Nudge it a few steps above unity and see if quiet stations come through. If levels swing a lot between stations, turn on **RX AGC** (the auto-leveler) — it's **off by default** now, so you have to opt in.
4. **System volume.** Obvious, but easy to miss after an OS update resets it.

### Homebrew: connected but you hear nothing

On an **Others** (Homebrew / MMDVM) profile you reach **Ready** but no audio ever arrives, even when the network is clearly busy. The usual cause is the wrong **timeslot**. VoxDMR presents as a simplex/DMO hotspot, so masters are effectively **TS2-only** — if the profile's **Default timeslot** is set to TS1, your subscription lands on a slot the master isn't sending. Open the profile's **Advanced options** and set **Default timeslot** to **TS2** (the default). Static talkgroups that never play are the same fix.

### Other stations can't hear you

1. **Is your microphone selected?** **Settings → Audio → Input device**. If the picker is empty, your OS isn't exposing any input devices to VoxDMR. Check OS-level mic permissions (see below).
2. **Is TX gain too low?** TX gain is a **−12 to +12 dB slider** (position 7 = 0 dB unity, 2 dB per step). If it was dragged well below unity and you speak quietly, the encoder gets near-silence. Nudge it back up toward 0 dB.
3. **Watch the TX meter.** Turn on **Monitor mic level off-air** in **Settings → Audio**. Speak. If the meter doesn't move, the mic isn't being captured at all. Check device selection and mic permissions. If it moves but stays in green only, raise TX gain until your peaks hit yellow.

### Your transmissions sound distorted to others

The CLIP indicator on the right of the TX meter latches red when peaks saturate. Drop TX gain a step or two at a time (2 dB per step) until clip stops triggering, then click CLIP to reset the latch. TX is always a manual gain now — there's no TX auto-level to fall back on — so trim it by hand. See [Audio Settings](./audio-settings) for the full meter explanation.

### Microphone permissions

- **Linux**: most distros expose all input devices to all apps. If you're on a sandboxed Flatpak or Snap (not how VoxDMR is currently distributed), the sandbox needs to grant audio access.
- **Windows**: open **Settings → Privacy & security → Microphone**. Make sure "Let apps access your microphone" is on, and that VoxDMR (or "Desktop apps") is allowed. After changing this, restart VoxDMR.
- **Android**: the mic permission is requested the first time you press PTT. If you denied it, open Android **Settings → Apps → VoxDMR → Permissions → Microphone** and grant it manually. *Microphone permission denied* in the snackbar means VoxDMR couldn't capture audio.

:::mobile

### Bluetooth headset: no RX audio after (re)connecting (Android)

When a Bluetooth headset connects or drops mid-session, Android can leave the audio route in a half-open state and RX goes silent. VoxDMR re-routes automatically, but if it doesn't recover, toggle the headset off and on, or briefly background and reopen the app to force a fresh route.

### Bluetooth headset mic isn't being used (Android)

By default VoxDMR captures from the phone's own mic even with a headset paired. To transmit from the headset's microphone, turn on **Use Bluetooth headset mic** in **Settings → Audio** (*Capture audio from the paired Bluetooth headset (narrowband)*). It's narrowband SCO audio, so voice quality is lower than the phone mic — leave it off unless you specifically want hands-free capture.

:::

## PTT

### Pressing the PTT key does nothing

- **Is the main window focused?** VoxDMR doesn't grab a global hotkey. The window has to have keyboard focus. Click the title bar, then try again.
- **Is the right key bound?** Check **Settings → PTT**. Spacebar is the default but might have been changed.
- **Is something else eating the key?** Some game launchers and screen recorders intercept Spacebar globally. Bind PTT to something less common (F8, F12, Insert). See [PTT Modes](./ptt-modes).

:::mobile

### Hardware PTT stops when the screen locks or the app is backgrounded (Android)

By default a bound hardware key only reaches VoxDMR while the app is in the foreground. To keep PTT (and the channel/scan keys) working with the screen off or the app in the background, enable **Lock-screen PTT** in **Settings → Push-to-talk** — it turns on an Accessibility service that captures your bound keys system-wide. Android sends you to its Accessibility settings to grant it; the tile then reads *Enabled — PTT works while locked*.

A couple of hardware notes while you're here:

- **GPIO buttons that show up as `Key (scan N)`.** Cheap PoC-radio side keys report keycode 0, so VoxDMR binds them by scan code and labels them `Key (scan <n>)`. That's expected — bind them like any other key.
- **Rotary channel knob.** On radios with a channel knob (e.g. the Meig P60), turning it cycles your favourite talkgroups — clockwise = next, counter-clockwise = previous. No binding needed.

:::

### TX never stops in toggle mode

You toggled TX on and forgot to toggle it off. Tap your PTT key once more, or click the on-screen TX button.

If a key event got swallowed and TX seems stuck on with no way to toggle it off, disconnect from BrandMeister, TX cuts automatically when subscription is lost.

## Scan

### Scan never locks onto a talkgroup

Scan only watches favourites you've **flagged for scan** — arming scan does nothing on its own. Flag the ones you want in the rotation first, then arm scan:

:::desktop

Use each favourite row's **radar toggle** (in its hover action strip), then arm scan from the **radar control on the call card**.

:::

:::mobile

In the talkgroup picker, use a favourite's **overflow menu → Add to scan**, then arm scan from the **scan control on the PTT call card**.

:::

If nothing ever locks, check that at least one flagged talkgroup is actually active — scan can only lock onto a group somebody is transmitting on. See [Talkgroups](./talkgroups) for the full scan walkthrough.

### Scan leaves a talkgroup too quickly (or lingers too long)

That's the **hang time** — how long scan stays parked on a talkgroup after a call ends before it resumes, range `0–30 s`, default `4 s` (`0` = resume immediately). Raise it if scan moves on before the reply comes back; lower it if scan lingers too long on a quiet group.

:::desktop

Set it on the **Scan** card in **Settings → Interface**.

:::

:::mobile

Set it in **Settings → Scan → Hang time**.

:::

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

**Active profile is on a Homebrew network?** Then this is expected — there's no equivalent live activity feed for TGIF, FreeDMR, ADN, etc. The dots stay grey by design. You find out who's talking by hearing them. Switch back to a BrandMeister profile and the dots will work again.

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
