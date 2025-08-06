        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // GSAP Timeline for initial loading animations
        const tl = gsap.timeline();

        // Featured Projects Timeline - reusable for future elements
        const featuredProjectsTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".featured-projects",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false // Set to true for debugging
            }
        });

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
            delay: 0.1 ,
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

            // Set initial state for featured projects elements
            gsap.set(".featured-projects .section-title", {
                y: 100,
                opacity: 0,
                scale: 0.8
            });

            // Create scroll-triggered animation timeline
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
            // Timeline for featured projects section
            const featuredProjectsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".featured-projects",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false // Set to true for debugging
                }
            });

            // Section title animation - slide up with fade and scale
            featuredProjectsTl.to(".featured-projects .section-title", {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            })
            .to(".featured-projects .section-title", {
                borderBottomWidth: "3px",
                duration: 0.8,
                ease: "power2.inOut"
            }, "-=0.5");

            // Future elements can be added to this timeline
            // Example structure for adding more elements:
            // featuredProjectsTl.from(".project-card", {
            //     y: 50,
            //     opacity: 0,
            //     stagger: 0.2,
            //     duration: 0.8,
            //     ease: "power2.out"
            // }, "-=0.3");

            // Red section - no GSAP animations for 3rd section
        }
