import fs from 'fs/promises';
import { join } from 'path';

let files;

try {
    files = await fs.readdir('dist');
} catch (e) {
   console.log("Build output not found!");
   process.exit(1);
}

console.log('-- Size of dist files --\n');

for (const file of await fs.readdir('dist')) {
    const stat = await fs.stat(join('dist', file));
    console.log(`${file}:\t${stat.size} bytes`);
}