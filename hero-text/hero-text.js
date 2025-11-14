// ============================================
// HERO TEXT - INDEPENDENT SCROLL LOGIC
// ============================================

function initHeroTextScroll() {
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollInVH = (scrollY / viewportHeight) * 100;

    // Hero text animations happen between 50vh-175vh
    if (scrollInVH > 50 && scrollInVH <= 175) {
      document.body.classList.add("hero-text-animate");
    } else if (scrollInVH > 175) {
      // Keep animations applied after 175vh
      document.body.classList.add("hero-text-animate");
    } else {
      document.body.classList.remove("hero-text-animate");
    }
  });
}

function injectHeroText() {
  let heroTextContainer = document.getElementById("hero-text-container");
  if (!heroTextContainer) {
    heroTextContainer = document.createElement("div");
    heroTextContainer.id = "hero-text-container";
    heroTextContainer.style.position = "absolute";
    heroTextContainer.style.top = "0";
    heroTextContainer.style.left = "0";
    heroTextContainer.style.width = "100%";
    heroTextContainer.style.height = "100%";
    heroTextContainer.style.pointerEvents = "none";
    heroTextContainer.style.zIndex = "2";

    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(heroTextContainer);
    }
  }

  heroTextContainer.innerHTML = `
    <span class="build-text">BUILD</span>
    <h1 class="legacy-text">LEGACY</h1>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  injectHeroText();
  initHeroTextScroll();
});
