# COPILOT WORKSPACE RULES

## CRITICAL: Before Editing ANY Component

1. **ALWAYS check which file is imported first**
   ```bash
   grep -r "import.*ComponentName" src/pages/
   ```

2. **ONLY edit the file that is actually being used**
   - If HomePage imports from `../sections/HeroSection`
   - Then edit `src/sections/HeroSection.tsx`
   - Do NOT edit any other Hero files

3. **NEVER create new files unless explicitly told to**
   - If a component exists, edit it
   - Do not create EnhancedComponent, NewComponent, Component2, etc.

4. **NEVER create showcase pages, demo pages, or comparison pages**
   - If asked to fix a component, fix it
   - Do not create pages to "compare all versions"

5. **ALWAYS verify changes are visible**
   - After editing, check localhost:5173
   - If no changes visible, you edited the wrong file

## File Priority

HomePage uses these files (check imports):
- Hero: `src/sections/HeroSection.tsx` ← EDIT THIS ONE
- Artists: Check import in HomePage.tsx first
- Services: Check import in HomePage.tsx first
- Gallery: Check import in HomePage.tsx first

## The One Rule

**Before editing ANY file, run: `grep "ComponentName" src/pages/HomePage.tsx`**

This shows you which file is actually imported and used.
