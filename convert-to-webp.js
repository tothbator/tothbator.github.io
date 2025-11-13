const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Get folder name from command line argument, default to 'images'
const folderName = process.argv[2] || 'images';
const imagesDir = path.join(__dirname, folderName);

// Function to convert an image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .rotate() // Automatically rotates based on EXIF orientation and removes EXIF data
      .webp({ quality: 85 }) // Adjust quality (0-100) as needed
      .toFile(outputPath);
    console.log(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
  }
}

// Get all image files from the images directory
function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });
}

// Main function
async function main() {
  console.log('🖼️  Converting images to WebP...\n');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found!');
    process.exit(1);
  }

  const imageFiles = getImageFiles(imagesDir);
  
  if (imageFiles.length === 0) {
    console.log('No images found to convert.');
    return;
  }

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(imagesDir, `${baseName}.webp`);
    
    // Only convert if WebP doesn't exist or source is newer
    if (!fs.existsSync(outputPath) || 
        fs.statSync(inputPath).mtime > fs.statSync(outputPath).mtime) {
      await convertToWebP(inputPath, outputPath);
    } else {
      console.log(`○ Skipped: ${file} (WebP already exists and is up to date)`);
    }
  }
  
  console.log('\n✨ Conversion complete!');
}

main();

