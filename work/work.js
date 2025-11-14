// ============================================
// WORK - OPTIMIZED SCROLL ANIMATIONS
// ============================================

function initWorkScroll() {
  console.log("🔄 Initializing work scroll animations");

  let scrollTimeout;
  let lastScrollInVH = 0;

  window.addEventListener("scroll", function () {
    // Throttle scroll events
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollInVH = (scrollY / viewportHeight) * 100;

      // Only update if scroll position changed significantly
      if (Math.abs(scrollInVH - lastScrollInVH) < 0.5) {
        scrollTimeout = null;
        return;
      }

      lastScrollInVH = scrollInVH;

      // Work line expand animation (50vh-175vh)
      if (scrollInVH > 50 && scrollInVH <= 175) {
        document.body.classList.add("work-expand");
      } else if (scrollInVH > 175) {
        document.body.classList.add("work-expand");
      } else {
        document.body.classList.remove("work-expand");
        document.body.classList.remove("body-no-scroll");
      }

      // Work line glow effects (0-50vh) - simplified logic
      if (scrollInVH > 0 && scrollInVH <= 50) {
        document.body.classList.add("work-glow");
        if (scrollInVH > 25) {
          document.body.classList.add("work-peak-glow");
        } else {
          document.body.classList.remove("work-peak-glow");
        }
      } else if (scrollInVH > 50) {
        document.body.classList.add("work-glow", "work-peak-glow");
      } else {
        document.body.classList.remove("work-glow", "work-peak-glow");
      }

      scrollTimeout = null;
    }, 16); // ~60fps
  });
}

function initCoverflowInteractions() {
  const coverflowItems = document.querySelectorAll(".coverflow-item");

  // Only add listeners if elements exist
  if (coverflowItems.length === 0) return;

  coverflowItems.forEach((item) => {
    item.addEventListener("click", function () {
      const index = Array.from(coverflowItems).indexOf(this);
      openWorkProject(index);
    });
  });
}

function createImageCollage() {
  const collage = document.getElementById("work-collage");
  if (!collage) return;

  // Use document fragment for better performance
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 10; i++) {
    const collageItem = document.createElement("div");
    collageItem.className = "collage-item";
    collageItem.style.top = `${i * 280 + 50}px`;

    const img = document.createElement("img");
    img.src = `https://picsum.photos/600/400?random=${i + 1}`;
    img.alt = `Work image ${i + 1}`;
    img.loading = "lazy";

    collageItem.appendChild(img);
    fragment.appendChild(collageItem);
  }

  collage.appendChild(fragment);
}

function openWorkProject(index) {
  // Minimal implementation
  console.log(`Opening work project ${index}`);
}

// SIMPLIFIED scroll containment
function initScrollContainment() {
  const workContainer = document.querySelector(".work-container");
  if (!workContainer) return;

  let isScrollContained = false;

  workContainer.addEventListener("mouseenter", function () {
    if (document.body.classList.contains("work-expand")) {
      isScrollContained = true;
      document.body.classList.add("body-no-scroll");
    }
  });

  workContainer.addEventListener("mouseleave", function () {
    if (isScrollContained) {
      isScrollContained = false;
      document.body.classList.remove("body-no-scroll");
    }
  });

  // Simple wheel handler without complex edge detection
  workContainer.addEventListener("wheel", function (e) {
    if (isScrollContained) {
      e.stopPropagation();
    }
  });
}

function injectWorkLine() {
  let workContainer = document.getElementById("work-line-container");
  if (!workContainer) {
    workContainer = document.createElement("div");
    workContainer.id = "work-line-container";
    workContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    `;

    const hero = document.getElementById("hero");
    if (hero) hero.appendChild(workContainer);
  }

  workContainer.innerHTML = `
    <div class="work-container">
      <div class="work"></div>
      <div class="work-collage" id="work-collage"></div>
    </div>
  `;

  createImageCollage();
  initScrollContainment();

  // Remove coverflow if not needed
  // setTimeout(initCoverflowInteractions, 100);
}

// Simplified initialization
document.addEventListener("DOMContentLoaded", function () {
  injectWorkLine();
  initWorkScroll();
});

// Remove fallback initialization if not needed
