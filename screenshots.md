# Screenshots needed

Capture these 5 screenshots and drop them into `public/screenshots/` as both `.png` and `.webp` (e.g. `setup-card.png` + `setup-card.webp`). The gallery in `src/App.tsx` already references these exact filenames — once present, the gallery renders without code changes.

## Capture specs

- **Resolution:** 1280×800 final size (16:10 aspect ratio).
  - Capture at 2× (2560×1600) on a HiDPI display if possible, then downscale.
- **Window chrome:** crop OFF. Capture the app's content area only — no title bar, no taskbar.
- **Theme:** the app's default dark theme.
- **WebP:** export at quality ~85, keeps file size ~30–40% smaller than PNG.
- **Real data:** use a live BrandMeister connection with real talkgroup activity for shots 2 and 3 — placeholder/empty states look dead.

## The five shots

### 1. `setup-card` — First-launch setup
The marquee shot. Explains the legal-posture story visually.

- App state: no firmware provisioned (delete `~/.local/share/voxdmr/firmware/` to force this).
- Visible: the setup card with "VoxDMR needs MD-380 firmware to encode and decode audio", the two source URLs (`md380.org/...` and `raw.githubusercontent.com/...`), and the **Download (≈2 MB)** button highlighted/focused.
- Optional alt: progress mid-download (`Downloading MD-380 firmware… 1.2 / 2.3 MB`) — second variant if you want a "before/after" pair.

### 2. `main-idle` — Connected and ready
The "this is what you'll see most of the time" shot.

- Connection status: **Ready** or **Connected**.
- Visible: talkgroup picker / search list with at least one favorite starred, RX panel empty, bottom-bar PTT button visible.

### 3. `main-rx` — Receiving audio
The dynamic moment.

- Another station transmitting on the active talkgroup.
- Visible: RX panel showing src ID, callsign, talker alias, group ID. RX audio meter active.
- Wait for an interesting traffic moment (a callsign that looks good in screenshots — your own club's repeaters, maybe).

### 4. `settings-firmware` — Firmware status
Proves the runtime-loading is real.

- Open Settings → Firmware tab.
- Visible: "Loaded from: ~/.local/share/voxdmr/firmware/" with both files showing ✓ valid, plus the **[Verify]** and **[Reinstall…]** buttons.

### 5. `settings-connection` — Connection settings
Shows the app is configurable.

- Open Settings → Connection tab.
- Visible: BrandMeister master picker (open or showing a selected master), DMR ID + password fields, default talkgroup picker, auto-connect toggle.
- Sanitize the password (real value would be a hash anyway, but blur if visible).

## Skipped intentionally (lower signal)

- About page — redundant with the hero brand display.
- Audio tab — device pickers look the same in every app.
- Interface tab — niche, mostly color/PTT-key tweaks.

## Filename convention

```
public/screenshots/
├── setup-card.png
├── setup-card.webp
├── main-idle.png
├── main-idle.webp
├── main-rx.png
├── main-rx.webp
├── settings-firmware.png
├── settings-firmware.webp
├── settings-connection.png
└── settings-connection.webp
```

Filenames are case-sensitive and must match `src/App.tsx`'s gallery section exactly. If you change a filename here, update the corresponding `{ src: "/screenshots/..." }` entry in `App.tsx` too.
