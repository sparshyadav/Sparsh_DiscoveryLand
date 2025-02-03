document.addEventListener('DOMContentLoaded', function() {
    const mainHeader = document.querySelector('.disc-gall-header');
    const header = document.querySelector('.disc-gall-header-nav');
    const headerLinks = document.querySelector('.disc-gall-header-nav-links');
    const headerDarkLogo = document.querySelector('.disc-gall-header-nav-dark-logo');
    const headerLightLogo = document.querySelector('.disc-gall-header-nav-white-logo');
    const animationUnderlines = document.querySelectorAll('.disc-gall-header-nav-span');
    const categoryContainer = document.querySelector('.disc-gall-categories-container');
    const footer = document.querySelector('footer');
    const galleryContainer = document.querySelector('.gallery-container');
    const headerMenuIcon = document.querySelector('.disc-gall-header-nav-menu-option p');
    const headerMenuIconBorder = document.querySelector('.disc-gall-header-nav-menu-option');
    
    let lastScrollPosition = window.scrollY;
    let ticking = false;
    
    mainHeader.style.position = 'fixed';
    mainHeader.style.width = '100%';
    mainHeader.style.top = '0';
    mainHeader.style.transition = 'transform 0.8s ease-in-out';
    mainHeader.style.zIndex = '3';
    
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.zIndex = '1';
    
    categoryContainer.style.position = 'relative';
    categoryContainer.style.zIndex = '2';
    categoryContainer.style.backgroundColor = '#fff';
    categoryContainer.style.transition = 'transform 0.3s ease-out';
    
    const footerHeight = footer.offsetHeight;
    const categoryHeight = categoryContainer.offsetHeight;
    
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.zIndex = '2';
    
    galleryContainer.parentNode.insertBefore(wrapper, galleryContainer);
    wrapper.appendChild(galleryContainer);
    wrapper.appendChild(categoryContainer);
    
    document.body.style.paddingBottom = `${footerHeight}px`;

    window.addEventListener('wheel', function(e) {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight - footerHeight;

        if (currentScroll >= maxScroll && e.deltaY > 0) {
            e.preventDefault();
            window.scrollTo(0, maxScroll);
        }
    }, { passive: false });
    
    window.addEventListener('scroll', function() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScroll = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const maxScroll = documentHeight - windowHeight - footerHeight;
                    
                    if (currentScroll > maxScroll) {
                        window.scrollTo(0, maxScroll);
                    }
                    
                    if (currentScroll > 50) {
                        headerMenuIcon.style.color = '#000000';
                        headerMenuIconBorder.style.borderColor = '#000000'; 
                        header.style.backgroundColor = '#ffffff';
                        header.style.transition = 'background-color 0.8s ease-in-out';
                        headerLinks.style.color = '#000000';
                        headerLinks.style.transition = 'color 0.8s ease-in-out';
                        headerLightLogo.style.display = 'none';
                        headerDarkLogo.style.display = 'block';
                        animationUnderlines.forEach(span => span.style.backgroundColor = '#000000');
                    } else {
                        headerMenuIcon.style.color = '#ffffff';
                        headerMenuIconBorder.style.borderColor = '#ffffff'; 
                        header.style.backgroundColor = 'transparent';
                        headerLinks.style.color = '#ffffff';
                        headerDarkLogo.style.display = 'none';
                        headerLightLogo.style.display = 'block';
                        animationUnderlines.forEach(span => span.style.backgroundColor = '#ffffff');
                    }
                    
                    if (currentScroll > 180) {
                        if (currentScroll > lastScrollPosition) {
                            mainHeader.style.transform = 'translateY(-100%)';
                        } else {
                            mainHeader.style.transform = 'translateY(0)';
                        }
                    } else {
                        mainHeader.style.transform = 'translateY(0)';
                    }
                    
                    if (currentScroll > maxScroll - footerHeight) {
                        const translateY = currentScroll - (maxScroll - footerHeight);
                        categoryContainer.style.transform = `translateY(-${translateY}px)`;
                    } else {
                        categoryContainer.style.transform = 'translateY(0)';
                    }
                    
                    lastScrollPosition = currentScroll;
                    ticking = false;
                });
                
                ticking = true;
            }
        }
    });
});

