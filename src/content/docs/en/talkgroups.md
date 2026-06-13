# Talkgroups

The talkgroup picker is where you spend most of your time in VoxDMR. This page covers selecting a talkgroup, building up your favorites list, the live activity indicator, private calls, and renaming talkgroups with custom aliases.

> **Per-profile.** Favorites and aliases are scoped to the **active profile**. Switching to a different profile loads its own list. See [Server Profiles](./server-profiles).

:::desktop

### The picker

The picker is the **left panel** of the main window. Layout, top to bottom:

1. **Search field**: `Search talkgroups or enter ID…`. Auto-focused on launch.
2. **Sections** appear as muted grey headers, only when they have rows to show:
   - **DMR ID** — when you've typed a numeric ID that isn't already in favorites. Two cards: *Use {id} as Talkgroup* and *Use {id} as Private call*.
   - **Favourites** — your saved talkgroups, with the activity indicator.
   - **Results** — database matches from the BrandMeister CSV (only when you're searching and BrandMeister-connected).

Click a row and VoxDMR immediately sends a subscription update to the server.

### Selecting a talkgroup

There are four ways to put a talkgroup on the air:

**From your favorites.** Click any favorite row.

**From a search result.** Start typing — results matching by name or ID appear under **Results**. Click one to switch.

**By exact ID.** Type a numeric ID. The **DMR ID** section shows up with *Use {id} as Talkgroup* (and *Private call*, see below). Click the talkgroup card. This works for IDs the database doesn't know about — regional or private TGs, or Homebrew-network TGs that aren't in the BrandMeister CSV.

**From the keyboard.** With the search field empty, **↑ / ↓** highlight a favorite and **Enter** activates it.

### Marking a talkgroup as a favorite

Each search result has a **★** button next to the name. Click it to add the TG to favorites. The row drops out of search results and into the favorites list.

If the talkgroup you want isn't in the bundled CSV (custom, regional, or another network's), select it by ID first; once it's active, star it.

### Managing favorites

Click a favorite to make it active. The selected favorite shows a small action strip on the right:

- **📌 Pin** — move this favorite to the top of the list.
- **🔓 / 🔒 Lock** — toggle the **private call** flag (see below).
- **🗑 Trash** — remove from favorites.

To **reorder**, hold the left mouse button on a favorite and drag it up or down. Drop on the row where you want it. The new order saves automatically.

Keyboard shortcuts on the highlighted favorite:

| Key | Action |
|---|---|
| **↑ / ↓** | Move highlight up or down |
| **Enter** | Activate (subscribe to) the highlighted TG |
| **Alt + ↑ / ↓** | Reorder up or down |
| **Delete** | Remove from favorites |
| **Esc** | Cancel an in-progress drag |

### Renaming talkgroups

You can give any talkgroup a custom name that overrides the database. The alias is **per-profile** — your BrandMeister profile and your TGIF profile can each give `91` a different label.

**Right-click any favorite or search result** and the **Rename talkgroup** modal appears:

- **Official** name from the database is shown for reference (or `—` if unknown).
- **Custom name** field — type your alias here.
- **Reset** — only enabled when an alias is already set; clears it and falls back to the official name.
- **Cancel** / **Save**.

The alias is used everywhere the TG is shown: favorites list, search results, footer ("TG 91 · World-wide"), and the call card.

Useful for:

- **Homebrew TGs** that aren't in the BrandMeister CSV — give them a recognisable name once and never look them up again.
- **Local nicknames** — "Coffee net" instead of `91`, "Dad" instead of a private-call ID.
- **Multi-language shacks** — rename `268` to "Portugal" or "Portuguesa" depending on which profile you're in.

:::

:::mobile

### The picker

The talkgroup picker on Android is a **bottom sheet** opened from the **TG badge** in the AppBar of the PTT screen (top right; it shows *No TG* if none is selected, or *TG {id}* otherwise).

Layout:

