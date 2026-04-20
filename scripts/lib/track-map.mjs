// Returns { folderToExport, exportToFolder, sharedExports, allExports }
// folderToExport: first export that owns each folder (used by sync-setups for insertion)
// exportToFolder: each export's own folder, derived from its own file references
//   — multiple exports can share the same folder (e.g. ROAD_AMERICA and ROAD_AMERICA_500)
function buildFolderMap(fileContent) {
  const folderToExport = new Map();
  const exportToFolder = new Map();
  const sharedExports = new Set();
  const allExports = [];

  const exportPattern = /export const (\w+) = \{/g;
  let match;

  while ((match = exportPattern.exec(fileContent)) !== null) {
    const exportName = match[1];
    allExports.push(exportName);
    const blockStart = match.index + match[0].length;

    // Bound to this export's block — stops at the next export const to avoid bleeding
    // into a sibling export's content (e.g. LIME_ROCK's lookahead reaching LIME_ROCK_CLASSIC).
    const nextExportIdx = fileContent.indexOf('export const ', blockStart);
    const blockEnd = nextExportIdx === -1 ? fileContent.length : nextExportIdx;
    const chunk = fileContent.slice(blockStart, blockEnd);

    // Detect shared-setups reference (e.g. setups: ARAGON_OUTER.setups)
    if (/setups:\s+\w+\.setups/.test(chunk)) {
      sharedExports.add(exportName);
      continue;
    }

    // Find the first active (non-commented) file: "folder/..." pattern within this export's block
    const fileMatch = chunk.match(/(?<!\/\/\s*)file:\s*["']([^/"']+)\//);
    if (fileMatch) {
      const folder = fileMatch[1];
      exportToFolder.set(exportName, folder);
      if (!folderToExport.has(folder)) {
        folderToExport.set(folder, exportName);
      }
    }
  }

  return { folderToExport, exportToFolder, sharedExports, allExports };
}

// Fallback: given a folder name like "donington", find the one export whose
// name starts with the folder uppercased (e.g. DONINGTON_PARK).
// Prefers exact match so "sonoma" resolves to SONOMA even when SONOMA_CUP also exists.
function findExportByFolderPrefix(folder, allExports, sharedExports) {
  const prefix = folder.toUpperCase().replace(/-/g, '_');
  const candidates = allExports.filter(name => !sharedExports.has(name) && name.startsWith(prefix));
  const exact = candidates.find(name => name === prefix);
  if (exact) return exact;
  return candidates.length === 1 ? candidates[0] : null;
}

export { buildFolderMap, findExportByFolderPrefix };
