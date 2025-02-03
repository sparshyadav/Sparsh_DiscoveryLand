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
    
    // Set up initial styles
    mainHeader.style.position = 'fixed';
    mainHeader.style.width = '100%';
    mainHeader.style.top = '0';
    mainHeader.style.transition = 'transform 0.8s ease-in-out';
    mainHeader.style.zIndex = '3';
    
    // Set up footer styles
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.zIndex = '1';
    
    // Set up category container styles
    categoryContainer.style.position = 'relative';
    categoryContainer.style.zIndex = '2';
    categoryContainer.style.backgroundColor = '#fff';
    categoryContainer.style.transition = 'transform 0.3s ease-out';
    
    // Calculate heights
    const footerHeight = footer.offsetHeight;
    const categoryHeight = categoryContainer.offsetHeight;
    
    // Create a wrapper for the main content
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.zIndex = '2';
    
    // Move elements into wrapper
    galleryContainer.parentNode.insertBefore(wrapper, galleryContainer);
    wrapper.appendChild(galleryContainer);
    wrapper.appendChild(categoryContainer);
    
    // Add padding to account for footer
    document.body.style.paddingBottom = `${footerHeight}px`;

    // Prevent scrolling past certain point with wheel event
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
        // Check if the screen size is large enough (e.g., 768px or more)
        if (window.matchMedia("(min-width: 768px)").matches) {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScroll = window.scrollY;
                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const maxScroll = documentHeight - windowHeight - footerHeight;
                    
                    // Force scroll position to maxScroll if exceeded
                    if (currentScroll > maxScroll) {
                        window.scrollTo(0, maxScroll);
                    }
                    
                    // Header color change
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
                    
                    // Header hide/show
                    if (currentScroll > 180) {
                        if (currentScroll > lastScrollPosition) {
                            mainHeader.style.transform = 'translateY(-100%)';
                        } else {
                            mainHeader.style.transform = 'translateY(0)';
                        }
                    } else {
                        mainHeader.style.transform = 'translateY(0)';
                    }
                    
                    // Move category container when approaching footer
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
