// ============================================
// WORK - BASIC SCROLL ANIMATIONS
// ============================================

function initWorkScroll() {
  console.log("🔄 Initializing work scroll animations");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollInVH = (scrollY / viewportHeight) * 100;

    console.log("📏 Scroll position:", scrollInVH.toFixed(1) + "vh");

    // Work line expand animation (50vh-175vh)
    if (scrollInVH > 50 && scrollInVH <= 175) {
      document.body.classList.add("work-expand");
      console.log("🔼 Adding work-expand");
    } else if (scrollInVH > 175) {
      document.body.classList.add("work-expand");
      console.log("🔒 Keeping work-expand");
    } else {
      document.body.classList.remove("work-expand");
      console.log("🔽 Removing work-expand");
    }

    // Work line glow effects (0-50vh)
    if (scrollInVH > 0 && scrollInVH <= 50) {
      document.body.classList.add("work-glow");
      document.body.classList.remove("work-peak-glow");

      if (scrollInVH > 25) {
        document.body.classList.add("work-peak-glow");
        console.log("💫 Adding work-peak-glow");
      } else {
        console.log("✨ Adding work-glow");
      }
    } else if (scrollInVH > 50) {
      document.body.classList.add("work-glow", "work-peak-glow");
      console.log("🌟 Keeping peak glow");
    } else {
      document.body.classList.remove("work-glow", "work-peak-glow");
      console.log("🌙 Removing all glow effects");
    }
  });
} // Add this function to initialize coverflow interactions
function initCoverflowInteractions() {
  const coverflowItems = document.querySelectorAll(".coverflow-item");

  coverflowItems.forEach((item) => {
    item.addEventListener("click", function () {
      const index = Array.from(coverflowItems).indexOf(this);
      openWorkProject(index);
    });
  });

  console.log("✅ Coverflow interactions initialized");
}

// Update the injectWorkLine function
function injectWorkLine() {
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

    const hero = document.getElementById("hero");
    if (hero) {
      hero.appendChild(workContainer);
    }
    console.log("✅ Work container created");
  }

  // HTML is now in work.html file
  workContainer.innerHTML = `<div class="work"></div>`;
  console.log("✅ Work line with coverflow injected");

  // Initialize coverflow after a short delay
  setTimeout(initCoverflowInteractions, 100);
}

// Keep all your existing functions exactly the same...
// initWorkScroll, openWorkProject, DOMContentLoaded, etc. remain unchanged

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM loaded - initializing work section");
  injectWorkLine();
  initWorkScroll();
});

// Fallback initialization
setTimeout(() => {
  if (!document.querySelector(".work")) {
    console.log("🔄 Fallback initialization");
    injectWorkLine();
    initWorkScroll();
  }
}, 500);
