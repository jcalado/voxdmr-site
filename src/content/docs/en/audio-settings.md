# Audio Settings

VoxDMR's audio settings live in **Settings → Audio** on desktop, and in the **Audio** section of the **Settings** tab on Android. Two gain sliders, plus a few platform-specific extras. The level meters on the main window (desktop) or the PTT screen (Android) are how you actually tune the gains.

## Platform differences at a glance

| | Desktop | Android |
|---|---|---|
| Input/output device picker | Yes — pick exact OS endpoints | No — uses the Android system route (speaker / earpiece / headset / BT) |
| RX gain range | 1× – 32× (default 4×) | 1× – 10× (default 4×) |
| TX gain range | 0.1× – 4.0× (default 0.5×) | 0.1× – 4.0× (default 0.5×) |
| RX AGC (Auto level) | Yes | Yes |
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

Linear multiplier applied to incoming decoded audio before it hits the output device. Range **1× to 32×** (default **4×**).

If the other station sounds quiet, raise it. If they distort, drop it. RX gain is purely local. It doesn't affect what the network sends you, just how loud you hear it.

## TX gain

Linear multiplier applied to your microphone signal before it goes into the AMBE+2 encoder. Range **0.1× to 4.0×** in 0.1 steps (default **0.5×**).

Setting TX gain right is the most common new-user audio task. The tools to dial it in:

1. Turn on **Monitor mic level off-air** (below).
2. Speak at your normal voice level into the mic, watching the **TX** meter on the main window's bottom bar.
3. Adjust TX gain until your peaks land in the **yellow** zone with occasional brushes into red but no clipping.

If the **CLIP** indicator on the right side of the TX meter latches red, your peaks are saturating the encoder and other stations will hear distortion. Drop TX gain until clip stops triggering, then click CLIP to reset the latch.

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
