# 🧹 Project Cleanup Plan

**Date:** November 9, 2024  
**Current Status:** Project has accumulated significant redundancy

---

## 📊 Cleanup Summary

### Files to Remove
- **203 Markdown files** (many redundant documentation)
- **30+ forensics reports** 
- **39 CSS backup files** in `.backup/css/`
- **8 forensics CSS backups** in `forensics/backups/`
- **6 test HTML files** in `public/`
- **2 Chrome report HTML files** in root
- **4 pre-refactor files**
- **3 backup JSON files**

### Total Space to Reclaim
- `forensics/`: 388 KB
- `docs/`: 1.4 MB
- `.backup/`: 232 KB
- Root MD files: ~500 KB
- **Total: ~2.5 MB of redundant files**

---

## 🗑️ FILES TO DELETE

### 1. Backup Folders (SAFE TO DELETE)

```bash
# Remove entire backup folders
rm -rf .backup/
rm -rf forensics/backups/
rm -rf gallery-backup/
```

**Why:** These are old snapshots from development, no longer needed.

---

### 2. Test & Debug Files (SAFE TO DELETE)

```bash
# Test HTML files in public/
rm public/test-texture-image.html
rm public/texture-only-test.html
rm public/test-texture.html
rm public/texture-direct-test.html
rm public/texture-test.html
rm public/test-texture-overlay.html
rm public/texture-image.html
rm public/diagnose.js

# Chrome test reports
rm chromewebdata_2025-11-05_22-34-53.report.html
rm chromewebdata_2025-11-05_22-32-41.report.html

# Debug HTML
rm index.debug.html
rm -rf 127.0.0.1:3000/
```

**Why:** These were for testing during development, not needed in production.

---

### 3. Pre-Refactor Files (SAFE TO DELETE)

```bash
rm src/index.css.pre-refactor
rm src/components/molecules/Card/ServiceCards.module.css.pre-refactor
rm src/components/organisms/OurArtists.css.pre-refactor
rm .backup/css/design-system.css.pre-refactor
```

**Why:** Old versions kept during refactoring, current versions are working.

---

### 4. Redundant Documentation (ROOT DIRECTORY)

**Keep These (Essential):**
- ✅ `README.md` - Main project documentation
- ✅ `PRE_DEPLOYMENT_AUDIT_REPORT.md` - Latest audit
- ✅ `DEPLOYMENT_CHECKLIST.md` - Deployment guide
- ✅ `READY_TO_DEPLOY.md` - Quick deployment guide

**DELETE These (Redundant):**

```bash
# Old completion reports (redundant)
rm ARTIST_CARDS_CHANGES.md
rm ARTIST_MODAL_IMPLEMENTATION.md
rm CSS-CLEANUP-PROGRESS.md
rm CSS-FOUNDATION.md
rm DESIGN_SYSTEM_AUDIT.md
rm DESIGN_SYSTEM_READY.md
rm DESIGN_TOKENS_QUICK_REF.md
rm GALLERY_IMPLEMENTATION_COMPLETE.md
rm GALLERY_PAGE_FIXED.md
rm GALLERY_QUICK_START.md
rm GALLERY_SETUP.md
rm GALLERY_TESTING_CHECKLIST.md
rm GALLERY_V2_COMPLETE.md
rm HORIZONTAL_MODAL_COMPLETE.md
rm IMPLEMENTATION_COMPLETE.md
rm IMPLEMENTATION_STEPS.md
rm MIGRATION_COMPLETE.md
rm PAGES_ALIGNMENT_PROGRESS.md
rm PERFORMANCE_AUDIT_RESULTS.md
rm PERFORMANCE_CHECKLIST.md
rm PHASE1-2-COMPLETE.md
rm PHASE2_COMPLETION_SUMMARY.md
rm PHASE3_COMPLETE.md
rm STABLE_VERSION_NOTE.md
rm DEPLOY_NOW.md

# Old development notes
rm css-restoration-plan.md
rm css_conflicts.md
rm css_files.txt
rm css_imports.txt
rm font-weight-fixes.md
rm repo_intel.md
rm FOLDER_STRUCTURE.txt
rm IMAGE_AUDIT_REPORT.txt
rm GALLERY_VISUAL_DIAGRAM.txt
rm GALLERY_VISUAL_STRUCTURE.txt
```

**Why:** These are historical development logs. Current state is documented in the 3 essential files.

---

### 5. Forensics Folder (OPTIONAL - Archive or Delete)

The entire `forensics/` folder (30 files, 388 KB) contains development diagnostics that are no longer needed.

**Option A: Delete Entirely**
```bash
rm -rf forensics/
```

**Option B: Keep for Reference (Not Recommended)**
```bash
# Move to archive if you want to keep
mkdir -p docs/archive
mv forensics/ docs/archive/
```

**Recommendation:** DELETE - these were temporary diagnostic files during development.

---

### 6. Docs Folder Cleanup

The `docs/` folder has **114+ markdown files**. Most are old development documentation.

**Keep:**
- `docs/00-AI-USAGE-GUIDELINES.md` (if still relevant)
- `docs/DEVELOPER_HANDOFF.md` (if applicable)

