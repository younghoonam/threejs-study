// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Target all elements with the class "fade-element"
const fadeElements = gsap.utils.toArray(".fade");

// Loop through each element and apply the individual fade-in/out animation
fadeElements.forEach((element) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 }, // Initial state
    {
      opacity: 1,
      scale: 1,
      duration: 0.5, // Animation duration
      scrollTrigger: {
        trigger: element,
        start: "center 65%", // Starts when the top of the element is x% down the viewport
        end: "center 35%", // Ends when the top of the element reaches x% from the top
        toggleActions: "play reverse play reverse", // Play fade in/out based on scroll direction
        // markers: true, // Remove in production
      },
    }
  );
});
