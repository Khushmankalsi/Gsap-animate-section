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

            // Red section - no GSAP animations for 3rd section


        }