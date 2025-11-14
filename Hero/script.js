// Scroll event listener
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Convert scroll position to viewport units
  const scrollInVH = (scrollY / viewportHeight) * 100;

  // Glow effect: 0-50vh = increase, 50vh+ = stay at peak
  if (scrollInVH > 0 && scrollInVH <= 50) {
    document.body.classList.add("scrolled", "logo-glow");
    document.body.classList.remove("peak-glow", "logo-peak-glow");

    // Increase glow intensity from 0 to 50vh
    if (scrollInVH > 25) {
      document.body.classList.add("peak-glow", "logo-peak-glow");
    }
  } else if (scrollInVH > 50) {
    // Stay at peak glow after 50vh (no decrease)
    document.body.classList.add(
      "scrolled",
      "peak-glow",
      "logo-glow",
      "logo-peak-glow"
    );
  } else {
    document.body.classList.remove(
      "scrolled",
      "peak-glow",
      "logo-glow",
      "logo-peak-glow"
    );
  }

  // All other animations happen between 50vh-175vh
  if (scrollInVH > 50 && scrollInVH <= 175) {
    document.body.classList.add("text-animate");
  } else if (scrollInVH > 175) {
    // Keep animations applied after 175vh
    document.body.classList.add("text-animate");
  } else {
    document.body.classList.remove("text-animate");
  }
});
