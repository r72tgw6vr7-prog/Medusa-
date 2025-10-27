# FIGMA DESIGN TOKEN SYNCHRONIZATION GUIDE
**Medusa Tattoo München - Design System Alignment**

## 🎯 OBJECTIVE
Synchronize Figma design system with `brand-tokens.json` as the **single source of truth** to ensure zero design-to-development discrepancies.

---

## 📋 PRE-REQUISITES

### ✅ Required Files
- `brand-tokens.json` (located in project root)
- Figma project: "Medusa Tattoo München"
- Admin access to Figma file

### ✅ Tools Needed
- Figma Desktop or Web App (with Variables feature)
- JSON to Figma Variables plugin (optional but recommended)

---

## 🎨 STEP 1: IMPORT DESIGN TOKENS INTO FIGMA VARIABLES

### 1.1 Access Figma Variables Panel
1. Open Medusa Tattoo München Figma project
2. Click **Local variables** icon in right sidebar (4 dots icon)
3. Click **Create collection** or **Import variables**

### 1.2 Create Variable Collections

#### Collection 1: Brand Colors
**Collection Name:** `Medusa/Colors`

| Variable Name | Value | Type | Description |
|:---|:---|:---|:---|
| `color/gold` | `#D4AF37` | Color | Primary brand gold for CTAs, accents |
| `color/background` | `#222222` | Color | Brand background (NOT #0A0A0A) |
| `color/white` | `#FFFFFF` | Color | Pure white for text (NOT #F5F5F0) |
| `color/chrome` | `#C0C0C0` | Color | Chrome silver for secondary accents |
| `color/gold-hover` | `#C19B26` | Color | Gold hover state |
| `color/gold-active` | `#A8821A` | Color | Gold active state |
| `color/chrome-hover` | `#A8A8A8` | Color | Chrome hover state |

#### Collection 2: Semantic Colors
**Collection Name:** `Medusa/Colors/Semantic`

| Variable Name | Value | Type | Opacity |
|:---|:---|:---|:---|
| `text/primary` | `#FFFFFF` | Color | 100% |
| `text/secondary` | `#FFFFFF` | Color | 80% |
| `text/tertiary` | `#FFFFFF` | Color | 60% |
| `background/overlay` | `#222222` | Color | 90% |

#### Collection 3: Typography
**Collection Name:** `Medusa/Typography`

| Variable Name | Value | Type |
|:---|:---|:---|
| `font/heading` | Playfair Display | String |
| `font/body` | Inter | String |

#### Collection 4: Spacing
**Collection Name:** `Medusa/Spacing`

| Variable Name | Value (px) | Value (rem) | Type |
|:---|:---|:---|:---|
| `spacing/1` | 8px | 0.5rem | Number |
| `spacing/2` | 16px | 1rem | Number |
| `spacing/3` | 24px | 1.5rem | Number |
| `spacing/4` | 32px | 2rem | Number |
| `spacing/6` | 48px | 3rem | Number |
| `spacing/8` | 64px | 4rem | Number |
| `spacing/10` | 80px | 5rem | Number |
| `spacing/12` | 96px | 6rem | Number |

#### Collection 5: Breakpoints
**Collection Name:** `Medusa/Breakpoints`

| Variable Name | Value | Type |
|:---|:---|:---|
| `mobile/min` | 320 | Number |
| `mobile/max` | 767 | Number |
| `tablet/min` | 768 | Number |
| `tablet/max` | 1199 | Number |
| `desktop/min` | 1200 | Number |

---

## 🔧 STEP 2: APPLY VARIABLES TO COMPONENTS

### 2.1 Button Component (Primary CTA)

**Component:** `Button/Primary`

| Property | Figma Variable | CSS Equivalent |
|:---|:---|:---|
| Fill | `{color/gold}` | `var(--brand-gold)` |
| Text Color | `{color/background}` | `var(--brand-background)` |
| Padding H | `{spacing/4}` (32px) | `var(--spacing-4)` |
| Padding V | `{spacing/2}` (16px) | `var(--spacing-2)` |
| Border Radius | `{spacing/1}` (8px) | `var(--radius-sm)` |
| Min Height | 44px | `var(--touch-target-min)` |
| Font Family | `{font/body}` | `var(--font-body)` |

**Hover State:**
- Fill: `{color/gold-hover}` → `var(--brand-gold-hover)`
- Shadow: Gold glow effect

**Disabled State:**
- Fill: `{color/gold}` at 30% opacity
- Text: `{text/tertiary}`

### 2.2 Button Component (Secondary)

**Component:** `Button/Secondary`

| Property | Figma Variable | CSS Equivalent |
|:---|:---|:---|
| Fill | Transparent | `transparent` |
| Border | 1px `{color/gold}` | `border: 1px solid var(--brand-gold)` |
| Text Color | `{color/gold}` | `var(--brand-gold)` |
| Padding H | `{spacing/4}` (32px) | `var(--spacing-4)` |
| Padding V | `{spacing/2}` (16px) | `var(--spacing-2)` |

### 2.3 Card Component

**Component:** `Card/Standard`

| Property | Figma Variable | CSS Equivalent |
|:---|:---|:---|
| Fill | `{color/background}` at 95% | `rgba(34, 34, 34, 0.95)` |
| Border | 1px `{color/chrome}` at 15% | `rgba(192, 192, 192, 0.15)` |
| Border Radius | `{spacing/2}` (16px) | `var(--radius-md)` |
| Padding | `{spacing/4}` (32px) | `var(--spacing-4)` |
| Backdrop Blur | 20px | `backdrop-filter: blur(20px)` |

### 2.4 Typography Styles

#### Headline XL (H1)
- Font: `{font/heading}` (Playfair Display)
- Color: `{color/gold}`
- Desktop: 72px / Bold / Line Height 1.1
- Tablet: 56px / Bold / Line Height 1.2
- Mobile: 40px / Bold / Line Height 1.2

#### Body Text
- Font: `{font/body}` (Inter)
- Color: `{text/primary}`
- Desktop: 20px / Regular / Line Height 1.5
- Tablet: 18px / Regular / Line Height 1.5
- Mobile: 16px / Regular / Line Height 1.5

### 2.5 Navigation Component

**Component:** `Navigation/Desktop`

| Property | Figma Variable | CSS Equivalent |
|:---|:---|:---|
| Background | `{color/background}` at 85% | `rgba(34, 34, 34, 0.85)` |
| Border Bottom | 1px `{color/gold}` at 20% | `rgba(212, 175, 55, 0.2)` |
| Height | 80px | `var(--nav-height-desktop)` |
| Padding H | `{spacing/10}` (80px) | `var(--spacing-10)` |
| Logo Color | `{color/gold}` | `var(--brand-gold)` |
| Link Color | `{text/primary}` | `var(--brand-white)` |
| Link Hover | `{color/gold}` | `var(--brand-gold)` |

---

## 📐 STEP 3: RESPONSIVE VARIANTS

### 3.1 Create Component Variants

For each major component, create variants for:

#### Mobile Variant (320-767px)
- Use `{breakpoint/mobile/min}` and `{breakpoint/mobile/max}`
- Apply mobile-specific spacing variables
- Ensure touch targets ≥ 44px

#### Tablet Variant (768-1199px)
- Use `{breakpoint/tablet/min}` and `{breakpoint/tablet/max}`
- Apply tablet-specific spacing
- Hybrid navigation (hamburger menu)

#### Desktop Variant (1200px+)
- Use `{breakpoint/desktop/min}`
- Full navigation with all links visible
- Maximum spacing and typography scale

### 3.2 Component Property Setup

For **Button Component:**
1. Create component set: `Button`
2. Add variant property: `Size` (Small, Medium, Large)
3. Add variant property: `State` (Default, Hover, Disabled, Focus)
4. Add variant property: `Type` (Primary, Secondary, Tertiary)
5. Apply variables to each variant combination

---

## ✅ STEP 4: VALIDATION CHECKLIST

### 4.1 Color Validation

| Component | Figma Variable | Code CSS Variable | Status |
|:---|:---|:---|:---:|
| Button (Primary Fill) | `{color/gold}` | `var(--brand-gold)` | ⬜ |
| Background | `{color/background}` | `var(--brand-background)` | ⬜ |
| Text Primary | `{text/primary}` | `var(--brand-white)` | ⬜ |
| Accent Hover | `{color/gold-hover}` | `var(--brand-gold-hover)` | ⬜ |
| Chrome Details | `{color/chrome}` | `var(--brand-chrome)` | ⬜ |

### 4.2 Spacing Validation

| Component | Figma Variable | Code CSS Variable | Status |
|:---|:---|:---|:---:|
| Button Padding H | `{spacing/4}` (32px) | `var(--spacing-4)` | ⬜ |
| Card Padding | `{spacing/4}` (32px) | `var(--card-padding-desktop)` | ⬜ |
| Section Spacing | `{spacing/10}` (80px) | `var(--spacing-section-desktop)` | ⬜ |
| Grid Gap | `{spacing/4}` (32px) | `var(--grid-gutter-desktop)` | ⬜ |

### 4.3 Typography Validation

| Element | Figma Font | Code Font | Status |
|:---|:---|:---|:---:|
| Headline | `{font/heading}` | `var(--font-headline)` | ⬜ |
| Body Text | `{font/body}` | `var(--font-body)` | ⬜ |

---

## 📊 STEP 5: COMPONENT SPECIFICATIONS

### 5.1 Create Component Spec Page

**Figma Page:** "Component Specs"

For each component, document:

#### Button/Primary Specifications
- **Variants:** Default, Hover, Focus, Disabled
- **Sizes:** Small (36px), Medium (44px), Large (56px)
- **Tokens Used:**
  - Background: `{color/gold}` (#D4AF37)
  - Text: `{color/background}` (#222222)
  - Padding H: `{spacing/4}` (32px)
  - Padding V: `{spacing/2}` (16px)
  - Border Radius: `{spacing/1}` (8px)
- **Responsive Behavior:**
  - Mobile: 48px height, full width option
  - Tablet: 48px height
  - Desktop: 56px height
- **Accessibility:**
  - Min touch target: 44×44px
  - Focus ring: 2px `{color/gold}` with 2px offset
  - ARIA label required

#### Card/Standard Specifications
- **Tokens Used:**
  - Background: `{color/background}` at 95% opacity
  - Border: 1px `{color/chrome}` at 15% opacity
  - Padding: `{spacing/4}` (32px)
  - Border Radius: `{spacing/2}` (16px)
  - Shadow: Gold glow on hover
- **Responsive Behavior:**
  - Mobile: Padding 16px (`{spacing/2}`)
  - Tablet: Padding 24px (`{spacing/3}`)
  - Desktop: Padding 32px (`{spacing/4}`)

---

## 🚀 STEP 6: DEVELOPER HANDOFF

### 6.1 Enable Figma Dev Mode

1. Click **Dev Mode** toggle in Figma
2. Select any component
3. Verify that Variables are visible in inspect panel
4. Developers should see exact CSS variable names

### 6.2 Export Design Tokens

**Option 1: Manual JSON Export**
1. Go to Local Variables panel
2. Click "..." menu
3. Export as JSON
4. Compare with `brand-tokens.json`

**Option 2: Figma API**
Use Figma API to programmatically sync tokens:
```bash
GET https://api.figma.com/v1/files/:file_key/variables/local
```

### 6.3 Create Handoff Documentation

**Document Name:** `DESIGN_TO_CODE_MAPPING.md`

Include:
- Component inventory with Figma → Code mappings
- Token reference table
- Responsive behavior specifications
- Accessibility requirements
- Interaction states

---

## 🔍 STEP 7: QUALITY ASSURANCE

### 7.1 Design System Audit

**Audit Checklist:**

| Category | Check | Status |
|:---|:---|:---:|
| **Colors** | Zero hard-coded hex values in components | ⬜ |
| **Colors** | All colors use Figma variables | ⬜ |
| **Colors** | Only 4 brand colors used (gold, background, white, chrome) | ⬜ |
| **Spacing** | All spacing uses 8px increments | ⬜ |
| **Spacing** | All padding/margins use spacing variables | ⬜ |
| **Typography** | Only Playfair Display and Inter fonts used | ⬜ |
| **Typography** | All text uses typography variables | ⬜ |
| **Components** | All components have responsive variants | ⬜ |
| **Components** | All interactive states defined (default, hover, focus, disabled) | ⬜ |
| **Accessibility** | All touch targets ≥ 44px | ⬜ |
| **Accessibility** | Focus states have 2px outline with 2px offset | ⬜ |

### 7.2 Cross-Reference Validation

**Run this validation:**

1. **Figma → Code:**
   - For each Figma variable, find corresponding CSS variable
   - Verify values match exactly
   - Document any discrepancies

2. **Code → Figma:**
   - For each CSS variable in `globals.css`, find Figma variable
   - Ensure naming consistency
   - Flag missing variables

---

## 📅 IMPLEMENTATION TIMELINE

### Phase 1: Foundation (Day 1)
- [ ] Import `brand-tokens.json` into Figma Variables
- [ ] Create all variable collections
- [ ] Validate Button component with variables
- [ ] Test one complete user flow

### Phase 2: Component Library (Days 2-3)
- [ ] Apply variables to Card component
- [ ] Apply variables to Input component
- [ ] Apply variables to Navigation component
- [ ] Apply variables to Typography styles
- [ ] Create component specifications page

### Phase 3: Responsive Variants (Day 4)
- [ ] Create mobile variants for all components
- [ ] Create tablet variants for all components
- [ ] Create desktop variants for all components
- [ ] Test responsive behavior

### Phase 4: Validation & Handoff (Day 5)
- [ ] Run complete QA audit
- [ ] Export design tokens
- [ ] Create developer handoff documentation
- [ ] Schedule design system walkthrough with dev team

---

## 🎯 SUCCESS CRITERIA

### ✅ Design System is Ready When:

1. **Zero Hard-Coded Values**
   - No hex colors in component fills/strokes
   - No pixel values in spacing/padding
   - All values reference Figma variables

2. **100% Token Alignment**
   - Every Figma variable has a corresponding CSS variable
   - All values match exactly between Figma and code
   - Naming conventions are consistent

3. **Developer-Ready Inspect**
   - Dev Mode shows exact CSS variable names
   - All component specs are documented
   - Responsive behavior is clearly defined

4. **WCAG AA Compliance**
   - All color combinations meet contrast requirements
   - All touch targets meet size requirements
   - All focus states are clearly visible

5. **Production Ready**
   - All major components have complete variant sets
   - All responsive breakpoints are defined
   - All interaction states are documented

---

## 🔗 REFERENCE LINKS

### Internal Documentation
- `/brand-tokens.json` - Single source of truth for design tokens
- `/styles/globals.css` - CSS implementation of tokens
- `/DESIGN_SYSTEM_README.md` - Design system overview
- `/Guidelines.md` - Brand compliance guidelines

### External Resources
- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Design Tokens Specification](https://tr.designtokens.org/format/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📞 SUPPORT & QUESTIONS

**For Questions:**
1. Check this documentation first
2. Review `brand-tokens.json` for token specifications
3. Consult `Guidelines.md` for brand compliance
4. Contact design system lead

**For Updates:**
- All token changes MUST be made in `brand-tokens.json` first
- Update Figma variables to match
- Version control all changes
- Notify team of breaking changes

---

**Last Updated:** {{current_date}}  
**Version:** 1.0  
**Status:** Ready for Implementation
