# About room animation

`src/components/NeonRoom.tsx` connects to the existing theme context. It keeps
both optimized source images mounted and waits for both to load before running
transitions. Separate GSAP timelines tell the evening and morning stories.
Cleanup cancels pending transitions on theme changes and unmount. Ambient CSS
animations stay mounted through transitions and pause offscreen, in hidden tabs,
or with the pause button. Reduced motion shows the selected state immediately.

The scene includes a lighting dip to conceal the image swap, a tinted window,
sunlight, dust, continuous steam, candle glow and extinguishing smoke, LED glow,
a monitor cursor, delayed paw prints, and Neon annotations. Phone and tablet
layouts show the complete frame so Neon stays visible.

## Artwork boundaries

The PNGs are flattened artwork, not independently animated objects. The character,
desk, monitor, chair, and sleeping cat change together under the lighting dip.
Existing lighting in each PNG remains baked in; overlays enhance it. Cat return
is part of the morning reveal, not a separately delayed character animation.

To match the entire DOCX specification, supply registered transparent layers for
the character poses/hands, curtains, plants, sleeping Neon, and an empty room
background with clean areas behind those objects. Independent typing, breathing,
curtain/plant motion, and separately controlled baked lighting need those assets.
Keep the same 1448 × 1086 coordinate system across both scenes.

## Manual checks

- Toggle light → dark → light; check both image states and delayed annotations.
- Toggle repeatedly during the lighting dip; the final theme must win.
- Pause during a transition; the selected state should settle and ambient motion stop.
- Enable reduced motion; theme changes should be immediate and ambient motion absent.
- Check phone, tablet, and desktop widths, especially the cat and annotation placement.
- Navigate away during a transition; no delayed animation should affect another page.
