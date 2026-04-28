# Server Profiles

Save multiple reflector connections and switch between them quickly.

![Servers screen](/docs/servers-screen.webp)

## Adding a Profile

1. Tap the **Servers** tab, then **+**.
2. Enter the hostname, port (default `5300`), talkgroup, your callsign, and auth key.
3. Tap **Save**.

The auth key is provided by your reflector admin. It's case-sensitive — if connection fails with **Auth Error**, re-check it character by character.

After saving, VoxLink offers to set up [talkgroup presets](/docs/talkgroups-nodes#talkgroup-presets) for the new server right away. Skip if you'll add them later — you can always reach the same screen from the active server menu.

## Quick Setup from a QR Code or Link

Reflector operators can publish a `voxlink://` link (often as a QR code) that prefills the new-server form. Scan or tap the link and VoxLink opens the **Add server** sheet with the host, port, name, callsign, password, and default talkgroup already filled in — review and tap **Save**.

The link shape is:

```
voxlink://{host}:{port}/?name={name}&user={user}&pass={pass}&tg={tg}
```

All query parameters are optional. Anything not supplied falls back to the form defaults.

## Switching Servers

1. Tap the **Servers** tab.
2. Tap the profile you want to connect to.

VoxLink disconnects from the current server automatically before connecting to the new one.

## Import / Export

Share profiles between devices or club members as JSON files.

- **Export** — **Settings > Profiles > Export** saves a `.json` file to your Downloads folder.
- **Import** — **Settings > Profiles > Import** and select a JSON file.

> Importing overwrites existing profiles with the same name. Export your profiles first if you want to keep a backup.
