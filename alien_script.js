// script.js


var images = ['images/Last(s).jpg', 'images/Alien no.4.jpg', 'images/Alien no.3.jpg', 'images/Alien no.2.jpg', 'images/Alien no.1.jpg', ];
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
