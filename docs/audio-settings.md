# Audio Settings

VoxDMR's audio settings live in **Settings → Audio**. Two device pickers, two gain sliders, one off-air monitor toggle. The level meters on the main window are how you actually tune the gains.

## Input device

The microphone or line input VoxDMR captures from. The picker lists every input device the OS exposes. On Linux that's PulseAudio / PipeWire / ALSA; on Windows, WASAPI shared-mode endpoints.

VoxDMR remembers the device by its name. If you hot-swap headsets, the picker updates and VoxDMR re-selects the saved device by name on next launch (with a fallback to the system default if it's gone).

> Capture is fixed at 48 kHz mono internally. The vocoder needs 8 kHz; VoxDMR resamples on the fly. You don't need to set anything special in the OS.

## Output device

Where received audio plays. Same shape as the input picker. Headphones strongly recommended for a desktop client to avoid feedback when you're set up next to your microphone.

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
- [Talkgroups & Nodes](./talkgroups-nodes). Favorites and the activity indicator.
- [Troubleshooting](./troubleshooting). Common audio issues and fixes.
