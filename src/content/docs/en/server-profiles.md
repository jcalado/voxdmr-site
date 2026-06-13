# Server Profiles

VoxDMR can hold as many network configurations as you need — one per network, per shack, per role, whatever. A **profile** bundles together:

- A **label** (your name for it)
- A **DMR ID** (so different family members or different IDs can share one install)
- A **protocol** (BrandMeister via Rewind, or any of the MMDVM/Homebrew networks)
- A **server** (master hostname + port, or curated entry, or custom)
- A **password** specific to that network
- A **callsign** (optional, used by Homebrew networks)
- Its own **talkgroup favorites and aliases** (see [Talkgroups](./talkgroups#renaming-talkgroups))

Switching profiles disconnects, swaps in the new config, and reconnects.

## Why multiple profiles?

A few real cases:

- **You're on BrandMeister and TGIF.** Different networks, different passwords, different talkgroup numbers. Keep one profile per network and switch when you want to QSY.
- **You run a portable rig and a home rig with different IDs.** Each profile has its own DMR ID.
- **You're testing a Homebrew master.** A throwaway profile is safer than rewriting your working BrandMeister setup.
- **You travel.** Keep a regional master per country and switch when you cross a border.

:::desktop

### Where they live

**Settings → Connection** has a **PROFILES** card at the top. Each profile shows as one row:

```
● Home          1234567
  BrandMeister · 2682.master.brandmeister.network:54006        Edit  Delete
```

- The **filled radio** (●) marks the active profile.
- Click any hollow radio (○) to switch to that profile.
- **Label**, **DMR ID**, **protocol**, and **server line** are all visible at a glance.
- **Delete** is greyed out on the active profile and on the only remaining profile (VoxDMR always needs one).

### Adding a profile

Click **+ Add profile** below the list. An inline form appears with these fields:

- **Label** — your short name for this profile.
- **DMR ID** — the 7-digit ID this profile uses.
- **Password** — the network password for this profile.
- **Callsign** — optional, used by Homebrew networks.

Under the **Server** heading, two buttons let you pick the protocol:

- **BrandMeister** — Rewind protocol. The picker below becomes the BrandMeister master directory (fetched live).
- **Others** — Homebrew protocol. The picker becomes the curated Homebrew server list (TGIF, FreeDMR, ADN Portugal) with a *Custom server…* option.

For **Custom server…**, three extra fields appear:

- **Host** — the master hostname or IP.
- **Port** — Homebrew masters typically use `62031`; BrandMeister masters use `54006`.
- **Hash format** (Homebrew only) — **Raw** (default) or **Hex ASCII**. The vast majority of Homebrew networks use Raw; try Hex ASCII only if authentication keeps failing.

Click **Save**. The new profile appears in the list.

### Editing a profile

Click **Edit** on any row to load that profile into the same form. The **Password** field shows a placeholder *Password (leave blank to keep current)* — only fill it in if you want to change it. Everything else is editable.

### Switching profiles

Click the radio button on any inactive profile. VoxDMR:

1. Disconnects from the current server.
2. Loads the new profile (DMR ID, protocol, server, password, callsign, aliases, favorites).
3. If **Auto-connect** is enabled, connects to the new server.

The main window footer updates to reflect the new server.

### Deleting a profile

Click **Delete** on any row. There's no confirmation — the row disappears. Delete is disabled on the active profile (switch first) and on the only remaining profile.

:::

:::mobile

### Where they live

Tap the **Connection** tab in the bottom navigation. The **Identity** card at the top shows the active profile's label and DMR ID — or *Not configured* if you're starting fresh. Tap it to open the **Profiles** screen.

Each profile is a row with a radio button, label, DMR ID, and overflow menu (⋮).

### Adding a profile

Tap **+ Add profile** at the bottom of the Profiles screen. The form opens as a full-screen modal with the same fields as desktop: **Label**, **DMR ID**, **Password**, **Callsign**, and a **Server** section with the **BrandMeister** / **Others** segmented button.

**BrandMeister**: tap the server row to open the **BrandMeister servers** bottom sheet. Search by country or hostname; tap a master to select it.

**Others**: tap the server row to open the **Servers** bottom sheet. Tap one of the curated entries (TGIF, FreeDMR, ADN Portugal) to fill in host + port + hash format. You can still edit them manually below.

The **Hash Format** dropdown (Homebrew only) offers **Raw (default)** or **Hex-ASCII**.

Tap **Save**.

### Switching profiles

Tap the radio button on any inactive profile. If you're connected, you'll see a snackbar — *Switching to {label}… reconnecting*. VoxDMR tears down the old connection and starts the new one.

### Deleting a profile

Tap the overflow menu (⋮) on a row and choose **Delete profile**. A confirmation dialog appears. The only remaining profile can't be deleted.

:::

## How profiles are stored

:::desktop

Profiles live in `config.toml` in the config directory ([paths](./installation#where-voxdmr-desktop-stores-things)). Each profile is a `[[profiles]]` table with all its fields. Aliases are nested per profile as a `talkgroup_aliases` map. The active profile is recorded by index.

You can edit the file by hand for bulk changes (rare; the in-app editor covers everything), but please close VoxDMR first so the changes aren't overwritten on save.

:::

:::mobile

Profiles live in the app's private data directory. They're managed entirely through the in-app UI; there's no direct file editing path on Android.

:::

## Switching while transmitting

If you press the radio on a different profile while you're keyed up, VoxDMR finishes the current transmission first, then tears down the connection and switches. You won't accidentally key the wrong network.

## Next steps

- [Talkgroups](./talkgroups) — favorites, the activity indicator, and per-profile aliases.
- [Troubleshooting](./troubleshooting) — what to check when a profile won't connect.
