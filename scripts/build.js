import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import UglifyJS from 'uglify-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeExport(text) {
	return text.replace(/^export default /, '');
}

(async () => {
	await fs.mkdir(__dirname + '/../dist', { recursive: true });

	const text = await fs.readFile(__dirname + '/../src/c.js', 'utf8');
	const minified = UglifyJS.minify(text).code;

	await Promise.all([
		fs.writeFile(__dirname + '/../dist/c.mjs', text),
		fs.writeFile(__dirname + '/../dist/c.js', removeExport(text)),
		fs.writeFile(__dirname + '/../dist/c.min.mjs', minified),
		fs.writeFile(__dirname + '/../dist/c.min.js', removeExport(minified))
	]);
})();