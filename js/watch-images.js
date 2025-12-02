const chokidar = require('chokidar');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

// Function to convert an image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .rotate() // Automatically rotates based on EXIF orientation and removes EXIF data
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✓ Auto-converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
  }
}

console.log('👀 Watching images directory for changes...\n');
console.log('   Add any JPG/PNG image and it will be automatically converted to WebP!\n');

// Watch for new or changed image files
const watcher = chokidar.watch(path.join(imagesDir, '*.{jpg,jpeg,png}'), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const baseName = path.basename(filePath, path.extname(filePath));
      const webpPath = path.join(imagesDir, `${baseName}.webp`);
      await convertToWebP(filePath, webpPath);
    }
  })
  .on('change', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const baseName = path.basename(filePath, path.extname(filePath));
      const webpPath = path.join(imagesDir, `${baseName}.webp`);
      await convertToWebP(filePath, webpPath);
    }
  });

console.log('   Press Ctrl+C to stop watching.\n');

