# First Connection

## Adding a Server Profile

1. Open VoxLink and tap the **Servers** tab.
2. Tap the **+** button to create a new profile.
3. Fill in the following fields:
   - **Name** — a label for this profile (e.g. `My Club Repeater`)
   - **Hostname** — the reflector address, for example `vps.ngen.org`
   - **Port** — the TCP port provided by your admin (commonly `5300`)
   - **Talkgroup** — the talkgroup number you want to join, for example `999`
   - **Callsign** — your callsign as it will appear to other stations
   - **Auth Key** — the HMAC-SHA1 authentication key provided by your reflector admin
4. Tap **Save**.

> Double-check the auth key carefully — an incorrect key is the most common reason for a failed first connection.

## Connecting

1. On the **Servers** tab, tap the profile you just created.
2. Tap **Connect**. The status indicator will show **Connecting…** and then **Connected** once the TCP handshake and authentication succeed.
3. You will see your assigned talkgroup and any currently connected nodes appear.

## Making Your First Transmission

1. Tap the **PTT** tab to open the transmit screen.
2. VoxLink defaults to **Hold** mode — press and hold the large **PTT** button to transmit, release to stop.
3. While transmitting, the **TX** level meter shows your microphone signal in dBFS. Aim to keep peaks around −10 dB to −6 dB.
4. When another station transmits, the **RX** meter becomes active and the active talker's callsign (e.g. `CT2GNH-M`), name, and location are displayed above the meter.

> On your very first transmission, announce your callsign and confirm you can hear other stations. This verifies both TX and RX are working correctly.
