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
