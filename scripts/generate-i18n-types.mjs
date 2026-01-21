import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const localesRoot = path.join(root, 'src', 'i18n', 'locales');
const outFile = path.join(root, 'src', 'i18n', 'generated', 'translationKeys.ts');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.isFile() && e.name.endsWith('.json')) files.push(full);
  }
  return files;
}

function flatten(obj, prefix = '') {
  const out = [];
  if (!obj || typeof obj !== 'object') return out;

  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out.push(next);
    else if (v && typeof v === 'object') out.push(...flatten(v, next));
  }

  return out;
}

const keys = new Set();

if (fs.existsSync(localesRoot)) {
  const jsonFiles = walk(localesRoot);
  for (const file of jsonFiles) {
    const rel = path.relative(localesRoot, file).split(path.sep);
    const locale = rel[0];
    const namespace = rel[1]?.replace(/\.json$/, '');
    if (!locale || !namespace) continue;

    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const k of flatten(data)) {
      keys.add(`${namespace}.${k}`);
    }
  }
}

const sorted = Array.from(keys).sort();

const content = `export const translationKeys = ${JSON.stringify(sorted, null, 2)} as const;\n\nexport type TranslationKeys = (typeof translationKeys)[number] | (string & {});\n`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content, 'utf8');

console.log(`Wrote ${sorted.length} translation keys to ${outFile}`);
