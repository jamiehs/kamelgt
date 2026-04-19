# Setup Sync Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `scripts/sync-setups.mjs` — a CLI that detects new untracked `.sto` setup files via git, parses filenames for Q/R type and sibling pairing, shows a verification preview with pruning suggestions, and surgically updates `src/data/track-data.js`.

**Architecture:** Four pure library modules (`parse-filename`, `git-discover`, `track-map`, `write-track-data`) each tested in isolation, wired together by a main orchestration script that handles interactive I/O via Node's readline. All modules use ES module syntax (`.mjs`) so they can dynamically import the project's existing `track-data.js`. Text modifications to `track-data.js` use bracket-counting character scanning — no AST parser needed given the file's consistent shallow structure.

**Tech Stack:** Node.js built-ins only (`child_process`, `fs`, `readline`, `path`, `url`). Tests via Vitest with `@vitest-environment node` pragma per file.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `scripts/lib/parse-filename.mjs` | Tokenize filenames, detect Q/R type, pair siblings by stem |
| Create | `scripts/lib/git-discover.mjs` | Run `git ls-files` and parse into structured setup objects |
| Create | `scripts/lib/track-map.mjs` | Build folder-name → export-name map from track-data.js text |
| Create | `scripts/lib/write-track-data.mjs` | Bracket-counting insertion/deletion/append on track-data.js |
| Create | `scripts/sync-setups.mjs` | Orchestration: discover → preview → confirm → write |
| Create | `scripts/__tests__/parse-filename.test.js` | Unit tests for parsing |
| Create | `scripts/__tests__/git-discover.test.js` | Unit tests for discovery |
| Create | `scripts/__tests__/track-map.test.js` | Unit tests for folder mapping |
| Create | `scripts/__tests__/write-track-data.test.js` | Unit tests for text splicing |
| Modify | `package.json` | Add `sync-setups` npm script |

---

## Task 1: npm script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add script entry**

In `package.json`, add to the `"scripts"` object:

```json
"sync-setups": "node scripts/sync-setups.mjs"
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: add sync-setups npm script placeholder"
```

---

## Task 2: parse-filename module

**Files:**
- Create: `scripts/__tests__/parse-filename.test.js`
- Create: `scripts/lib/parse-filename.mjs`

- [ ] **Step 1: Write the failing tests**

Create `scripts/__tests__/parse-filename.test.js`:

