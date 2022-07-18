const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {
        //toggle navigation
        nav.classList.toggle('nav-active');
        //Animate link entry
//         navLinks.forEach((link, index) => {
//             link.style.animation = `navLinkFade 0.25s ease forwards ${index/8}s`
//             console.log(index / 8);
//         });
    });
    
    
}

navSlide();
