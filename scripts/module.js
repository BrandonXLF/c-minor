import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
	let text = await fs.readFile(__dirname + '/../dist/c.min.js');
	
	await fs.writeFile(__dirname + '/../dist/c.min.mjs', 'export default ' + text);
})();