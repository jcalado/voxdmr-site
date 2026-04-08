# Server Profiles

VoxLink stores all reflector connection details as named profiles so you can switch between networks quickly.

---

## Adding a Profile

1. Tap the **Servers** tab.
2. Tap **+** (add profile).
3. Enter the following details:

| Field | Description |
|---|---|
| **Name** | A friendly label for this profile |
| **Hostname** | Reflector hostname or IP address |
| **Port** | TCP port (ask your admin; commonly `5300`) |
| **Talkgroup** | Talkgroup number to join on connect |
| **Callsign** | Your callsign as broadcast to other stations |
| **Auth Key** | HMAC-SHA1 key provided by the reflector administrator |

4. Tap **Save**.

---

## Authentication

VoxLink authenticates to SvxLink Reflector Protocol V2 servers using **HMAC-SHA1**. The auth key is a shared secret between your client and the reflector server. Keep it private — do not share it publicly or commit it to version-controlled files.

> If authentication fails, the status will show **Auth Error**. Re-check the auth key character by character; it is case-sensitive.

---

## Switching Profiles

To switch to a different server:

1. Tap the **Servers** tab.
2. Tap the target profile.
3. Tap **Connect**.

If you are already connected, VoxLink disconnects from the current server before connecting to the new one.

---

## Importing and Exporting Profiles

Profiles can be transferred between devices as JSON files.

**Export:** Tap **Settings > Profiles > Export**. VoxLink writes a `.json` file to your device's Downloads folder.

**Import:** Tap **Settings > Profiles > Import** and select a previously exported JSON file. Existing profiles with matching names will be overwritten.

> Use export/import to quickly deploy a pre-configured profile to club members without them having to type in credentials manually.
