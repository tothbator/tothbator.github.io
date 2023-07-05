// script.js
var images = ['images/alien3.jpg', 'images/lasts.jpg', 'images/whereisit.jpg', 'images/landscrape1.jpg'];
var index = 0;

function changeImage() {
    // Update the image
    document.getElementById('image').src = images[index];

    // Increment index or reset to zero if it's the last image
    index = (index + 1) % images.length;
}
