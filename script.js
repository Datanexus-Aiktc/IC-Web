// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 14, 23, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 14, 23, 0.95)';
        }
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]')?.value;
        const email = this.querySelector('input[type="email"]')?.value;
        const subject = this.querySelector('input[placeholder="Subject"]')?.value;
        const message = this.querySelector('textarea')?.value;

        if (name && email && subject && message) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Auto-Rotating Card Slider (2 cards only)
let currentCard = 0;
let autoRotateInterval;

function showCard(index) {
    const cards = document.querySelectorAll('.profile-card');

    if (cards.length === 0) return;

    // Hide all cards
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // Update indicators
    document.querySelectorAll('.card-indicators').forEach(cardIndicators => {
        const indicators = cardIndicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    });

    // Show current card
    if (cards[index]) {
        cards[index].classList.add('active');
    }

    currentCard = index;
}

function nextCard() {
    const cards = document.querySelectorAll('.profile-card');
    if (cards.length === 0) return;

    currentCard = (currentCard + 1) % 2; // Only 2 cards
    showCard(currentCard);
}

function startAutoRotate() {
    const cards = document.querySelectorAll('.profile-card');
    if (cards.length === 2) {
        autoRotateInterval = setInterval(nextCard, 3000); // Change every 3 seconds
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .event-card, .team-member, .news-card, .info-card');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize card slider
    const cards = document.querySelectorAll('.profile-card');
    if (cards.length === 2) {
        showCard(0); // Show first card
        startAutoRotate(); // Start automatic rotation
    }
});

// Sample timeline data for ML Bootcamp
const bootcampTimeline = [
    { label: "Day 1: Introduction & Fundamentals", date: "June 10", status: "completed" },
    { label: "Day 2: Supervised Learning", date: "June 11", status: "completed" },
    { label: "Day 3: Unsupervised Learning", date: "June 12", status: "in-progress" },
    { label: "Day 4: Deep Learning Basics", date: "June 13", status: "pending" },
    { label: "Day 5: Competition Day", date: "June 14", status: "pending" }
];

// Function to expand event card
function expandEvent(card) {
    // Create overlay
    const overlay = document.getElementById("eventOverlay");
    if (!overlay) {
        console.error('Event overlay not found');
        return;
    }

    overlay.style.display = "block";

    // Clone the card to preserve original
    const expandedCard = card.cloneNode(true);
    expandedCard.classList.add("expanded");

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = function (e) {
        e.stopPropagation();
        closeExpandedCard(expandedCard, overlay);
    };
    expandedCard.appendChild(closeBtn);

    // If this is the ML Bootcamp card, render the timeline
    if (expandedCard.querySelector(".event-title").textContent.includes("ML Bootcamp")) {
        const timelineContainer = expandedCard.querySelector("#timelineContainer");
        if (timelineContainer) {
            renderTimeline(timelineContainer);
        }
    }

    // Add to body
    document.body.appendChild(expandedCard);

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Close when clicking overlay
    overlay.onclick = function () {
        closeExpandedCard(expandedCard, overlay);
    };

    // Prevent card click from closing when clicking inside
    expandedCard.onclick = function (e) {
        e.stopPropagation();
    };
}

// Function to close expanded card
function closeExpandedCard(expandedCard, overlay) {
    document.body.removeChild(expandedCard);
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

// Function to render timeline
// Function to render timeline (improved)
function renderTimeline(container) {
    if (!container) {
        console.warn('Timeline container not found');
        return;
    }

    container.innerHTML = "";

    const timelineHTML = `
        <div class="timeline-container">
            ${bootcampTimeline.map(event => `
                <div class="timeline-item ${event.status}">
                    <div class="timeline-content">
                        <div class="timeline-label">${event.label}</div>
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-status">${event.status === "completed" ? "Completed" :
            event.status === "in-progress" ? "In Progress" : "Pending"
        }</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = timelineHTML;
}
// Team Carousel Functionality
let currentTeamIndex = 0;
let teamAutoSlideInterval;
let teamCards = [];
let cardsToShow = 4; // Number of cards to show at once

