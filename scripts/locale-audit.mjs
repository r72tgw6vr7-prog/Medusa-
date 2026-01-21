import fs from 'fs';
import path from 'path';

const root = process.cwd();
const localesDir = path.join(root, 'src', 'locales');
const outDir = path.join(root, 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const load = (name) => JSON.parse(fs.readFileSync(path.join(localesDir, name), 'utf8'));
const de = load('de.json');
const en = load('en.json');

const flatten = (obj, prefix = '') => {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  });
  return out;
};

const deFlat = flatten(de);
const enFlat = flatten(en);

const allKeys = new Set([...Object.keys(deFlat), ...Object.keys(enFlat)]);

const rows = [['key','de','en','state','note']];

for (const key of Array.from(allKeys).sort()) {
  const deVal = deFlat[key];
  const enVal = enFlat[key];

  let state = 'ok';
  let note = '';

  if (deVal === undefined) {
    state = 'missing_in_de';
    note = 'Missing German translation';
  } else if (enVal === undefined) {
    state = 'missing_in_en';
    note = 'Missing English translation';
  } else if (typeof deVal === 'string' && typeof enVal === 'string' && deVal.trim() === enVal.trim()) {
    state = 'possibly_untranslated';
    note = 'Same string in both locales';
  }

  rows.push([`"${key}"`,`"${(deVal||'').toString().replace(/"/g,'""')}"`,`"${(enVal||'').toString().replace(/"/g,'""')}"`,state,note]);
}

const csv = rows.map(r => r.join(',')).join('\n');
const outCsv = path.join(outDir, 'locale-audit.csv');
fs.writeFileSync(outCsv, csv, 'utf8');
console.log('Locale audit written to', outCsv);

// Also write a JSON summary
const summary = { totalKeys: allKeys.size, missingInDe: rows.filter(r => r[3]==='missing_in_de').length, missingInEn: rows.filter(r => r[3]==='missing_in_en').length, possiblyUntranslated: rows.filter(r => r[3]==='possibly_untranslated').length };
fs.writeFileSync(path.join(outDir, 'locale-audit-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
console.log('Summary written to reports/locale-audit-summary.json');
