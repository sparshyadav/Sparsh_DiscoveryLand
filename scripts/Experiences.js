document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".disc-gall-header");
    const whiteLogo = document.querySelector(".disc-gall-header-nav-dark-logo");
    const darkLogo = document.querySelector(".disc-gall-header-nav-white-logo");
    const navLinks = document.querySelectorAll(".disc-gall-header-nav-links div, .nav-items div");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            whiteLogo.style.display = "block";
            darkLogo.style.display = "none";

            navLinks.forEach(link => {
                link.style.color = "#000"; // Change text color to black
            });
        } else {
            navbar.classList.remove("scrolled");
            whiteLogo.style.display = "none";
            darkLogo.style.display = "block";

            navLinks.forEach(link => {
                link.style.color = "#fff"; // Revert text color to white
            });
        }
    });
});
