# Installation

Get VoxLink running on your Android device.

## Requirements

- Android 8.0 (Oreo) or higher
- Internet connection (Wi-Fi or mobile data)
- Reflector connection details from your club or admin: hostname, port, talkgroup number, and auth key

## Install from Google Play

1. Open the **Google Play Store**.
2. Search for **VoxLink**.
3. Tap **Install**.

## Sideload the APK

If you received an APK file directly (e.g. from a beta release or your club):

1. Enable **Install unknown apps** for your file manager or browser: **Settings > Apps > Special app access > Install unknown apps**.
2. Open the APK file on your device and tap **Install**.

To install via ADB:

```bash
adb install VoxLink.apk
```

> Sideloaded builds don't receive Play Store updates — check with your source for new versions.

## Permissions

**Microphone** — Required for transmitting. Android prompts you on first launch — tap **Allow**.

If you accidentally denied it: **Settings > Apps > VoxLink > Permissions > Microphone > Allow**.

**Notifications** (Android 13+) — Allows VoxLink to show a persistent status notification while connected.

**Bluetooth** (Android 12+) — Required when routing audio to a Bluetooth device. VoxLink prompts for this when you first select a Bluetooth output.