```js
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { detectType, getStem, pairSetups } from '../lib/parse-filename.mjs';

describe('detectType', () => {
  it('detects qual from exact Q token', () => {
    expect(detectType('A90_Fuji_Y_Gijsen_Q.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from versioned q1 token', () => {
    expect(detectType('maf_summit_25s2_q1.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from versioned Q82 token', () => {
    expect(detectType('Lgo26S2_Adelaide_Q82.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from "quali" keyword', () => {
    expect(detectType('fuji-22-S3-quali-01.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects qual from "qualifying" keyword', () => {
    expect(detectType('SummitPoint_qualifying.sto')).toMatchObject({ type: 'qual', ambiguous: false });
  });
  it('detects race from exact R token', () => {
    expect(detectType('A90_Fuji_Y_Gijsen_R.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('detects race from versioned r1 token', () => {
    expect(detectType('maf_summit_25s2_r1.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('detects race from "race" keyword', () => {
    expect(detectType('Fuji_S3_2022_Race.sto')).toMatchObject({ type: 'race', ambiguous: false });
  });
  it('defaults to race with ambiguous flag when no Q/R token found', () => {
    expect(detectType('Fuji_S3_2022_1.2.sto')).toMatchObject({ type: 'race', ambiguous: true });
  });
  it('uses last Q/R token when Q appears earlier in name', () => {
    expect(detectType('A90_Q_Fuji_R.sto')).toMatchObject({ type: 'race' });
  });
});

describe('getStem', () => {
  it('produces identical stems for a Q/R pair with exact tokens', () => {
    expect(getStem('A90_Fuji_Y_Gijsen_Q.sto')).toBe(getStem('A90_Fuji_Y_Gijsen_R.sto'));
  });
  it('produces identical stems for a Q/R pair with versioned tokens', () => {
    expect(getStem('maf_summit_25s2_q1.sto')).toBe(getStem('maf_summit_25s2_r1.sto'));
  });
  it('produces identical stems for versioned tokens with letters', () => {
    expect(getStem('maf_imola_23s4_q1a.sto')).toBe(getStem('maf_imola_23s4_r1b.sto'));
  });
  it('returns the full stem for ambiguous files (no Q/R token stripped)', () => {
    const stem = getStem('SummitPoint22c.sto');
    expect(stem).toBeTruthy();
  });
});

describe('pairSetups', () => {
  it('pairs Q and R files with matching stems', () => {
    const pairs = pairSetups([
      { filename: 'A90_Fuji_Y_Gijsen_Q.sto' },
      { filename: 'A90_Fuji_Y_Gijsen_R.sto' },
    ]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({
      qual: 'A90_Fuji_Y_Gijsen_Q.sto',
      race: 'A90_Fuji_Y_Gijsen_R.sto',
      ambiguous: false,
    });
  });
  it('leaves unpaired race file with null qual', () => {
    const pairs = pairSetups([{ filename: 'maf_summit_25s2_r1.sto' }]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({ qual: null, race: 'maf_summit_25s2_r1.sto' });
  });
  it('leaves unpaired qual file with null race', () => {
    const pairs = pairSetups([{ filename: 'maf_summit_25s2_q1.sto' }]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]).toMatchObject({ qual: 'maf_summit_25s2_q1.sto', race: null });
  });
  it('flags ambiguous files', () => {
    const pairs = pairSetups([{ filename: 'SummitPoint22c.sto' }]);
    expect(pairs[0].ambiguous).toBe(true);
  });
  it('pairs multiple independent Q/R pairs', () => {
    const pairs = pairSetups([
      { filename: 'A90_Fuji_Y_Gijsen_Q.sto' },
      { filename: 'A90_Fuji_Y_Gijsen_R.sto' },
      { filename: 'maf_fuji_25s2_q1.sto' },
      { filename: 'maf_fuji_25s2_r1.sto' },
    ]);
    expect(pairs).toHaveLength(2);
    expect(pairs.every(p => p.qual !== null && p.race !== null)).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run scripts/__tests__/parse-filename.test.js
```

Expected: FAIL — `Cannot find module '../lib/parse-filename.mjs'`

- [ ] **Step 3: Implement parse-filename.mjs**

Create `scripts/lib/parse-filename.mjs`:

```js
const QUAL_EXACT = new Set(['q', 'qualy', 'quali', 'qualifying']);
const RACE_EXACT = new Set(['r', 'race']);
const VERSIONED_QUAL = /^q\d+[a-z]*$/i;
const VERSIONED_RACE = /^r\d+[a-z]*$/i;

function classifyToken(token) {
  const t = token.toLowerCase();
  if (QUAL_EXACT.has(t) || VERSIONED_QUAL.test(t)) return 'qual';
  if (RACE_EXACT.has(t) || VERSIONED_RACE.test(t)) return 'race';
  return null;
}

function tokenize(filename) {
  return filename.replace(/\.sto$/i, '').split(/[_\-. ]+/).filter(Boolean);
}

// Returns { type: 'qual'|'race', tokenIndex: number, ambiguous: boolean }
// tokenIndex is the index of the last Q/R token found (-1 if none)
function detectType(filename) {
  const tokens = tokenize(filename);
  for (let i = tokens.length - 1; i >= 0; i--) {
    const classification = classifyToken(tokens[i]);
    if (classification) {
      return { type: classification, tokenIndex: i, ambiguous: false };
    }
  }
  return { type: 'race', tokenIndex: -1, ambiguous: true };
}

// Returns a lowercase stem string with the Q/R token removed, for sibling matching
function getStem(filename) {
  const tokens = tokenize(filename);
  const { tokenIndex } = detectType(filename);
  const stemTokens = tokenIndex === -1
    ? tokens
    : [...tokens.slice(0, tokenIndex), ...tokens.slice(tokenIndex + 1)];
  return stemTokens.join('_').toLowerCase();
}

function extractSeason(filename) {
  const match = filename.match(/(\d{2})[Ss](\d)/);
  if (!match) return null;
  return { year: 2000 + parseInt(match[1]), season: parseInt(match[2]) };
}

function seasonSortKey(filename) {
  const s = extractSeason(filename);
  return s ? s.year * 10 + s.season : Infinity;
}

// files: array of { filename, ...rest }
// Returns: array of { qual: string|null, race: string|null, ambiguous: boolean }
function pairSetups(files) {
  const parsed = files.map(f => ({
    ...f,
    ...detectType(f.filename),
    stem: getStem(f.filename),
  }));

  const quals = parsed.filter(f => f.type === 'qual');
  const races = parsed.filter(f => f.type === 'race');
  const usedQuals = new Set();
  const usedRaces = new Set();
  const pairs = [];

  for (const race of races) {
    const match = quals.find(q => q.stem === race.stem && !usedQuals.has(q.filename));
    if (match) {
      pairs.push({ qual: match.filename, race: race.filename, ambiguous: race.ambiguous || match.ambiguous });
      usedQuals.add(match.filename);
    } else {
      pairs.push({ qual: null, race: race.filename, ambiguous: race.ambiguous });
    }
    usedRaces.add(race.filename);
  }

  for (const qual of quals) {
    if (!usedQuals.has(qual.filename)) {
      pairs.push({ qual: qual.filename, race: null, ambiguous: qual.ambiguous });
    }
  }

  return pairs;
}

export { detectType, getStem, pairSetups, extractSeason, seasonSortKey, tokenize };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run scripts/__tests__/parse-filename.test.js
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/parse-filename.mjs scripts/__tests__/parse-filename.test.js
git commit -m "feat: add filename parser with Q/R detection and sibling pairing"
```

