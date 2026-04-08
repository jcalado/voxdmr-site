# Talkgroups & Nodes

---

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

---

## Connected Nodes

The **Stations** tab lists every node currently linked to your talkgroup on the reflector. Each entry shows the node identifier as reported by the server.

The list updates in real time as nodes connect and disconnect. An empty list means you are the only station connected to that talkgroup.

---

## Active Talker

While a station is transmitting, VoxLink displays the following information above the RX meter on the **PTT** screen:

| Field | Example |
|---|---|
| Callsign | `CT2GNH-M` |
| Name | `Manuel` |
| Location | `Lisbon, Portugal` |

This information is broadcast by the reflector and sourced from the transmitting station's registration details. Not all reflectors populate all fields — some may show the callsign only.
