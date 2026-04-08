# Audio Settings

Configure audio in **Settings > Audio**.

![Audio settings](/docs/settings-screen.png)

## Mic Gain

**Settings > Audio > Mic Gain** — **0% to 200%**, default **100%**.

Increase if other stations report your audio is too quiet. Decrease if you're overdriving. A built-in limiter (−1 dB ceiling, 10:1 ratio) prevents clipping regardless of gain.

## RX Volume

**Settings > Audio > RX Volume** — **0% to 200%**, default **70%**.

Controls received audio volume independently of Android system volume.

## Level Metering

The PTT screen shows two real-time meters:

- **TX** — your mic level while transmitting. Aim for peaks between −10 dB and −6 dB.
- **RX** — incoming audio level while receiving.

## Output Route

Choose where you hear audio in **Settings > Audio > Output**:

| Option | Use case |
|---|---|
| **Speaker** | Hands-free, loudspeaker |
| **Earpiece** | Private listening |
| **Bluetooth** | Wireless headsets |

## Input Source

Choose your mic source in **Settings > Audio > Input**:

| Option | Notes |
|---|---|
| **Voice Comms** | Recommended — includes echo cancellation and noise suppression |
| **Microphone** | Raw input, no processing |
| **Voice Recognition** | Raw high-quality input |

> Stick with **Voice Comms** unless you have a reason to change it. Android's built-in noise suppression makes a big difference on mobile.

## Codec

VoxLink uses Opus at 16 kHz mono, 20 ms frames, 20 kbps VBR. These settings are fixed — no adjustment needed.

## Under the Hood

These are handled automatically and can't be adjusted:

- **Resampler** — converts between your device's sample rate and the 16 kHz codec rate
- **Jitter buffer** — 24-frame capacity with 3-frame pre-buffer, smooths out network timing
- **Packet loss concealment** — fills in missing audio frames to reduce dropouts
- **Limiter** — −1 dB ceiling, 10:1 ratio, 50 ms release, applied before encoding
