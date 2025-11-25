# How to Add Images to Your Website

## Step 1: Add Your Image Files
1. Place your image files (JPG, PNG, etc.) into the `images/` folder
2. For example: `images/painting1.jpg`, `images/painting2.png`

## Step 2: Add Images to Your HTML Pages

### Single Image
To add a single image, use this code anywhere in your content:

```html
<img src="images/your-image-name.jpg" alt="Description of the image">
```

**Example:**
```html
<img src="images/vulcan-painting.jpg" alt="VULCAN painting">
```

### Multiple Images in a Gallery
To display multiple images in a grid, use this:

```html
<div class="image-gallery">
    <img src="images/image1.jpg" alt="First painting">
    <img src="images/image2.jpg" alt="Second painting">
    <img src="images/image3.jpg" alt="Third painting">
</div>
```

## Step 3: Where to Place the Code
You can add images anywhere in the `<div class="container">` section of your HTML pages:
- Between paragraphs
- At the beginning or end of content
- In any order you prefer

## Example on Index Page
Here's how you could add an image to your index.html page:

```html
<div class="container">
    <div>
        <div class="header-section">
            <p>tóthbátor</p>
            <!-- ... header content ... -->
        </div>
        
        <!-- Add an image here -->
        <img src="images/vulcan-main.jpg" alt="VULCAN exhibition">
        
        <p>VULCAN is a deep meditation...</p>
        <!-- rest of your content -->
    </div>
</div>
```

## Image Tips
- **File names**: Use lowercase, no spaces (use dashes: `my-image.jpg`)
- **Alt text**: Always include descriptive alt text for accessibility
- **File size**: Optimize images for web (keep file sizes reasonable for faster loading)
- **Formats**: JPG for photos, PNG for graphics with transparency

## Need Help?
The images will automatically:
- Scale to fit the page width
- Maintain their aspect ratio
- Be centered on the page (for single images)
- Create a responsive grid (for galleries)

