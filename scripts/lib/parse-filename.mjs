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

  for (const qual of quals) {
    if (!usedQuals.has(qual.filename)) {
      pairs.push({ qual: qual.filename, race: null, ambiguous: qual.ambiguous });
    }
  }

  return pairs;
}

export { detectType, getStem, pairSetups, extractSeason, seasonSortKey, tokenize };
