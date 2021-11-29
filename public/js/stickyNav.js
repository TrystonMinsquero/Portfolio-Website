// get navbar
const navbar = document.querySelector(".navbar");
const pos = navbar.offsetTop;

window.onscroll = () => {
    if(window.scrollY >= pos) navbar.classList.add('stick');
    else navbar.classList.remove('stick');
}