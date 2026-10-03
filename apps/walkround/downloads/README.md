# WalkRound desktop installers

Drop signed public installers here (GitHub Pages hosts this folder as static files):

| File | Button id | Public URL |
| --- | --- | --- |
| `WalkRound.dmg` | `download-mac` | `/apps/walkround/downloads/WalkRound.dmg` |
| `WalkRound-Setup.exe` | `download-windows` | `/apps/walkround/downloads/WalkRound-Setup.exe` |

Product page section: `/apps/walkround/#download`

When files are uploaded, on `apps/walkround/index.html`:

1. Remove `site-button--coming-soon` from both download anchors.
2. Remove `aria-disabled="true"` and `tabindex="-1"`.
3. Update or remove the `#download-status` coming-soon note.
