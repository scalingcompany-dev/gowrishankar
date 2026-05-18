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
    const heroCTA = document.querySelector('.hero-section-majestic .massive-cta-orange');
    const paymentSection = document.getElementById('payment');
    
    // Set first FAQ as active by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // 3. Belief Flow Tab Toggle
    const beliefTabs = document.querySelectorAll('.belief-tab');
    const panelOld = document.getElementById('panelOld');
    const panelNew = document.getElementById('panelNew');

    beliefTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Update active tab styles
            beliefTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide panels
            if (targetTab === 'old') {
                panelOld.classList.remove('hidden');
                panelNew.classList.add('hidden');
            } else {
                panelNew.classList.remove('hidden');
                panelOld.classList.add('hidden');
            }
        });
    });

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

    // 4. Dynamic Urgency Deadline Updater (Today's Date)
    const updateDynamicDeadline = () => {
        const today = new Date();
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const day = today.getDate();
        const monthName = months[today.getMonth()];
        
        const formattedDate = `${day} ${monthName}`;
        
        const dateElements = document.querySelectorAll('.dynamic-today-date');
        dateElements.forEach(el => {
            el.textContent = formattedDate;
        });
    };
    updateDynamicDeadline();
});

