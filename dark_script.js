// script.js


var images = ['images/dark1.jpg', 'images/dark2.jpg', 'images/dark3.jpg', 'images/dark4.jpg',];
var imageNumber = 0;

function changeImageDark() {
    imageNumber = (imageNumber + 1) % images.length;
    document.getElementById('image' + (imageNumber + 1)).src = images[imageNumber];
    hideImages(imageNumber);
}

function hideImagesDark(currentImageDark) {
    for (let i = 1; i <= images.length; i++) {
        let imageElement = document.getElementById('image' + i);
        imageElement.style.display = (i - 1 === currentImage) ? "block" : "none";
    }
}

window.onload = function() {
    hideImages(0);
}
