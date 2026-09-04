# Installation

VoxDMR runs on Android, Linux, and Windows. Pick your platform below.

## Requirements

- **DMR ID**: get one at [radioid.net](https://radioid.net) if you don't have one. Free, requires a valid amateur radio licence.
- **Android version** (Android only): Android 7.0 (Nougat) or newer — API level 24+.
- **A network password**:
  - For **BrandMeister**: your hotspot security password from [BrandMeister SelfCare](https://brandmeister.network/), under _Hotspot security password_. **This is not your BrandMeister account password** — it's a separate string you set yourself in SelfCare.
  - For **FreeDMR**: the documented public password (`passw0rd` on the canonical UK hotspot).
  - For **TGIF / ADN / other Homebrew networks**: whatever the operator publishes. Many MMDVM-based networks accept any password since they identify by DMR ID.

:::mobile

VoxDMR Android is published on Google Play.

1. Open the [VoxDMR Play Store listing](https://play.google.com/store/apps/details?id=com.jcalado.voxdmr).
2. Tap **Install**.
3. Launch the app.

The first launch opens the [setup wizard](#first-launch-the-setup-wizard) — vocoder firmware, your callsign and DMR ID, a network, talkgroups, and a mic check, in that order.

One thing the wizard doesn't cover:

- **Battery optimization**: on some devices (Xiaomi, Samsung, OnePlus, Huawei) Android may aggressively kill the app in the background. Open **Settings → Background** in the app to grant *Ignore battery optimizations* and, where exposed, *Autostart*.

### PoC radios and 32-bit devices

Many PoC (push-to-talk over cellular) radios don't ship with the Google Play Store, and most run an older **32-bit** build of Android that the Play release can't install. For these, VoxDMR also publishes a standalone APK on GitHub Releases.

If you're installing on a PoC radio (or any 32-bit Android device), sideload the non-Play-Store build:

1. On the radio, open the [latest release page](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Download the **32-bit (`armeabi-v7a`) APK**. Most PoC radios are 32-bit, so if you're unsure, pick this one — the 64-bit (`arm64-v8a`) build will not install on a 32-bit device.
3. When Android prompts, allow installs from your browser or file manager (**Settings → Apps → Special access → Install unknown apps**).
4. Open the downloaded APK and tap **Install**, then launch the app.

First launch works exactly as it does for the Play Store install above: the same [setup wizard](#first-launch-the-setup-wizard), which is built to be driven with a D-pad as well as a touchscreen.

### Where Android stores things

App data lives in the standard Android app-private directory. Uninstalling the app removes config, firmware, and logs.

:::

:::desktop

VoxDMR Desktop ships as a single self-contained binary. No installer, no package manager, no system services. Download, verify, run.

### Platform requirements

- **Linux:** ALSA support (`libasound2` on Debian/Ubuntu/Mint; `alsa-lib` on Arch; built into most distros).
- **Windows:** Windows 10 1809 or later (x64). All other dependencies are statically linked.

### Linux (x86_64)

```bash
# Download
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/VoxDMR-linux-x86_64
curl -LO https://github.com/jcalado/voxdmr-site/releases/latest/download/SHA256SUMS

# Verify
sha256sum -c SHA256SUMS --ignore-missing

# Run
chmod +x VoxDMR-linux-x86_64
./VoxDMR-linux-x86_64
```

### Windows (x86_64)

1. Open the [latest release page](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Download `VoxDMR-windows-x86_64.exe`.
3. Optional but recommended: also download `SHA256SUMS` and verify in PowerShell:
   ```powershell
   $expected = (Get-Content SHA256SUMS | Select-String 'VoxDMR-windows-x86_64.exe').ToString().Split(' ')[0]
   $actual = (Get-FileHash .\VoxDMR-windows-x86_64.exe -Algorithm SHA256).Hash.ToLower()
   if ($expected -eq $actual) { "OK" } else { "MISMATCH" }
   ```
4. Double-click `VoxDMR-windows-x86_64.exe` to launch.

The first time you run it, Windows SmartScreen may warn you the app is from an "unknown publisher". VoxDMR isn't code-signed yet. Click **More info** → **Run anyway** to continue.

### Where VoxDMR Desktop stores things

VoxDMR follows OS conventions for config, data, and logs:

| Type | Linux | Windows | macOS¹ |
|---|---|---|---|
| Firmware | `~/.local/share/voxdmr/firmware/` | `%APPDATA%\voxdmr\firmware\` | `~/Library/Application Support/voxdmr/firmware/` |
| Config | `~/.config/voxdmr/` | `%APPDATA%\voxdmr\` | `~/Library/Application Support/voxdmr/` |
| Logs | `~/.local/state/voxdmr/logs/` | `%LOCALAPPDATA%\voxdmr\logs\` | `~/Library/Logs/voxdmr/` |

¹ macOS isn't currently a release target. Paths are listed for future reference.

To override the firmware location (e.g. for packagers or sandboxed installs), set `VOXDMR_FIRMWARE_DIR` before launching:

```bash
VOXDMR_FIRMWARE_DIR=/opt/voxdmr/firmware ./VoxDMR-linux-x86_64
```

The app also looks for `<exe-dir>/firmware/`. Drop the firmware files next to the binary for fully portable installs (USB stick, archived bundle, etc.).

### Updating

Recent desktop builds include an **in-app auto-update** — on launch (and from Settings → About → Check for updates), VoxDMR offers to download and atomically swap in the new build for you, SHA-verified end-to-end. You can also still upgrade manually: download the new binary from the [releases page](https://github.com/jcalado/voxdmr-site/releases/latest), replace the old binary, and launch. Config, talkgroup favorites, profiles, aliases, and firmware are preserved across updates.

### Uninstall

VoxDMR Desktop is a single binary with no installer. Delete the binary to remove the app. To also remove your config, firmware, and logs, delete the three directories listed above.

:::

## First launch: the setup wizard

The first time VoxDMR starts with no saved profile it opens a guided setup, instead of dropping you on an empty settings screen. Work through it once and you come out with a saved profile, your talkgroups pinned, the Parrot echo test wired up, a checked microphone, and — if you entered a password — a live connection.

Nothing you pick here is permanent; all of it lives in Settings afterwards.

:::mobile

Seven numbered steps at most, bookended by a welcome screen and a summary. Two of them are conditional — the **Vocoder** step only appears if the firmware isn't installed yet, and the account step only for networks that need one — so a second run against FreeDMR is five.

:::

:::desktop

Five numbered steps at most, ending on a summary. The **Vocoder** step only appears if the firmware isn't installed yet, so a second run is four.

:::

### Vocoder — the one-time firmware install

VoxDMR needs the MD-380 firmware to encode and decode DMR audio: that is the AMBE+2 vocoder. It is **not bundled with the app** — for legal reasons VoxDMR fetches it directly from third-party sources to your device and never proxies the bytes through us. Whichever route you take, it is SHA-256 verified before it is written to disk.

:::mobile

![Step 1 of 7 of the VoxDMR Android setup wizard, "Vocoder": a STATUS card reading "Not installed", a red Download button, a "Choose a file…" outline button, and a note offering to extract the firmware from a TYT zip you already have](/screenshots/android-onboarding-vocoder.webp)

:::

Two ways through:

- **Download** (recommended) fetches the firmware archive from [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip) — roughly 2 MB over the wire — and unwraps it to a single 994 KB `D002.032.bin`. A few seconds on a normal connection.
- **The file picker** beside it is the escape hatch when the machine can't reach that URL — corporate proxy, offline, restricted firewall. It takes the TYT firmware zip, the wrapped OEM `.bin`, or an already-unwrapped `D002.032.bin`; it isn't filtered by extension, because people rename downloads, so VoxDMR sniffs the contents and works out which of the three you handed it.

:::mobile

The buttons read **Download** and **Choose a file…**, and the status card goes **Not installed** → a progress bar → **Installed and verified**.

:::

:::desktop

The buttons read **Download (≈2 MB)** and **Choose existing files…**, and the card goes **Not installed** → a progress bar → **Ready**, *RX/TX audio good to go*.

![Step 1 of 5 of the VoxDMR desktop setup wizard, "Vocoder": a FIRMWARE card reading "Not installed", the source URL md380.org/firmware/orig/…v232.zip listed as fetched directly to your machine, and "Download (≈2 MB)" and "Choose existing files…" buttons above a note that without it VoxDMR can't send or receive audio](/screenshots/desktop-onboarding-vocoder.webp)

:::

The step is skippable on purpose: an offline first run, or an upstream that is down, must not be a dead end. Skip it and the wizard carries on, the summary at the end warns you that audio won't work, and you can install the firmware later under **Settings → Firmware**. The download also outlives the step — start it, press Continue, and it keeps running while you fill in the rest.

> **Upgrading from v0.13.x or earlier?** Setup used to fetch a second file, `d02032-core.img`. As of v0.14.0 it's **no longer downloaded or required**. An existing copy on disk still works, so nothing breaks on an upgrade — you just don't need it on a fresh install. See the [changelog](./changelog).

### Your station — callsign and DMR ID

The two things every network needs to know about you, on one screen.

:::mobile

![The "Your station" step of the VoxDMR Android setup wizard with the Callsign field reading CT7BLE under a green "Valid callsign" check, the DMR ID field reading 2680513 under a green "Portugal — from your DMR ID" check, and a note pointing at radioid.net](/screenshots/android-onboarding-station.webp)

:::

:::desktop

![The "Your station" step of the VoxDMR desktop setup wizard: Callsign and DMR ID fields side by side reading CT7BLE and 2680513, with a green "Valid callsign" note under one and a Portuguese flag beside "Portugal — from your DMR ID" under the other](/screenshots/desktop-onboarding-station.webp)

:::

The callsign check is deliberately permissive — it catches typos, not unusual callsigns, and the network's own check is the authoritative one anyway. The DMR ID is validated on length alone (four digits minimum); where the country prefix is one VoxDMR recognises, the field reads it back to you (*Portugal — from your DMR ID*). An unrecognised country is informational and never blocking.

Your DMR ID does more work here than it looks. Its country prefix is what orders the server list and seeds the talkgroup suggestions further down, so if you go back and fix a typo, everything downstream is recomputed.

No ID yet? [radioid.net](https://radioid.net) issues them free against your licence.

### Network, and which server

Where your station connects: BrandMeister, TGIF, ADN Systems, FreeDMR, or a custom master — any Homebrew/MMDVM-compatible server of your own.

:::mobile

![The "Network" step of the VoxDMR Android setup wizard: BrandMeister selected in red at the top of a list with TGIF Network, ADN Systems, FreeDMR and Custom master below it, each with a one-line description, and a "Suggested master: 2682 · PT" line underneath](/screenshots/android-onboarding-network.webp)

:::

The wizard never names the wire protocol. Your choice of network decides it — Rewind for BrandMeister, Homebrew for the rest — and there is no useful decision for you to make about it. Pick BrandMeister and the suggested master for your country appears straight away, since it's a lookup against a built-in list rather than a network call.

:::mobile

The server is the step after, and your country's is already selected.

![The "Master server" step of the VoxDMR Android setup wizard: a list headed "SERVERS — SUGGESTED FIRST" with 2682 · PT selected and tagged "your country", then 2322 · AT, 2061 · BE, 2841 · BG, 2282 · CH and 2302 · CZ each tagged "nearby", above a "Show all 40 servers" button](/screenshots/android-onboarding-server.webp)

:::

:::desktop

The server list sits on the same step, in a second column beside the network choice, with your country's already selected.

![The "Network" step of the VoxDMR desktop setup wizard: a column of networks on the left with BrandMeister selected and tagged "Suggested", and beside it a "Servers — suggested first" list with PT — 2682.master.brandmeister.network tagged "your country" above AT, BE, BG, CH and CZ tagged "nearby", then "Show all 40 servers"](/screenshots/desktop-onboarding-network.webp)

:::

The list is ranked home country first, then the same region, then everything else, and it is capped at the first six rows until you ask for the rest — the full BrandMeister list is 40 masters, and on a keypad radio every extra row is another press. Picking a **Custom master** swaps the list for host, port and password fields instead.

ESSID, timeslot and static talkgroups aren't here. They live in the profile settings after setup.

### Talkgroups, and the echo test

:::mobile

![The "Talkgroups" step of the VoxDMR Android setup wizard: an ECHO TEST card with "Parrot · PC 9990" ticked and labelled "Private call — your audio is played straight back", then a TALKGROUPS list with Portugal TG 268 ticked and VoxDMR TG 26820, Worldwide TG 91, Europe TG 92 and North America TG 93 unticked, reading "1 selected"](/screenshots/android-onboarding-talkgroups.webp)

:::

:::desktop

![The "Talkgroups" step of the VoxDMR desktop setup wizard: an "Echo test" card with Parrot ticked and described as a private call, then a Talkgroups checklist with 268 · Portugal ticked and 26820 · VoxDMR, 91 · Worldwide, 92 · Europe and 93 · North America unticked, reading "1 selected"](/screenshots/desktop-onboarding-talkgroups.webp)

:::

The talkgroups you tick are pinned as favourites for quick access — the suggestions are drawn from your DMR ID's country and the network you picked, and your national talkgroup is ticked for you the first time you reach the step. Untick it and it stays unticked; the wizard won't re-tick something you deliberately cleared.

**Parrot sits in its own card, above the talkgroups, because it isn't one.** 9990 is addressed as a *private call*, not a group call. Filing it with the talkgroups is exactly the mistake that produces a first "why can't I hear myself" — so the wizard separates the two, and saves Parrot to the profile's private favourites. Leave it ticked: it's how you prove the whole chain works, at the end.

Parrot on its own is enough to continue. You can hear yourself before you've picked anyone to talk to.

### Linking your network account

Shown for networks that need an account of their own — BrandMeister and TGIF. Networks that don't (ADN, FreeDMR, a custom master) skip it.

:::mobile

![The "Link BrandMeister" step of the VoxDMR Android setup wizard: a numbered three-step recipe — create an account at brandmeister.network, set a hotspot security password in SelfCare → Security, paste it below — above a "Hotspot security password" field, a warning that "Without it the master rejects the login", and an "Open brandmeister.network" button](/screenshots/android-onboarding-account.webp)

:::

:::desktop

![The "Link BrandMeister" step of the VoxDMR desktop setup wizard: a numbered three-step recipe, an "Open brandmeister.network" button beside "How to get your BrandMeister password", and a "Hotspot security password" field under a note that without it the master rejects the login](/screenshots/desktop-onboarding-credentials.webp)

:::

A Homebrew or Rewind login fails without a per-station password that you have to create on the network's own website, and nothing in the app can do it for you. Leaving people to work that out from a failed login is the single biggest first-run failure, so the wizard names the exact menu path — for BrandMeister, *SelfCare → Security → hotspot security password* — and links straight out to the site.

**This is not your BrandMeister account password.** It's a separate string you set yourself in SelfCare.

The step is skippable. Skip it and you still end up with a saved profile — it just can't connect until you add the password under Settings.

### Mic check

:::mobile

Placed last, and it asks for the microphone permission on arrival — far less alarming here than the first time you reach for PTT mid-QSO.

![The "Mic check" step of the VoxDMR Android setup wizard: a green "Microphone access granted" banner, a LEVEL meter with a "Test my mic" button, and a row noting that speech-band TX filtering (300 Hz – 3.4 kHz) is on and recommended for the AMBE codec, toggled on](/screenshots/android-onboarding-mic.webp)

**Test my mic** records a couple of seconds and reports the level as *good*, *too quiet*, or *too loud*. Denying the permission never blocks you — it's fixable in system settings later, and being trapped in a wizard over it would be worse.

:::

:::desktop

The mic level is a live strip on the final screen rather than a step of its own, along with a picker for the input device.

:::

DMR audio only sounds good if the encoder gets a clean signal — the AMBE codec transmits a *model* of your voice rather than the sound itself, so a bad input signal degrades far more than it would on FM. Speech-band TX filtering (300 Hz – 3.4 kHz) is on by default and worth leaving on. See [Audio settings](./audio-settings).

### Station ready

:::mobile

![The final "Station ready" screen of the VoxDMR Android setup wizard on the happy path: a green tick above an "ON THE AIR" label, a STATION SUMMARY table listing Callsign CT7BLE, DMR ID 2680513, Network BrandMeister, Server Master PT and Status CONNECTED in green, and a red "Kerchunk the Parrot" button described as a private call to 9990](/screenshots/android-onboarding-done-connected.webp)

:::

:::desktop

![The final screen of the VoxDMR desktop setup wizard, headed "Station saved": a station summary card reading NOT CONNECTED with "Configured — add your password in Settings to connect", a details table listing CT7BLE, 2680513, BrandMeister and 2682.master.brandmeister.network, a Mic level strip with an Input device picker reading System Default and "-48 dB · too quiet", and a Callsign database offer](/screenshots/desktop-onboarding-done.webp)

On desktop the heading reads **Station ready** once it connects and **Station saved** when it hasn't, and the mic level and input-device picker sit on this screen rather than on a step of their own.

:::

The last screen summarises what was actually configured — callsign, DMR ID, network, server, and whether the station is connected. It shows measured facts only; there's no signal-strength reading, because a network client doesn't have one.

There are three ways it can end, and all of them are a legitimate finish:

| Status | What happened | What to do |
|---|---|---|
| **CONNECTED** | Profile saved, logged in, idle on your talkgroup. | Press **Kerchunk the Parrot** and say something. Hearing yourself back proves the whole chain — mic, vocoder, network, and audio out. |
| **NOT CONNECTED**, "add your password in Settings" | Profile saved. You skipped the password, so no login was attempted rather than one fired off that could only fail. | Add the password in Settings, or use **Back to the password step**. |
| **NOT CONNECTED**, with an error | Profile saved, the login was rejected or timed out. | The error names the cause — a rejected login is almost always the password. See [Troubleshooting](./troubleshooting). |

:::mobile

Skip the password and the same screen reports it, with the route back:

![The "Station ready" screen in its not-connected state: a STATION SUMMARY table with Status NOT CONNECTED in amber, a warning reading "Configured — add your password in Settings to connect", and a "Back to the password step" button above "Go to the radio"](/screenshots/android-onboarding-done.webp)

:::

The final screen also offers the **callsign database**. Without it, callsigns are looked up online on every call; installing it (tens of MB, downloaded in the background) resolves them instantly and offline.

### Running it again

Both platforms keep the wizard under **Settings → About → Run setup wizard**.

A re-run **adds a new profile and makes it active** — it never edits or overwrites the one you already have, so walking through it again can't break a setup that works.

:::desktop

The desktop re-run starts prefilled from your active profile.

:::

:::mobile

The Android re-run starts blank.

:::

## Next steps

- [First Connection](./first-connection) — wire up your DMR ID, pick a network, and key up for the first time.
- [Server Profiles](./server-profiles) — keep multiple network configs (BrandMeister, TGIF, FreeDMR…) side by side and switch between them.
