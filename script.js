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

    // 2. Sticky CTA Reveal Logic (Scroll and reveal)
    const stickyFooter = document.getElementById('stickyFooter');
    const heroCTA = document.querySelector('.massive-cta-orange');
    
    if (stickyFooter && heroCTA) {
        const handleScroll = () => {
            const heroCtaBottom = heroCTA.getBoundingClientRect().bottom + window.scrollY;
            if (window.scrollY > heroCtaBottom) {
                stickyFooter.classList.add('active');
            } else {
                stickyFooter.classList.remove('active');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }
    
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

    const renderWithDate = (dbDateStr) => {
        let nowUTC = new Date();
        let offsetIST = 5.5 * 60 * 60 * 1000;
        let nowIST = new Date(nowUTC.getTime() + (nowUTC.getTimezoneOffset() * 60 * 1000) + offsetIST);
        
        let useAutomatic = true;
        let saturdayDate = null;

        if (dbDateStr) {
            try {
                const parts = dbDateStr.split('-');
                if (parts.length === 3) {
                    const year = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const day = parseInt(parts[2], 10);

                    // Cutoff is Saturday at 6:00 PM (18:00) IST
                    let manualCutoffIST = new Date(year, month, day, 18, 0, 0);

                    if (nowIST.getTime() < manualCutoffIST.getTime()) {
                        // The manual date is in the future. Use it!
                        saturdayDate = new Date(year, month, day, 0, 0, 0);
                        useAutomatic = false;
                    }
                }
            } catch (e) {
                console.error("Error parsing manual date:", e);
            }
        }

        if (useAutomatic) {
            let dayOfWeek = nowIST.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.
            let daysToSaturday = 6 - dayOfWeek;
            
            // Cutoff is Saturday at 6:00 PM (18:00) IST
            if (dayOfWeek === 6 && nowIST.getHours() >= 18) {
                daysToSaturday += 7;
            } else if (dayOfWeek === 0) {
                daysToSaturday = 6;
            }
            
            saturdayDate = new Date(nowIST.getTime() + (daysToSaturday * 24 * 60 * 60 * 1000));
            
            // Skip June 13, 2026 batch as requested (rollover to the next week instead)
            if (saturdayDate.getFullYear() === 2026 && saturdayDate.getMonth() === 5 && saturdayDate.getDate() === 13) {
                saturdayDate = new Date(saturdayDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            }
        }

        let sundayDate = new Date(saturdayDate.getTime() + (1 * 24 * 60 * 60 * 1000));
        
        const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        let satDay = saturdayDate.getDate();
        let satMonth = monthNamesShort[saturdayDate.getMonth()];
        let satDayName = dayNamesShort[saturdayDate.getDay()];
        
        let sunDay = sundayDate.getDate();
        let sunMonth = monthNamesShort[sundayDate.getMonth()];
        let sunDayName = dayNamesShort[sundayDate.getDay()];
        
        // Formatted dates
        let dateOnlyText = "";
        let formattedDateText = "";
        
        if (satMonth === sunMonth) {
            dateOnlyText = `${satDay} & ${sunDay} ${satMonth}`;
            formattedDateText = `${satDay} & ${sunDay} ${satMonth} (${satDayName} & ${sunDayName})`;
        } else {
            dateOnlyText = `${satDay} ${satMonth} & ${sunDay} ${sunMonth}`;
            formattedDateText = `${satDay} ${satMonth} & ${sunDay} ${sunMonth} (${satDayName} & ${sunDayName})`;
        }
        
        // Calculate difference in calendar days between current day (IST) and workshop start day
        const todayMidnight = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
        const workshopMidnight = new Date(saturdayDate.getFullYear(), saturdayDate.getMonth(), saturdayDate.getDate());
        const diffDays = Math.round((workshopMidnight.getTime() - todayMidnight.getTime()) / (24 * 60 * 60 * 1000));
        
        // Dynamic date text depending on how close the workshop is:
        // 1. diffDays === 0 (Today): "Today & Tomorrow (26 & 27 Sep)"
        // 2. diffDays === 1 (Tomorrow): "Tomorrow & Sunday (26 & 27 Sep)" / "Tomorrow, 26 & 27 Sep (Sat & Sun)"
        // 3. diffDays >= 2 (Long time away / future batch): "26 & 27 Sep (Sat & Sun)"
        let heroBadgeDateText = "";
        let heroCtaDateText = "";
        let secondSectionDateText = "";
        
        if (diffDays === 0) {
            heroBadgeDateText = `Today & Tomorrow (${dateOnlyText})`;
            heroCtaDateText = `Date: <strong>Today & Tomorrow (${dateOnlyText})</strong>`;
            secondSectionDateText = `Live on Zoom • Date: <strong>Today & Tomorrow (${dateOnlyText})</strong> • Time: 7:00 PM - 9:00 PM (IST)`;
        } else if (diffDays === 1) {
            const secondDayLabel = (sunDayName === 'Sun') ? 'Sunday' : sunDayName;
            heroBadgeDateText = `Tomorrow & ${secondDayLabel} (${dateOnlyText})`;
            heroCtaDateText = `Date: <strong>Tomorrow, ${formattedDateText}</strong>`;
            secondSectionDateText = `Live on Zoom • Date: <strong>Tomorrow, ${formattedDateText}</strong> • Time: 7:00 PM - 9:00 PM (IST)`;
        } else {
            heroBadgeDateText = formattedDateText;
            heroCtaDateText = `Date: <strong>${formattedDateText}</strong>`;
            secondSectionDateText = `Live on Zoom • Date: <strong>${formattedDateText}</strong> • Time: 7:00 PM - 9:00 PM (IST)`;
        }
        
        // Update all landing page date elements
        const dateElements = document.querySelectorAll('.dynamic-workshop-date');
        dateElements.forEach(el => {
            if (el.classList.contains('no-days')) {
                el.textContent = dateOnlyText;
            } else if (el.closest('.hero-workshop-schedule-badge')) {
                el.textContent = heroBadgeDateText;
            } else {
                el.textContent = formattedDateText;
            }
        });
        
        // Update hero dynamic dates above CTA buttons
        const heroDynamicDates = document.querySelectorAll('.hero-dynamic-date');
        heroDynamicDates.forEach(el => {
            el.innerHTML = heroCtaDateText;
            if (el.closest('.hero-dynamic-date-wrapper')) {
                el.closest('.hero-dynamic-date-wrapper').style.display = 'block';
            }
            el.style.display = 'block';
        });

        // Update second section dynamic dates
        const secondSectionDynamicDates = document.querySelectorAll('.second-section-dynamic-date');
        secondSectionDynamicDates.forEach(el => {
            el.innerHTML = secondSectionDateText;
            el.style.display = 'block';
        });
    };

    const updateWorkshopDate = () => {
        // Immediately render with calculated upcoming workshop date
        renderWithDate(null);

        // Fetch custom date from Firebase if set in Admin console
        const fetchDbDate = (attempts = 0) => {
            if (window.dbHelper && window.dbHelper.isConfigured()) {
                window.dbHelper.getWorkshopDate(function(dbDateStr) {
                    if (dbDateStr) {
                        renderWithDate(dbDateStr);
                    }
                });
            } else if (attempts < 10) {
                setTimeout(() => fetchDbDate(attempts + 1), 200);
            }
        };
        fetchDbDate();
    };
    updateWorkshopDate();

    // 6. Dynamic Video Testimonial Player Injection
    const videoWrappers = document.querySelectorAll('.video-wrapper[data-video-id]');
    videoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const videoId = wrapper.getAttribute('data-video-id');
            if (!videoId) return;
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.borderRadius = '12px 12px 0 0';
            
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    });
});

