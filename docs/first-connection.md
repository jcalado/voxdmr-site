# First Connection

Set up a server profile, connect to a reflector, and make your first transmission.

![Add Server form](/docs/add-server.png)

## Adding a Server Profile

1. Open VoxLink and tap the **Servers** tab.
2. Tap **+** to create a new profile.
3. Fill in the following fields:
   - **Name** — a label for this profile (e.g. `My Club Repeater`)
   - **Hostname** — the reflector address (e.g. `vps.ngen.org`)
   - **Port** — the reflector port, usually `5300`
   - **Talkgroup** — the talkgroup to join (e.g. `999`)
   - **Callsign** — your callsign as it will appear to other stations
   - **Auth Key** — the authentication key from your reflector admin
4. Tap **Save**.

> Double-check the auth key — it's case-sensitive and the most common reason for a failed first connection.

## Connecting

1. On the **Servers** tab, tap the profile you just created.
2. The status indicator changes to **Connecting…** and then **Connected**.
3. The PTT screen shows your talkgroup and any connected nodes.

![PTT screen](/docs/ptt-screen.png)

## Making Your First Transmission

1. Tap the **PTT** tab.
2. VoxLink defaults to **Latch** mode — tap the **PTT** button to start transmitting, tap again to stop.
3. The **TX** meter shows your mic level. Aim for peaks between −10 dB and −6 dB.
4. When another station transmits, the **RX** meter activates and the talker's callsign (e.g. `CT2GNH-M`), name, and location appear above it.

> On your first transmission, announce your callsign and confirm you can hear other stations. This verifies both TX and RX are working.
