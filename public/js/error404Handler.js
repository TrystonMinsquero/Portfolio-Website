// get elements from document
const pageContainer = document.querySelector('.page-container');
const hidden = document.querySelectorAll('.hide');

const delay = 150;

// add image
pageContainer.classList.add('bkgrd-img');

// unhide all hidden objects
for (const item of hidden) {
    item.classList.remove('hide');
    item.classList.add('swipe-left');
    setTimeout(() => {
        item.classList.remove('swipe-left');
    }, delay);
}