1. **Sticky search field** at the top — `Search by name or DMR ID…`.
2. **DMR ID** section when you've typed digits-only — two cards: *Use {id} as talkgroup* and *Use {id} as private call*, each with a star toggle.
3. **FAVOURITES** section — your saved TGs (only when search is empty).
4. **ALL TALKGROUPS** / **RESULTS** — database rows or search matches.

Tap a row to subscribe; the sheet closes and the AppBar updates.

### Marking a favourite

Tap the **★** on any row to save (or unsave) the TG to favorites. The sheet stays open so you can star several without reopening it.

### Renaming talkgroups

**Long-press any TG row** in the picker — favorite, search result, or one of the *Use {id} as…* cards. The **Rename talkgroup {id}** dialog opens:

- *Official: {csv_name}* is shown for reference.
- **Custom name** field, max 48 chars.
- **Reset** — clears the alias and falls back to the official name.
- **Cancel** / **Save**.

The alias is "used everywhere this ID is shown" — same scope as desktop, same per-profile storage.

:::

## Private calls

Some DMR IDs are individual users or fixed nodes rather than groups. Calling one of those is a **private call** in DMR terms — addressed to a single ID, not fanned out to a group.

**Desktop:** when you have a private destination active, click the **🔓 lock** icon in the action strip to save it as a private-call favorite. The icon flips to 🔒 and the row label gets a `(private)` suffix. Or, in the DMR ID section, click **Use {id} as Private call** instead of *Talkgroup*.

**Android:** from the DMR ID section, tap **Use {id} as private call**. The TG badge in the AppBar shows the private flag, and (if you starred it) the favorite row carries a person icon and `(private)` suffix.

The activity indicator (below) is suppressed for private-call favorites. BrandMeister still publishes events for those IDs, but the dot would be misleading (you'd see *other people's* traffic to that ID, not yours), so VoxDMR keeps it grey.

## The activity indicator

Each favorite row has a coloured dot on the left edge. It tells you what's happening on that talkgroup at a glance:

| Dot | Meaning |
|---|---|
| 🟢 **Green** | Active talkgroup. What you're listening to, what your PTT will transmit on. |
| 🟡 **Amber** | Live activity within the **last 30 seconds**. Somebody is talking or just finished. The row also shows the speaker (e.g. `← G4ABC John`). |
| ⚫ **Gray** | Idle. No recent traffic. |

The activity feed comes from BrandMeister's live last-heard stream over a WebSocket. You don't have to be tuned to a TG to see its dot turn amber.

> **BrandMeister only.** The live feed is a BrandMeister service. When the active profile is on a Homebrew network (TGIF, FreeDMR, ADN…) the dots stay grey. On Homebrew, the activity feed doesn't exist; you find out who's talking by hearing them.

You can disable the dots entirely from **Settings → Interface → Live BrandMeister activity dots** (desktop) if you'd rather not have the network traffic — it's purely informational and not needed for RX, TX, or subscribing.

The amber state expires 30 seconds after the last update, so if a Stop event gets lost the dot still clears on its own.

> The live feed is read-only and unauthenticated, so no extra setup is needed. If your network blocks `api.brandmeister.network`, dots stay grey but everything else (RX, TX, subscriptions) still works.

## Switching while transmitting

If you press PTT and then pick a different talkgroup, VoxDMR finishes your transmission on the old TG before subscribing to the new one. You won't accidentally key up on the wrong group.

## Where favorites and aliases are stored

Favorites and per-profile aliases live inside each profile's section of `config.toml` on desktop, and inside the per-profile config blob on Android. They follow you across profile switches but aren't shared between profiles. See [Server Profiles](./server-profiles).

## Next steps

- [Server Profiles](./server-profiles) — keep multiple networks side by side.
- [PTT Modes](./ptt-modes) — push-to-talk vs toggle, and rebinding the PTT key.
- [Audio Settings](./audio-settings) — input/output devices, gain, level meter.
- [Troubleshooting](./troubleshooting) — connection, audio, and firmware issues.
