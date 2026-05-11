/* Afrilink Corporation Website - Progressive JavaScript Enhancement
   Following 2025 Best Practices for Accessibility and Performance */

(function() {
    'use strict';

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNavigation();
        initSmoothScrolling();
        initFormValidation();
        initAccessibilityEnhancements();
        initScrollAnimations();
        initPerformanceOptimizations();
        initContentExpander();
    });

    // Mobile Navigation
    function initMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.querySelector('#main-menu');
        
        if (!mobileToggle || !mainMenu) return;

        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            mainMenu.classList.toggle('active');
            
            // Toggle mobile menu icon animation
            this.classList.toggle('active');
            
            // Add slide-in animation to menu items
            if (!isExpanded) {
                const menuItems = mainMenu.querySelectorAll('li');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${(index + 1) * 0.1}s`;
                });
                
                const firstMenuItem = mainMenu.querySelector('a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 300);
                }
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !mainMenu.contains(event.target)) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainMenu.classList.contains('active')) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.focus();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Internal Links
    function initSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                event.preventDefault();
                
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                targetElement.focus();
                
                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Form Validation and Enhancement
    function initFormValidation() {
        const forms = document.querySelectorAll('.contact-form, .inquiry-form');
        
        forms.forEach(function(form) {
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });

            // Form submission
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                if (validateForm(this)) {
                    submitForm(this);
                } else {
                    // Focus on first error field
                    const firstError = this.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                }
            });
        });
    }

    // Field Validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + '-error');
        
        if (!errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        // Phone validation (optional)
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        // Checkbox validation
        else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'You must accept this to continue.';
        }

        // Update field state
        if (isValid) {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        } else {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }

        return isValid;
    }

    // Form Validation
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        inputs.forEach(function(input) {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    // Form Submission
    function submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = form.querySelector('#form-success');
        
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        // Simulate form submission (replace with actual endpoint)
        setTimeout(function() {
            // Reset button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }

            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.focus();
                
                // Scroll to success message
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }

            // Reset form
            form.reset();
            
            // Clear any error states
            const errorElements = form.querySelectorAll('.error-message');
            errorElements.forEach(function(error) {
                error.style.display = 'none';
                error.textContent = '';
            });
            
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(function(field) {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            });

        }, 1500); // Simulate network delay
    }

    // Accessibility Enhancements
    function initAccessibilityEnhancements() {
        // Add keyboard navigation for cards
        const interactiveCards = document.querySelectorAll('.focus-card, .value-card, .holding-card');
        
        interactiveCards.forEach(function(card) {
            // Make cards focusable
            card.setAttribute('tabindex', '0');
            
            // Add keyboard interaction
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    // Trigger any click-like interaction
                    const link = card.querySelector('a');
                    if (link) {
                        link.click();
                    }
                }
            });
        });

        // Enhance focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(function(element) {
            element.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            element.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });

        // Live region for dynamic content updates
        if (!document.getElementById('live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
    }

    // Scroll Animations
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe cards and sections
            const animatedElements = document.querySelectorAll('.focus-card, .value-card, .holding-card, .leader-card, .partnership-card, .contact-card');
            animatedElements.forEach(function(element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                observer.observe(element);
            });
        }
    }

    // Performance Optimizations
    function initPerformanceOptimizations() {
        // Lazy loading for images (if any are added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe images with data-src attribute
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }

        // Debounced scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(function() {
                // Add scroll-based interactions here if needed
                updateScrollPosition();
            }, 16); // ~60fps
        });

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            
            resizeTimeout = setTimeout(function() {
                // Handle responsive adjustments
                handleResize();
            }, 100);
        });
    }

    // Scroll position tracking
    function updateScrollPosition() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Handle responsive changes
    function handleResize() {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768) {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const mainMenu = document.querySelector('#main-menu');
            
            if (mobileToggle && mainMenu) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
        
        // Update any responsive JavaScript features
        updateResponsiveFeatures();
    }

    // Update responsive features
    function updateResponsiveFeatures() {
        // Add any responsive JavaScript functionality here
        // For example, updating grid layouts or carousel behaviors
    }

    // Utility function to announce to screen readers
    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear the message after announcement
            setTimeout(function() {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Content Expander - View More/Less functionality
    function initContentExpander() {
        const expandableContents = document.querySelectorAll('.expandable-content');

        if (!expandableContents.length) return;

        expandableContents.forEach(function(container) {
            const button = container.querySelector('.btn-expand');
            const contentFull = container.querySelector('.content-full');

            if (!button || !contentFull) return;

            // Generate unique ID for accessibility
            const uniqueId = 'expandable-' + Math.random().toString(36).substr(2, 9);
            contentFull.id = uniqueId;
            button.setAttribute('aria-controls', uniqueId);

            button.addEventListener('click', function() {
                const isExpanded = container.classList.contains('expanded');

                // Toggle expanded state
                container.classList.toggle('expanded');

                // Update ARIA attributes
                button.setAttribute('aria-expanded', !isExpanded);
                contentFull.setAttribute('aria-hidden', isExpanded);

                // Update button text
                const buttonText = button.childNodes[0];
                if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
                    buttonText.textContent = isExpanded ? 'View More ' : 'View Less ';
                }

                // Announce to screen readers
                const action = isExpanded ? 'collapsed' : 'expanded';
                announceToScreenReader('Content ' + action);

                // Smooth scroll if collapsing and content is above viewport
                if (isExpanded) {
                    const containerTop = container.getBoundingClientRect().top;
                    if (containerTop < 0) {
                        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });

            // Keyboard support
            button.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    button.click();
                }
            });
        });
    }

    // Utility function to toggle expand/collapse programmatically
    function toggleExpand(container, expand) {
        if (typeof expand === 'undefined') {
            expand = !container.classList.contains('expanded');
        }

        const button = container.querySelector('.btn-expand');
        if (button && expand !== container.classList.contains('expanded')) {
            button.click();
        }
    }

    // Expand all or collapse all
    function expandAll(expand) {
        const containers = document.querySelectorAll('.expandable-content');
        containers.forEach(function(container) {
            toggleExpand(container, expand);
        });
    }

    // Error handling
    window.addEventListener('error', function(event) {
        console.error('JavaScript error:', event.error);

        // Announce error to screen readers in development
        if (window.location.hostname === 'localhost') {
            announceToScreenReader('A JavaScript error occurred. Please check the console for details.');
        }
    });

    // Expose utility functions to global scope if needed
    window.AfrilinkWebsite = {
        announceToScreenReader: announceToScreenReader,
        validateField: validateField,
        toggleExpand: toggleExpand,
        expandAll: expandAll
    };

})();