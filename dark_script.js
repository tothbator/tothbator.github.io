// script.js

// Define an array of images for the "dark" page
var darkImages = ['images/dark1.jpg', 'images/dark2.jpg', 'images/dark3.jpg', 'images/dark4.jpg'];
var darkImageNumber = 0;

// Function to change the displayed image on the "dark" page
function changeImageDark() {
    darkImageNumber = (darkImageNumber + 1) % darkImages.length;
    document.getElementById('dimage' + (darkImageNumber + 1)).src = darkImages[darkImageNumber];
    hideImagesDark(darkImageNumber);
}

// Function to hide or show images on the "dark" page
function hideImagesDark(currentImageDark) {
    for (let i = 1; i <= darkImages.length; i++) {
        let imageElement = document.getElementById('dimage' + i);
        imageElement.style.display = (i - 1 === currentImageDark) ? "block" : "none";
    }
}

// Perform initial actions when the page loads
window.onload = function() {
    hideImagesDark(0);
}
