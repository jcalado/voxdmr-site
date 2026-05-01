# Talkgroups & Nodes

VoxDMR's talkgroup picker is the main control surface during normal use. This page covers the picker, favorites, the live activity indicator, and private-call destinations.

## The picker

The talkgroup picker on the main window has two modes:

- **Empty search field**: shows your **favorites list** in the order you put them in.
- **Search field with text**: searches the full BrandMeister talkgroup database (thousands of entries) by name or numeric ID. Hit Enter on a match to switch.

Clicking a talkgroup switches immediately, VoxDMR sends a subscription update to the master and starts receiving traffic for the new TG. There's no "apply" button; the change is live the moment you click.

## Favorites

Favorites are how you keep the talkgroups you actually use one click away.

**Adding a favorite.** Search for the TG, click the **★** next to it. The star fills in. The TG appears at the bottom of your favorites list.

**Removing a favorite.** Click the **★** on a favorite row to un-star it. It's removed from the list.

**Reordering favorites.** Hold the left mouse button on a favorite, then drag up or down. Drop on the row where you want it. The new order is saved automatically.

**Keyboard navigation.** When the search field is empty, **↑ / ↓** move a highlight through the favorites and **Enter** activates the highlighted one. This is the fastest way to flip between a couple of TGs without touching the mouse.

Favorites are saved to the on-disk config and persist across launches.

## The activity indicator

Each favorite row has a colored dot to its left. The dot tells you, at a glance, what's happening on that talkgroup:

| Dot | Meaning |
|---|---|
| 🟢 **Green** | This is your **active** talkgroup. What you're listening to and what your PTT will transmit on. |
| 🟡 **Amber** | Live activity on this TG within the **last 30 seconds**: somebody is talking or just finished talking. The row also shows their callsign or name (e.g. `← G4ABC John`). |
| ⚫ **Gray** | Idle. No recent traffic. |

The activity feed comes from BrandMeister's live last-heard stream, which VoxDMR subscribes to at startup. You don't have to be tuned to a TG to see its dot turn amber. That's the point. Glance at your favorites, see where the action is, click to jump in.

The amber state expires 30 seconds after the last update, so if a transmission ends and the Stop event gets lost, the dot clears on its own.

> The live feed is read-only and unauthenticated, so no extra setup is needed. If your network blocks `api.brandmeister.network`, dots stay gray but everything else (RX, TX, subscriptions) still works.

## Private-call favorites

Some DMR IDs are individual users or fixed nodes rather than talkgroups. Calling one of those is a **private call** in DMR terms. Addressed to a single ID instead of a group.

To save a node or user as a private-call favorite:

1. Type the destination ID into the search field.
2. Toggle **Private call** in the picker.
3. Star it.

A private-call favorite is labelled `(private)` next to its name. The activity indicator is **suppressed** for private favorites, BrandMeister publishes private-call events and the dot would be misleading (you'd see somebody else's traffic to that ID, not yours).

Calling a private favorite uses the same PTT and audio flow as a group call; the BrandMeister master routes the audio to a single recipient instead of fanning it out.

## Switching talkgroups while transmitting

If you press PTT, then click a different TG, VoxDMR finishes your transmission on the old TG before subscribing to the new one. You won't accidentally key up on the wrong group.

## Where favorites are stored

Favorite IDs and the private-call flag are part of `config.toml` in the [config directory](./installation). Editing the file by hand is supported but rarely necessary. The in-app picker covers everything.

## Next steps

- [PTT Modes](./ptt-modes). Push-to-talk vs toggle, and rebinding the PTT key.
- [Audio Settings](./audio-settings). Input/output devices, gain, level meter.
- [Troubleshooting](./troubleshooting). Connection, audio, and firmware issues.