// Initialize team carousel
// Team Carousel with Seamless Infinite Loop
(function initTeamCarousel() {
    const container = document.getElementById('teamCarousel');
    if (!container) {
        console.warn('Team Carousel: #teamCarousel not found');
        return;
    }

    const wrapper = container.closest('.team-carousel-container');
    const prevBtn = wrapper ? wrapper.querySelector('.prev-nav') : null;
    const nextBtn = wrapper ? wrapper.querySelector('.next-nav') : null;

    // Get original cards
    const originalCards = Array.from(container.children);
    if (originalCards.length <= 1) return;

    // Settings
    let autoAdvance = true;
    const autoIntervalMs = 2000; // 2 seconds as requested
    let autoTimer = null;

    // Cards to show (responsive)
    let cardsToShow = getCardsToShow();

    function getCardsToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    // Helper to get gap in pixels
    function getGapPx() {
        const gap = getComputedStyle(container).gap;
        return gap ? parseFloat(gap) || 0 : 32; // fallback to 2rem
    }

    // Clone settings
    const originalCount = originalCards.length;
    const clonesBefore = cardsToShow;
    const clonesAfter = cardsToShow;

    // Create clones for infinite loop
    function setupClones() {
        // Remove any existing clones
        Array.from(container.querySelectorAll('.clone')).forEach(n => n.remove());

        const children = Array.from(container.children);

        // Prepend clones of last items
        const lastItems = children.slice(-clonesBefore);
        lastItems.forEach(node => {
            const clone = node.cloneNode(true);
            clone.classList.add('clone');
            container.insertBefore(clone, container.firstChild);
        });

        // Append clones of first items
        const firstItems = children.slice(0, clonesAfter);
        firstItems.forEach(node => {
            const clone = node.cloneNode(true);
            clone.classList.add('clone');
            container.appendChild(clone);
        });
    }

    // Calculate step width (card width + gap)
    let step = 0;
    function computeStep() {
        const card = container.querySelector('.team-card');
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const gap = getGapPx();
        step = Math.round(cardRect.width + gap);
    }

    // Carousel state
    let index = clonesBefore; // Start at first original card
    let isTransitioning = false;

    // Initialize carousel
    function init() {
        setupClones();

        // Set up container styles
        container.style.display = 'flex';
        container.style.willChange = 'transform';
        container.style.transition = 'transform 0.5s ease';

        // Calculate step size
        computeStep();

        // Position at first original card
        index = clonesBefore;
        applyTransform();

        // Listen for transition end to handle snapping
        container.addEventListener('transitionend', handleTransitionEnd);

        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                go(1);
                resetAuto();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                go(-1);
                resetAuto();
            });
        }

        // Responsive handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const currentLogical = getLogicalIndex();
                container.style.transition = 'none';

                cardsToShow = getCardsToShow();
                computeStep();

                // Reposition to same logical index
                index = clonesBefore + currentLogical;
                container.style.transform = `translateX(-${index * step}px)`;

                // Force reflow and restore transition
                void container.offsetWidth;
                container.style.transition = 'transform 0.5s ease';
            }, 150);
        });

        // Hover pause functionality
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', () => {
            if (autoAdvance) startAuto();
        });

        // Start auto-advance
        if (autoAdvance) startAuto();
    }

    // Apply transform to container
    function applyTransform() {
        container.style.transform = `translateX(-${index * step}px)`;
    }

    // Get logical index (0 to originalCount-1)
    function getLogicalIndex() {
        return (index - clonesBefore + originalCount) % originalCount;
    }

    // Move carousel by delta steps
    function go(delta) {
        if (isTransitioning) return;

        isTransitioning = true;
        index += delta;
        applyTransform();

        // Fallback to clear transition flag
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    // Handle snapping when reaching clones
    function handleTransitionEnd() {
        // If we've moved past the end clones
        if (index >= clonesBefore + originalCount) {
            const logical = getLogicalIndex();
            index = clonesBefore + logical;
            snapToPosition();
        }

        // If we've moved before the start clones
        if (index < clonesBefore) {
            const logical = getLogicalIndex();
            index = clonesBefore + logical;
            snapToPosition();
        }

        isTransitioning = false;
    }

    // Snap to position without animation
    function snapToPosition() {
        container.style.transition = 'none';
        container.style.transform = `translateX(-${index * step}px)`;
        void container.offsetWidth; // Force reflow
        container.style.transition = 'transform 0.5s ease';
    }

    // Auto-advance functions
    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
            go(1);
        }, autoIntervalMs);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    function resetAuto() {
        if (!autoAdvance) return;
        stopAuto();
        startAuto();
    }

    // Make navigation buttons clickable
    [prevBtn, nextBtn].forEach(btn => {
        if (!btn) return;
        btn.style.pointerEvents = 'auto';
        btn.style.zIndex = '20';
    });

    // Initialize after a short delay for layout settling
    setTimeout(() => {
        computeStep();
        init();
    }, 100);
})();

