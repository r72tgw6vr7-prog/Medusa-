import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const outFile = path.join(root, 'reports', 'i18n-string-scan.json');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.isFile() && (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))) files.push(full);
  }
  return files;
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

const results = [];

const files = walk(srcRoot);
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  // 1) JSX text nodes: >Text< (heuristic, ignores {..})
  const jsxText = />[^<{][^<\n]{2,}</g;
  for (const m of content.matchAll(jsxText)) {
    const raw = m[0];
    const text = raw.replace(/^>/, '').replace(/<$/, '').trim();
    if (!text) continue;
    results.push({
      component: path.relative(root, file),
      line: lineNumberAt(content, m.index || 0),
      text,
      kind: 'jsxText',
      suggestedKey: '',
    });
  }

  // 2) Common attributes: aria-label / placeholder / title / alt
  const attr = /(aria-label|placeholder|title|alt)\s*=\s*"([^"]{2,})"/g;
  for (const m of content.matchAll(attr)) {
    results.push({
      component: path.relative(root, file),
      line: lineNumberAt(content, m.index || 0),
      text: m[2],
      kind: `attr:${m[1]}`,
      suggestedKey: '',
    });
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf8');

console.log(`Found ${results.length} candidate strings. Wrote ${outFile}`);
