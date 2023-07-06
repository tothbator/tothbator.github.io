// script.js


var images = ['imagesOPT/alien3.jpg', 'imagesOPT/lasts.jpeg', 'imagesOPT/whereisit.jpg', 'imagesOPT/landscrape1.jpg'];
var imageNumber = 0;

function changeImage() {
    imageNumber = (imageNumber + 1) % images.length;
    document.getElementById('image' + (imageNumber + 1)).src = images[imageNumber];
    hideImages(imageNumber);
}

function hideImages(currentImage) {
    for (let i = 1; i <= images.length; i++) {
        let imageElement = document.getElementById('image' + i);
        imageElement.style.display = (i - 1 === currentImage) ? "block" : "none";
    }
}

window.onload = function() {
    hideImages(0);
}
