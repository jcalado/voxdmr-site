# Background Operation

VoxLink is designed to stay connected while you use other apps or your screen is off. This page explains how that works and how to configure your device to allow it.

---

## Foreground Service

When VoxLink is connected it runs a **foreground service** — an Android component that keeps the app alive with higher priority than a standard background process. A persistent notification is shown in the status bar as long as the service is running. This is an Android requirement for foreground services and cannot be suppressed.

Tapping the notification returns you to VoxLink.

---

## Wake and Wi-Fi Locks

VoxLink holds two system locks while connected:

- **Wake lock** — prevents the CPU from sleeping, ensuring packets are processed even when the screen is off.
- **Wi-Fi lock** — keeps the Wi-Fi radio active so the connection is not dropped by Android's Wi-Fi power saving.

These locks are released automatically when you disconnect.

---

## Battery Optimization Exemption

Android's battery optimization can suspend background apps and break the connection. To prevent this:

1. Go to **Android Settings > Apps > VoxLink > Battery**.
2. Set battery usage to **Unrestricted** (the label varies by manufacturer — look for **Unrestricted**, **No restrictions**, or **Don't optimize**).

On some devices you can reach this setting directly from VoxLink: **Settings > Background > Disable Battery Optimization**.

> Battery optimization exemption is strongly recommended. Without it, Android may kill the foreground service after several minutes of screen-off time, especially on devices from manufacturers like Huawei, Xiaomi, Samsung, or OnePlus that apply aggressive background kill policies.

---

## Auto-Reconnect

If the connection drops (network change, server restart, timeout), VoxLink attempts to reconnect automatically using an exponential back-off strategy. The status notification updates to show **Reconnecting…** during this period.

Auto-reconnect can be disabled in **Settings > Connectivity > Auto-Reconnect** if you prefer to reconnect manually.

---

## Heartbeats

VoxLink and the reflector exchange heartbeat packets to detect stale connections:

| Direction | Interval | Timeout |
|---|---|---|
| Client → Server | Every 5 s | — |
| Server → Client | — | 15 s |

If no heartbeat is received from the server within 15 seconds, VoxLink considers the connection lost and triggers auto-reconnect.
