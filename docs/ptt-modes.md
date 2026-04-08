# PTT Modes

VoxLink supports three PTT modes. Change the active mode in **Settings > PTT > Mode**.

---

## Latch

Tap the **PTT** button once to start transmitting. Tap again to stop. Useful for longer overs where you don't want to keep a finger on the screen.

---

## Hold (Default)

Press and hold the **PTT** button to transmit. Release to stop. This is the default mode and mirrors traditional radio behaviour — transmission ends the moment you lift your finger.

---

## VOX (Voice-Activated)

Transmission starts automatically when your microphone picks up audio above the sensitivity threshold and stops after a configurable hang time of silence.

Two settings control VOX behaviour (**Settings > PTT > VOX**):

| Setting | Description |
|---|---|
| **Sensitivity** | How loud audio must be to trigger TX. Increase to avoid false triggers from background noise. |
| **Hang Time** | How long (in seconds) VoxLink keeps transmitting after speech stops before dropping TX. |

> In noisy environments, increase sensitivity and shorten hang time to avoid accidentally keying up. In quiet environments, lower sensitivity for easier triggering.

---

## Timeout Timer (TOT)

TOT prevents excessively long transmissions. Configure it at **Settings > PTT > Timeout Timer**.

- **Duration** — maximum continuous TX time in seconds. Set to 0 to disable.
- When the limit approaches, VoxLink vibrates to warn you.
- A countdown is displayed on the **PTT** screen during the final seconds.
- When the timer expires, TX is cut and you must release and re-press **PTT** to transmit again.

> TOT is useful on nets that have transmit-time limits, and helps prevent accidental locked transmissions in Latch mode.
