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

Each server profile can have a list of **presets** — saved talkgroups with custom labels.

Open the presets screen via either:

- The active server's menu on the **Servers** tab → **Talkgroups**, or
- The server edit form → **Talkgroup Presets**.

From there you can:

- **Add** a preset with a talkgroup number and label (e.g., `1` → "Local", `2` → "ARES")
- **Reorder** presets by dragging them
- **Edit or delete** existing presets
- **Toggle the headphones icon** on any preset to monitor that talkgroup by default whenever you connect to this server

When you tap the talkgroup selector on the PTT screen, your presets appear as a quick-pick list with their labels. You can also enter a talkgroup number manually.

### Stepping Through Presets

When the active server has two or more presets, the PTT screen shows **‹** and **›** chevron buttons on either side of the talkgroup label. Tap them to cycle through your presets (with wrap-around) without opening the picker.

### Monitoring

VoxLink can **monitor** additional talkgroups while you stay on your primary. Audio from monitored talkgroups plays alongside your main TG — you hear everything without switching.

There are three ways to monitor a talkgroup:

1. **Default per preset** — In the presets screen, tap the headphones icon on any preset. That talkgroup is monitored every time you connect to the server.
2. **Toggle from the picker** — Tap the talkgroup selector on the PTT screen and toggle the headphones icon next to any preset. Changes persist as the preset's default.
3. **Monitor an arbitrary TG** — In the picker, tap **Monitor another TG…**, type a number, and confirm. The TG is added as a monitored channel for this server (no preset needed). Toggle its headphones icon again later to stop monitoring it.

Monitored talkgroups appear on the PTT screen below the main talkgroup indicator. You transmit on your primary talkgroup only — monitoring is receive-only.

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
