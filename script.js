// script.js
var images = ['imgaes/69.jpg', 'imgaes/Last_s.jpg', 'imgaes/where is it 36x48.jpg'];
var index = 0;
var usedIndices = [];

function changeImage() {
    // If all images are used, reset usedIndices array
    if (usedIndices.length === images.length) {
        usedIndices = [];
    }

    // Find a random, unused index
    do {
        index = Math.floor(Math.random() * images.length);
    } while (usedIndices.includes(index));

    // Mark this index as used
    usedIndices.push(index);

    // Update the image
    document.getElementById('image').src = images[index];
}
