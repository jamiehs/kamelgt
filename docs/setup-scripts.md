# Setup Scripts

Two scripts manage car setups: `fetch-setups` downloads files from Discord and `sync-setups` registers them in `track-data.js`. In normal use, `fetch-setups` chains into `sync-setups` automatically — you rarely need to run them separately.

## fetch-setups

The normal weekly workflow — run this on Tuesday after race day (or whenever you want to pick up what the community posted):

```bash
npm run fetch-setups
```

This downloads all `.sto` attachments from `#audi-setups` and `#nissan-setups` posted in the last 7 days, places them in the correct `public/setups/<car>/<track>/` folder, then automatically chains into `sync-setups` to register everything in `track-data.js`.

**Override the lookback window:**
```bash
npm run fetch-setups -- --days=14
```

**Backfill setups for a specific track:**
```bash
npm run fetch-setups barber
```
Scans up to 2 years of history in both channels and downloads only files that auto-resolve to that track. Files that can't be matched automatically are silently skipped — the interactive prompt is suppressed in this mode to avoid noise from the large history window.

**Requires:** a `.env` file at the project root. Copy `.env.example` and fill in your Discord bot token and channel IDs. See `.env.example` for instructions on creating a bot with the Message Content Intent enabled.

### How track resolution works

Each attachment goes through three stages in order:

1. **Filename tokens** — the filename is split into tokens (e.g. `maf_donington_26s2_r2.sto` → `donington`, `26s2`, `r2`). Each meaningful token is fuzzy-searched against the track index. First hit wins.
2. **Message text** — if no token matched, the message body is searched instead.
3. **Interactive** — if still unresolved, the script prints the filename and message excerpt and prompts you to type a track name. Tab completion is available over all known folder names. Press Enter to skip the file.

Fuzzy matching handles accent differences and alternate spellings without exact names — "panorama" resolves to Bathurst, "americas" to COTA, "rodriguez" to Mexico.

### Author deduplication

Discord is fetched newest-first. If the same person uploads a setup for the same track and type (qual or race) more than once within the window, only the most recent file is downloaded. Older uploads from the same author are silently skipped with a `~` log line. This prevents e.g. mid-week tweaks from causing duplicates.

### Sidecar metadata

Each downloaded `.sto` file gets a companion `.sto.meta.json` written alongside it (gitignored). This records the Discord author ID, display name, timestamp, and message ID. The sync script reads these sidecars to use the exact Discord author ID when pairing qual and race setups, rather than relying on filename inference.

### What to watch out for

- **Skipped files:** if a file is skipped interactively (or the track can't be inferred), it won't be downloaded. You can re-run `npm run fetch-setups <track>` to try again with a specific track target, or download manually and use `sync-setups`.
- **New tracks:** if a downloaded file resolves to a folder that doesn't exist in `track-data.js`, `sync-setups` will prompt you to enter a track title and create a new export. Remember to also add it to `season-setups.js` manually.
- **Shared setups** (e.g. two tracks that use identical setup arrays in `track-data.js`): these are flagged and skipped — add them manually to both exports.
- **Orphaned qualifying setups:** if a qual file arrives with no matching race (neither in the new batch nor already in `track-data.js`), it's rejected with a warning. Quals without a race partner aren't useful on their own.

---

## sync-setups

Registers `.sto` files that are already on disk into `track-data.js`. Normally called automatically by `fetch-setups`, but you can run it directly when adding setups manually.

### Adding setups manually

Drop the `.sto` files into the correct folder:

```
public/setups/<car>/<track>/
```

Where `<car>` is `audi90gto` or `nissangtpzxt`, and `<track>` is the kebab-case track folder name (e.g. `summit-point`, `laguna-seca`).

Then run:

```bash
npm run sync-setups
```

This detects new untracked files via git, parses filenames for qualifying/race type and sibling pairing, shows a preview, and surgically inserts the entries into `track-data.js`. Qualifying setups always appear above their race sibling. You confirm per track before anything is written.

### Qual/race pairing

The script pairs files by stem (same filename with the Q/R token removed). If stems don't match exactly — e.g. a qual is versioned `Q00` and its race is `R01` — it falls back to loose matching by author prefix and season. Author identity from sidecar metadata takes priority over filename inference for this matching.

### Setup budget

Each car/track combo is soft-capped at 4 race setups. Qualifying setups don't count toward the budget. When adding new setups would exceed the cap, the script flags the oldest race setups (by season) for removal and offers three options: skip pruning, accept suggestions, or review interactively. When a race setup is removed, its paired qualifying setup is also removed automatically.

"Alien" setups (JDelOlmo, Andrius temperature-specific setups) are worth keeping regardless of age — use interactive mode and say no to those.

### Seeding an existing track

If a track already exists in `track-data.js` as a stub (title only, no setups yet) and you have old setups on disk, use:

```bash
npm run sync-setups <track>
```

For example, `npm run sync-setups cota` will scan all `.sto` files in `public/setups/*/cota/`, skip any already registered, and add the rest. This also works for backporting setups from a prior season.

### After running the script

Review with `git diff src/data/track-data.js`, then commit the setup files and the track-data change together.
