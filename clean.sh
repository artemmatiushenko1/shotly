#!/bin/bash

echo "🧹 Cleaning up Turborepo project..."

# Remove all node_modules folders
echo "Removing node_modules..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Remove dist and build folders
echo "Removing dist and build folders..."
find . -type d \( -name "dist" -o -name "build" \) -prune -exec rm -rf '{}' +

# Remove Turbo cache
echo "Removing .turbo cache..."
find . -type d -name ".turbo" -prune -exec rm -rf '{}' +

# Remove .next (if using Next.js)
echo "Removing .next folders..."
find . -type d -name ".next" -prune -exec rm -rf '{}' +

echo "✅ Cleanup complete!"
