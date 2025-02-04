document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".disc-gall-header");
    const whiteLogo = document.querySelector(".disc-gall-header-nav-dark-logo");
    const darkLogo = document.querySelector(".disc-gall-header-nav-white-logo");
    const navLinks = document.querySelectorAll(".disc-gall-header-nav-links div, .nav-items div");
    const animatedElements = document.querySelectorAll(".fade-in"); 

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            whiteLogo.style.display = "block";
            darkLogo.style.display = "none";

            navLinks.forEach(link => {
                link.style.color = "#000"; 
            });
        } else {
            navbar.classList.remove("scrolled");
            whiteLogo.style.display = "none";
            darkLogo.style.display = "block";

            navLinks.forEach(link => {
                link.style.color = "#fff";
            });
        }
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 }); 

    animatedElements.forEach(el => observer.observe(el)); 
});


