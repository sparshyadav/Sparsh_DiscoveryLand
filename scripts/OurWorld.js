window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let logo = document.getElementById("logo");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        logo.src = "logo-dark.png"; 
    } else {
        header.classList.remove("scrolled");
        logo.src = "logo-light.png"; 
    }
});
