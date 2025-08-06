// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// GSAP Timeline for initial loading animations
const tl = gsap.timeline();

// Set initial state
gsap.set("#redLoadingScreen", { scale: 0, borderRadius: "50%" });
gsap.set(".main-content", { opacity: 0 });

// Initial loading animation sequence
tl.to("#redLoadingScreen", {
    scale: 1,
    borderRadius: "0%",
    duration: 0.8,
    ease: "power2.out"
})
.to("#redLoadingScreen", {
    opacity: 0,
    duration: 0.3,
    delay: 0.1,
})
.set("#redLoadingScreen", { display: "none" })
.to("#redScreenLeft", {
    x: "-100%",
    duration: 1,
    ease: "power2.inOut"
}, "-=0.1")
.to("#redScreenRight", {
    x: "100%",
    duration: 1,
    ease: "power2.inOut"
}, "<")
.to(".main-content", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
}, "-=0.5")
.set(["#redScreenLeft", "#redScreenRight"], { display: "none" })
.call(() => {
    // Initialize scroll animations after loading is complete
    initScrollAnimations();
});

function initScrollAnimations() {
    // Set initial state for scroll text
    gsap.set("#scrollText", {
        y: 200,
        scale: 0.5,
        opacity: 0
    });

    // Create scroll-triggered animation timeline for main content
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-content",
            start: "top top",
            end: "bottom top",
            scrub: 1.5, // Smooth scrubbing
            pin: true, // Pin the section during animation
        }
    });

    // Brand logo animation (scale up and move up while fading out)
    scrollTl.to("#brandLogo", {
        scale: 3,
        y: -300,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    })
    // New text animation (comes from bottom, scales up, fades in)
    .to("#scrollText", {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, 0.3); // Start slightly after brand logo starts disappearing

    // Loading section fade out
    scrollTl.to(".loading-section", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.out"
    }, 0);

    // Featured Projects Section Animations
    initFeaturedProjectsAnimation();
}

function initFeaturedProjectsAnimation() {
    // Create timeline for featured projects section
    const featuredProjectsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".featured-projects",
            start: "top 80%", // Start animation when section is 80% in view
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false // Set to true for debugging
        }
    });

    // Section title animation - comes from bottom
    featuredProjectsTl.fromTo(".featured-projects .section-title", 
        {
            y: 100,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
        }
    );

    // Left side project cards (col-xl-5) - animate from left
    featuredProjectsTl.fromTo(".col-xl-5 .project-card", 
        {
            x: -150,
            opacity: 0,
            scale: 0.8
        },
        {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3 // Animate each card with 0.3s delay
        }, 
        "-=0.6" // Start before title animation completes
    );

    // Right side project cards (col-xl-7) - animate from right
    featuredProjectsTl.fromTo(".col-xl-7 .project-card", 
        {
            x: 150,
            opacity: 0,
            scale: 0.8
        },
        {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3 // Animate each card with 0.3s delay
        }, 
        "-=0.8" // Overlap with left side cards for better flow
    );

    // View Works button animation - comes from bottom
    featuredProjectsTl.fromTo(".project-card-btn", 
        {
            y: 80,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
        }, 
        "-=0.4" // Start before other animations complete
    );

    // Optional: Add hover animations for project cards
    addProjectCardHovers();
}

function addProjectCardHovers() {
    // Add hover animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const tl = gsap.timeline({ paused: true });
        
        tl.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    });

    // Add hover animation for View Works button
    const btn = document.querySelector('.project-card-btn .btn');
    if (btn) {
        const btnTl = gsap.timeline({ paused: true });
        
        btnTl.to(btn, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out"
        });

        btn.addEventListener('mouseenter', () => btnTl.play());
        btn.addEventListener('mouseleave', () => btnTl.reverse());
    }
}