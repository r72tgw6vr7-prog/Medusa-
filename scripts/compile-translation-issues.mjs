import fs from 'fs';
import path from 'path';

const root = process.cwd();
const outDir = path.join(root, 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const issues = [];

// 1) Locale audit (missing keys / untranslated)
const localeCsvPath = path.join(outDir, 'locale-audit.csv');
if (fs.existsSync(localeCsvPath)) {
  const csv = fs.readFileSync(localeCsvPath, 'utf8');
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines.shift().split(',').map(h => h.replace(/(^\")|(\"$)/g, ''));
  for (const line of lines) {
    const cols = line.split(',').map(c => c.replace(/(^\")|(\"$)/g, ''));
    const r = {};
    headers.forEach((h, i) => { r[h] = cols[i]; });
    if (r.state !== 'ok') {
      issues.push({
        url: '',
        page: '',
        element: `locale:${r.key}`,
        state: r.state,
        note: r.note,
        severity: r.state === 'missing_in_en' ? 'High' : 'Medium',
        screenshot: '',
      });
    }
  }
}

// 2) Page scan results
const scanCsvPath = path.join(outDir, 'locale-scan', 'locale-scan.csv');
if (fs.existsSync(scanCsvPath)) {
  const csv = fs.readFileSync(scanCsvPath, 'utf8');
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines.shift().split(',').map(h => h.replace(/(^\")|(\"$)/g, ''));
  for (const line of lines) {
    const cols = line.split(',').map(c => c.replace(/(^\")|(\"$)/g, ''));
    const r = {};
    headers.forEach((h, i) => { r[h] = cols[i]; });
    let severity = 'Medium';
    if (r.element === 'title' || r.element === 'h1' || r.element === 'nav') severity = 'High';
    if (r.issue && r.issue.includes('missing_en')) severity = 'High';
    issues.push({
      url: r.url,
      page: '',
      element: r.element,
      state: r.issue,
      note: '',
      severity,
      screenshot_de: r.screenshot_de,
      screenshot_en: r.screenshot_en,
    });
  }
}

// 3) Contact form findings
const contactJson = path.join(outDir, 'contact-form-locale.json');
if (fs.existsSync(contactJson)) {
  const data = JSON.parse(fs.readFileSync(contactJson, 'utf8'));
  const de = data.find((d) => d.lang === 'de');
  const en = data.find((d) => d.lang === 'en');
  // If English placeholders / submit are same as German -> Critical
  if (en && de) {
    if (en.namePlaceholder === de.namePlaceholder || en.submitText === de.submitText || en.nameError === de.nameError) {
      issues.push({
        url: 'https://www.muenchen-tattoo-studio.de/contact',
        element: 'form.placeholders/validation',
        state: 'untranslated_in_en',
        note: JSON.stringify({ de, en }),
        severity: 'Critical',
        screenshot_de: path.join(outDir, 'contact_de.png'),
        screenshot_en: path.join(outDir, 'contact_en.png'),
      });
    }
  }
}

// 4) Booking form - analyze source code to detect mixed language strings
const bookingFile = path.join(root, 'src', 'components', 'organisms', 'BookingForm', 'BookingForm.tsx');
if (fs.existsSync(bookingFile)) {
  const content = fs.readFileSync(bookingFile, 'utf8');
  // Heuristic: presence of English labels
  if (content.includes('Full Name') || content.includes('Book Now') || content.includes('Submitting')) {
    issues.push({
      url: 'https://www.muenchen-tattoo-studio.de/booking',
      element: 'form.labels/placeholders',
      state: 'static_english',
      note: 'Booking form has static English labels and placeholders (not localized)',
      severity: 'High',
      screenshot_de: '',
      screenshot_en: '',
    });
  }
}

// Write issues report
const outCsv = path.join(outDir, 'translation-issues.csv');
const headers = ['url','element','state','note','severity','screenshot_de','screenshot_en'];
const lines = [headers.join(',')];
for (const i of issues) {
  lines.push([i.url || '', i.element, i.state, (i.note||'').replace(/\n/g,' '), i.severity, i.screenshot_de||'', i.screenshot_en||''].map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(','));
}
fs.writeFileSync(outCsv, lines.join('\n'), 'utf8');
console.log('Compiled translation issues to', outCsv);
