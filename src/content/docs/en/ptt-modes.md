# PTT Modes

Push-to-talk on VoxDMR is a software trigger. There's a key (or hardware button), an on-screen button, and a setting that controls how either of them behaves. This page covers the two PTT modes and how to bind the trigger to a different key.

## The two modes

**Desktop:** open **Settings → Interface**. The **PTT mode** picker has two choices.

**Android:** open the **Settings** tab. Under **Session**, the **PTT mode** segmented button has two choices.

**Push to talk** (default). Hold the key (or hold the on-screen button) to transmit. Release to stop. The classic radio behavior. This is what you want if PTT is muscle memory for you and you don't want to think about state.

**Toggle / Tap**: tap the key once to start transmitting, tap again to stop. Useful for long announcements, net check-ins, or any situation where holding a key gets uncomfortable.

You can switch modes mid-transmission. The TX state itself doesn't change — only how subsequent presses are interpreted.

:::desktop

## The PTT key

By default, **Spacebar** triggers PTT. You can rebind it to almost any key.

To rebind:

1. Open **Settings → Interface**.
2. Under **PTT key**, click the button that shows the current key (e.g. `Space    Change`).
3. The button changes to `Press a key… (Esc to cancel)`.
4. Press the key you want as your new PTT.
5. The button updates to show the new label. Done. The binding is saved.

If you change your mind mid-capture, press **Esc** or click the button again to cancel.

### What you can bind

- Any **letter or number** (A-Z, 0-9).
- Any **function key** (F1-F12).
- Most **named keys**: Space, Tab, Enter, Insert, Home, End, PageUp, PageDown, the arrow keys, etc.
- Symbols, `,`, `.`, `;`, `[`, `]`, etc.

### What you can't bind

VoxDMR refuses to bind PTT to a **pure modifier** key:

- Shift, Ctrl, Alt, AltGr, Meta / Super / Hyper
- Caps Lock, Num Lock, Scroll Lock

Modifiers are used by the OS and other apps for shortcuts; if PTT was bound to Ctrl you'd key the radio every time you copied something. Press another key during capture and VoxDMR ignores the modifier-only press.

> Modifier **combinations** (e.g. Ctrl+F1) aren't supported either. Only single keys. If you need a hard-to-hit key, F8 / F12 / Insert are common choices that don't conflict with anything else.

:::

:::mobile

## Hardware keys

Android phones don't have a spacebar, but most have **volume keys**, and many headsets or BT remotes expose extra buttons. You can bind any of them to PTT.

1. Open the **Settings** tab.
2. Scroll to the **Hardware** section.
3. Tap **Hardware key binding**. The button enters capture mode — press the key you want to use.
4. Tap again to clear the binding.

Once a hardware key is bound, the **Hide on-screen button** toggle below it becomes available. Turn it on if you'd rather rely entirely on the hardware button and reclaim the screen space.

Bluetooth headset buttons, volume rockers, dedicated PTT keys on rugged phones — all work as long as Android delivers the key event to the foreground app. Some launchers and accessibility services intercept volume keys for their own use; if the bind doesn't trigger PTT, try a different key.

> **Keep screen on** under the same Hardware section keeps the display awake while VoxDMR is in the foreground — useful for net check-ins where you don't want the screen to dim mid-conversation.

:::

## The on-screen button

The big red **TX** button on the main window does exactly what the PTT key does, in whichever mode you're in. It also respects the mode:

- **Push to talk**: press and hold the mouse button on TX to transmit; release to stop.
- **Toggle**: click TX once to start, click again to stop.

Useful if you don't want to or can't use the keyboard. It's disabled until you're connected and subscribed to a talkgroup; hover over it for a tooltip explanation when greyed out.

## How you know you're transmitting

While you're keyed up, three things change:

- The **TX** button on the main window turns solid red.
- The bottom bar shows `TX HH:MM:SS` ticking up. Your transmission length.
- The TX level meter goes live.

When idle, the bottom bar shows a hint instead, `HOLD SPACE` in push-to-talk mode or `TAP SPACE` in toggle mode (with whatever key you've actually bound).

## Window / app focus

**Desktop:** VoxDMR's PTT key works any time the **main window has keyboard focus**. If you're typing into another app and press your PTT key there, VoxDMR doesn't see it. Click the VoxDMR window first.

(VoxDMR doesn't grab a global hotkey. That's a deliberate decision — it would race with desktop shortcut managers and require extra OS permissions.)

**Android:** the hardware-key binding works any time VoxDMR is the foreground app. While the app is in the background, Android routes key events to whatever's in front. To keep PTT available without unlocking the phone, leave VoxDMR foregrounded and turn on **Keep screen on**.

## Edge cases

**Switching modes while transmitting.** Allowed. The current TX continues; only the next key press follows the new mode's rules.

**Disconnecting while transmitting (toggle mode).** TX stops automatically when you disconnect or lose subscription, even if you'd toggled it on. You don't have to remember to tap the key off.

**The key getting stuck.** If your OS swallows the key-up event (e.g. you Alt-Tabbed mid-press in push-to-talk mode), tapping the PTT key once more should clear it. If not, click the on-screen TX button to release.

## Next steps

- [Audio Settings](./audio-settings). Pick mic and output devices, set TX gain.
- [Talkgroups](./talkgroups). Favorites, the activity indicator, and private calls.
- [Troubleshooting](./troubleshooting). When PTT or audio doesn't behave.
