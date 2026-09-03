/**
 * DevPortfolio - Interactive JavaScript Logic
 * Tech Stack: ES6+ Vanilla JavaScript (DOM Events, LocalStorage, Event Delegation, IntersectionObserver)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DOM Element References
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const projectFilters = document.getElementById('projectFilters');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formFeedback = document.getElementById('formFeedback');

    // ----------------------------------------------------------------------
    // 2. Theme Switching Logic (Dark / Light Mode Persistence)
    // ----------------------------------------------------------------------
    /**
     * Initializes theme based on stored user preference or defaults to Dark mode.
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('portfolioTheme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    /**
     * Toggles between light and dark themes.
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('portfolioTheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolioTheme', 'light');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    initTheme();

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // ----------------------------------------------------------------------
    function toggleMobileMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ----------------------------------------------------------------------
    // 4. Project Filtering via DOM Event Delegation
    // ----------------------------------------------------------------------
    /**
     * TCS Concept: Event Delegation
     * Instead of attaching click event listeners to every single filter button,
     * we attach ONE listener to the parent container (#projectFilters).
     */
    if (projectFilters) {
        projectFilters.addEventListener('click', (event) => {
            // Check if the clicked element is a filter button
            const filterBtn = event.target.closest('.filter-btn');
            if (!filterBtn) return;

            // Remove active class from all filter buttons
            const allFilterBtns = projectFilters.querySelectorAll('.filter-btn');
            allFilterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            filterBtn.classList.add('active');

            // Retrieve filter category attribute
            const filterCategory = filterBtn.dataset.filter;

            // Filter project cards
            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. Contact Form Client-Side Validation
    // ----------------------------------------------------------------------
    /**
     * Validates email string against standard email regex pattern.
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Clears error message indicators.
     */
    function clearFormErrors() {
        [nameError, emailError, messageError].forEach(errSpan => {
            if (errSpan) errSpan.textContent = '';
        });
        [nameInput, emailInput, messageInput].forEach(input => {
            if (input && input.parentElement) {
                input.parentElement.classList.remove('error');
            }
        });
        if (formFeedback) {
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard form HTTP POST submission
            clearFormErrors();

            let hasError = false;

            // Validate Name
            const nameVal = nameInput.value.trim();
            if (nameVal === '') {
                nameError.textContent = 'Please enter your full name.';
                nameInput.parentElement.classList.add('error');
                hasError = true;
            } else if (nameVal.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters long.';
                nameInput.parentElement.classList.add('error');
                hasError = true;
            }

            // Validate Email
            const emailVal = emailInput.value.trim();
            if (emailVal === '') {
                emailError.textContent = 'Please enter your email address.';
                emailInput.parentElement.classList.add('error');
                hasError = true;
            } else if (!isValidEmail(emailVal)) {
                emailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
                emailInput.parentElement.classList.add('error');
                hasError = true;
            }

            // Validate Message
            const messageVal = messageInput.value.trim();
            if (messageVal === '') {
                messageError.textContent = 'Please enter a message.';
                messageInput.parentElement.classList.add('error');
                hasError = true;
            } else if (messageVal.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters long.';
                messageInput.parentElement.classList.add('error');
                hasError = true;
            }

            // Handle submission feedback
            if (!hasError) {
                formFeedback.textContent = '🎉 Thank you! Your message has been sent successfully.';
                formFeedback.classList.add('success');
                contactForm.reset();

                // Auto hide feedback after 4 seconds
                setTimeout(() => {
                    formFeedback.className = 'form-feedback';
                    formFeedback.textContent = '';
                }, 4000);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. Scroll Spy (Highlight Nav Link based on Section in Viewport)
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
});
