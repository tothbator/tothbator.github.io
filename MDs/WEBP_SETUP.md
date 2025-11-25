# WebP Image Converter Setup

This setup automatically converts your JPG/PNG images to WebP format for better website performance.

## Installation

1. Make sure you have Node.js installed (if not, download from [nodejs.org](https://nodejs.org/))

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Convert All Existing Images
Run this once to convert all images in your `images/` folder:
```bash
npm run convert-images
```

### Auto-Convert New Images (Watch Mode)
Run this to automatically convert any new images you add:
```bash
npm run watch-images
```
This will watch your `images/` folder and automatically convert any JPG/PNG files to WebP when you add them.

## How It Works

- When you add a JPG or PNG image to the `images/` folder, the script creates a `.webp` version
- WebP images are typically 25-35% smaller than JPG/PNG with the same quality
- The original images are kept, WebP versions are created alongside them

## Using WebP in Your HTML

After conversion, you'll have both versions:
- `Alien no.2.jpg` (original)
- `Alien no.2.webp` (WebP version)

You can use WebP in your HTML like this:
```html
<picture>
  <source srcset="images/Alien no.2.webp" type="image/webp">
  <img src="images/Alien no.2.jpg" alt="Alien no.2">
</picture>
```

Or just use WebP directly (modern browsers support it):
```html
<img src="images/Alien no.2.webp" alt="Alien no.2">
```

## Quality Settings

The default quality is set to 85. You can adjust this in `convert-to-webp.js`:
```javascript
.webp({ quality: 85 }) // Change this number (0-100)
```

## Notes

- WebP files are automatically created in the same `images/` folder
- Original files are never deleted
- The script skips conversion if WebP already exists and is up to date

