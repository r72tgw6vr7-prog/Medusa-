#!/bin/bash

# Build script with debug modifications

# 1. Copy debug index.html to main index.html temporarily
cp index.debug.html index.html.bak
cp index.debug.html index.html

# 2. Build with ESLint disabled
echo "🔍 Building with debug configuration..."
ESLINT_DISABLE=true npm run build

# 3. Restore original index.html
mv index.html.bak index.html

# 4. Make sure debug.js is copied to dist
cp public/debug.js dist/

echo "✅ Debug build completed"
echo "📝 Run 'npm run preview' to test the build"
