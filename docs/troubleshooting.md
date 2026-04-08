# Troubleshooting

## Can't Connect

**Symptom:** Status shows **Connecting…** indefinitely, **Auth Error**, or **Connection Refused**.

1. Check the **hostname**, **port**, and **auth key** in your server profile. The auth key is case-sensitive.
2. Make sure your device has an internet connection.
3. Verify the reflector is online — ask your admin or check your network's status page.
4. On corporate or guest Wi-Fi, the required ports may be blocked. Try mobile data.
5. Disable any VPN that might be blocking the connection.

## Connection Drops When Screen Is Off

**Symptom:** VoxLink disconnects after the display sleeps.

This is almost always Android's battery optimization. Exempt VoxLink from it — see [Background Operation](/docs/background-operation) for instructions.

> Enable **Auto-Connect** in **Settings > Connection** so VoxLink reconnects automatically after a drop.

## No Incoming Audio

**Symptom:** Connected but you can't hear anything.

1. Check **RX Volume** in **Settings > Audio** — it may be at 0%.
2. Check your device volume using the hardware buttons while VoxLink is open.
3. Check **Audio Output** in **Settings > Audio > Output**. If set to **Bluetooth**, make sure a device is connected.
4. Check the **Stations** tab — if no nodes are listed, there's nobody to hear.

## Others Can't Hear Me

**Symptom:** You're transmitting but other stations hear nothing.

1. Check that VoxLink has **Microphone** permission: **Android Settings > Apps > VoxLink > Permissions**.
2. Watch the **TX** meter while transmitting. If it doesn't move, your mic isn't working — try changing **Input** in **Settings > Audio** to **Microphone** or **Voice Recognition**.
3. If the meter moves but stays very low, increase **Mic Gain** in **Settings > Audio**.
4. Confirm you're on the right talkgroup.

## Choppy or Robotic Audio

**Hearing choppy audio from others:**

1. Check your internet connection — packet loss is the most common cause. Try switching between Wi-Fi and mobile data.
2. VoxLink compensates for occasional packet loss automatically, but sustained poor connectivity will still affect quality.

**Others report your audio is choppy:**

1. If the TX meter is regularly hitting 0 dB, reduce **Mic Gain** — you're overdriving the input.
2. Switch **Input** to **Voice Comms** in **Settings > Audio** to enable Android's noise suppression.

## App Crashes or Freezes

1. Force-stop VoxLink: **Android Settings > Apps > VoxLink > Force Stop**, then reopen.
2. Check available storage — below 500 MB free can cause instability.
3. Reboot your device.
4. If the crash is reproducible, note the steps and report it with your Android version and device model.
