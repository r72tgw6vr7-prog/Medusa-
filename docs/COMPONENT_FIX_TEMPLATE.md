# Component Fix Template for Design System Compliance

This template provides a step-by-step guide for fixing components to comply with our design system. Use this template when migrating components like ServiceMindMap, SalonCarousel, and others.

## Component Fix Checklist

### 1. Identify Design Token Issues

- [ ] Replace hardcoded colors with design token classes
- [ ] Replace inline styles with Tailwind utility classes
- [ ] Align spacing to 8px grid
- [ ] Use standard border radius tokens
- [ ] Use standard shadow tokens
- [ ] Fix typography to use proper font tokens

### 2. Step-by-Step Fix Process

#### Colors

```jsx
// BEFORE
<div style={{ backgroundColor: '#D4AF37' }}>Content</div>
// or
<div className="bg-[#D4AF37]">Content</div>

// AFTER
<div className="bg-brand-gold">Content</div>
```

#### Spacing

```jsx
// BEFORE
<div className="p-[17px] mb-[22px]">Unaligned spacing</div>

// AFTER (aligned to 8px grid)
<div className="p-4 mb-6">Aligned spacing (16px, 24px)</div>
```

#### Shadows

```jsx
// BEFORE
<div className="shadow-[0_0_15px_rgba(212,175,55,0.3)]">Custom shadow</div>

// AFTER
<div className="shadow-gold-glow">Standard shadow</div>
```

#### Typography

```jsx
// BEFORE
<h2 className="text-[32px] font-[Playfair_Display]">Heading</h2>

// AFTER
<h2 className="font-headline text-[--text-headline-md-desktop]">Heading</h2>
```

#### Border Radius

```jsx
// BEFORE
<div className="rounded-[10px]">Non-standard radius</div>

// AFTER
<div className="rounded-md">Standard radius (8px)</div>
```

### 3. Common Component-Specific Fixes

#### Cards & Containers

```jsx
// BEFORE
<div className="bg-[#222222] rounded-[12px] p-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
  <h3 className="text-[#FFFFFF] text-[24px] mb-[16px]">Card Title</h3>
  <p className="text-[rgba(255,255,255,0.8)]">Card content</p>
</div>

// AFTER
<div className="bg-brand-background rounded-md p-6 shadow-md">
  <h3 className="text-text-primary text-[--text-headline-md-desktop] mb-4">Card Title</h3>
  <p className="text-text-secondary">Card content</p>
</div>
```

#### Buttons

```jsx
// BEFORE
<button className="bg-[#D4AF37] hover:bg-[#C19B26] text-[#222222] rounded-[8px] px-[16px] py-[8px] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
  Click Me
</button>

// AFTER
<button className="bg-brand-gold hover:bg-brand-gold-hover text-deep-black rounded-md px-4 py-2 shadow-gold-glow-subtle">
  Click Me
</button>
```

#### Glassmorphism Effects

```jsx
// BEFORE
<div className="bg-[rgba(34,34,34,0.3)] backdrop-blur-[8px] border border-[rgba(192,192,192,0.15)]">
  Glass Effect
</div>

// AFTER
<div className="bg-brand-background/30 backdrop-blur-md border border-border-default">
  Glass Effect
</div>
```

### 4. Testing & Validation

After making your changes, verify:

1. Component looks identical to the original
2. Responsive behavior works as expected
3. Interactive states (hover, focus, active) work correctly
4. Animations and transitions are preserved
5. Build completes without errors

### 5. Example Process for ServiceMindMap Component

```jsx
// Original ServiceMindMap with non-compliant styles
<div style={{ 
  backgroundColor: 'rgba(34,34,34,0.5)', 
  boxShadow: '0 0 20px rgba(212,175,55,0.3)',
  borderRadius: '16px',
  padding: '24px'
}}>
  <h2 style={{ color: '#D4AF37', fontSize: '36px', marginBottom: '20px' }}>
    Service Mind Map
  </h2>
  {/* Content... */}
</div>

// Fixed ServiceMindMap with design system tokens
<div className="bg-brand-background/50 shadow-gold-glow rounded-lg p-6">
  <h2 className="text-brand-gold text-[--text-headline-md-desktop] mb-5">
    Service Mind Map
  </h2>
  {/* Content... */}
</div>
```

## Common Pitfalls to Avoid

1. **Inconsistent Sizing**: Always use the 8px grid for spacing
2. **Custom Colors**: Never use hex codes directly
3. **Non-Standard Shadows**: Use the predefined shadow tokens
4. **Incorrect Border Radius**: Use only the standardized radius tokens
5. **Hardcoded Font Properties**: Use the typography tokens

## Final Verification

Before submitting your fixed component:

- [ ] Run build to verify no errors
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Compare visually with the original design
- [ ] Check for any performance issues

By following this template, you'll ensure that components are properly aligned with our design system and provide a consistent user experience.