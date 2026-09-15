import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

const missing = Object.keys(packageJson.scripts).filter(
  (script) => !readme.includes(`npm run ${script}`) && !['format'].includes(script),
);

if (missing.length > 0) {
  throw new Error(`README does not reference npm scripts: ${missing.join(', ')}`);
}

process.stdout.write('Documentation matches the available npm scripts.\n');
