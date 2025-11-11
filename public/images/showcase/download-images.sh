#!/bin/bash

# Create directory if it doesn't exist
mkdir -p /Users/yos/Work/CascadeProjects/Stargate/public/images/showcase

# Define image URLs from webflow template
IMAGES=(
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c67c6bd0881074a2cff2_showcase-thumb-01.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c707160ec9b2c9620065_showcase-thumb-02.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c7147e474c5aef9c73e7_showcase-thumb-03.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c7152685590470662250_showcase-thumb-04.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c715df83d42a0a605eaf_showcase-thumb-05.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c715160ec9b2c962068f_showcase-thumb-06.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c715a6673d159bed80db_showcase-thumb-07.jpg"
  "https://cdn.prod.website-files.com/664f2a2f12bc05e74a7217b4/66b1c7158c9b0dd8c40843d4_showcase-thumb-08.jpg"
)

# Download images
for i in "${!IMAGES[@]}"; do
  INDEX=$((i + 1))
  PADDED_INDEX=$(printf "%02d" $INDEX)
  OUTPUT_PATH="/Users/yos/Work/CascadeProjects/Stargate/public/images/showcase/showcase-${PADDED_INDEX}.jpg"
  
  echo "Downloading image $INDEX to $OUTPUT_PATH"
  curl -s "${IMAGES[$i]}" -o "$OUTPUT_PATH"
done

echo "All images downloaded successfully"
