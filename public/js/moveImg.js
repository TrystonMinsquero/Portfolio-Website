const el = document.querySelector('.roundedCircle');

el.addEventListener('mousemove', e => {
    el.style.backgroundPositionX = -e.offsetX + 'px';
    el.style.backgroundPositionY = -e.offsetY + 'px';
});