import fs from 'fs/promises';
import { join } from 'path';

let files;

try {
    files = await fs.readdir('dist');
} catch (e) {
   console.log('Build output not found!');
   process.exit(1);
}

console.log('-- Size of dist files (uncompressed) --\n');

let maxLength = 0;

for (const file of files) {
    if (file.length <= maxLength) continue;
    maxLength = file.length;
}

for (const file of files) {
    const stat = await fs.stat(join('dist', file));
    console.log(`${file}:${' '.repeat(maxLength - file.length + 4)}${stat.size} bytes`);
}