# Talkgroups & Nodes

![Nodes screen](/docs/nodes-screen.webp)

## Talkgroups

A talkgroup is a logical channel on the reflector. Stations on the same talkgroup can hear each other; stations on different talkgroups cannot.

### Setting a Talkgroup

The talkgroup is configured per server profile (see [Server Profiles](/docs/server-profiles)). When VoxLink connects it joins the configured talkgroup automatically.

### Changing Talkgroup Mid-Session

1. Open the **PTT** tab or the main connected screen.
2. Tap the **Talkgroup** selector (shows the current talkgroup number).
3. Select a new talkgroup from the list provided by the reflector.
4. VoxLink switches immediately — no reconnection required.

> Confirm the new talkgroup with a short call before transmitting a long over. Some talkgroups are linked to repeaters or other networks and traffic may be forwarded widely.

### Talkgroup Presets

Each server profile can have a list of **presets** — saved talkgroups with custom labels. Manage them in the server edit form under **Presets**.

- **Add** a preset with a talkgroup number and label (e.g., `1` → "Local", `2` → "ARES")
- **Reorder** presets by dragging them
- **Edit or delete** existing presets

When you tap the talkgroup selector on the PTT screen, your presets appear as a quick-pick list with their labels. You can also enter a talkgroup number manually.

### Monitoring

VoxLink can **monitor** additional talkgroups while you stay on your primary. Audio from monitored talkgroups plays alongside your main TG — you hear everything without switching.

To set up monitoring:

1. Tap the **talkgroup selector** on the PTT screen.
2. Toggle the **monitor** switch next to any talkgroup you want to listen to.
3. Monitored talkgroups appear on the PTT screen below the main talkgroup indicator.

You transmit on your primary talkgroup only. Monitoring is receive-only.

> Monitoring is useful for keeping an ear on a net or emergency channel while working a different talkgroup.

---

## Connected Nodes

The **Stations** tab lists every node currently linked to your talkgroup on the reflector. Each entry shows the node identifier as reported by the server.

The list updates in real time as nodes connect and disconnect. An empty list means you are the only station connected to that talkgroup.

Idle nodes (connected but not recently active) are grouped into a collapsible **Idle** section at the bottom of the list.

---

## Active Talker

While a station is transmitting, VoxLink displays the following information above the RX meter on the **PTT** screen:

| Field | Example |
|---|---|
| Callsign | `CT2GNH-M` |
| Name | `Paulo` |
| Location | `Aveiro, Portugal` |

This information is broadcast by the reflector and sourced from the transmitting station's registration details. Not all reflectors populate all fields — some may show the callsign only.
