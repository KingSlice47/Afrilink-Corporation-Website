/* Afrilink Corporation Website - Enhanced Interactions & Animations
   Addresses visual enhancement needs and adds modern interactions */

(function() {
    'use strict';

    // Initialize all enhancements when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollProgress();
        initMobileMenuEnhancements();
        initIntersectionAnimations();
        initButtonEnhancements();
        initFormEnhancements();
        initSmoothScrolling();
        initParallaxEffects();
        initCardInteractions();
        initLoadingStates();
        initTypingAnimation();
        initScrollToTop();
    });

    // Scroll Progress Indicator
    function initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        let ticking = false;
        function updateProgress() {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    // Enhanced Mobile Menu
    function initMobileMenuEnhancements() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.querySelector('#main-menu');
        
        if (!mobileToggle || !mainMenu) return;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // Enhanced toggle function
        function toggleMobileMenu() {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
            
            // Add vibration feedback on mobile
            if ('vibrate' in navigator && !isExpanded) {
                navigator.vibrate(50);
            }
        }

        mobileToggle.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', toggleMobileMenu);

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainMenu.classList.contains('active')) {
                toggleMobileMenu();
                mobileToggle.focus();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    // Intersection Observer Animations
    function initIntersectionAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.focus-card, .value-card, .holding-card, .detail-item, .leader-card, .portfolio-company'
        );
        
        animateElements.forEach(function(element, index) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            animationObserver.observe(element);
        });

        // Add animate-in styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Button Enhancements
    function initButtonEnhancements() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(function(button) {
            // Add ripple effect
            button.addEventListener('click', function(event) {
                createRipple(event, this);
            });

            // Add loading state management
            if (button.type === 'submit') {
                button.addEventListener('click', function() {
                    showButtonLoading(this);
                });
            }
        });
    }

    // Create ripple effect
    function createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.head.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 600);
    }

    // Button loading state
    function showButtonLoading(button) {
        const originalText = button.textContent;
        button.classList.add('loading');
        button.disabled = true;

        // Simulate loading (replace with actual form submission logic)
        setTimeout(function() {
            button.classList.remove('loading');
            button.disabled = false;
            button.textContent = originalText;
        }, 2000);
    }

    // Enhanced Form Interactions
    function initFormEnhancements() {
        const forms = document.querySelectorAll('.contact-form, .inquiry-form');
        
        forms.forEach(function(form) {
            // Add floating labels
            addFloatingLabels(form);
            
            // Enhanced form submission
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                showFormLoading(this);
                
                // Simulate form submission
                setTimeout(function() {
                    hideFormLoading(form);
                    showSuccessMessage(form);
                }, 3000);
            });
        });
    }

    // Floating labels for form inputs
    function addFloatingLabels(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(function(input) {
            if (input.type === 'checkbox' || input.type === 'radio') return;
            
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (!label) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'floating-label-wrapper';
            wrapper.style.cssText = 'position: relative;';
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            
            label.style.cssText = `
                position: absolute;
                left: 12px;
                top: 12px;
                transition: all 0.3s ease;
                pointer-events: none;
                color: var(--text-muted);
                background: var(--bg-primary);
                padding: 0 4px;
            `;

            function updateLabel() {
                if (input.value || input === document.activeElement) {
                    label.style.transform = 'translateY(-24px) scale(0.85)';
                    label.style.color = 'var(--primary-orange)';
                } else {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = 'var(--text-muted)';
                }
            }

            input.addEventListener('focus', updateLabel);
            input.addEventListener('blur', updateLabel);
            input.addEventListener('input', updateLabel);
            updateLabel();
        });
    }

    // Form loading states
    function showFormLoading(form) {
        form.classList.add('form-loading');
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }
    }

    function hideFormLoading(form) {
        form.classList.remove('form-loading');
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
        }
    }

    function showSuccessMessage(form) {
        let successMessage = form.querySelector('.success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            form.appendChild(successMessage);
        }
        
        successMessage.style.display = 'block';
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Enhanced Smooth Scrolling
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                event.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll with easing
                smoothScrollTo(targetPosition, 800);
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Custom smooth scroll function
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Subtle Parallax Effects
    function initParallaxEffects() {
        const heroImage = document.querySelector('.hero-img');
        if (!heroImage) return;

        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Enhanced Card Interactions
    function initCardInteractions() {
        const cards = document.querySelectorAll('.focus-card, .value-card, .holding-card, .partnership-card');
        
        cards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Add keyboard interaction
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }
            });
        });
    }

    // Loading States for Page Navigation
    function initLoadingStates() {
        const navLinks = document.querySelectorAll('.nav-menu a[href$=".html"]');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                showPageLoading();
            });
        });
    }

    function showPageLoading() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        `;

        const style = document.createElement('style');
        style.textContent = `
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid var(--border-light);
                border-top: 4px solid var(--primary-orange);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 16px;
            }
            .loader-content {
                text-align: center;
                color: var(--text-primary);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);

        // Remove loader after a short delay (page should load)
        setTimeout(function() {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 1000);
    }

    // Typing Animation for Hero Text
    function initTypingAnimation() {
        const heroHeading = document.querySelector('.hero h2');
        if (!heroHeading) return;

        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '2px solid var(--primary-orange)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing
                setTimeout(function() {
                    heroHeading.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }

    // Scroll to Top Button
    function initScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--primary-orange);
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;

        scrollButton.addEventListener('click', function() {
            smoothScrollTo(0, 800);
        });

        document.body.appendChild(scrollButton);

        // Show/hide scroll button
        let ticking = false;
        function toggleScrollButton() {
            const scrolled = window.pageYOffset;
            if (scrolled > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(toggleScrollButton);
                ticking = true;
            }
        });
    }

    // Add global styles
    const globalStyles = document.createElement('style');
    globalStyles.textContent = `
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }
        
        .floating-label-wrapper input:focus + label {
            color: var(--primary-orange) !important;
        }
    `;
    document.head.appendChild(globalStyles);

})();