let toggleState = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
});

const toggleTab = (index) => {
    document.querySelectorAll('.services__modal').forEach(modal => {
        modal.classList.remove('active-modal');
    });

    if (index !== 0) {
        document.getElementById(`modal${index}`).classList.add('active-modal');
    }
    toggleState = index;
};

setTimeout(function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';

    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
}, 2000);