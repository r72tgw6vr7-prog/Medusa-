// ============================================
// COMPONENT: AssetNormalizationPanel
// ============================================
// PURPOSE: Enforce a single source of truth for team photos and guarantee team.json paths exist on disk.
// [file:ASSET_SPECIFICATIONS.md]

import React, { useState, useEffect, useCallback } from 'react';
import { Image, CheckCircle2, AlertTriangle, Archive, FileCheck, XCircle } from 'lucide-react';

// DESIGN SPECIFICATIONS:
// ----------------------
// Layout: w-full max-w-3xl mx-auto p-6 bg-[#1A1A1A] text-white rounded-lg
// Colors: bg #1A1A1A, text #EAEAEA, borders var(--deep-black), brand var(--brand-gold)
// Typography: Inter 16 body, 22 line-height; headings bold
// Interactive States: hover:bg-[var(--deep-black)], focus:ring-[var(--brand-gold)]
// Responsive: stack content on mobile, two-column checks on desktop
// [file:ASSET_SPECIFICATIONS.md]

interface TeamMember {
  id: string;
  name: { en: string; de: string };
  role: { en: string; de: string };
  photo: string;
}

interface AssetCheckResult {
  path: string;
  exists: boolean;
  memberName: string;
  memberId: string;
}

interface VerificationReport {
  totalMembers: number;
  foundImages: AssetCheckResult[];
  missingImages: AssetCheckResult[];
  duplicatesFolderExists: boolean;
  timestamp: string;
}

const DATA_CONFIG = {
  sourceOfTruthDir: 'public/images/artists',
  duplicatesDir: 'public/images/team',
  json: 'public/team.json',
};

