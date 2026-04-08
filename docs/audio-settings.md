# Audio Settings

Audio settings are found under **Settings > Audio**.

---

## Codec

VoxLink uses the **Opus** codec configured as follows:

| Parameter | Value |
|---|---|
| Sample rate | 16 kHz mono |
| Frame size | 20 ms |
| Bitrate | 20 kbps VBR |

Opus is optimised for voice at low bitrates and handles lossy mobile connections well. The configuration is fixed and does not require adjustment.

---

## Level Metering

The **PTT** screen shows two real-time level meters:

- **TX meter** — your microphone level while transmitting (RMS, displayed in dBFS)
- **RX meter** — incoming audio level while receiving

Aim to keep TX peaks between −10 dB and −6 dB. Clipping above 0 dBFS causes distortion on the receiving end.

---

## Mic Gain

**Settings > Audio > Mic Gain** — adjustable from **0 % to 200 %**.

The default of 100 % passes the raw microphone signal. Increase if your voice is too quiet for other stations; decrease if you are overdriving the input. A hardware-level audio limiter (−1 dB ceiling, 10:1 ratio) protects against clipping regardless of the gain setting.

---

## RX Volume

**Settings > Audio > RX Volume** — adjustable from **0 % to 200 %**.

Controls the playback level of received audio independently of the Android system volume. 100 % is unity gain.

---

## Audio Output Route

Three output destinations are available under **Settings > Audio > Output**:

| Option | Use case |
|---|---|
| **Speaker** | Hands-free, loudspeaker |
| **Earpiece** | Private listening, phone-style |
| **Bluetooth** | Wireless headsets and earpieces |

---

## Audio Input Source

Three microphone sources are available under **Settings > Audio > Input**:

| Option | Notes |
|---|---|
| **Voice Comms** | Recommended. Android-optimised source for telephony with echo cancellation and noise suppression. |
| **Microphone** | Raw microphone input; no telephony processing. |
| **Voice Recognition** | High-quality raw input intended for speech recognition workloads. |

> Use **Voice Comms** unless you have a specific reason not to — it applies Android's built-in noise suppression and acoustic echo cancellation, which significantly improves audio quality on noisy mobiles.

---

## Audio Processing Pipeline

| Stage | Detail |
|---|---|
| Resampler | Polyphase FIR resampler converts between device sample rate and the 16 kHz codec rate |
| Jitter buffer | Adaptive buffer absorbs network timing variations; includes packet loss concealment (PLC) to mask lost packets |
| Limiter | −1 dB ceiling, 10:1 ratio applied to the TX path before encoding |
