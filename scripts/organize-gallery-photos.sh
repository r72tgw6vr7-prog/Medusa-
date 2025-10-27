#!/bin/bash

# Medusa Web Gallery Photo Organization Script
# This script copies and organizes photos from the Photos folder to the public/images directory
# Maintaining high resolution and proper organization

set -e  # Exit on error

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Medusa Gallery Photo Organization${NC}"
echo -e "${BLUE}========================================${NC}"

# Base directories
SOURCE_DIR="/Users/yos/Downloads/Medusa-Web/public/Photos"
DEST_BASE="/Users/yos/Downloads/Medusa-Web/public/images"

# Create destination directories
echo -e "\n${YELLOW}Creating directory structure...${NC}"
mkdir -p "$DEST_BASE/gallery/debi"
mkdir -p "$DEST_BASE/gallery/loui"
mkdir -p "$DEST_BASE/gallery/luz"
mkdir -p "$DEST_BASE/gallery/legacy"
mkdir -p "$DEST_BASE/piercings"
mkdir -p "$DEST_BASE/studio"
mkdir -p "$DEST_BASE/partners"

# Function to copy files with progress
copy_with_progress() {
    local source="$1"
    local dest="$2"
    local desc="$3"
    
    if [ -d "$source" ]; then
        echo -e "\n${GREEN}Copying $desc...${NC}"
        # Count files first (excluding .DS_Store)
        local count=$(find "$source" -type f ! -name ".DS_Store" ! -name "*.mp4" | wc -l | tr -d ' ')
        echo "Found $count files"
        
        # Copy files maintaining high quality
        find "$source" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" \) ! -name ".DS_Store" -exec cp -v {} "$dest/" \;
        
        echo -e "${GREEN}✓ Completed copying $desc${NC}"
    else
        echo -e "${YELLOW}⚠ Source not found: $source${NC}"
    fi
}

# Copy Debi's tattoo work
copy_with_progress "$SOURCE_DIR/Tattoos/Debi/Photos" "$DEST_BASE/gallery/debi" "Debi's tattoo portfolio"

# Copy Loui's tattoo work  
copy_with_progress "$SOURCE_DIR/Tattoos/Loui" "$DEST_BASE/gallery/loui" "Loui's tattoo portfolio"

# Copy Luz's (Eli Luquez) tattoo work
copy_with_progress "$SOURCE_DIR/Tattoos/Luz" "$DEST_BASE/gallery/luz" "Luz/Eli Luquez's tattoo portfolio"

# Copy Legacy tattoo work
copy_with_progress "$SOURCE_DIR/Tattoos/Legacy" "$DEST_BASE/gallery/legacy" "Legacy tattoo work"

# Copy Medusa piercings
copy_with_progress "$SOURCE_DIR/Piercings/Medusa" "$DEST_BASE/piercings" "Medusa piercings"

# Copy studio photos
copy_with_progress "$SOURCE_DIR/Our studio" "$DEST_BASE/studio" "Studio interior photos"

# Copy partner photos - I am robot
if [ -d "$SOURCE_DIR/Partner and services/I am robot" ]; then
    copy_with_progress "$SOURCE_DIR/Partner and services/I am robot" "$DEST_BASE/partners/i-am-robot" "I am robot partner"
fi

# Copy partner photos - we piercing
if [ -d "$SOURCE_DIR/Partner and services/we piercing" ]; then
    copy_with_progress "$SOURCE_DIR/Partner and services/we piercing" "$DEST_BASE/partners/we-piercing" "we piercing partner"
fi

# Convert HEIC files to JPEG if needed (requires imagemagick)
echo -e "\n${YELLOW}Checking for HEIC files to convert...${NC}"
if command -v magick &> /dev/null || command -v convert &> /dev/null; then
    find "$DEST_BASE" -type f -iname "*.heic" | while read -r file; do
        output="${file%.heic}.jpg"
        output="${output%.HEIC}.jpg"
        echo "Converting: $(basename "$file")"
        if command -v magick &> /dev/null; then
            magick "$file" "$output" 2>/dev/null || convert "$file" "$output"
        else
            convert "$file" "$output"
        fi
        rm "$file"  # Remove original HEIC after conversion
    done
    echo -e "${GREEN}✓ HEIC conversion complete${NC}"
else
    echo -e "${YELLOW}⚠ ImageMagick not found. HEIC files will remain unconverted.${NC}"
    echo -e "${YELLOW}  To convert, install: brew install imagemagick${NC}"
fi

# Generate summary report
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}Summary Report${NC}"
echo -e "${BLUE}========================================${NC}"

count_files() {
    local dir="$1"
    if [ -d "$dir" ]; then
        find "$dir" -type f ! -name ".DS_Store" | wc -l | tr -d ' '
    else
        echo "0"
    fi
}

echo -e "\n${GREEN}Gallery Photos:${NC}"
echo "  Debi:    $(count_files "$DEST_BASE/gallery/debi") files"
echo "  Loui:    $(count_files "$DEST_BASE/gallery/loui") files"
echo "  Luz:     $(count_files "$DEST_BASE/gallery/luz") files"
echo "  Legacy:  $(count_files "$DEST_BASE/gallery/legacy") files"

echo -e "\n${GREEN}Other Content:${NC}"
echo "  Piercings: $(count_files "$DEST_BASE/piercings") files"
echo "  Studio:    $(count_files "$DEST_BASE/studio") files"
echo "  Partners:  $(count_files "$DEST_BASE/partners") files"

echo -e "\n${GREEN}Total Photos Organized: $(find "$DEST_BASE/gallery" "$DEST_BASE/piercings" "$DEST_BASE/studio" "$DEST_BASE/partners" -type f ! -name ".DS_Store" 2>/dev/null | wc -l | tr -d ' ')${NC}"

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Photo organization complete!${NC}"
echo -e "${BLUE}========================================${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Review organized photos in: $DEST_BASE"
echo "2. Update gallery data files with new image paths"
echo "3. Test gallery page to ensure all images load"
echo "4. Optimize images for web if needed"
