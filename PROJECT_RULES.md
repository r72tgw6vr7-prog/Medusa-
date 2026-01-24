# 🔒 PROJECT DEVELOPMENT RULES - MANDATORY FOR ALL AGENTS

**Last Updated:** January 23, 2026  
**Status:** ACTIVE - These rules override all other instructions unless explicitly overridden by user.

***

## 🚨 CRITICAL RULE #1: DESKTOP IS FROZEN

### Desktop Lockdown (≥1024px)
**ALL desktop styling, components, and behavior are LOCKED and PERFECT.**

❌ **NEVER MODIFY:**
- Any CSS class WITHOUT a breakpoint prefix (`gap-4`, `py-4`, `text-5xl`, etc.)
- Desktop-only components (hero parallax desktop transforms)
- Design system tokens in `src/styles/design-system.css` 
- Desktop navigation, desktop layout grids
- Any spacing, typography, or color that affects ≥1024px viewport

✅ **ONLY ALLOWED CHANGES:**
- Mobile breakpoint classes: `max-sm:`, `max-md:`, `sm:`, `md:` 
- Tablet breakpoint classes: `max-lg:`, `lg:` (768-1023px only)
- Mobile-specific components: `MobileNavigation.tsx`, hamburger menu
- Viewport-specific overrides BELOW 1024px

### Exception Protocol
If user explicitly says **"change desktop"** or **"modify all breakpoints"**:
1. Ask for confirmation: "This will modify desktop (≥1024px). Confirm?"
2. Only proceed if user responds "yes" or "confirm"
3. Document the exception in git commit message

***

## 📱 RULE #2: MOBILE/TABLET ONLY DEVELOPMENT

### Active Development Zones
**FROM NOW ON, ALL UPDATES TARGET MOBILE/TABLET EXCLUSIVELY:**

- **Mobile:** <768px (iPhone 12 Pro, iPhone 13, Galaxy S21, etc.)
- **Tablet:** 768-1023px (iPad, iPad Pro portrait, Android tablets)

### Breakpoint Classes You MUST Use
```css
/* Mobile-specific (apply on screens <640px) */
max-sm:py-4
max-sm:text-base

/* Mobile + Small tablet (<768px) */
max-md:grid-cols-1
max-md:px-4

/* Tablet-specific (768-1023px) */
md:grid-cols-2
lg:max-w-4xl

/* NEVER use these without mobile fallbacks first */
xl:  /* Desktop 1280px+ */
2xl: /* Desktop 1536px+ */
```

***

## 🛑 RULE #3: ZERO TOLERANCE FOR SHORTCUTS

### What is FORBIDDEN (Auto-Rejection):

#### ❌ 1. Improvisation
**Example of VIOLATION:**
```tsx
// User asks: "Fix the ServiceCard spacing on mobile"
// Agent does this (WRONG):
<ServiceCard className="p-4" /> {/* Simplified - VIOLATES RULE */}
```

**Correct Approach:**
```tsx
// Find existing ServiceCard:
<ServiceCard className="gap-4 py-4 px-6 text-sm" />

// Add ONLY mobile breakpoint:
<ServiceCard className="gap-4 py-4 px-6 text-sm max-md:py-5 max-md:px-8" />
//                                                ^^^^^^^ ONLY addition
```

#### ❌ 2. Component Deletion/Replacement
**Example of VIOLATION:**
```tsx
// User asks: "Update the hero animation on mobile"
// Agent does this (WRONG):
// Deletes complex hero-parallax.tsx
// Creates simple hero.tsx with basic fade

// VIOLATION: Deleted working component, replaced with "simpler version"
```

**Correct Approach:**
```tsx
// Find existing hero-parallax.tsx
// Add ONLY mobile breakpoint animation variants:
<motion.div
  animate={desktop ? complexParallax : mobileSimple}
  //       ^^^^^^^ Preserve desktop, add mobile variant
/>
```

#### ❌ 3. "Making Shit Up" / Placeholder Content
**Example of VIOLATION:**
```tsx
// User asks: "Restore services section content"
// Agent does this (WRONG):
<h2>Services</h2>
<p>We offer great services</p> {/* Generic placeholder - VIOLATES RULE */}
```

**Correct Approach:**
```tsx
// Search codebase for original content:
git log --all -- '*services*' | grep "content"
// Or ask user: "I need the original services text. Can you provide it?"

// Use EXACT original text:
<h2>Tattoo Services</h2>
<p>30 years of mastery. Every genre. Custom artistry...</p>
```

#### ❌ 4. "Taking Shortcuts" / Ignoring Existing Patterns
**Example of VIOLATION:**
```tsx
// User asks: "Add mobile touch targets"
// Agent does this (WRONG):
<button style={{ minHeight: '48px' }} /> {/* Inline styles - VIOLATES RULE */}
```

**Correct Approach:**
```tsx
// Follow existing pattern (Tailwind classes):
<button className="py-4 px-6 max-md:min-h-[48px]" />
//                         ^^^^^^^ Consistent with project style
```

