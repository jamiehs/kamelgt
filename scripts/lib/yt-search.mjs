import { execFileSync } from 'child_process';

// execFn is injectable for testing; defaults to execFileSync.
function checkYtDlpAvailable(execFn = execFileSync) {
    try {
        execFn('yt-dlp', ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
        return true;
    } catch {
        return false;
    }
}

// Parses tab-separated `id\ttitle\tuploaderId\tduration` lines (as printed
// by yt-dlp's --print) into result objects. Blank lines are skipped; a
// non-numeric duration (e.g. "NA") becomes null.
function parseSearchOutput(output) {
    return output
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => {
            const [id, title, uploaderId, durationStr] = line.split('\t');
            const duration = Number(durationStr);
            return {
                id,
                title,
                uploaderId,
                duration: Number.isFinite(duration) ? duration : null,
            };
        });
}

// Runs a yt-dlp search for `query`, returning up to `count` flat results.
// execFn is injectable for testing; defaults to execFileSync.
function searchYouTube(query, count, execFn = execFileSync) {
    const args = [
        `ytsearch${count}:${query}`,
        '--flat-playlist',
        '--print',
        '%(id)s\t%(title)s\t%(uploader_id)s\t%(duration)s',
    ];
    const output = execFn('yt-dlp', args, { encoding: 'utf8' });
    return parseSearchOutput(output);
}

export { checkYtDlpAvailable, searchYouTube, parseSearchOutput };
