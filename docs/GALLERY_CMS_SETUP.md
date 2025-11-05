# Gallery CMS Setup Guide

This document outlines the process for managing gallery images through the CMS for the Medusa Tattoo website.

## Table of Contents

1. [Image Upload Guidelines](#image-upload-guidelines)
2. [Naming Conventions](#naming-conventions)
3. [Required Metadata](#required-metadata)
4. [Image Specifications](#image-specifications)
5. [Quality Guidelines](#quality-guidelines)
6. [CMS Integration](#cms-integration)

## Image Upload Guidelines

### Upload Process

1. Log in to the CMS dashboard
2. Navigate to "Gallery" section
3. Click "Add New Image"
4. Upload the image file
5. Fill in all required metadata fields
6. Select the appropriate artist and category
7. Click "Publish" to make the image live

### File Organization

Images are automatically organized in the following directory structure:

```
/public/assets/images/photos/gallery/
├── tattoos/
│   ├── debi/
│   ├── loui/
│   ├── luz/
│   └── legacy/
└── piercings/
```

## Naming Conventions

Follow these naming conventions for all gallery images:

- Use lowercase letters, numbers, and hyphens only
- No spaces or special characters
- Format: `[artist]-[style]-[descriptor]-[number].webp`

Examples:
- `debi-traditional-sleeve-01.webp`
- `loui-realism-portrait-03.webp`
- `luz-geometric-backpiece-01.webp`

## Required Metadata

Each gallery image must include the following metadata:

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| Title | Descriptive title | Yes | "Traditional Rose Sleeve" |
| Artist | Artist name | Yes | "Debi" |
| Style | Tattoo/piercing style | Yes | "Traditional" |
| Category | Type of work | Yes | "Tattoo" or "Piercing" |
| Year | Year created | Yes | "2025" |
| Description | Brief description | No | "Full sleeve with traditional roses and dagger" |
| Tags | Searchable keywords | No | ["sleeve", "roses", "traditional", "color"] |

## Image Specifications

All gallery images must meet these technical specifications:

- **Format:** WebP (primary), JPEG (fallback)
- **Minimum Width:** 800px
- **Recommended Width:** 1200px
- **Maximum Width:** 2400px
- **Aspect Ratio:** Maintain original aspect ratio
- **File Size:** Maximum 500KB
- **Color Profile:** sRGB
- **Compression:** High quality (85%+)

## Quality Guidelines

To maintain a consistent gallery appearance:

- Use professional photography with proper lighting
- Ensure images are in focus and sharp
- Clean backgrounds without distractions
- Consistent color balance across images
- No filters or heavy editing that misrepresents the work
- No watermarks or text overlays
- No collages (one piece per image)
- Proper cropping to highlight the artwork

## CMS Integration

The website automatically syncs with the CMS through a webhook system:

1. When images are added, updated, or removed in the CMS, a webhook is triggered
2. The webhook calls the `syncGalleryManifest()` function in `/src/api/gallery-sync.ts`
3. This function updates the local manifest file at `/public/assets/data/manifest.json`
4. The gallery page reads from this manifest file to display images

### Manifest Structure

The manifest file follows this JSON structure:

```json
{
  "images": [
    {
      "id": "unique-id-1",
      "title": "Traditional Rose Sleeve",
      "src": "/assets/images/photos/gallery/tattoos/debi/debi-traditional-sleeve-01.webp",
      "artist": "Debi",
      "style": "Traditional",
      "category": "Tattoo",
      "year": "2025",
      "description": "Full sleeve with traditional roses and dagger",
      "tags": ["sleeve", "roses", "traditional", "color"]
    },
    // More images...
  ]
}
```

For any questions or issues with the CMS integration, please contact the development team.
