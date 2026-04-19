// Returns { folderToExport: Map<string, string>, sharedExports: Set<string>, allExports: string[] }
// Builds a reverse map from track folder names to export constant names by
// scanning file paths already present in the track-data.js source text.
// Falls back to prefix-matching export names for tracks with no active file entries (e.g. commented-out arrays).
function buildFolderMap(fileContent) {
  const folderToExport = new Map();
  const sharedExports = new Set();
  const allExports = [];

  const exportPattern = /export const (\w+) = \{/g;
  let match;

  while ((match = exportPattern.exec(fileContent)) !== null) {
    const exportName = match[1];
    allExports.push(exportName);
    const blockStart = match.index + match[0].length;

    // Detect shared-setups reference (e.g. setups: ARAGON_OUTER.setups)
    const lookahead = fileContent.slice(blockStart, blockStart + 300);
    if (/setups:\s+\w+\.setups/.test(lookahead)) {
      sharedExports.add(exportName);
      continue;
    }

    // Find the first active (non-commented) file: "folder/..." pattern within the next ~3000 chars
    const chunk = fileContent.slice(blockStart, blockStart + 3000);
    const fileMatch = chunk.match(/(?<!\/\/\s*)file:\s*["']([^/"']+)\//);
    if (fileMatch) {
      const folder = fileMatch[1];
      if (!folderToExport.has(folder)) {
        folderToExport.set(folder, exportName);
      }
    }
  }

  return { folderToExport, sharedExports, allExports };
}

// Fallback: given a folder name like "donington", find the one export whose
// name starts with the folder uppercased (e.g. DONINGTON_PARK).
// Returns the export name if exactly one match, otherwise null.
function findExportByFolderPrefix(folder, allExports, sharedExports) {
  const prefix = folder.toUpperCase().replace(/-/g, '_');
  const matches = allExports.filter(name => !sharedExports.has(name) && name.startsWith(prefix));
  return matches.length === 1 ? matches[0] : null;
}

export { buildFolderMap, findExportByFolderPrefix };
