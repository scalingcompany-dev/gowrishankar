document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on current item
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // If it wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 2. Sticky Mobile CTA Logic
    const stickyFooter = document.getElementById('stickyFooter');
    const heroCTA = document.querySelector('.hero-section .primary-cta');
    const paymentSection = document.getElementById('payment');
    
    // Set first FAQ as active by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    if (stickyFooter) {
        // Show sticky footer when user scrolls past the hero CTA
        window.addEventListener('scroll', () => {
            // Only show on mobile screens
            if (window.innerWidth <= 768) {
                let showSticky = false;
                
                // Show if scrolled past hero CTA
                if (heroCTA) {
                    const heroRect = heroCTA.getBoundingClientRect();
                    if (heroRect.bottom < 0) {
                        showSticky = true;
                    }
                } else if (window.scrollY > 500) { // Fallback if no hero CTA found
                    showSticky = true;
                }

                // Hide if scrolled to the payment section (so they don't double up)
                if (paymentSection) {
                    const paymentRect = paymentSection.getBoundingClientRect();
                    // If payment section is in viewport
                    if (paymentRect.top < window.innerHeight && paymentRect.bottom > 0) {
                        showSticky = false;
                    }
                }

                if (showSticky) {
                    stickyFooter.classList.add('visible');
                } else {
                    stickyFooter.classList.remove('visible');
                }
            } else {
                stickyFooter.classList.remove('visible'); // Always hide on desktop
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