---

## Task 3: git-discover module

**Files:**
- Create: `scripts/__tests__/git-discover.test.js`
- Create: `scripts/lib/git-discover.mjs`

- [ ] **Step 1: Write the failing tests**

Create `scripts/__tests__/git-discover.test.js`:

```js
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { discoverNewSetups } from '../lib/git-discover.mjs';

const fakeGitOutput = [
  'public/setups/audi90gto/summit-point/maf_summit_25s2_q1.sto',
  'public/setups/audi90gto/summit-point/maf_summit_25s2_r1.sto',
  'public/setups/nissangtpzxt/motegi/Lgo26S2_Motegi_Q80.sto',
  'public/setups/audi90gto/summit-point/.DS_Store',
].join('\n');

const fakeExec = () => fakeGitOutput;

describe('discoverNewSetups', () => {
  it('parses git output into setup objects', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups).toHaveLength(3); // .DS_Store excluded
  });
  it('extracts car from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].car).toBe('audi90gto');
    expect(setups[2].car).toBe('nissangtpzxt');
  });
  it('extracts track from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].track).toBe('summit-point');
    expect(setups[2].track).toBe('motegi');
  });
  it('extracts filename from path', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups[0].filename).toBe('maf_summit_25s2_q1.sto');
  });
  it('filters out non-.sto files', () => {
    const setups = discoverNewSetups('/fake/root', fakeExec);
    expect(setups.every(s => s.filename.endsWith('.sto'))).toBe(true);
  });
  it('returns empty array when git output is empty', () => {
    const setups = discoverNewSetups('/fake/root', () => '');
    expect(setups).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run scripts/__tests__/git-discover.test.js
```

Expected: FAIL — `Cannot find module '../lib/git-discover.mjs'`

- [ ] **Step 3: Implement git-discover.mjs**

Create `scripts/lib/git-discover.mjs`:

```js
import { execSync } from 'child_process';

// execFn is injectable for testing; defaults to execSync
function discoverNewSetups(projectRoot, execFn = execSync) {
  let output;
  try {
    output = execFn(
      'git ls-files --others --exclude-standard public/setups/',
      { cwd: projectRoot, encoding: 'utf8' }
    );
  } catch {
    return [];
  }

  return output
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.endsWith('.sto'))
    .map(filePath => {
      const parts = filePath.split('/');
      // Expected: ['public', 'setups', '<car>', '<track>', '<filename>']
      if (parts.length < 5) return null;
      return {
        car: parts[2],
        track: parts[3],
        filename: parts[4],
        fullPath: filePath,
      };
    })
    .filter(Boolean);
}

export { discoverNewSetups };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run scripts/__tests__/git-discover.test.js
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/git-discover.mjs scripts/__tests__/git-discover.test.js
git commit -m "feat: add git discovery for new untracked setup files"
```

