# Talkgroups

The talkgroup picker on the main window is where you spend most of your time in VoxDMR. This page covers selecting a talkgroup, building up your favorites list, the live activity indicator, and private calls.

## The picker

The picker has three controls stacked top to bottom:

1. **Search field**: `Search talkgroups or enter ID…`
2. **Private call** checkbox.
3. **List body**, which shows your favorites by default and matching results when you type.

The list updates as you type. There's no "apply" button anywhere. Click a row and VoxDMR immediately sends a subscription update to the master.

## Selecting a talkgroup

There are four ways to put a talkgroup on the air:

**From your favorites.** Click any favorite row. The row turns blue and that talkgroup becomes active.

**From a search result.** Start typing into the search field. Results matching by name or ID appear under a **More results** heading (capped at 8 rows). Click one to switch to it.

**By exact ID.** Type a numeric ID and press **Enter**. If the ID isn't in the database, VoxDMR uses it as a custom TG anyway. Useful for regional or private talkgroups that aren't in the bundled list.

**From the keyboard.** With the search field empty, **↑ / ↓** highlight a favorite and **Enter** activates it. Fast for jumping between a couple of TGs without leaving the keyboard.

## Marking a talkgroup as a favorite

When you search and the result you want isn't already a favorite, the **More results** section shows it with a **★** button next to the name. Click the star to save it. The TG drops out of the search results and into your favorites list.

If the talkgroup you want isn't in the bundled database (a custom or regional one), select it first by typing the ID and pressing Enter; once it's the active TG, you can star it the same way.

## Managing favorites

Click a favorite to make it active. The selected favorite shows a small action strip on the right:

- **📌 Pin**: move this favorite to the top of the list.
- **🔓 / 🔒 Lock**: toggle the **private call** flag for this favorite. Locked = private call destination (see below).
- **🗑 Trash**: remove this favorite from the list.

To **reorder**, hold the left mouse button on a favorite and drag it up or down. Drop on the row where you want it. The new order saves automatically.

Keyboard shortcuts on the highlighted favorite:

| Key | Action |
|---|---|
| **↑ / ↓** | Move highlight up or down |
| **Enter** | Activate (subscribe to) the highlighted TG |
| **Alt + ↑ / ↓** | Reorder up or down |
| **Delete** | Remove from favorites |
| **Esc** | Cancel an in-progress drag |

Favorites persist across launches in `config.toml` (in your [config directory](./installation)).

## The activity indicator

Each favorite row has a colored dot on the left edge. It tells you what's happening on that talkgroup at a glance:

| Dot | Meaning |
|---|---|
| 🟢 **Green** | Active talkgroup. What you're listening to, and what your PTT will transmit on. |
| 🟡 **Amber** | Live activity within the **last 30 seconds**. Somebody is talking or just finished. The row also shows the speaker, e.g. `← G4ABC John`. |
| ⚫ **Gray** | Idle. No recent traffic. |

The activity feed comes from BrandMeister's live last-heard stream over a WebSocket. You don't have to be tuned to a TG to see its dot turn amber. Glance at the list, see where the action is, click to join in.

The amber state expires 30 seconds after the last update, so if a Stop event gets lost the dot still clears on its own.

> The live feed is read-only and unauthenticated, so no extra setup is needed. If your network blocks `api.brandmeister.network`, dots stay gray but everything else (RX, TX, subscriptions) still works.

## Private calls

Some DMR IDs are individual users or fixed nodes rather than groups. Calling one of those is a **private call** in DMR terms. Addressed to a single ID, not fanned out to a group.

There are two ways to make a private call:

**Ad-hoc**: type the destination ID, toggle **Private call**, and click. The next transmission is routed as a private call. The flag stays set until you toggle it off.

**Saved as a favorite**: when you have a private destination active, click the **🔓 lock** icon on its action strip to save it as a private-call favorite. The icon turns into 🔒 and the row label gets a `(private)` suffix. From then on, picking that favorite automatically sets the private-call flag.

The activity indicator is suppressed for private-call favorites. BrandMeister still publishes events for those IDs, but the dot would be misleading (you'd see other people's traffic to that ID, not yours), so VoxDMR keeps it gray.

## Switching while transmitting

If you press PTT and then click a different talkgroup, VoxDMR finishes your transmission on the old TG before subscribing to the new one. You won't accidentally key up on the wrong group.

## Where favorites are stored

Favorite IDs and the private-call flag are part of `config.toml` in the [config directory](./installation). Editing the file by hand is supported but rarely necessary. The in-app picker covers everything.

## Next steps

- [PTT Modes](./ptt-modes). Push-to-talk vs toggle, and rebinding the PTT key.
- [Audio Settings](./audio-settings). Input/output devices, gain, level meter.
- [Troubleshooting](./troubleshooting). Connection, audio, and firmware issues.
