# Auto-reconnect

Keep your session alive across dropped links and network changes without touching the app.

**Auto-reconnect is on by default.** When VoxDMR loses its connection unexpectedly, it reconnects on its own and re-subscribes to the talkgroup you were on — you don't have to tap **Connect** again.

## What it does

When auto-reconnect is enabled, VoxDMR watches the link and steps in whenever it drops for a reason you didn't ask for:

- **The connection drops** — a timeout, a server-side error, or the link going quiet.
- **The network changes** — switching between Wi-Fi and cellular, or moving between Wi-Fi networks (Android detects this and forces an immediate reconnect rather than waiting for a timeout).

When that happens, VoxDMR:

1. Retries with **exponential backoff** — starting at ~2 seconds and growing to a cap of ~60 seconds between attempts, with a little random jitter so retries don't all land at once. It keeps trying indefinitely.
2. **Re-authenticates** with the active profile and **re-subscribes to your last talkgroup**, so you land back exactly where you were.
3. Shows the progress in the status indicator while it works — *Reconnecting… (attempt N)* on Android, *Connecting* on desktop.

## When it stops trying

Auto-reconnect only gives up in two cases:

- **You disconnect on purpose** — tapping/clicking **Disconnect** ends the session for good; it won't reconnect behind your back.
- **Authentication fails** — if the server rejects your credentials (wrong password or hash format), VoxDMR stops instead of hammering the server with a password it already knows is bad. Fix the credentials and connect again. See [Troubleshooting](./troubleshooting).

Everything else — flaky Wi-Fi, NAT timeouts, a server hiccup, a tunnel through a dead zone — is treated as recoverable and retried.

:::desktop

Open **Settings** (the gear icon) and go to the **Connection** tab. Under the **CONNECTION** card you'll find the **Auto-reconnect** checkbox, just below **Auto-connect on launch**. Tick it to enable, untick to disable. The change takes effect immediately.

With it off, an unexpected drop leaves you at **Disconnected** and you reconnect manually.

:::

:::mobile

Open **Settings** and find the **Auto-reconnect** toggle (circular-arrows icon), described as *Reconnect automatically when the connection drops or the network changes*. It's on by default; flip it off to disable.

On Android, auto-reconnect also reacts to **network changes** — hand-off from Wi-Fi to cellular (or back) triggers a fast reconnect instead of waiting for the old connection to time out. If you run VoxDMR with the persistent notification (background mode), the session is held alive across the backoff so you don't miss traffic while it re-establishes.

> If VoxDMR is being killed in the background and you see repeated disconnect-then-reconnect cycles tied to screen-off, that's a battery-optimization issue, not auto-reconnect doing its job — see [Troubleshooting → Disconnects every few minutes](./troubleshooting#disconnects-every-few-minutes).

:::

## Next steps

- [First Connection](./first-connection) — get on a talkgroup and make your first transmission.
- [Server Profiles](./server-profiles) — keep multiple network configs and switch with a tap.
- [Troubleshooting](./troubleshooting) — auth failures, NAT timeouts, and background-kill issues.