---

## Task 4: track-map module

**Files:**
- Create: `scripts/__tests__/track-map.test.js`
- Create: `scripts/lib/track-map.mjs`

- [ ] **Step 1: Write the failing tests**

Create `scripts/__tests__/track-map.test.js`:

```js
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { buildFolderMap } from '../lib/track-map.mjs';

const SAMPLE = `const QUAL = "Qualifying setup";

export const SUMMIT_POINT = {
    title: "Summit Point",
    setups: {
        "audi90gto": [
            {
                file: "summit-point/A90_SummitPoint_25S2_Q.sto",
                comment: QUAL
            },
        ],
        "nissangtpzxt": [],
    }
}
export const ARAGON_OUTER = {
    title: "Aragón - Outer",
    setups: {
        "audi90gto": [
            {
                file: "aragon/AragonOuter22c.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
export const ARAGON_MOTORCYCLE_GP = {
    title: "Aragón - Motorcycle Grand Prix",
    setups: ARAGON_OUTER.setups,
}
export const BRANDS_HATCH = {
    title: "Brands Hatch"
}
`;

describe('buildFolderMap', () => {
  it('maps folder names to export names', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect(folderToExport.get('summit-point')).toBe('SUMMIT_POINT');
    expect(folderToExport.get('aragon')).toBe('ARAGON_OUTER');
  });
  it('detects exports with shared setups', () => {
    const { sharedExports } = buildFolderMap(SAMPLE);
    expect(sharedExports.has('ARAGON_MOTORCYCLE_GP')).toBe(true);
    expect(sharedExports.has('SUMMIT_POINT')).toBe(false);
  });
  it('does not map exports with no file entries', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    expect(folderToExport.has('brands-hatch')).toBe(false);
  });
  it('does not map shared-setups exports as folders', () => {
    const { folderToExport } = buildFolderMap(SAMPLE);
    // ARAGON_MOTORCYCLE_GP should not be a folder key
    const values = [...folderToExport.values()];
    expect(values).not.toContain('ARAGON_MOTORCYCLE_GP');
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run scripts/__tests__/track-map.test.js
```

Expected: FAIL — `Cannot find module '../lib/track-map.mjs'`

- [ ] **Step 3: Implement track-map.mjs**

Create `scripts/lib/track-map.mjs`:

```js
// Returns { folderToExport: Map<string, string>, sharedExports: Set<string> }
function buildFolderMap(fileContent) {
  const folderToExport = new Map();
  const sharedExports = new Set();

  const exportPattern = /export const (\w+) = \{/g;
  let match;

  while ((match = exportPattern.exec(fileContent)) !== null) {
    const exportName = match[1];
    const blockStart = match.index + match[0].length;

    // Look ahead ~300 chars for a shared-setups reference
    const lookahead = fileContent.slice(blockStart, blockStart + 300);
    if (/setups:\s+\w+\.setups/.test(lookahead)) {
      sharedExports.add(exportName);
      continue;
    }

    // Find the first file: "folder/..." pattern within the next ~3000 chars
    const chunk = fileContent.slice(blockStart, blockStart + 3000);
    const fileMatch = chunk.match(/file:\s*["']([^/"']+)\//);
    if (fileMatch) {
      const folder = fileMatch[1];
      if (!folderToExport.has(folder)) {
        folderToExport.set(folder, exportName);
      }
    }
  }

  return { folderToExport, sharedExports };
}

export { buildFolderMap };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run scripts/__tests__/track-map.test.js
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/track-map.mjs scripts/__tests__/track-map.test.js
git commit -m "feat: add track folder-to-export mapping from track-data.js"
```

---

## Task 5: write-track-data module

**Files:**
- Create: `scripts/__tests__/write-track-data.test.js`
- Create: `scripts/lib/write-track-data.mjs`

- [ ] **Step 1: Write the failing tests**

Create `scripts/__tests__/write-track-data.test.js`:

```js
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
  findCarArrayBounds,
  formatEntry,
  insertEntries,
  removeEntry,
  appendNewExport,
} from '../lib/write-track-data.mjs';

const SAMPLE = `const QUAL = "Qualifying setup";

export const SUMMIT_POINT = {
    title: "Summit Point",
    setups: {
        "audi90gto": [
            {
                file: "summit-point/existing_R.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
export const OTHER_TRACK = {
    title: "Other",
    setups: {
        "audi90gto": [
            {
                file: "other/other_R.sto",
            },
        ],
        "nissangtpzxt": [],
    }
}
`;

describe('findCarArrayBounds', () => {
  it('finds bounds of audi90gto array in SUMMIT_POINT', () => {
    const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'audi90gto');
    expect(bounds).not.toBeNull();
    expect(SAMPLE[bounds.start]).toBe('[');
    expect(SAMPLE[bounds.end]).toBe(']');
  });
  it('does not cross into the next export', () => {
    const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'audi90gto');
    // The [ at bounds.start should be before OTHER_TRACK starts
    const otherStart = SAMPLE.indexOf('export const OTHER_TRACK');
    expect(bounds.start).toBeLessThan(otherStart);
  });
  it('finds empty array bounds', () => {
    const bounds = findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'nissangtpzxt');
    expect(bounds).not.toBeNull();
    expect(SAMPLE[bounds.start]).toBe('[');
    expect(SAMPLE[bounds.end]).toBe(']');
  });
  it('returns null for unknown export', () => {
    expect(findCarArrayBounds(SAMPLE, 'NONEXISTENT', 'audi90gto')).toBeNull();
  });
  it('returns null for unknown car key', () => {
    expect(findCarArrayBounds(SAMPLE, 'SUMMIT_POINT', 'unknowncar')).toBeNull();
  });
});

describe('formatEntry', () => {
  it('formats a race entry without comment', () => {
    const entry = formatEntry('summit-point', 'new_R.sto', false);
    expect(entry).toContain('file: "summit-point/new_R.sto"');
    expect(entry).not.toContain('comment');
  });
  it('formats a qualifying entry with QUAL comment', () => {
    const entry = formatEntry('summit-point', 'new_Q.sto', true);
    expect(entry).toContain('file: "summit-point/new_Q.sto"');
    expect(entry).toContain('comment: QUAL');
  });
});

describe('insertEntries', () => {
  it('inserts a new entry into an existing car array', () => {
    const entry = formatEntry('summit-point', 'new_R.sto', false);
    const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [entry]);
    expect(result).toContain('new_R.sto');
    expect(result).toContain('existing_R.sto');
  });
  it('preserves existing entries after insertion', () => {
    const entry = formatEntry('summit-point', 'new_R.sto', false);
    const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [entry]);
    expect(result).toContain('existing_R.sto');
  });
  it('inserts qual entry before race entry when given as a pair', () => {
    const qualEntry = formatEntry('summit-point', 'new_Q.sto', true);
    const raceEntry = formatEntry('summit-point', 'new_R.sto', false);
    const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [qualEntry, raceEntry]);
    expect(result.indexOf('new_Q.sto')).toBeLessThan(result.indexOf('new_R.sto'));
  });
  it('does not modify the other export', () => {
    const entry = formatEntry('summit-point', 'new_R.sto', false);
    const result = insertEntries(SAMPLE, 'SUMMIT_POINT', 'audi90gto', [entry]);
    expect(result).toContain('other/other_R.sto');
  });
});

describe('removeEntry', () => {
  it('removes an entry by its full file path', () => {
    const result = removeEntry(SAMPLE, 'summit-point/existing_R.sto');
    expect(result).not.toContain('existing_R.sto');
  });
  it('preserves other entries when removing one', () => {
    const result = removeEntry(SAMPLE, 'summit-point/existing_R.sto');
    expect(result).toContain('other/other_R.sto');
  });
  it('returns content unchanged when file path not found', () => {
    const result = removeEntry(SAMPLE, 'summit-point/nonexistent.sto');
    expect(result).toBe(SAMPLE);
  });
});

describe('appendNewExport', () => {
  it('appends a new export to the end of the file', () => {
    const entries = {
      'audi90gto': [{ filename: 'new_Q.sto', isQual: true }, { filename: 'new_R.sto', isQual: false }],
      'nissangtpzxt': [],
    };
    const result = appendNewExport(SAMPLE, 'LIME_ROCK_CLASSIC', 'Lime Rock Park - Classic', 'lime-rock-classic', entries);
    expect(result).toContain('export const LIME_ROCK_CLASSIC = {');
    expect(result).toContain('title: "Lime Rock Park - Classic"');
    expect(result).toContain('lime-rock-classic/new_Q.sto');
    expect(result).toContain('comment: QUAL');
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run scripts/__tests__/write-track-data.test.js
```

Expected: FAIL — `Cannot find module '../lib/write-track-data.mjs'`

- [ ] **Step 3: Implement write-track-data.mjs**

Create `scripts/lib/write-track-data.mjs`:

```js
const INDENT = '            '; // 12 spaces — matches track-data.js style

// Returns { start, end } where content[start] === '[' and content[end] === ']'
// for the array belonging to carName within exportName's setups block.
function findCarArrayBounds(content, exportName, carName) {
  const exportMarker = `export const ${exportName} = {`;
  const exportStart = content.indexOf(exportMarker);
  if (exportStart === -1) return null;

  const nextExport = content.indexOf('export const ', exportStart + exportMarker.length);
  const exportEnd = nextExport === -1 ? content.length : nextExport;
  const exportBlock = content.slice(exportStart, exportEnd);

  const carMarker = `"${carName}": [`;
  const carLocalIdx = exportBlock.indexOf(carMarker);
  if (carLocalIdx === -1) return null;

  const bracketOpen = exportStart + carLocalIdx + carMarker.length - 1;

  let depth = 0;
  let i = bracketOpen;
  while (i < content.length) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) return { start: bracketOpen, end: i };
    }
    i++;
  }
  return null;
}

function formatEntry(trackFolder, filename, isQual) {
  let entry = `${INDENT}{\n${INDENT}    file: "${trackFolder}/${filename}",\n`;
  if (isQual) entry += `${INDENT}    comment: QUAL\n`;
  entry += `${INDENT}},\n`;
  return entry;
}

// Inserts formatted entry strings before the closing ] of the car array.
function insertEntries(content, exportName, carName, entries) {
  const bounds = findCarArrayBounds(content, exportName, carName);
  if (!bounds) throw new Error(`Could not locate "${carName}" array in ${exportName}`);

  const toInsert = entries.join('');
  return content.slice(0, bounds.end) + toInsert + content.slice(bounds.end);
}

// Removes the entry block containing the given filePath (e.g. "summit-point/foo.sto").
function removeEntry(content, filePath) {
  const fileRef = `"${filePath}"`;
  const refIdx = content.indexOf(fileRef);
  if (refIdx === -1) return content;

  // Walk back to find opening {
  let openBrace = refIdx;
  while (openBrace > 0 && content[openBrace] !== '{') openBrace--;

  // Walk forward to find closing }
  let closeBrace = refIdx;
  while (closeBrace < content.length && content[closeBrace] !== '}') closeBrace++;

  // Include trailing comma if present
  let end = closeBrace + 1;
  if (content[end] === ',') end++;
  // Include trailing newline
  if (content[end] === '\n') end++;

  // Strip leading whitespace on the same line
  let start = openBrace;
  while (start > 0 && content[start - 1] !== '\n') start--;

  return content.slice(0, start) + content.slice(end);
}

// Generates and appends a new export block for a previously unknown track.
// entries: { [car]: Array<{ filename, isQual }> }
function appendNewExport(content, exportName, title, trackFolder, entries) {
  const cars = ['audi90gto', 'nissangtpzxt'];
  let block = `\nexport const ${exportName} = {\n    title: "${title}",\n    setups: {\n`;

  for (const car of cars) {
    const carEntries = entries[car] ?? [];
    block += `        "${car}": [\n`;
    for (const { filename, isQual } of carEntries) {
      block += formatEntry(trackFolder, filename, isQual);
    }
    block += `        ],\n`;
  }

  block += `    }\n}\n`;
  return content + block;
}

export { findCarArrayBounds, formatEntry, insertEntries, removeEntry, appendNewExport };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run scripts/__tests__/write-track-data.test.js
```

Expected: All tests PASS

- [ ] **Step 5: Run all script tests together**

```bash
npx vitest run scripts/__tests__/
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/write-track-data.mjs scripts/__tests__/write-track-data.test.js
git commit -m "feat: add bracket-counting track-data.js writer with insertion and removal"
```

---

## Task 6: Main orchestration script

**Files:**
- Create: `scripts/sync-setups.mjs`

No unit tests — this is interactive glue code. Manual smoke test at the end.

- [ ] **Step 1: Create the main script**

Create `scripts/sync-setups.mjs`:

```js
import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

import { discoverNewSetups } from './lib/git-discover.mjs';
import { buildFolderMap } from './lib/track-map.mjs';
import { pairSetups, seasonSortKey } from './lib/parse-filename.mjs';
import { formatEntry, insertEntries, removeEntry, appendNewExport } from './lib/write-track-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TRACK_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/track-data.js');
const CARS = ['audi90gto', 'nissangtpzxt'];
const MAX_SETUPS = 4;

// --- Prompt helper ---
function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

// --- Preview printing ---
function printPreview(car, track, pairs, existing, suggested) {
  const newCount = pairs.reduce((n, p) => n + (p.qual ? 1 : 0) + (p.race ? 1 : 0), 0);
  const total = existing.length + newCount;
  const pruneNote = total > MAX_SETUPS ? `  ⚠  ${total} setups after additions (max ${MAX_SETUPS} suggested)` : '';
  console.log(`\n${car} / ${track}${pruneNote}`);

  for (const pair of pairs) {
    if (pair.qual) {
      const flag = pair.ambiguous ? ' [AMBIGUOUS — defaulting to qual]' : ' [QUAL]';
      console.log(`  ADD:    ${pair.qual}${flag}`);
    }
    if (pair.race) {
      const flag = pair.ambiguous ? ' [AMBIGUOUS — defaulting to race]' : '';
      console.log(`  ADD:    ${pair.race}${flag}`);
    }
  }

  for (const entry of existing) {
    const filename = entry.file.split('/').pop();
    const isQual = entry.comment === 'Qualifying setup';
    const qualTag = isQual ? ' [QUAL]' : '';
    const removeTag = suggested.includes(filename) ? ' ← REMOVE?' : '';
    console.log(`  ${removeTag ? 'REMOVE?' : 'KEEP:  '} ${filename}${qualTag}${removeTag ? '' : ''}`);
  }
}

// --- Pruning ---
async function getPruningDecision(existing, suggested) {
  if (suggested.length === 0) return [];

  console.log(`\n  Pruning options:`);
  console.log(`    [s] Skip pruning — keep everything`);
  console.log(`    [a] Accept suggestions — remove ${suggested.length} older entry(s)`);
  console.log(`    [i] Interactive — review each flagged setup`);

  const choice = (await prompt('  Choice [s/a/i]: ')).toLowerCase();

  if (choice === 'a') {
    // Auto-remove only setups with detectable seasons (not no-season ones)
    return suggested.filter(f => seasonSortKey(f) !== Infinity);
  }

  if (choice === 'i') {
    const toRemove = [];
    for (const filename of suggested) {
      const answer = await prompt(`  Remove ${filename}? (y/N) `);
      if (answer.toLowerCase() === 'y') toRemove.push(filename);
    }
    return toRemove;
  }

  return []; // skip
}

// --- New track prompt ---
async function handleNewTrack(car, track, pairs, content) {
  console.log(`\nNew track detected in public/setups/${car}/${track}/`);
  const title = await prompt('  Enter track title: ');
  const exportName = title.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  console.log(`  → Creating export ${exportName}`);
  console.log(`  → Remember to add it to season-setups.js manually`);

  const entries = {};
  for (const c of CARS) {
    entries[c] = [];
  }
  for (const pair of pairs) {
    if (pair.qual) entries[car].push({ filename: pair.qual, isQual: true });
    if (pair.race) entries[car].push({ filename: pair.race, isQual: false });
  }

  return appendNewExport(content, exportName, title, track, entries);
}

// --- Main ---
const newSetups = discoverNewSetups(PROJECT_ROOT);

if (newSetups.length === 0) {
  console.log('No new setup files found. (All .sto files in public/setups/ are tracked by git.)');
  process.exit(0);
}

console.log(`Found ${newSetups.length} new setup file(s).`);

const trackDataContent = readFileSync(TRACK_DATA_PATH, 'utf8');
const { folderToExport, sharedExports } = buildFolderMap(trackDataContent);

// Dynamic import to read current setup data for pruning calculations
const trackData = await import(TRACK_DATA_PATH);

// Group by car + track
const groups = new Map();
for (const setup of newSetups) {
  const key = `${setup.car}|${setup.track}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(setup);
}

let currentContent = trackDataContent;
let anyChanges = false;

for (const [key, setups] of groups) {
  const [car, track] = key.split('|');
  const exportName = folderToExport.get(track);

  if (!exportName) {
    const pairs = pairSetups(setups);
    currentContent = await handleNewTrack(car, track, pairs, currentContent);
    anyChanges = true;
    continue;
  }

  if (sharedExports.has(exportName)) {
    console.log(`\n⚠  ${exportName} shares setups with another track — skipping ${car}/${track}. Add manually.`);
    continue;
  }

  const pairs = pairSetups(setups);
  const existing = trackData[exportName]?.setups?.[car] ?? [];
  const newCount = pairs.reduce((n, p) => n + (p.qual ? 1 : 0) + (p.race ? 1 : 0), 0);
  const total = existing.length + newCount;

  // Build pruning suggestions: oldest by season first, then no-season entries
  let suggested = [];
  if (total > MAX_SETUPS) {
    const toFlag = total - MAX_SETUPS;
    const sorted = [...existing]
      .map(e => ({ filename: e.file.split('/').pop(), sortKey: seasonSortKey(e.file.split('/').pop()) }))
      .sort((a, b) => a.sortKey - b.sortKey);
    suggested = sorted.slice(0, toFlag).map(e => e.filename);
  }

  printPreview(car, track, pairs, existing, suggested);

  let toRemove = await getPruningDecision(existing, suggested);

  const confirm = (await prompt('\n  Apply changes? [y/n] ')).toLowerCase();
  if (confirm !== 'y') {
    console.log('  Skipped.');
    continue;
  }

  // Remove flagged entries first
  for (const filename of toRemove) {
    const filePath = existing.find(e => e.file.endsWith(filename))?.file;
    if (filePath) currentContent = removeEntry(currentContent, filePath);
  }

  // Insert new entries
  const entries = [];
  for (const pair of pairs) {
    if (pair.qual) entries.push(formatEntry(track, pair.qual, true));
    if (pair.race) entries.push(formatEntry(track, pair.race, false));
  }
  currentContent = insertEntries(currentContent, exportName, car, entries);
  anyChanges = true;
}

if (anyChanges) {
  writeFileSync(TRACK_DATA_PATH, currentContent, 'utf8');
  console.log('\n✓ src/data/track-data.js updated.');
  console.log('  Review changes: git diff src/data/track-data.js');
} else {
  console.log('\nNo changes written.');
}
```

- [ ] **Step 2: Run all tests to make sure nothing broke**

```bash
npx vitest run scripts/__tests__/
```

Expected: All tests PASS

- [ ] **Step 3: Smoke test with a real new file**

Copy a setup file to a test location that isn't tracked yet:

```bash
cp public/setups/audi90gto/summit-point/A90_SummitPoint_25S2_Y_Gijsen_Q.sto \
   public/setups/audi90gto/summit-point/TEST_smoke_Q.sto

npm run sync-setups
```

Verify:
1. Script detects `TEST_smoke_Q.sto`
2. Preview shows it as `[QUAL]` for `audi90gto / summit-point`
3. After confirming, `src/data/track-data.js` contains the new entry
4. Run `git diff src/data/track-data.js` to visually verify the insertion looks correct

Clean up:

```bash
rm public/setups/audi90gto/summit-point/TEST_smoke_Q.sto
git checkout src/data/track-data.js
```

- [ ] **Step 4: Commit**

```bash
git add scripts/sync-setups.mjs
git commit -m "feat: add sync-setups orchestration script with interactive pruning"
```

---

## Done

Run the full test suite to confirm nothing regressed:

```bash
npx vitest run
```

Expected output: All existing tests pass plus the new script tests.

Weekly workflow going forward:
1. Drop `.sto` files into `public/setups/<car>/<track>/`
2. `npm run sync-setups`
3. Review, confirm, prune
4. `git diff src/data/track-data.js` to verify
5. `git add` and commit everything together
