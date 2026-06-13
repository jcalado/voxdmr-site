# First Connection

Get on a DMR talkgroup and make your first transmission.

This page assumes you've already finished [Installation](./installation), VoxDMR is running, the firmware setup is done, and the main UI is visible.

VoxDMR speaks **two protocols**, and the connection setup depends on which network you want to join:

- **BrandMeister** uses the **Rewind** protocol. Master directory is fetched live; you just pick a master.
- **TGIF, FreeDMR, ADN.systems, and similar MMDVM-based networks** use the **Homebrew** (MMDVM_HBP) protocol. There's no central master directory, so VoxDMR ships a small curated list (TGIF Network, FreeDMR United Kingdom, ADN Portugal) plus a *Custom server* option for anything not listed.

You don't pick one or the other once and for all — VoxDMR supports **multiple profiles**, each with its own protocol, server, and credentials. Add as many as you like; switch with a tap.

## What you need

- **DMR ID** (numeric, 7 digits). Issued by [radioid.net](https://radioid.net).
- **A password** for the network you're joining (see [Installation → Requirements](./installation#requirements) for what each network expects).
- **Callsign** (optional, but Homebrew networks usually want one for identification).

:::desktop

### Configure the connection

Open **Settings** (the gear icon) and switch to the **Connection** tab. Under **PROFILES**, click **+ Add profile** to start a new profile. (The form below the list expands.)

Fill in the **Identity** fields:

| Field | What to enter |
|---|---|
| **Label** | A short name for this profile ("Home", "Mobile BM", "TGIF", etc.). |
| **DMR ID** | Your 7-digit ID from radioid.net. |
| **Password** | Your hotspot security password for this network. |
| **Callsign** | Optional. Used by Homebrew networks. |

Under **Server**, pick a protocol — **BrandMeister** or **Others**:

**BrandMeister** (Rewind):

- The **master picker** drops down with the active masters fetched live from BrandMeister's API at startup. Pick the one closest to you. If yours isn't listed, choose **Custom server…** and type the hostname and port (default `54006`) manually.

**Others** (Homebrew):

- The **server picker** drops down with the curated entries: ADN Portugal (2681), FreeDMR United Kingdom, TGIF Network. Pick one to fill in the host + port + hash format automatically.
- **Custom server…** opens host/port fields plus a **hash format** toggle (Raw vs Hex ASCII). Most Homebrew networks use **Raw**; flip to Hex ASCII only if auth keeps failing.

Click **Save**. The new profile appears in the list. Click its radio button to make it active.

### Pick your starting talkgroup

VoxDMR doesn't have a "default talkgroup" field on the settings page. Whatever talkgroup is selected when the app saves config becomes the one it joins next time.

For your first BrandMeister connection, type `9990` into the search field on the main window and click the **Parrot** result. Parrot echoes your audio back so you can confirm the round trip works. (Most Homebrew networks have their own echo — TGIF's is `9990` too; FreeDMR's is `9990`.)

### Connect

Click **Connect** in the **Connection** tab (or the connect button in the main window footer). The status indicator walks through these states:

1. **Disconnected** — nothing happening yet.
2. **Connecting…** — handshake with the server.
3. **Authenticating…** — VoxDMR is presenting your DMR ID + password (+ callsign on Homebrew).
4. **Connected** — auth accepted; subscribing to the selected talkgroup.
5. **Ready** — talkgroup subscribed; you can transmit and receive.

If you stop at **Authenticating…** and drop back to Disconnected, the password (or hash format, on Homebrew) is wrong. See [Troubleshooting](./troubleshooting).

### Make your first transmission

With **9990 (Parrot)** as your active talkgroup:

1. Hold **Spacebar** (the default PTT key).
2. The bottom bar shows `TX HH:MM:SS` and the TX meter goes live.
3. Speak a short test phrase — "Testing, this is _your callsign_, parrot test".
4. Release Spacebar.
5. After about a second, Parrot replays your audio back to you.

If you hear yourself, you're on the air. If not, see [Troubleshooting](./troubleshooting).

:::

:::mobile

### Configure the connection

Tap the **Connection** tab in the bottom navigation. Under **Identity**, tap the row (it'll say *Not configured* if this is your first run).

That opens the **Profiles** screen. Tap **+ Add profile** at the bottom.

Fill in the **Identity** fields in the modal that appears:

| Field | What to enter |
|---|---|
| **Label** | A short name for this profile. |
| **DMR ID** | Your 7-digit ID. |
| **Password** | Your network password. |
| **Callsign** | Optional. Homebrew networks usually want one. |

Under **Server**, tap the segmented control to pick **BrandMeister** or **Others**.

**BrandMeister**: tap the server row to open the **BrandMeister servers** bottom sheet. Search by country or hostname, tap a master to select it. Port is `54006` and you don't need to change it.

**Others**: tap the server row to open the **Servers** bottom sheet listing TGIF, FreeDMR, ADN Portugal. Tap one to select it — host, port, and hash format are filled in. You can override host/port/hash format manually after.

Tap **Save**. The new profile appears in the list. Tap its radio to make it active.

### Connect

Back on the **Connection** tab, tap **Connect**. The hero card walks through the same states as on desktop (Connecting → Authenticating → Connected → Ready).

### Pick a talkgroup

Switch to the **PTT** tab (bottom-left). Tap the **TG** badge in the AppBar (top right of the screen — it'll say *No TG* if none is selected). The talkgroup picker opens as a bottom sheet:

- **Type a numeric ID** (try `9990`). Two cards appear: *Use 9990 as talkgroup* and *Use 9990 as private call*. Tap the talkgroup card.
- **Or search by name**: type "parrot" to find it from the BrandMeister CSV. Tap the result.

The sheet closes and the TG badge in the AppBar updates to `TG 9990`.

### Make your first transmission

Press and hold the big red **TX** button at the bottom of the PTT screen. Hint text below says *Hold to transmit* (or *Tap to transmit* in toggle mode). The TX meter goes live, the elapsed timer ticks, and the button turns brighter red.

Release. After about a second, Parrot replays your audio back through the speaker (or whichever audio output you're using).

If you can't hear yourself, see [Troubleshooting](./troubleshooting).

> If you've bound a hardware key (volume button, headset button, BT remote) in Settings, you can use that instead of the on-screen button. See [PTT Modes](./ptt-modes).

:::

## Receiving audio

While you're connected, any traffic on your active talkgroup plays through your output device automatically. The **call card** (desktop bottom bar / Android PTT screen) shows the active transmission's:

- **Source ID** — the transmitting station's DMR ID.
- **Callsign** (when registered).
- **Talker alias** — live name string sent over the air, when supported.
- **Group ID** — which talkgroup the traffic is on.

When the transmission ends, the card flips back to *Idle*.

## Switching talkgroups

The talkgroup picker (left panel on desktop, bottom sheet on Android) lets you change which talkgroup you're listening to. Type a search, tap/click a result, and the subscription updates immediately. See [Talkgroups](./talkgroups) for the full picker walk-through, including favorites, the activity indicator, and per-profile aliases.

Some popular talkgroups to try once Parrot works:

| ID | Name | Activity |
|---|---|---|
| 91 | Worldwide | Always busy |
| 92 | Europe | Regional |
| 235 | UK | National |
| 268 | Portugal | National |
| 269 | Switzerland | National |
| 9990 | Parrot | Echo test (your audio only) |

> Talkgroup numbers are network-specific. The list above is BrandMeister; TGIF and FreeDMR have their own numbering. Names are loaded from the BrandMeister CSV bundled with VoxDMR — on Homebrew networks, the picker shows the IDs but not the names unless you've assigned a [custom alias](./talkgroups#renaming-talkgroups).

## Once it works

Open Settings → Connection (or the Session card on Android) and tick **Auto-connect**. From then on, VoxDMR connects on launch with no extra clicks.

VoxDMR also keeps you connected after a drop or network switch on its own — see [Auto-reconnect](./auto-reconnect). It's on by default.

## Next steps

- [Server Profiles](./server-profiles) — keep multiple network configs side by side and switch with a tap.
- [Talkgroups](./talkgroups) — favorites, the activity indicator, per-profile aliases.
- [PTT Modes](./ptt-modes) — push-to-talk vs toggle, rebinding the PTT key, hardware buttons on Android.
- [Audio Settings](./audio-settings) — pick devices, adjust gain.
