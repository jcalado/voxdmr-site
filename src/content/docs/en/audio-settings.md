# Audio Settings

VoxDMR's audio settings live in **Settings → Audio** on desktop, and in the **Audio** section of the **Settings** tab on Android. Two gain sliders, plus a few platform-specific extras. The level meters on the main window (desktop) or the PTT screen (Android) are how you actually tune the gains.

## Platform differences at a glance

| | Desktop | Android |
|---|---|---|
| Input/output device picker | Yes — pick exact OS endpoints | No — uses the Android system route (speaker / earpiece / headset / BT) |
| RX gain range | −12 to +12 dB slider (7 = 0 dB unity, 2 dB/step) | Same |
| TX gain range | −12 to +12 dB slider (7 = 0 dB unity, 2 dB/step) | Same |
| RX AGC (auto level) | Yes — opt-in, off by default | Yes — opt-in, off by default |
| TX AGC | Removed (manual gain only) | Removed (manual gain only) |
| Monitor mic level off-air | Yes | No — meters always live while screen is on |

:::desktop

## Input device

The microphone or line input VoxDMR captures from. The picker lists every input device the OS exposes. On Linux that's PulseAudio / PipeWire / ALSA; on Windows, WASAPI shared-mode endpoints.

VoxDMR remembers the device by its name. If you hot-swap headsets, the picker updates and VoxDMR re-selects the saved device by name on next launch (with a fallback to the system default if it's gone).

> Capture is fixed at 48 kHz mono internally. The vocoder needs 8 kHz; VoxDMR resamples on the fly. You don't need to set anything special in the OS.

:::

:::desktop

## Output device

Where received audio plays. Same shape as the input picker. Headphones strongly recommended on a desktop client to avoid feedback when you're set up next to your microphone.

:::

:::mobile

## Routing

Android handles input and output routing for you — VoxDMR captures from whichever mic is currently active (built-in, wired headset, BT headset) and plays through whichever output is active (speaker, earpiece, headset). Plug in a wired headset or pair a BT device and Android switches automatically; VoxDMR follows.

There's no in-app device picker on Android. If you want to force playback through the earpiece instead of the speaker, use Android's media output picker (lock-screen / quick-settings).

:::

## RX gain

Manual gain applied to incoming decoded audio before it hits the output device. The slider runs from **−12 dB to +12 dB** in 2 dB steps, with the centre setting (**7**) at **0 dB** (unity gain). It is not a linear multiplier.

If the other station sounds quiet, raise it. If they distort, drop it. RX gain is purely local. It doesn't affect what the network sends you, just how loud you hear it.

### RX AGC (auto level)

**Off by default.** RX AGC is an opt-in automatic leveler that rides the incoming audio toward a consistent loudness instead of applying a fixed gain. Turn it on if stations arrive at wildly different levels and you'd rather not chase the slider yourself; leave it off for a plain, predictable manual gain.

## TX gain

Manual gain applied to your microphone signal before it goes into the AMBE+2 encoder. Same slider as RX: **−12 dB to +12 dB** in 2 dB steps, with the centre setting (**7**) at **0 dB** (unity gain).

> **There is no TX auto-level.** Earlier builds had a TX AGC toggle; it has been removed on both platforms. TX is always a manual gain now.

Setting TX gain right is the most common new-user audio task. The tools to dial it in:

1. Turn on **Monitor mic level off-air** (below).
2. Speak at your normal voice level into the mic, watching the **TX** meter on the main window's bottom bar.
3. Adjust TX gain until your peaks land in the **yellow** zone with occasional brushes into red but no clipping.

If the **CLIP** indicator on the right side of the TX meter latches red, your peaks are saturating the encoder and other stations will hear distortion. Drop TX gain until clip stops triggering, then click CLIP to reset the latch.

:::important

**Always check how you actually sound on the air.** The meters above show what you're feeding the encoder — but the real test is hearing yourself on the network. Use a **hoseline**, a web player that streams a talkgroup's live audio:

1. Open **[hose.brandmeister.pt](https://hose.brandmeister.pt)** and select **TG 98**.
2. Key up in VoxDMR and talk normally for a short test (keep it under the **180-second** time-out).
3. Watch the **VU meter** on the hoseline page. It should stay in the **green** the whole time, with only slight, sporadic peaks into the **yellow**.

If it spends more than the occasional brief peak in the yellow, your audio is too hot. **Reduce TX gain** and retest until you're happy with the result.

:::

## Monitor mic level off-air

Off by default. When on, the TX meter is always live, showing your mic level even when you're not transmitting. Useful for setting TX gain without keying up onto a real talkgroup.

Turn it off again once you're tuned in. Otherwise the meter is a constant distraction.

## The level meters

Both the **TX** (microphone, top) and **RX** (receive, bottom) meters on the main window are 24-segment LED-style bars:

- **Range**: -48 dBFS at the left to 0 dBFS at the right (2 dB per segment).
- **Color zones**: green up to -16 dBFS, yellow -16 to -6, red above -6.
- **Peak-hold marker**: a thin white line that snaps up to your peak and decays slowly, so you can see momentary peaks even after the bar drops.
- **Numeric readout**: dBFS to the right of the bar.
- **CLIP indicator** (TX only): latches red when the input crosses -0.087 dBFS (digital full scale). Click to clear.

Aim for **green-with-some-yellow** during normal speech. Solid yellow with brushes into red on louder syllables is the sweet spot for the AMBE+2 encoder. Constant red or any clipping means you're too hot.

## Next steps

- [PTT Modes](./ptt-modes). Push-to-talk vs toggle, rebinding the PTT key.
- [Talkgroups](./talkgroups). Favorites and the activity indicator.
- [Troubleshooting](./troubleshooting). Common audio issues and fixes.