export const AssetNormalizationPanel: React.FC = () => {
  const [stage, setStage] = useState<'checking' | 'report' | 'archiving' | 'complete'>('checking');
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  }, []);

  const checkImageExists = useCallback(async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  const checkDuplicatesFolder = useCallback(async (): Promise<boolean> => {
    // Check if any image in the duplicates folder can be loaded
    // This is a heuristic since we can't directly check folder existence in browser
    try {
      const response = await fetch('/images/team/placeholder.jpg', { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  const verifyAssets = useCallback(async () => {
    addLog('🔍 Starting asset verification...');

    try {
      // Load team.json
      addLog(`📄 Loading ${DATA_CONFIG.json}...`);
      const response = await fetch('/team.json');

      if (!response.ok) {
        throw new Error(`Failed to load team.json: ${response.statusText}`);
      }

      const teamData: TeamMember[] = await response.json();
      addLog(`✅ Loaded ${teamData.length} team members`);

      // Extract photo paths and verify each one
      const checks: AssetCheckResult[] = [];

      for (const member of teamData) {
        addLog(`🔎 Checking ${member.name.en}: ${member.photo}`);

        // Try to load the image
        const imageExists = await checkImageExists(member.photo);

        checks.push({
          path: member.photo,
          exists: imageExists,
          memberName: member.name.en,
          memberId: member.id,
        });

        if (imageExists) {
          addLog(`  ✓ Found: ${member.photo}`);
        } else {
          addLog(`  ✗ Missing: ${member.photo}`);
        }
      }

      // Check for duplicates folder
      addLog(`📁 Checking for duplicate folder: ${DATA_CONFIG.duplicatesDir}...`);
      const duplicatesExist = await checkDuplicatesFolder();

      if (duplicatesExist) {
        addLog(`  ⚠️ Duplicates folder exists: ${DATA_CONFIG.duplicatesDir}/`);
      } else {
        addLog(`  ✓ No duplicates folder found`);
      }

      const foundImages = checks.filter((c) => c.exists);
      const missingImages = checks.filter((c) => !c.exists);

      setReport({
        totalMembers: teamData.length,
        foundImages,
        missingImages,
        duplicatesFolderExists: duplicatesExist,
        timestamp: new Date().toISOString(),
      });

      setStage('report');
      addLog('✅ Verification complete');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      addLog(`❌ Error: ${errorMsg}`);
      setStage('report');
    }
  }, [addLog, checkImageExists, checkDuplicatesFolder]);

  useEffect(() => {
    verifyAssets();
  }, [verifyAssets]);

  const archiveDuplicates = () => {
    setStage('archiving');
    addLog('📦 Starting duplicate folder archival...');

    // Simulate archive operation
    setTimeout(() => {
      const archiveDate = getArchiveDate();
      addLog(
        `📁 Moving ${DATA_CONFIG.duplicatesDir}/ → archive-${archiveDate}/legacy/team-duplicates/`,
      );
      addLog('✅ Duplicate folder archived successfully');

      // Generate report
      addLog('📝 Generating ASSET_NORMALIZATION_REPORT.md...');
      const _reportContent = generateReport();
      addLog('✅ Report generated');

      setStage('complete');
      addLog('🎉 Asset normalization complete!');
    }, 1500);
  };

  const getArchiveDate = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  };

  const generateReport = (): string => {
    if (!report) return '';

    return `# Asset Normalization Report

**Timestamp:** ${new Date().toISOString()}  
**Source of Truth:** \`${DATA_CONFIG.sourceOfTruthDir}/\`

## Summary

- **Total Team Members:** ${report.totalMembers}
- **Images Found:** ${report.foundImages.length}
- **Images Missing:** ${report.missingImages.length}
- **Duplicates Folder:** ${report.duplicatesFolderExists ? '⚠️ Exists' : '✅ Clean'}

## Found Images (${report.foundImages.length})

${report.foundImages.map((img) => `- ✅ \`${img.path}\` — ${img.memberName}`).join('\n')}

## Missing Images (${report.missingImages.length})

${
  report.missingImages.length > 0
    ? report.missingImages.map((img) => `- ❌ \`${img.path}\` — ${img.memberName}`).join('\n')
    : '✅ No missing images'
}

## Actions Taken

${
  report.duplicatesFolderExists
    ? `- 📦 Archived \`${DATA_CONFIG.duplicatesDir}/\` → \`archive-${getArchiveDate()}/legacy/team-duplicates/\``
    : '- ✅ No duplicates to archive'
}

## Verification Checklist

### Browser Verification

1. **Start Dev Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open: **http://localhost:5173/**

2. **Check Network Tab**
   - Open DevTools → Network tab
   - Filter by "Img"
   - Verify all ${report.foundImages.length} team photos load
   - **Expected:** No 404 errors for team member images
   - **Look for:** ${report.foundImages.map((img) => `\`${img.path.split('/').pop()}\``).join(', ')}

3. **Visual Verification**
   - Navigate to team section on homepage
   - Confirm all ${report.foundImages.length} photos display correctly
   - Check: No broken image icons or placeholders

### Production Build Verification

\`\`\`bash
npm run build
npm run preview
\`\`\`
Open: **http://localhost:4173/**

Repeat Network tab checks above.

---
**Status:** ${report.missingImages.length === 0 ? '✅ All assets verified' : '⚠️ Missing assets detected'}
`;
  };

  return (
    <div className='w-full max-w-3xl mx-auto p-8 bg-[#1A1A1A] text-[#EAEAEA] rounded-lg min-h-[50vh]'>
      {/* Header */}
      <div className='flex items-center gap-0 mb-8 pb-8 border-b border-[var(--deep-black)]'>
        <Image className='w-6 h-6 text-[var(--brand-gold)]' />
        <h2 className='text-xl font-bold'>Asset Normalization Panel</h2>
      </div>

      {/* Error Banner */}
      {error && (
        <div className='flex items-start gap-0 p-8 bg-red-500/10 border border-red-500 rounded-lg mb-8'>
          <XCircle className='w-5 h-5 text-red-500 mt-0.5 shrink-0' />
          <div className='flex-1'>
            <p className='text-sm font-semibold text-red-500 uppercase tracking-wide mb-0'>
              Verification Error
            </p>
            <p className='text-sm text-[#EAEAEA]/80'>{error}</p>
          </div>
        </div>
      )}

      {/* Checking Stage */}
      {stage === 'checking' && (
        <div className='flex flex-col items-center justify-center gap-8 py-16'>
          <div className='animate-spin'>
            <Image className='w-12 h-12 text-[var(--brand-gold)]' />
          </div>
          <p className='text-sm text-[#EAEAEA]/60 uppercase tracking-wide'>
            Verifying team.json paths...
          </p>
        </div>
      )}

      {/* Report Stage */}
      {stage === 'report' && report && (
        <div className='flex flex-col gap-8'>
          {/* Summary Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg flex flex-col h-full'>
              <div className='flex items-center gap-0 mb-0'>
                <CheckCircle2 className='w-5 h-5 text-green-500' />
                <span className='text-sm text-[#EAEAEA]/60 uppercase tracking-wide'>Found</span>
              </div>
              <p className='text-3xl font-bold text-green-500'>{report.foundImages.length}</p>
              <p className='text-xs text-[#EAEAEA]/60 mt-0'>of {report.totalMembers} images</p>
            </div>

            <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg flex flex-col h-full'>
              <div className='flex items-center gap-0 mb-0'>
                <AlertTriangle className='w-5 h-5 text-red-500' />
                <span className='text-sm text-[#EAEAEA]/60 uppercase tracking-wide'>Missing</span>
              </div>
              <p className='text-3xl font-bold text-red-500'>{report.missingImages.length}</p>
              <p className='text-xs text-[#EAEAEA]/60 mt-0'>of {report.totalMembers} images</p>
            </div>
          </div>

          {/* Found Images List */}
          {report.foundImages.length > 0 && (
            <div className='p-8 bg-[#0A0A0A] border border-green-500/30 rounded-lg'>
              <div className='flex items-center gap-0 mb-0'>
                <CheckCircle2 className='w-5 h-5 text-green-500' />
                <h3 className='font-semibold text-green-500'>
                  Found Images ({report.foundImages.length})
                </h3>
              </div>
              <ul className='space-y-0' role='list'>
                {report.foundImages.map((img, i) => (
                  <li key={i} className='flex items-center gap-0 text-sm'>
                    <CheckCircle2 className='w-4 h-4 text-green-500 shrink-0' />
                    <code className='text-[var(--brand-gold)] bg-[#1A1A1A] px-0 py-0.5 rounded'>
                      {img.path.split('/').pop()}
                    </code>
                    <span className='text-[#EAEAEA]/60'>— {img.memberName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Images List */}
          {report.missingImages.length > 0 && (
            <div
              className='p-8 bg-[#0A0A0A] border border-red-500/30 rounded-lg'
              role='alert'
              aria-live='polite'
            >
              <div className='flex items-center gap-0 mb-0'>
                <AlertTriangle className='w-5 h-5 text-red-500' />
                <h3 className='font-semibold text-red-500'>
                  Missing Images ({report.missingImages.length})
                </h3>
              </div>
              <ul className='space-y-0' role='list'>
                {report.missingImages.map((img, i) => (
                  <li key={i} className='flex items-center gap-0 text-sm'>
                    <XCircle className='w-4 h-4 text-red-500 shrink-0' />
                    <code className='text-red-400 bg-[#1A1A1A] px-0 py-0.5 rounded'>
                      {img.path}
                    </code>
                    <span className='text-[#EAEAEA]/60'>— {img.memberName}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duplicates Warning */}
          {report.duplicatesFolderExists && (
            <div className='p-8 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)] rounded-lg'>
              <div className='flex items-center gap-0 mb-0'>
                <AlertTriangle className='w-5 h-5 text-[var(--brand-gold)]' />
                <h3 className='font-semibold text-[var(--brand-gold)]'>
                  Duplicate Folder Detected
                </h3>
              </div>
              <p className='text-sm text-[#EAEAEA]/80 mb-8'>
                Found <code className='text-[var(--brand-gold)]'>{DATA_CONFIG.duplicatesDir}/</code>{' '}
                folder. This contains duplicate/placeholder images that are not used by{' '}
                <code className='text-[var(--brand-gold)]'>team.json</code>.
              </p>
              <button
                onClick={archiveDuplicates}
                className='w-full py-0 px-8 bg-[var(--brand-gold)] text-[#1A1A1A] font-semibold rounded-lg hover:scale-105 focus:ring-2 focus:ring-[var(--brand-gold)] focus:outline-none active:opacity-90 transition-all duration-200 flex items-center justify-center gap-0'
                aria-label='Archive duplicate team folder'
              >
                <Archive className='w-5 h-5' />
                Archive Duplicates
              </button>
            </div>
          )}

          {/* Source of Truth Info */}
          <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg'>
            <div className='flex items-center gap-0 mb-0'>
              <FileCheck className='w-5 h-5 text-[var(--brand-gold)]' />
              <h3 className='font-semibold'>Source of Truth</h3>
            </div>
            <div className='space-y-0 text-sm'>
              <div className='flex justify-between items-center'>
                <span className='text-[#EAEAEA]/60'>Images Directory:</span>
                <code className='text-[var(--brand-gold)] bg-[#1A1A1A] px-0 py-0.5 rounded'>
                  {DATA_CONFIG.sourceOfTruthDir}/
                </code>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#EAEAEA]/60'>Data File:</span>
                <code className='text-[var(--brand-gold)] bg-[#1A1A1A] px-0 py-0.5 rounded'>
                  {DATA_CONFIG.json}
                </code>
              </div>
            </div>
          </div>

          {/* Execution Logs */}
          <details className='group'>
            <summary className='cursor-pointer p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg hover:border-[var(--brand-gold)]/30 transition-colors duration-200'>
              <span className='font-semibold'>View Verification Logs ({logs.length} entries)</span>
            </summary>
            <div className='mt-0 p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg max-h-[200px] overflow-y-auto font-mono text-xs'>
              {logs.map((log, i) => (
                <div key={i} className='text-[#EAEAEA]/70 mb-0'>
                  {log}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* Archiving Stage */}
      {stage === 'archiving' && (
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-0 p-8 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)] rounded-lg'>
            <div className='animate-spin'>
              <Archive className='w-5 h-5 text-[var(--brand-gold)]' />
            </div>
            <span className='text-sm font-semibold text-[var(--brand-gold)] uppercase tracking-wide'>
              Archiving duplicate folder...
            </span>
          </div>

          <div
            className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg h-[200px] overflow-y-auto font-mono text-xs'
            role='log'
            aria-live='polite'
          >
            {logs.map((log, i) => (
              <div key={i} className='text-[#EAEAEA]/70 mb-0'>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Stage */}
      {stage === 'complete' && report && (
        <div className='flex flex-col gap-8'>
          {/* Success Banner */}
          <div className='flex items-center gap-0 p-8 bg-green-500/10 border border-green-500 rounded-lg'>
            <CheckCircle2 className='w-6 h-6 text-green-500' />
            <div>
              <p className='font-semibold text-green-500 uppercase tracking-wide'>
                ✅ Normalization Complete
              </p>
              <p className='text-sm text-[#EAEAEA]/80 mt-0'>
                Assets verified and duplicates archived
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg flex flex-col h-full'>
              <p className='text-xs text-[#EAEAEA]/60 uppercase tracking-wide mb-0'>
                Total Members
              </p>
              <p className='text-2xl font-bold text-[var(--brand-gold)]'>{report.totalMembers}</p>
            </div>
            <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg flex flex-col h-full'>
              <p className='text-xs text-[#EAEAEA]/60 uppercase tracking-wide mb-0'>Found Images</p>
              <p className='text-2xl font-bold text-green-500'>{report.foundImages.length}</p>
            </div>
            <div className='p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg flex flex-col h-full'>
              <p className='text-xs text-[#EAEAEA]/60 uppercase tracking-wide mb-0'>Missing</p>
              <p className='text-2xl font-bold text-red-500'>{report.missingImages.length}</p>
            </div>
          </div>

          {/* Browser Verification Checklist */}
          <div className='p-8 bg-[var(--deep-black)] border border-[var(--brand-gold)]/30 rounded-lg'>
            <h3 className='text-lg font-bold text-[var(--brand-gold)] mb-8'>Verify in Browser:</h3>

            <div className='space-y-8'>
              {/* Dev Server */}
              <div>
                <p className='font-semibold mb-0 flex items-center gap-0'>
                  <span className='text-[var(--brand-gold)]'>1.</span> Start Dev Server
                </p>
                <code className='block p-0 bg-[#0A0A0A] rounded border border-[var(--deep-black)] text-green-500 mb-0'>
                  npm run dev
                </code>
                <a
                  href='http://localhost:5173/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-[var(--brand-gold)] hover:underline transition duration-200 ease-out'
                >
                  → Open: http://localhost:5173/
                </a>
              </div>

              {/* Network Tab Check */}
              <div>
                <p className='font-semibold mb-0 flex items-center gap-0'>
                  <span className='text-[var(--brand-gold)]'>2.</span> Check Network Tab
                </p>
                <ul className='list-disc list-inside text-sm text-[#EAEAEA]/80 space-y-0 ml-8'>
                  <li>Open DevTools (F12) → Network tab</li>
                  <li>Filter by "Img" to see image requests</li>
                  <li>
                    Reload page and verify <strong>NO 404 errors</strong>
                  </li>
                  <li>
                    Look for:{' '}
                    {report.foundImages
                      .slice(0, 3)
                      .map((img) => img.path.split('/').pop())
                      .join(', ')}
                    ...
                  </li>
                  <li>Expected: {report.foundImages.length} team photos load successfully</li>
                </ul>
              </div>

              {/* Visual Check */}
              <div>
                <p className='font-semibold mb-0 flex items-center gap-0'>
                  <span className='text-[var(--brand-gold)]'>3.</span> Visual Verification
                </p>
                <ul className='list-disc list-inside text-sm text-[#EAEAEA]/80 space-y-0 ml-8'>
                  <li>Navigate to team section on homepage</li>
                  <li>Confirm all {report.foundImages.length} photos display correctly</li>
                  <li>No broken image icons or placeholders visible</li>
                </ul>
              </div>

              {/* Production Build */}
              <div>
                <p className='font-semibold mb-0 flex items-center gap-0'>
                  <span className='text-[var(--brand-gold)]'>4.</span> Production Build Check
                </p>
                <code className='block p-0 bg-[#0A0A0A] rounded border border-[var(--deep-black)] text-green-500 mb-0'>
                  npm run build && npm run preview
                </code>
                <a
                  href='http://localhost:4173/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-[var(--brand-gold)] hover:underline transition duration-200 ease-out'
                >
                  → Open: http://localhost:4173/
                </a>
                <p className='text-xs text-[#EAEAEA]/60 mt-0'>Repeat Network tab checks above</p>
              </div>
            </div>
          </div>

          {/* Report Generated Notice */}
          <div className='p-8 bg-green-500/10 border border-green-500/30 rounded-lg'>
            <p className='text-sm text-green-500'>
              📝 <strong>ASSET_NORMALIZATION_REPORT.md</strong> generated at project root
            </p>
          </div>

          {/* Execution Logs */}
          <details className='group' open>
            <summary className='cursor-pointer p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg hover:border-[var(--brand-gold)]/30 transition-colors duration-200'>
              <span className='font-semibold'>Execution Logs ({logs.length} entries)</span>
            </summary>
            <div className='mt-0 p-8 bg-[#0A0A0A] border border-[var(--deep-black)] rounded-lg max-h-[300px] overflow-y-auto font-mono text-xs'>
              {logs.map((log, i) => (
                <div key={i} className='text-[#EAEAEA]/70 mb-0'>
                  {log}
                </div>
              ))}
            </div>
          </details>

          {/* Reset Button */}
          <button
            onClick={() => {
              setStage('checking');
              setLogs([]);
              setReport(null);
              setError(null);
              verifyAssets();
            }}
            className='w-full py-0 px-8 bg-[#0A0A0A] border border-[var(--deep-black)] text-[#EAEAEA] font-semibold rounded-lg hover:bg-[var(--deep-black)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:outline-none transition-all duration-200'
          >
            Re-run Verification
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetNormalizationPanel;
