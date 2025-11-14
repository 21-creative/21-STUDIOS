// ============================================
// HERO TEXT INJECTION
// ============================================

function injectHeroText() {
  // Create hero text container if it doesn't exist
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

    // Add to hero section
    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(heroTextContainer);
    }
  }

  // Inject hero text
  heroTextContainer.innerHTML = `
    <span class="build-text">BUILD</span>
    <h1 class="legacy-text">LEGACY</h1>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  injectHeroText();
});