function initEventCountdowns() {
    document.querySelectorAll("[data-date]").forEach(el => {
        const date = new Date(el.dataset.date).getTime();

        function updateCountdown() {
            const diff = date - new Date().getTime();

            // Check if this is the featured event countdown
            const isFeatured = el.closest('.featured-event') !== null;
            const downloadBtn = document.getElementById('csvDownloadBtn');
            const downloadHint = document.querySelector('.download-hint');

            if (diff <= 0) {
                // Timer has ended
                const daysEl = el.querySelector("[data-days]");
                const hoursEl = el.querySelector("[data-hours]");
                const minsEl = el.querySelector("[data-minutes]");
                const secsEl = el.querySelector("[data-seconds]");

                if (daysEl) daysEl.textContent = "00";
                if (hoursEl) hoursEl.textContent = "00";
                if (minsEl) minsEl.textContent = "00";
                if (secsEl) secsEl.textContent = "00";

                // Enable the download button for the featured event
                if (isFeatured && downloadBtn) {
                    downloadBtn.classList.remove('btn-disabled');
                    downloadBtn.classList.add('btn-active');
                    downloadBtn.removeAttribute('onclick');
                    if (downloadHint) {
                        downloadHint.textContent = '✅ The download is now available! Click the button above.';
                        downloadHint.style.color = 'var(--primary)';
                    }
                }

                // For mini countdowns
                const miniDays = el.querySelector("[data-days]");
                if (miniDays && el.classList.contains('mini-countdown')) {
                    miniDays.textContent = "0";
                }
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            el.querySelector("[data-days]") && (el.querySelector("[data-days]").textContent = days);
            el.querySelector("[data-hours]") && (el.querySelector("[data-hours]").textContent = hours);
            el.querySelector("[data-minutes]") && (el.querySelector("[data-minutes]").textContent = mins);
            el.querySelector("[data-seconds]") && (el.querySelector("[data-seconds]").textContent = secs);

            // Keep button disabled while timer is running
            if (isFeatured && downloadBtn && !downloadBtn.classList.contains('btn-disabled')) {
                downloadBtn.classList.add('btn-disabled');
                downloadBtn.classList.remove('btn-active');
                downloadBtn.setAttribute('onclick', 'return false;');
            }
        }

        // Run immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

document.addEventListener("DOMContentLoaded", initEventCountdowns);

// Achievement Image Carousels
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const images = track.querySelectorAll("img");
        const dots = carousel.querySelectorAll(".carousel-dot");
        const pauseBtn = carousel.querySelector(".carousel-pause");

        if (images.length === 0) return;

        let current = 0;
        let isPlaying = true;
        let timer = null;
        const INTERVAL = 3000;

        // Activate first image
        images[0].classList.add("active");

        function goTo(index) {
            images[current].classList.remove("active");
            dots[current].classList.remove("active");
            current = index;
            images[current].classList.add("active");
            dots[current].classList.add("active");
        }

        function next() {
            goTo((current + 1) % images.length);
        }

        function startAuto() {
            stopAuto();
            timer = setInterval(next, INTERVAL);
        }

        function stopAuto() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        // Dot clicks
        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const idx = parseInt(dot.dataset.slide, 10);
                goTo(idx);
                if (isPlaying) startAuto(); // reset timer
            });
        });

        // Pause / Play button
        if (pauseBtn) {
            pauseBtn.addEventListener("click", () => {
                isPlaying = !isPlaying;
                if (isPlaying) {
                    startAuto();
                    pauseBtn.textContent = "⏸";
                } else {
                    stopAuto();
                    pauseBtn.textContent = "▶";
                }
            });
        }

        // Pause on hover, resume on leave
        carousel.addEventListener("mouseenter", () => {
            if (isPlaying) stopAuto();
        });
        carousel.addEventListener("mouseleave", () => {
            if (isPlaying) startAuto();
        });

        // Start auto-advance
        startAuto();
    });
});
