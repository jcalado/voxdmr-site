# Troubleshooting

---

## Can't Connect to the Server

**Symptom:** Status shows **Connecting…** indefinitely, **Auth Error**, or **Connection Refused**.

1. Confirm the **hostname**, **port**, and **auth key** in your server profile are correct. The auth key is case-sensitive.
2. Check that your device has an active internet connection — open a browser and load any page.
3. Verify the reflector is online. Ask your admin or check the network's status page.
4. If you are behind a corporate or guest Wi-Fi, the required TCP/UDP ports may be blocked. Try switching to mobile data.
5. Ensure no VPN is blocking or rerouting the connection.

> See [Server Profiles](/docs/server-profiles) for details on the auth key and connection fields.

---

## Connection Drops When the Screen Turns Off

**Symptom:** VoxLink disconnects after the display sleeps.

Android's battery optimization is almost certainly terminating the foreground service. See [Background Operation](/docs/background-operation) for instructions on exempting VoxLink from battery optimization and enabling wake/Wi-Fi locks.

---

## No Incoming Audio (RX Silent)

1. Check the **RX Volume** slider in **Settings > Audio > RX Volume** — it may be set to 0 %.
2. Check the Android media or call volume — use the hardware volume buttons while VoxLink is in the foreground.
3. Confirm your **Audio Output** route (**Settings > Audio > Output**). If set to **Bluetooth**, ensure a Bluetooth device is connected.
4. Confirm the talkgroup has other active stations — the **Stations** tab shows connected nodes.

---

## Others Can't Hear Me (TX Not Working)

1. Verify VoxLink has **Microphone** permission: **Settings > Apps > VoxLink > Permissions > Microphone**.
2. Watch the **TX meter** on the PTT screen while keyed up. If the meter shows no movement, the microphone is not delivering signal — try changing **Settings > Audio > Input** to **Microphone** or **Voice Recognition**.
3. Increase **Mic Gain** in **Settings > Audio > Mic Gain** if the TX meter moves but stays very low.
4. Confirm you are connected to the correct talkgroup.

---

## Choppy or Robotic Audio

**On receive:**

1. A poor or congested internet connection causes packet loss, which produces choppy audio. Check your signal strength or switch from Wi-Fi to mobile data (or vice versa).
2. The adaptive jitter buffer and packet loss concealment will mask occasional losses, but sustained high loss rates will still degrade quality.
3. If other apps also perform poorly, the problem is your network, not VoxLink.

**On transmit (reported by other stations):**

1. Reduce **Mic Gain** if the TX meter is regularly hitting 0 dBFS — the limiter is working hard and artefacts may be audible.
2. Move to a quieter environment or switch **Audio Input** to **Voice Comms** to engage Android's noise suppression.

---

## App Crashes or Freezes

1. Force-stop the app and reopen it: **Settings > Apps > VoxLink > Force Stop**.
2. Check available storage — less than 500 MB free can cause instability on some devices.
3. Reboot your device to clear any system-level audio session conflicts.
4. If the crash is reproducible, note the steps and send a bug report to the VoxLink developer with your Android version and device model.
