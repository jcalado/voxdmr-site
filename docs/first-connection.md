# First Connection

Get on a BrandMeister talkgroup and make your first transmission.

This page assumes you've already finished [Installation](./installation), VoxDMR is running, the setup card is gone, and the main UI is visible.

## What you need

- **DMR ID** (numeric, 7 digits). Issued by [radioid.net](https://radioid.net).
- **Hotspot security password**: from your [BrandMeister SelfCare](https://brandmeister.network/) profile, under _Hotspot security password_. **This is not your BrandMeister account password.** It's a separate string you set yourself in SelfCare and is shared by all your hotspots and clients.
- **A BrandMeister master server**: usually the regional one closest to you (e.g. `master.brandmeister.network` or a country-specific master like `2682.master.brandmeister.network`).

## Configure the connection

Open **Settings** (the gear icon) and switch to the **Connection** tab.

| Field | What to enter |
|---|---|
| **Master** | Pick from the drop-down (it's pre-populated with the active BrandMeister masters fetched live at startup). If yours isn't listed, choose **Custom** and type it manually. |
| **Port** | Defaults to `54006`. Don't change unless your master uses a different one. |
| **DMR ID** | Your 7-digit ID from radioid.net. |
| **Password** | Your hotspot security password. |
| **Auto-connect** | Off for now. Turn on once everything works. |

Close Settings. Your changes are saved automatically.

## Pick your starting talkgroup

VoxDMR doesn't have a "default talkgroup" field on the settings page. Instead, whatever talkgroup you have selected when the app saves config becomes the one it joins on the next launch.

For your first connection, type `9990` into the talkgroup picker on the main window and click the **Parrot** result. Parrot echoes your audio back so you can confirm the round trip works.

## Connect

Click **Connect** on the main window. The status indicator in the title bar (and bottom bar) walks through these states:

1. **Disconnected**: nothing happening yet.
2. **Connecting…**: TCP/UDP handshake with the master.
3. **Authenticating…**: VoxDMR is presenting your DMR ID + password.
4. **Connected**: auth accepted; subscribing to the selected talkgroup.
5. **Ready**: talkgroup subscribed; you can transmit and receive.

If you stop at **Authenticating…** and drop back to Disconnected, the password is wrong. See [Troubleshooting](./troubleshooting).

## Make your first transmission

With **9990 (Parrot)** as your active talkgroup:

1. Hold **Spacebar** (the default PTT key).
2. The bottom bar shows `>>> PTT DOWN, Transmitting` and a TX timer.
3. Speak a short test phrase, "Testing, this is _your callsign_, parrot test".
4. Release Spacebar.
5. After about a second, Parrot replays your audio back to you. You should hear yourself in your output device.

If you hear yourself, you're on the air. If not, see [Troubleshooting](./troubleshooting). The most common causes are mic permissions, wrong audio device, or zero TX gain.

> The PTT key is configurable in **Settings → Interface**. If Spacebar conflicts with another window or you'd prefer a function key, change it there.

## Receiving audio

While you're connected, any traffic on your active talkgroup plays through your output device automatically. The **RX panel** shows the active transmission's:

- **Source ID** (the transmitting station's DMR ID)
- **Callsign** (when registered)
- **Talker alias** (live name string sent over the air, when supported)
- **Group ID** (which talkgroup the traffic is on)

When the transmission ends, you'll see `RX end` briefly in the bottom bar.

## Switching talkgroups

The **talkgroup picker** on the main window lets you change which talkgroup you're listening to:

- **Search** by name or number.
- **Star** a talkgroup to add it to your favorites.
- **Click** a talkgroup to switch.

Switching talkgroups happens instantly, VoxDMR sends a subscription update to the master and starts receiving the new talkgroup's traffic.

Some popular talkgroups to try once Parrot works:

| ID | Name | Activity |
|---|---|---|
| 91 | Worldwide | Always busy |
| 92 | Europe | Regional |
| 235 | UK | National |
| 268 | Portugal | National |
| 269 | Switzerland | National |
| 9990 | Parrot | Echo test (your audio only) |

## Once it works

Open Settings → Connection again and tick **Auto-connect**. From then on, VoxDMR connects on launch with no extra clicks.

## Next steps

- [PTT Modes](./ptt-modes). Change the PTT key, switch between push-to-talk and toggle.
- [Audio Settings](./audio-settings). Pick mic and output devices, adjust gain.
- [Talkgroups & Nodes](./talkgroups-nodes). Managing favorites and the talkgroup database.
