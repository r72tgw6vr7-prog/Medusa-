# Responsive Audit Report

Generated: 2026-01-22T12:17:18.652Z
Base URL: http://localhost:5173

## Summary

**Overall Pass Rate: 93% (400/432 checks passed)**

- Total Routes Tested: 6
- Total Viewports: 9
- Total Test Cases: 54
- Passing Test Cases: 33
- Failing Test Cases: 21

## Results by Route

- **/**: 0/9 viewports passed
- **/services/tattoos**: 8/9 viewports passed
- **/services/piercings**: 8/9 viewports passed
- **/gallery**: 6/9 viewports passed
- **/artists**: 5/9 viewports passed
- **/contact**: 6/9 viewports passed

## Results by Viewport

- **360×740**: 5/6 routes passed
- **375×667**: 5/6 routes passed
- **390×844**: 4/6 routes passed
- **768×1024**: 4/6 routes passed
- **800×1024**: 4/6 routes passed
- **1023×768**: 5/6 routes passed
- **1024×768**: 0/6 routes passed
- **1280×720**: 3/6 routes passed
- **1920×1080**: 3/6 routes passed

## Check Statistics

- **noHorizontalScroll**: 54/54 passed (100%)
- **buttonsTapTarget**: 54/54 passed (100%)
- **inputsTapTarget**: 48/54 passed (89%)
- **typographyReadable**: 54/54 passed (100%)
- **imagesScaleCorrectly**: 45/54 passed (83%)
- **navigationWorks**: 54/54 passed (100%)
- **footerLayoutCorrect**: 54/54 passed (100%)
- **noOverflowElements**: 37/54 passed (69%)

## Failures

### / @ 360×740
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__360x740__FAIL.png`

### / @ 375×667
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__375x667__FAIL.png`

### / @ 390×844
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__390x844__FAIL.png`

### /artists @ 390×844
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/artists__390x844__FAIL.png`

### / @ 768×1024
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__768x1024__FAIL.png`

### /artists @ 768×1024
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/artists__768x1024__FAIL.png`

### / @ 800×1024
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__800x1024__FAIL.png`

### /artists @ 800×1024
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/artists__800x1024__FAIL.png`

### / @ 1023×768
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__1023x768__FAIL.png`

### / @ 1024×768
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__1024x768__FAIL.png`

### /services/tattoos @ 1024×768
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/services__tattoos__1024x768__FAIL.png`

### /services/piercings @ 1024×768
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/services__piercings__1024x768__FAIL.png`

### /gallery @ 1024×768
- **Failed Checks**: inputsTapTarget, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/gallery__1024x768__FAIL.png`

### /artists @ 1024×768
- **Failed Checks**: noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/artists__1024x768__FAIL.png`

### /contact @ 1024×768
- **Failed Checks**: inputsTapTarget, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/contact__1024x768__FAIL.png`

### / @ 1280×720
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__1280x720__FAIL.png`

### /gallery @ 1280×720
- **Failed Checks**: inputsTapTarget
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/gallery__1280x720__FAIL.png`

### /contact @ 1280×720
- **Failed Checks**: inputsTapTarget
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/contact__1280x720__FAIL.png`

### / @ 1920×1080
- **Failed Checks**: imagesScaleCorrectly, noOverflowElements
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/home__1920x1080__FAIL.png`

### /gallery @ 1920×1080
- **Failed Checks**: inputsTapTarget
- **Screenshot**: `docs/verification/responsive-audit-complete/failures/gallery__1920x1080__FAIL.png`



*... and 1 more failures*

## Verification

All screenshots and failure evidence available in:
- Screenshots: `docs/verification/responsive-audit-complete/screenshots/`
- Failures: `docs/verification/responsive-audit-complete/failures/`
- Raw Data: `docs/verification/responsive-audit-complete/results.json`
