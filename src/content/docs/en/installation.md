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

The first launch:

- **Vocoder firmware** downloads in the background. A banner appears on the PTT screen ("Vocoder firmware not installed") with a tap-to-open link. Inside, status walks through *Provisioning firmware…* → *Verifying…* → *Firmware ready*. Like the desktop, the firmware bytes come from third-party sources and are SHA-256 verified before being written to disk.
- **Microphone permission** is requested the first time you press PTT.
- **Battery optimization**: on some devices (Xiaomi, Samsung, OnePlus, Huawei) Android may aggressively kill the app in the background. Open **Settings → Background** in the app to grant *Ignore battery optimizations* and, where exposed, *Autostart*.

### PoC radios and 32-bit devices

Many PoC (push-to-talk over cellular) radios don't ship with the Google Play Store, and most run an older **32-bit** build of Android that the Play release can't install. For these, VoxDMR also publishes a standalone APK on GitHub Releases.

If you're installing on a PoC radio (or any 32-bit Android device), sideload the non-Play-Store build:

1. On the radio, open the [latest release page](https://github.com/jcalado/voxdmr-site/releases/latest).
2. Download the **32-bit (`armeabi-v7a`) APK**. Most PoC radios are 32-bit, so if you're unsure, pick this one — the 64-bit (`arm64-v8a`) build will not install on a 32-bit device.
3. When Android prompts, allow installs from your browser or file manager (**Settings → Apps → Special access → Install unknown apps**).
4. Open the downloaded APK and tap **Install**, then launch the app.

First launch (firmware, microphone, battery optimization) works exactly as it does for the Play Store install above.

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

### First-launch firmware setup

The first time VoxDMR Desktop starts, it shows a one-shot setup card because the AMBE+2 vocoder needs the MD-380 firmware to encode and decode audio. The firmware is **not bundled with the binary**: for legal reasons, VoxDMR fetches it directly from third-party sources to your machine and never proxies the bytes through us.

You have two choices:

**Auto-download** (recommended). Click **Download (≈2 MB)**. VoxDMR fetches:
- `D002.032.bin` (994 KB) from [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip), unwrapped from the OEM update format.
- `d02032-core.img` (128 KB) from the [upstream md380_vocoder_dynarmic project on GitHub](https://github.com/nostar/md380_vocoder_dynarmic).

Both downloads are SHA-256 verified before being written to disk. The whole thing takes a few seconds on a normal connection.

**Choose existing files**: if your machine can't reach the download URLs (corporate proxy, offline, restricted firewall), click **Choose existing files…** and pick `D002.032.bin` and `d02032-core.img` from somewhere on disk. They're copied into the data directory and SHA-verified the same way.

Once setup completes, the main UI mounts and the firmware is loaded for every subsequent launch.

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

## Next steps

- [First Connection](./first-connection) — wire up your DMR ID, pick a network, and key up for the first time.
- [Server Profiles](./server-profiles) — keep multiple network configs (BrandMeister, TGIF, FreeDMR…) side by side and switch between them.
