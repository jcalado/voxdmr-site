# PoC Radios

A PoC (Push-to-talk over Cellular) radio is an Android handset in a radio body: a real PTT
button under your thumb, a front-firing speaker, usually a channel knob or rocker, and often a
small screen with no touch input. VoxDMR installs on them like any other Android app, and
adapts itself when it recognises the hardware.

Everything on this page is **Android only** — none of it applies to the desktop build.

> Looking for whether *your* radio works? The [radio compatibility list](/radios) has the
> per-model test results, tips and enabler downloads. This page covers what to expect from a
> PoC radio in general.

## What adapts automatically

You don't configure any of this — the app adjusts on its own.

**Compact layout.** On the small, low-density panels these radios use, VoxDMR switches to a
tighter layout with larger tap targets, and opens pop-ups full-screen so they fit. Ordinary
phones are unaffected, including small ones.

**D-pad navigation.** Most PoC radios have no touchscreen. The app runs in directional
navigation mode, so the D-pad moves focus between controls and adjusts sliders rather than
skipping past them.

## What you have to check: 32-bit

Many PoC radios have **32-bit-only processors**. The standard Android build will not install on
them at all — you need the separate 32-bit APK.

:::important

If the Play Store says your device isn't compatible, or the app refuses to install, this is
almost always why. Grab the 32-bit APK from [Installation](/docs/installation).

:::

## Getting the PTT button working

The PTT button on a PoC radio does not always reach apps the way an ordinary button would.
Which of these you need depends on the radio — check your model on the
[compatibility list](/radios).

**It just works.** On many radios VoxDMR receives the PTT button directly. Bind it on the
[PTT Modes](/docs/ptt-modes) screen and you're done.

**It needs an enabler app.** Some radios only hand their PTT button to a companion app. Where
one is needed, the compatibility list links the download for that model. Install it, and VoxDMR
picks the button up from there.

**It only works in the foreground.** On some radios the button reaches VoxDMR only while it is
the app on screen. Others deliver it whatever you're doing, so PTT keeps working with VoxDMR
in the background. The compatibility list records which.

**It stops at the lock screen.** On some radios a secure lock screen blocks hardware buttons
from reaching apps, so PTT goes dead whenever the radio locks. VoxDMR includes an optional
accessibility service that keeps bound keys working while locked — enable it in Android's
accessibility settings. Without it, everything still works with the screen unlocked.

> If your PTT sometimes registers as a double press, you likely have both the radio's own
> support *and* an enabler app forwarding the same button. VoxDMR filters most duplicates, but
> the clean fix is to remove one of the two.

## Channel knobs and rockers

A knob step moves through your favourites, in the order you arranged them on the
[Talkgroups](/docs/talkgroups) screen — so you can change talkgroup without looking at the
radio.

- **Rotary knobs** move one favourite per click, and a fast spin moves as many as you turned.
- **Channel rockers** (up/down buttons rather than a knob) do the same thing. On some radios
  these need the enabler app, same as the PTT button.
- **Bluetooth speaker-mics** with channel buttons work too.

Not every radio's knob is reachable — some are wired to the vendor's own app and never reach
VoxDMR. The compatibility list records this per model.

## Bluetooth PTT accessories

Speaker-mics with a PTT button, like the Inrico B01, work as a remote PTT for VoxDMR. Their
button, channel buttons and SOS button are all picked up.

Pair the accessory in **Android's Bluetooth settings** first. VoxDMR finds it from the paired
list on its own — there is nothing to select inside the app.

:::important

Pair the accessory *before* starting a session. VoxDMR looks for paired accessories when it
connects, so one paired mid-session isn't picked up until you reconnect.

:::

## Radios with extra hardware support

A few radios expose hardware that ordinary Android apps can't reach — status LEDs, launcher
integration, physical softkeys. Where VoxDMR can drive that hardware, it does:

- **Hytera** — status LED, home-screen call card, right softkey, and volume keys that control
  the audio you're actually hearing. See [Hytera P50](/docs/hytera-p50).

These extras are recognised per model. On a radio VoxDMR doesn't recognise they simply don't
appear, and nothing else is affected — there is no risk in installing on an untested radio.

## Next steps

- [Hytera P50](/docs/hytera-p50) — the best-supported radio, documented in full.
- [Radio compatibility list](/radios) — per-model test results and enabler downloads.
- [PTT Modes](/docs/ptt-modes) — binding keys and choosing hold-to-talk or toggle.
- [Car Mode](/docs/car-mode) — the driving screen, with a keypad-friendly variant for
  small-panel radios.
