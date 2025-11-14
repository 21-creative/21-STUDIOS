// ============================================
// CIRCLE - INDEPENDENT SCROLL LOGIC
// ============================================

function initCircleScroll() {
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollInVH = (scrollY / viewportHeight) * 100;

    // Circle animations happen between 50vh-175vh (desktop only)
    if (window.innerWidth >= 768) {
      if (scrollInVH > 50 && scrollInVH <= 175) {
        document.body.classList.add("circle-animate");
      } else if (scrollInVH > 175) {
        document.body.classList.add("circle-animate");
      } else {
        document.body.classList.remove("circle-animate");
      }
    }
  });
}

function injectCircle() {
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

    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(circleContainer);
    }
  }

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
  initCircleScroll();
});
