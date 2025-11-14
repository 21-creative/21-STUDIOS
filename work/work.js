// ============================================
// WORK LINE INJECTION
// ============================================

function injectWorkLine() {
  // Create work line container if it doesn't exist
  let workContainer = document.getElementById("work-line-container");
  if (!workContainer) {
    workContainer = document.createElement("div");
    workContainer.id = "work-line-container";
    workContainer.style.position = "absolute";
    workContainer.style.top = "0";
    workContainer.style.left = "0";
    workContainer.style.width = "100%";
    workContainer.style.height = "100%";
    workContainer.style.pointerEvents = "none";
    workContainer.style.zIndex = "5";

    // Add to hero section
    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(workContainer);
    }
  }

  // Inject work line
  workContainer.innerHTML = `
    <div class="work"></div>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  injectWorkLine();
});
