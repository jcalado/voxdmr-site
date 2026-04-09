# PTT Modes

VoxLink has three push-to-talk modes. Switch between them in **Settings > PTT > Mode**.

![PTT screen](/docs/ptt-screen.webp)

## Latch (Default)

Tap the **PTT** button to start transmitting, tap again to stop. Good for longer overs where holding the button isn't practical.

## Hold

Press and hold **PTT** to transmit, release to stop. Works like a traditional radio handset.

## VOX (Voice-Activated)

Transmits automatically when you speak above a set threshold. Stops after a period of silence (hang time).

| Setting | Path | Default | Range |
|---|---|---|---|
| **Threshold** | **Settings > PTT > VOX Threshold** | −30 dB | −50 to −10 dB |
| **Delay** | **Settings > PTT > VOX Delay** | 1000 ms | 500–3000 ms |

**Threshold** controls how loud you need to speak to trigger TX. Raise it in noisy environments to avoid false triggers. **Delay** is how long VoxLink holds TX open after you stop speaking.

> In noisy environments, raise the threshold and shorten the delay. In quiet settings, lower the threshold for easier triggering.

## Timeout Timer (TOT)

Automatically ends your transmission after a set duration. Configure in **Settings > PTT > Timeout Timer**.

- **Duration** — default **3 minutes**. When the timer runs out, TX stops and a countdown shows during the final seconds.
- **Warning** — vibrates **15 seconds** before timeout (configurable from **5–30 s** in **Settings > PTT > TOT Warning**, or toggle off entirely).

> TOT helps prevent accidental locked transmissions in Latch mode and is useful on nets with transmit-time limits.
