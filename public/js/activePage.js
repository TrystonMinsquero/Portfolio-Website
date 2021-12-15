// get all <a class="underline"></a>
const currentPath = document.location.href;
document.querySelectorAll('.underline').forEach(e => {
    if(e.href == currentPath) {
        e.parentElement.classList.add('active');
    }
});