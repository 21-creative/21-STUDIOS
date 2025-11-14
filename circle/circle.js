// ============================================
// CIRCLE INJECTION
// ============================================

function injectCircle() {
  // Create circle container if it doesn't exist
  let circleContainer = document.getElementById("circle-container");
  if (!circleContainer) {
    circleContainer = document.createElement("div");
    circleContainer.id = "circle-container";
    circleContainer.style.position = "absolute";
    circleContainer.style.top = "0";
    circleContainer.style.left = "0";
    circleContainer.style.width = "100%";
    circleContainer.style.height = "100%";
    circleContainer.style.pointerEvents = "none";
    circleContainer.style.zIndex = "1";

    // Add to hero section
    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(circleContainer);
    }
  }

  // Inject circle
  circleContainer.innerHTML = `
    <div class="hero-circle">
      <video autoplay muted loop playsinline class="circle-video">
        <source src="../Hero/videos/buttonbg.mp4" type="video/mp4" />
      </video>
    </div>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  injectCircle();
});