***

## 📋 RULE #4: EXPLICIT CHANGES ONLY

### What "Change X Component" Means:

**User says:** "Change the ServiceCard spacing on mobile"

**Agent MUST:**
1. ✅ Open `src/components/cards/ServiceCard.tsx` 
2. ✅ Find EXISTING classes: `className="gap-4 py-4 px-6"` 
3. ✅ ADD mobile breakpoints: `max-md:py-5 max-md:px-8` 
4. ✅ Verify NO other changes made

**Agent MUST NOT:**
- ❌ Rewrite entire component structure
- ❌ Change desktop classes
- ❌ "Refactor while I'm here"
- ❌ Delete existing props/features
- ❌ Add new features not requested

### Surgical Changes Protocol:
```
1. Locate exact file + line number
2. Identify existing code to modify
3. Make MINIMUM change to achieve goal
4. Preserve everything else
5. Test ONLY mobile/tablet breakpoints
```

***

## 🧪 RULE #5: TESTING PROTOCOL

### Before Submitting ANY Change:

**Desktop Verification (MUST PASS):**
```bash
# Open Chrome DevTools → Desktop (1440x900)
# Take screenshot BEFORE your changes
# Apply mobile-only changes
# Take screenshot AFTER
# Screenshots MUST be pixel-identical
```

**Mobile Verification:**
```bash
# Open Chrome DevTools → iPhone 12 Pro (390x844)
# Test your mobile changes
# Open iPad (768x1024)
# Test tablet changes
# Verify touch targets ≥48x48px
```

**Automated Checks:**
```bash
npm run build   # Must pass (no errors)
npm run lint    # 0 errors allowed
npm run test:e2e # All tests pass
```

***

## 📄 RULE #6: AGENT PRE-FLIGHT CHECK

### Before Executing ANY Task:

**Step 1: Read This File**
```
- Open PROJECT_RULES.md
- Read relevant sections
- Confirm task is mobile/tablet only
```

**Step 2: Verify Scope**
```
If task mentions:
- "hero" → Check if mobile-specific
- "navigation" → Mobile nav only (desktop locked)
- "spacing" → Mobile breakpoints only
- "animation" → Mobile variants only
```

**Step 3: Confirm Approach**
```
Ask yourself:
- Am I modifying desktop classes? (FORBIDDEN)
- Am I deleting existing code? (FORBIDDEN unless explicit)
- Am I improvising content? (FORBIDDEN - ask user)
- Am I taking shortcuts? (FORBIDDEN - follow existing patterns)
```

**Step 4: Execute**
```
- Make ONLY mobile/tablet changes
- Preserve ALL desktop behavior
- Test both breakpoints
- Report changes with breakpoint scope
```

***

## 🚩 VIOLATION REPORTING

If you (agent) detect a rule violation in a user request:

**Template Response:**
```
⚠️ RULE VIOLATION DETECTED

Requested: [user request]
Violates: [RULE #X - description]

This would modify desktop (≥1024px) which is FROZEN.

Suggested alternative:
[Mobile-only approach]

Proceed with mobile-only? (yes/no)
```

***

## 🎯 RULE #7: COMPONENT MODIFICATION STANDARDS

### When User Says "Change Component X"

**MUST DO:**
1. Find exact file path of component
2. Identify ALL existing props/classes/features
3. Add ONLY requested mobile breakpoint changes
4. Preserve EVERY existing feature
5. Document what was added (not replaced)

**EXAMPLE:**
```
User: "Make ServiceCard taller on mobile"

✅ CORRECT:
- File: src/components/cards/ServiceCard.tsx
- Found: className="min-h-[300px]"
- Added: max-md:min-h-[400px]
- Preserved: All desktop styling, all props, all content

❌ WRONG:
- "ServiceCard is complex, I'll simplify it"
- "I'll rewrite it with better structure"
- "I'll remove unused props while I'm here"
```

***

## 📌 SUMMARY: QUICK REFERENCE

| Rule | What | Why |
|------|------|-----|
| #1 | Desktop frozen (≥1024px) | Perfect - no touch |
| #2 | Mobile/tablet only | Active dev zone |
| #3 | No shortcuts/improvisation | Preserve quality |
| #4 | Explicit changes only | Surgical precision |
| #5 | Test mobile + verify desktop | Zero regressions |
| #6 | Read rules before task | Remember constraints |
| #7 | Component mods preserve everything | No deletions |

***

## 🔓 EXCEPTION KEYWORDS (User Override)

If user says ANY of these, rules can be relaxed:
- "ignore PROJECT_RULES"
- "modify desktop"
- "change all breakpoints"
- "rewrite the component"
- "exception: [reason]"

**Agent must still confirm:**
```
"This will modify frozen desktop. Confirm? (yes/no)"
```

***

**END OF RULES - THESE ARE MANDATORY**
