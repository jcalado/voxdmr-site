# Car Mode

Car mode is a large, glanceable full-screen layout for driving. Everything is sized to read at a glance and key with a single tap, so you can stay on a talkgroup without taking your eyes off the road.

> **Android only.** Car mode is an Android feature — there's no desktop equivalent. It lives under **Settings → Car mode**.

## The driving screen

Car mode replaces the normal PTT screen with a single big readout:

- **A large callsign** of whoever is talking, filling the width of the screen.
- **A bare talkgroup number** for the group you're on — just the number, big, no chrome.
- **Colour-coded state.** The screen has three states that read at a glance:
  - **Idle** — a dimmed grey `Listening…`, with the last-heard callsign and a coarse "how long ago" label.
  - **Receiving** — a warm accent `Receiving` chip with the incoming callsign lit up.
  - **Transmitting** — a red `ON AIR` pill with your TX timer.

The layout keeps every element in a fixed slot, so the big callsign never jumps around as the state changes.

![Car mode idle on a Hytera P50 PoC radio: a dimmed grey callsign (ON3JDK) with a "Jean · 10s ago" last-heard label above the bare talkgroup number 91 with cycle arrows](/screenshots/android-car-mode-idle.webp)

![Car mode receiving on a Hytera P50 PoC radio: a "Receiving" chip above a bright lit callsign (YG3AUH, Irfan) and the bare talkgroup number 91](/screenshots/android-car-mode-rx.webp)

![Car mode transmitting on a Hytera P50 PoC radio: a red "ON AIR" pill with a running TX timer (0:07) on a red screen, the talkgroup number 98 dimmed below](/screenshots/android-car-mode-tx.webp)

On larger (non-compact) screens a **favourites rail** lets you switch talkgroups with a tap (or the D-pad) — down the side in landscape, along the bottom in portrait. On compact screens (keypad/PoC radios) there's no rail; you cycle talkgroups with the ◄ ► arrows instead. If [scan](./talkgroups) is armed, a colour-coded scan badge shows its state — tap it to exit scan. See [Talkgroups](./talkgroups) for how scan works.

![Car mode on a larger phone (portrait): the Receiving state with a big callsign (KG4LYA, Francisco) and a favourites rail along the bottom — talkgroup buttons 91 (selected), 92, 268, and 2681](/screenshots/android-car-mode-rail.webp)

![The same car-mode screen with scan armed: a green "Scan ▸ 91" badge above the callsign shows scan is locked onto talkgroup 91, with the favourites rail (91, 92, 93, 268) along the bottom](/screenshots/android-car-mode-scan.webp)

## Entering and leaving car mode

There are several ways in, all opt-in:

- **Launch button** — turn this on to add a **Car mode** shortcut to the PTT screen (and the nav drawer). Off by default.
- **Toggle key** — bind a hardware key; pressing it opens car mode, pressing it again closes it. Handy for a steering-wheel or headset button. Unbound by default.
- **Open when charging** — auto-enter when the phone starts charging, e.g. when you drop it into a car dock. Off by default.
- **Open on Bluetooth** — auto-enter when a chosen paired device connects, and leave when it disconnects. Pick the trigger devices in the same setting. Needs Bluetooth permission. Off by default.
- **Open on start** — always enter car mode when the app launches. Off by default.

To leave, use the system **Back** gesture/button, or whichever trigger you came in on (press the toggle key again, or disconnect the Bluetooth device).

## Touch to PTT

With **Touch to PTT** on (the default), the whole screen is the PTT button — tap or press-and-hold anywhere to key up, following your usual [PTT mode](./ptt-modes) (push-to-talk or toggle). It's the easiest way to transmit without hunting for a small button while driving.

Turn it off if you'd rather key up only with a bound hardware button — a physical PTT key on a rugged phone, or a headset — so a stray touch can't transmit. Your bound hardware PTT key works in car mode either way.

## Keeping the screen on

Two optional display settings help while the phone is mounted:

- **Keep screen awake** keeps the display on while car mode is open, so it won't dim mid-QSO. It layers on top of the app-wide keep-screen-on setting and reverts when you leave car mode. Off by default.
- **Full brightness** forces the screen to maximum brightness in car mode for daylight readability. Off by default.

## Stale callsigns

When car mode is idle it keeps showing the last callsign it heard, with a coarse "ago" label (e.g. `12s ago`). If you've since switched to a **different** talkgroup, that stale callsign is tagged with the group it was actually heard on — e.g. `12s ago @ 91` — so an old identity isn't mistaken for current activity on the talkgroup you're now watching. While you're still on the same talkgroup, nothing extra is shown.

## Settings → Car mode

All car-mode settings live under **Settings → Car mode** (Launch, auto-enter, Bluetooth):

| Setting | What it does | Default |
|---|---|---|
| **Launch button** | Adds a car-mode shortcut to the PTT screen | Off |
| **Touch to PTT** | Tap the screen to transmit | On |
| **Toggle key** | Hardware key that enters / exits car mode | Unbound |
| **Full brightness** | Forces the screen to maximum brightness | Off |
| **Keep screen awake** | Keeps the display on while car mode is open | Off |
| **Open when charging** | Auto-enters when the phone starts charging | Off |
| **Open on start** | Enters car mode whenever the app launches | Off |
| **Open on Bluetooth** | Auto-enters when a chosen paired device connects | Off |
| **Trigger devices** | The Bluetooth device(s) that trigger car mode | None |

## Next steps

- [PTT Modes](./ptt-modes). Push-to-talk vs. toggle, hardware keys, and hiding the on-screen button.
- [Talkgroups](./talkgroups). Favourites, private calls, and scan.
- [Troubleshooting](./troubleshooting). When PTT or hardware keys misbehave.
