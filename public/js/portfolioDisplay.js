// get elements from document
const buttons = document.querySelector('.buttons');
const buttonList = buttons.children;
const inContent = document.querySelector('.content').children;
const pageContainer = document.querySelector('.page-container');

// add image to page conatiner
pageContainer.classList.add('bkgrd-img');

// compute grid columns dynamically
buttons.style.gridTemplateColumns = `repeat(${buttonList.length}, 1fr)`;

let currentIndex;
let timeout;
const swapCallbackTime = 500;

const swap = index => {
    if(index == currentIndex) return;           // no change needed

    // update button colors
    buttonList[currentIndex].classList.remove('current');
    buttonList[index].classList.add('current');

    clearTimeout(timeout);
    if(index < currentIndex) {                  // shifting left
        inContent[currentIndex].classList.add('swipe-left');
        inContent[index].classList.add('swipe-right');
        timeout = setTimeout(() => {
            inContent[index].classList.remove('hide');
            setTimeout(() => {
                inContent[index].classList.add('reset-swipe');
                inContent[index].classList.remove('swipe-right');
                console.log('index:', index, 'currentIndex:', currentIndex);
                inContent[currentIndex].classList.remove('swipe-left');
                inContent[currentIndex].classList.add('hide');
                setTimeout(() => {
                    inContent[index].classList.remove('reset-swipe');
                    currentIndex = index;
                }, swapCallbackTime);
            }, swapCallbackTime);
        }, swapCallbackTime);
    } else {                                    // shifting right
        inContent[currentIndex].classList.add('swipe-right');
        inContent[index].classList.add('swipe-left');
        inContent[index].classList.remove('hide');
        timeout = setTimeout(() => {
            inContent[index].classList.add('reset-swipe');
            inContent[index].classList.remove('swipe-left');
            inContent[currentIndex].classList.remove('swipe-right');
            inContent[currentIndex].classList.add('hide');
            setTimeout(() => {
                inContent[index].classList.remove('reset-swipe');
            }, swapCallbackTime);
            currentIndex = index;
        }, swapCallbackTime);
    }
};

// find the current button and register event handlers
for(let i = 0; i < buttonList.length; i++) {
    if(buttonList[i].classList.contains('current')) currentIndex = i;
    buttonList[i].addEventListener('click', e => {
        e.preventDefault();
        swap(i);
    });
}