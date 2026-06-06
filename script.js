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

    // 5. Automated Weekly Saturday-Sunday Date Rollover
    const updateWorkshopDate = () => {
        // Calculate the upcoming Saturday in IST (UTC + 5:30)
        let nowUTC = new Date();
        let offsetIST = 5.5 * 60 * 60 * 1000;
        let nowIST = new Date(nowUTC.getTime() + (nowUTC.getTimezoneOffset() * 60 * 1000) + offsetIST);
        
        let dayOfWeek = nowIST.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.
        let daysToSaturday = 6 - dayOfWeek;
        
        // Cutoff is Saturday at 10:00 AM IST
        if (dayOfWeek === 6 && nowIST.getHours() >= 10) {
            daysToSaturday += 7;
        } else if (dayOfWeek === 0) {
            // If today is Sunday, the current workshop has already started/passed. Show next week's.
            daysToSaturday = 6;
        }
        
        let saturdayDate = new Date(nowIST.getTime() + (daysToSaturday * 24 * 60 * 60 * 1000));
        let sundayDate = new Date(saturdayDate.getTime() + (1 * 24 * 60 * 60 * 1000));
        
        const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        let satDay = saturdayDate.getDate();
        let satMonth = monthNamesShort[saturdayDate.getMonth()];
        let satDayName = dayNamesShort[saturdayDate.getDay()];
        
        let sunDay = sundayDate.getDate();
        let sunMonth = monthNamesShort[sundayDate.getMonth()];
        let sunDayName = dayNamesShort[sundayDate.getDay()];
        
        // Format for landing page (includes days of week)
        let formattedDateText = "";
        if (satMonth === sunMonth) {
            formattedDateText = `${satDay} & ${sunDay} ${satMonth} (${satDayName} & ${sunDayName})`;
        } else {
            formattedDateText = `${satDay} ${satMonth} & ${sunDay} ${sunMonth} (${satDayName} & ${sunDayName})`;
        }
        
        // Format for thank you page (excludes days of week)
        let formattedDateTextThankYou = "";
        if (satMonth === sunMonth) {
            formattedDateTextThankYou = `${satDay} & ${sunDay} ${satMonth}`;
        } else {
            formattedDateTextThankYou = `${satDay} ${satMonth} & ${sunDay} ${sunMonth}`;
        }
        
        // Update all landing page date elements
        const dateElements = document.querySelectorAll('.dynamic-workshop-date');
        dateElements.forEach(el => {
            if (el.classList.contains('no-days')) {
                el.textContent = formattedDateTextThankYou;
            } else {
                el.textContent = formattedDateText;
            }
        });
    };
    updateWorkshopDate();
});