**Delete:**
```bash
# Remove old audit reports
rm -rf docs/audits/

# Remove verification artifacts
rm -rf docs/verification/

# Remove old development docs (keep only essential ones)
# Review docs/ folder and delete old dev logs
```

---

### 7. Backup JSON Files (SAFE TO DELETE)

```bash
rm public/team-backup.json
rm dist/team-backup.json*  # All versions (.json, .br, .gz)
```

**Why:** `team.json` is the current version, backups not needed.

---

### 8. Unused Scripts (REVIEW BEFORE DELETE)

```bash
# Check if these are still used
ls -la scripts/*.sh
ls -la scripts/*.mjs

# Delete if not used:
# rm scripts/old-script-name.sh
```

---

## 🚀 Quick Cleanup Command

Run this to clean everything at once:

```bash
#!/bin/bash
# CLEANUP SCRIPT - Review before running!

echo "🧹 Starting cleanup..."

# 1. Remove backup folders
rm -rf .backup/
rm -rf forensics/
rm -rf gallery-backup/
echo "✅ Backup folders removed"

# 2. Remove test files
rm -f public/test-*.html
rm -f public/texture-*.html
rm -f public/diagnose.js
rm -f chromewebdata_*.report.html
rm -f index.debug.html
rm -rf 127.0.0.1:3000/
echo "✅ Test files removed"

# 3. Remove pre-refactor files
find . -name "*.pre-refactor" -type f -delete
echo "✅ Pre-refactor files removed"

# 4. Remove redundant root MD files
rm -f ARTIST_CARDS_CHANGES.md ARTIST_MODAL_IMPLEMENTATION.md
rm -f CSS-CLEANUP-PROGRESS.md CSS-FOUNDATION.md
rm -f DESIGN_SYSTEM_AUDIT.md DESIGN_SYSTEM_READY.md
rm -f DESIGN_TOKENS_QUICK_REF.md DEPLOY_NOW.md
rm -f GALLERY_*.md HORIZONTAL_MODAL_COMPLETE.md
rm -f IMPLEMENTATION_*.md MIGRATION_COMPLETE.md
rm -f PAGES_ALIGNMENT_PROGRESS.md PERFORMANCE_*.md
rm -f PHASE*.md STABLE_VERSION_NOTE.md
rm -f css-restoration-plan.md css_*.txt css_*.md
rm -f font-weight-fixes.md repo_intel.md
rm -f FOLDER_STRUCTURE.txt IMAGE_AUDIT_REPORT.txt
rm -f GALLERY_VISUAL_*.txt
echo "✅ Redundant documentation removed"

# 5. Remove backup JSON
rm -f public/team-backup.json
rm -f dist/team-backup.json*
echo "✅ Backup JSON files removed"

# 6. Cleanup docs folder
rm -rf docs/audits/
rm -rf docs/verification/
echo "✅ Docs cleanup complete"

echo "🎉 Cleanup complete!"
echo "📊 Space reclaimed: ~2.5 MB"
```

---

## ⚠️ KEEP These Files

**Essential Documentation:**
- `README.md`
- `PRE_DEPLOYMENT_AUDIT_REPORT.md`
- `DEPLOYMENT_CHECKLIST.md`
- `READY_TO_DEPLOY.md`
- `Attributions.md` (if you have third-party credits)
- `VERCEL_DEPLOYMENT.md` (if it has deployment info)

**Configuration:**
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `vercel.json`
- `.gitignore`
- All files in `src/` and `public/` (except test files)

---

## 📋 Cleanup Checklist

Before running cleanup:
- [ ] Commit current working state
- [ ] Review files to be deleted
- [ ] Create git branch for safety: `git checkout -b cleanup`
- [ ] Run cleanup script or manual deletions
- [ ] Test build: `npm run build`
- [ ] Test dev server: `npm run dev`
- [ ] If all works, commit: `git commit -m "chore: cleanup redundant files"`
- [ ] Merge to main: `git checkout main && git merge cleanup`
- [ ] Push: `git push`

---

## 🎯 Expected Results

**Before Cleanup:**
- 203 markdown files
- Multiple backup folders
- Test files in public/
- ~2.5 MB of redundant files

**After Cleanup:**
- ~10 essential markdown files
- Clean project structure
- No backup folders
- No test files in production
- Cleaner git history
- Faster builds (less files to process)

---

## 💡 Recommendations

1. **Run cleanup AFTER deployment is successful** - Don't clean during active development
2. **Create a cleanup branch first** - Easy to revert if needed
3. **Test thoroughly after cleanup** - Ensure nothing breaks
4. **Update .gitignore** - Prevent future accumulation
5. **Keep only current documentation** - Archive old development logs elsewhere if needed

---

## 🚫 What NOT to Delete

- Anything in `src/` (except `.pre-refactor` files)
- Anything in `public/` (except test-*.html files)
- `node_modules/` (already in .gitignore)
- `dist/` (build output, regenerated)
- `.vercel/` (Vercel config)
- `.git/` (obviously!)

---

**Ready to clean up?** Follow the checklist and run the cleanup script!
