# Installation

VoxDMR ships as a single self-contained binary. No installer, no package manager, no system services. Download, verify, run.

## Requirements

- **DMR ID**: get one at [radioid.net](https://radioid.net) if you don't have one. Free, requires a valid amateur radio licence.
- **BrandMeister hotspot password**: your DMR security key from your [BrandMeister SelfCare](https://brandmeister.network/) account. (BrandMeister calls it a "hotspot security password"; the app calls it _password_.)
- **Linux:** ALSA support (`libasound2` on Debian/Ubuntu/Mint; `alsa-lib` on Arch; built into most distros).
- **Windows:** Windows 10 1809 or later (x64). All other dependencies are statically linked.

## Quick start

### Linux (x86_64)

```bash
# Download
curl -LO https://github.com/jcalado/dmr-input/releases/latest/download/VoxDMR-linux-x86_64
curl -LO https://github.com/jcalado/dmr-input/releases/latest/download/SHA256SUMS

# Verify
sha256sum -c SHA256SUMS --ignore-missing

# Run
chmod +x VoxDMR-linux-x86_64
./VoxDMR-linux-x86_64
```

### Windows (x86_64)

1. Open the [latest release page](https://github.com/jcalado/dmr-input/releases/latest).
2. Download `VoxDMR-windows-x86_64.exe`.
3. Optional but recommended: also download `SHA256SUMS` and verify in PowerShell:
   ```powershell
   $expected = (Get-Content SHA256SUMS | Select-String 'VoxDMR-windows-x86_64.exe').ToString().Split(' ')[0]
   $actual = (Get-FileHash .\VoxDMR-windows-x86_64.exe -Algorithm SHA256).Hash.ToLower()
   if ($expected -eq $actual) { "OK" } else { "MISMATCH" }
   ```
4. Double-click `VoxDMR-windows-x86_64.exe` to launch.

The first time you run it, Windows SmartScreen may warn you the app is from an "unknown publisher", VoxDMR isn't code-signed yet. Click **More info** → **Run anyway** to continue.

## First launch: firmware setup

The first time VoxDMR starts, it shows a one-shot setup card because the AMBE+2 vocoder needs the MD-380 firmware to encode and decode audio. The firmware is **not bundled with the binary**: for legal reasons, VoxDMR fetches it directly from third-party sources to your machine and never proxies the bytes through us.

You have two choices:

**Auto-download** (recommended). Click **Download (≈2 MB)**. VoxDMR fetches:
- `D002.032.bin` (994 KB) from [md380.org](https://md380.org/firmware/orig/TYT-Tytera-MD-380-FW-v232.zip), unwrapped from the OEM update format.
- `d02032-core.img` (128 KB) from the [upstream md380_vocoder_dynarmic project on GitHub](https://github.com/nostar/md380_vocoder_dynarmic).

Both downloads are SHA-256 verified before being written to disk. The whole thing takes a few seconds on a normal connection.

**Choose existing files**: if your machine can't reach the download URLs (corporate proxy, offline, restricted firewall), click **Choose existing files…** and pick `D002.032.bin` and `d02032-core.img` from somewhere on disk. They're copied into the data directory and SHA-verified the same way.

Once setup completes, the main UI mounts and the firmware is loaded for every subsequent launch.

## Where VoxDMR stores things

VoxDMR follows OS conventions for config, data, and logs:

| Type | Linux | Windows | macOS¹ |
|---|---|---|---|
| Firmware | `~/.local/share/dmr-presenter/firmware/` | `%APPDATA%\dmr-presenter\firmware\` | `~/Library/Application Support/dmr-presenter/firmware/` |
| Config | `~/.config/dmr-presenter/` | `%APPDATA%\dmr-presenter\` | `~/Library/Application Support/dmr-presenter/` |
| Logs | `~/.local/state/dmr-presenter/logs/` | `%LOCALAPPDATA%\dmr-presenter\logs\` | `~/Library/Logs/dmr-presenter/` |

¹ macOS isn't currently a release target. Paths are listed for future reference and for users building from source.

The directory name is `dmr-presenter` rather than `voxdmr` for backwards compatibility with earlier versions. The on-disk layout is stable.

To override the firmware location (e.g. for packagers or sandboxed installs), set `VOXDMR_FIRMWARE_DIR` before launching:

```bash
VOXDMR_FIRMWARE_DIR=/opt/voxdmr/firmware ./VoxDMR-linux-x86_64
```

The app also looks for `<exe-dir>/firmware/`. Drop the firmware files next to the binary for fully portable installs (USB stick, archived bundle, etc.).

## Updating

VoxDMR doesn't auto-update. To upgrade:

1. Download the new binary from the [releases page](https://github.com/jcalado/dmr-input/releases/latest).
2. Replace the old binary.
3. Launch. Your config, talkgroup favorites, and firmware are preserved across updates.

## Building from source

If you want to build from source (e.g. for a different architecture, or to verify the binary), see the [project README](https://github.com/jcalado/dmr-input#building) on GitHub. Source builds need a Rust toolchain plus a C++ build environment for the bundled vocoder JIT. Usually a 5–10 minute first build, ~30 seconds for incremental rebuilds after.

## Uninstall

VoxDMR is a single binary with no installer. Delete the binary to remove the app. To also remove your config, firmware, and logs, delete the three directories listed above.
