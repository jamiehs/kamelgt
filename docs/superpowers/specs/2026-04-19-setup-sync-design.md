# Setup Sync Script — Design Spec
**Date:** 2026-04-19

## Overview

A Node.js script (`scripts/sync-setups.js`) that automates adding newly downloaded iRacing setup files to `track-data.js`. Run via `npm run sync-setups` after dropping new `.sto` files into the correct `public/setups/<car>/<track>/` folder.

## Background

Each week, racers share setups on the KamelGT Discord. Currently these are manually downloaded, organized into car/track folders, and wired into `track-data.js` by hand. The drag-and-drop + snippet workflow in VS Code works for file organization but the `track-data.js` editing is the main time sink. This script automates that step with a verification preview before writing.

## Scope

Two cars: `audi90gto`, `nissangtpzxt`

Setup files are binary (encrypted) — no metadata can be read from file contents. All parsing is filename-based only.

## Data Flow

1. **Discover** — `git ls-files --others --exclude-standard public/setups/` finds untracked `.sto` files. These are definitionally "new" — downloaded but not yet processed.
2. **Parse paths** — extract `car` and `track` folder from each file's path.
3. **Map folders → track exports** — build a reverse map from file paths already present in `track-data.js` entries (e.g. `summit-point` → `SUMMIT_POINT`).
4. **Parse filenames** — tokenize and detect Q/R type; pair siblings by stem matching.
5. **Load existing entries** — dynamic `import()` of `track-data.js` to read current setups per car/track.
6. **Generate preview** — print per-track verification output.
7. **Confirm** — interactive prompts per track.
8. **Write** — bracket-counting text splice into `track-data.js`.

## Filename Parsing

Filenames are tokenized by splitting on `_`, `-`, `.`, and space (case-insensitive).

**Qualifying keywords:** `q`, `qualy`, `quali`, `qualifying`
**Race keywords:** `r`, `race`
**Default (no suffix found):** race

Ambiguous files (e.g. no clear Q/R token) are flagged in the preview:
```
[AMBIGUOUS — defaulting to race]
```

## Sibling Pairing

Q and R files are paired by stripping the **last** Q/R token from the filename stem and comparing the remainder. Using the last token avoids false matches when a Q/R-like character appears earlier in the name (e.g. `A90_Q_Fuji_R.sto` → strip last token `R` → stem `A90_Q_Fuji`). Example:
- `A90_Fuji_Y_Gijsen_Q.sto` → stem `A90_Fuji_Y_Gijsen`
- `A90_Fuji_Y_Gijsen_R.sto` → stem `A90_Fuji_Y_Gijsen`
- Same stem → paired siblings

In `track-data.js` output, the qualifying entry always appears directly above its race sibling. Unpaired files are listed individually with no ordering constraint.

## Verification Preview

Before any writes, a per-track summary is printed:

```
audi90gto / summit-point  (+2 new, 8 existing → suggest pruning to 4)
  ADD:    maf_summit_25s2_q1.sto               [QUAL]
  ADD:    maf_summit_25s2_r1.sto
  KEEP:   A90_SummitPoint_25S2_Y_Gijsen_Q.sto  [QUAL]
  KEEP:   A90_SummitPoint_25S2_Y_Gijsen_R.sto
  REMOVE? A90_SummitPoint_21S2_Y_Gijsen_Q.sto  [older season]
  REMOVE? A90_SummitPoint_21S2_Y_Gijsen_R.sto  [older season]
  REMOVE? JdelOlmoSummitPointR.sto             [no season detected]
  REMOVE? SummitPoint22c.sto                   [older season]
```

## Pruning

Pruning is suggested when a car/track combo would exceed 4 setups after additions. Season strings (`23s2`, `24s1`, etc.) are detected in filenames to identify older setups. Flagging order: oldest seasons first, then setups with no season detected (ambiguous). Files with no season detected are never auto-removed under `[a]` — only surfaced in `[i]` interactive mode.

When pruning is suggested, three options are offered:

```
  [s] Skip pruning — keep everything
  [a] Accept suggestions — auto-remove flagged entries
  [i] Interactive — review each flagged setup one at a time
```

Interactive mode shows each flagged file with default **N** (keep):
```
  Remove JdelOlmoSummitPointR.sto? (y/N)
```

The script never removes a file without an explicit `y`. The 4-setup limit is a soft suggestion — skipping is always valid (e.g. for "alien" setups or temperature-specific setups worth keeping regardless of age).

## Writing to track-data.js

Reads existing data via dynamic `import()`. Finds insertion points using bracket-counting character scan — locate `"car": [` within the target track export, then count `[`/`]` to find the matching closing bracket. This is reliable given the shallow structure of setup entries (flat objects, no nested arrays).

New setups are appended at the end of the car's array for that track. Q/R sibling pairs are always inserted as a unit with Q first.

If a track export exists but is missing a car key entirely (e.g. no `"nissangtpzxt"` key), the script treats it as an empty array and inserts the new car key + entries before the closing `}` of the `setups` object.

Tracks that share setups via reference (e.g. `ARAGON_MOTORCYCLE_GP = { setups: ARAGON_OUTER.setups }`) are detected and skipped with a warning — these cannot be safely modified by text splice.

## New Track Handling

If a setup file's folder has no corresponding export in `track-data.js`, the script prompts:

```
New track detected in public/setups/audi90gto/lime-rock-classic/
  Enter track title: Lime Rock Park - Classic
  → Creating export LIME_ROCK_CLASSIC in track-data.js
  → Remember to add it to season-setups.js manually
```

The export name is derived from the title by uppercasing and replacing non-alphanumeric characters with `_`. A full export block is generated with both car arrays pre-populated, then appended to `track-data.js`.

## npm Script

```json
"sync-setups": "node scripts/sync-setups.js"
```

No new runtime dependencies. Node built-ins only.

## Out of Scope

- Standardizing filenames (originals are preserved as-is)
- Reading metadata from `.sto` file contents (binary/encrypted)
- Automatically updating `season-setups.js` (schedule ordering is manual)
- Uploading or syncing files remotely
