# Installation

## Requirements

- Android 8.0 (Oreo) or higher
- Active internet connection (Wi-Fi or mobile data)
- A SvxLink reflector address, talkgroup number, and auth key from your network administrator

> Your reflector admin provides the hostname or IP, port, and auth key. Without these you can install the app but cannot connect.

## Install from Google Play

1. Open the **Google Play Store** on your Android device.
2. Search for **VoxLink**.
3. Tap **Install** and wait for the download to complete.
4. Open VoxLink from the app drawer.

## Sideload the APK

If you received an APK file directly (for example, from a beta release or your club):

1. Enable **Install unknown apps** for your file manager or browser: **Settings > Apps > Special app access > Install unknown apps**.
2. Transfer the APK to your device and open it.
3. Tap **Install** when prompted.

To install with ADB from a PC:

```bash
adb install VoxLink.apk
```

> You can disable **Install unknown apps** again after installation. Sideloaded builds do not receive automatic Play Store updates — check with your source for new versions.

## Microphone Permission

VoxLink requires microphone access to transmit audio. On first launch Android will prompt you — tap **Allow**. Without it PTT transmission is disabled.

To grant the permission after the fact: **Settings > Apps > VoxLink > Permissions > Microphone > Allow**.

On Android 13 and higher, VoxLink also requests **Notifications** permission so the persistent connection status notification can be displayed.
