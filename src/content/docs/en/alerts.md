# Alerts

VoxDMR can tell you when a station you care about comes on the air — and, on Android, speak what's happening so you can follow the radio without looking at it. Both arrived in [v0.16.0](./changelog).

## Followed stations

Follow a station and VoxDMR alerts you when it comes up on your talkgroup, or calls you privately. The chime plays over the call, so you can bring the volume up or grab the radio while the station is still talking.

### How stations are matched

- Follow by **callsign or DMR ID**. Following a callsign brings in **every DMR ID** the local DMR ID database has for it — hotspot IDs included, so the station is recognised whether it comes in through a repeater, a hotspot or another terminal.
- A callsign the database doesn't know can still be followed: VoxDMR asks once, then recognises it **by callsign** as soon as the caller's lookup lands during the call.
- Your own transmission echoed back by the network never alerts.

### Where to follow from

- Type a callsign or DMR ID into the followed-stations list in Settings, **or** open any call in the QSO log and tap **Follow** in its details.
- Followed callers carry a **★** in the QSO log.
- The list travels in a [settings backup](./server-profiles).

### Alert settings

- **Quiet period** — after an alert, the same station doesn't alert again until this much time passes (default **10 min**), so a long contact doesn't alert at every over. Set it to **Off** to alert on every call.
- **Include scan hits** — also alert when a followed station is heard on another talkgroup through [scan](./talkgroups) or a static talkgroup. Off, only your selected talkgroup and private calls to you alert.

:::desktop

### On desktop

Open **Settings → Alerts**. Add stations at the top, and pick how you're told under **Alert**:

- **Sound** — a short chime, played over the call.
- **Notification** — an OS notification ("CT1ABC is on the air", with name and talkgroup). It shows even with VoxDMR in the background, makes no sound of its own, and a newer alert for the same station replaces the older one.
- **Sound and notification** (default), or **Off** to keep the list without alerts.

:::

:::mobile

### On Android

Open **Settings → Alerts** ("Followed stations, sound and vibration"). Under **Alert**:

- **Sound** — a short chime, played over the call. Muting received audio silences the chime, but not the vibration.
- **Vibrate** — on devices without a vibration motor, the sound is used instead.
- **Sound and vibration** (default), or **Off**.

Silent mode is respected — a silenced radio doesn't chime.

:::

:::mobile

## Spoken announcements

**Settings → Alerts → Spoken announcements** uses the device's text-to-speech voice to say what changed, so you can keep the radio in a pocket or on a dashboard. Nothing is ever spoken over a received call or while you transmit, and announcements play at the media volume, like received audio.

Four switches, each its own:

- **Talkgroup on change** — says the number and name of the talkgroup when you change it with the rotary knob or the next/previous keys. Turning fast only announces the one you stop on.
- **Who just spoke** — when a received call ends, spells the station's callsign in the phonetic alphabet ("Last station: Charlie Tango One Alpha Bravo Charlie"). It waits for the call to end so it never talks over the station, and doesn't repeat the same station within 30 seconds.
- **Scan stops on a group** — says which talkgroup [scan](./talkgroups) found activity on, once the found call ends.
- **Link lost and restored** — says when the connection to the server drops and when it comes back. A drop that recovers before there's time to say anything stays silent.

The announcements need a text-to-speech engine with an English voice installed; the setting says so if the device has none.

:::

## Next steps

- [Talkgroups](./talkgroups) — favourites and talkgroup scan, which **Include scan hits** builds on.
- [Audio settings](./audio-settings) — received-call bips, if you want to hear every call start and end, not just followed ones.
