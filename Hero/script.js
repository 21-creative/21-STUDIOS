function initWorkScroll() {
  console.log("🔄 Initializing work scroll animations");

  let scrollTimeout;
  let lastScrollInVH = 0;

  window.addEventListener("scroll", function () {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollInVH = (scrollY / viewportHeight) * 100;

      // Cap the scroll effect at 180vh (matches the scroll-space height)
      const effectiveScroll = Math.min(scrollInVH, 180);

      if (Math.abs(effectiveScroll - lastScrollInVH) < 0.5) {
        scrollTimeout = null;
        return;
      }

      lastScrollInVH = effectiveScroll;

      // Work line expand animation (50vh-175vh)
      if (effectiveScroll > 50 && effectiveScroll <= 175) {
        document.body.classList.add("work-expand");
      } else if (effectiveScroll > 175) {
        document.body.classList.add("work-expand");
      } else {
        document.body.classList.remove("work-expand");
        document.body.classList.remove("body-no-scroll");
      }

      // Work line glow effects (0-50vh)
      if (effectiveScroll > 0 && effectiveScroll <= 50) {
        document.body.classList.add("work-glow");
        if (effectiveScroll > 25) {
          document.body.classList.add("work-peak-glow");
        } else {
          document.body.classList.remove("work-peak-glow");
        }
      } else if (effectiveScroll > 50) {
        document.body.classList.add("work-glow", "work-peak-glow");
      } else {
        document.body.classList.remove("work-glow", "work-peak-glow");
      }

      scrollTimeout = null;
    }, 16);
  });
}
