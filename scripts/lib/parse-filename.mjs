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
// Scans from last token backwards to use the last Q/R token in the name.
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

// Returns a lowercase stem with the Q/R token removed, used for sibling matching.
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

// Returns the alphabetic author prefix from a filename, e.g. "Lgo" from "Lgo26S2_..."
// Returns null if the first token is purely numeric or has no leading letters.
function extractAuthor(filename) {
  const first = tokenize(filename)[0] ?? '';
  const match = first.match(/^([A-Za-z]+)/);
  return match ? match[1].toLowerCase() : null;
}

// Returns a loose pairing key: "<author>|<year><season>" — used as a fallback
// when exact stem matching fails. Both must be non-null to be useful.
function looseKey(filename) {
  const author = extractAuthor(filename);
  const season = extractSeason(filename);
  if (!author || !season) return null;
  return `${author}|${season.year}s${season.season}`;
}

function seasonSortKey(filename) {
  const s = extractSeason(filename);
  return s ? s.year * 10 + s.season : Infinity;
}

// files: array of { filename, ...rest }
// Returns: array of { qual: string|null, race: string|null, ambiguous: boolean }
// Q always listed before its R sibling.
function pairSetups(files) {
  const parsed = files.map(f => ({
    ...f,
    ...detectType(f.filename),
    stem: getStem(f.filename),
  }));

  const quals = parsed.filter(f => f.type === 'qual');
  const races = parsed.filter(f => f.type === 'race');
  const usedQuals = new Set();
  const pairs = [];

  for (const race of races) {
    const match = quals.find(q => q.stem === race.stem && !usedQuals.has(q.filename));
    if (match) {
      pairs.push({ qual: match.filename, race: race.filename, ambiguous: race.ambiguous || match.ambiguous });
      usedQuals.add(match.filename);
    } else {
      pairs.push({ qual: null, race: race.filename, ambiguous: race.ambiguous });
    }
  }

  // Second pass: loose match by (author prefix + season) for unpaired quals/races
  const unparedQuals = quals.filter(q => !usedQuals.has(q.filename));
  const usedRaces = new Set(pairs.filter(p => p.race && p.qual).map(p => p.race));
  const unpairedRaces = races.filter(r => !usedRaces.has(r.filename) && pairs.find(p => p.race === r.filename && !p.qual));

  for (const qual of unparedQuals) {
    const qKey = looseKey(qual.filename);
    if (qKey) {
      const match = unpairedRaces.find(r => looseKey(r.filename) === qKey);
      if (match) {
        // Replace the race's solo entry with a paired entry
        const idx = pairs.findIndex(p => p.race === match.filename && !p.qual);
        pairs[idx] = { qual: qual.filename, race: match.filename, ambiguous: match.ambiguous || qual.ambiguous };
        usedQuals.add(qual.filename);
        unpairedRaces.splice(unpairedRaces.indexOf(match), 1);
        continue;
      }
    }
    pairs.push({ qual: qual.filename, race: null, ambiguous: qual.ambiguous });
  }

  return pairs;
}

export { detectType, getStem, pairSetups, extractSeason, seasonSortKey, tokenize, extractAuthor, looseKey };
