import { readFileSync, writeFileSync } from 'fs';

function metaPath(stoPath) {
    return stoPath + '.meta.json';
}

function readMeta(stoPath) {
    try {
        return JSON.parse(readFileSync(metaPath(stoPath), 'utf8'));
    } catch {
        return null;
    }
}

function writeMeta(stoPath, data) {
    writeFileSync(metaPath(stoPath), JSON.stringify(data, null, 2));
}

export { readMeta, writeMeta };
