// ============================================
// TASKBAR FUNCTIONALITY
// ============================================

let lastScrollY = window.scrollY;
let lastWorkScroll = 0;
let ticking = false;
let isScrollingWorkSection = false;

function updateTaskbar() {
  const taskbar = document.querySelector(".taskbar");
  const currentScrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const scrollInVH = (currentScrollY / viewportHeight) * 100;

  // Check if we're scrolling inside work section
  const workContainer = document.querySelector(".work-container");
  const isWorkExpanded = document.body.classList.contains("work-expand");

  if (isWorkExpanded && workContainer) {
    const workScrollTop = workContainer.scrollTop;
    const workScrollHeight =
      workContainer.scrollHeight - workContainer.clientHeight;

    // If work container has scroll position and we're not at the very start
    if (workScrollTop > 0 || (workScrollTop === 0 && lastWorkScroll > 0)) {
      isScrollingWorkSection = true;

      // Taskbar behavior for work section scrolling
      if (workScrollTop > lastWorkScroll) {
        // Scrolling down in work section - hide taskbar
        taskbar.style.transform =
          "translateX(-50%) scale(0.8) translateY(200px)";
        taskbar.style.opacity = "0";
      } else {
        // Scrolling up in work section - show taskbar
        taskbar.style.transform = "translateX(-50%) scale(0.8) translateY(0)";
        taskbar.style.opacity = "1";
      }

      lastWorkScroll = workScrollTop;
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }
  }

  // If we get here, we're scrolling the main page
  isScrollingWorkSection = false;

  // Original taskbar hide/show logic for main page scrolling
  if (scrollInVH > 50) {
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide taskbar
      taskbar.style.transform = "translateX(-50%) scale(0.8) translateY(200px)";
      taskbar.style.opacity = "0";
    } else {
      // Scrolling up - show taskbar
      taskbar.style.transform = "translateX(-50%) scale(0.8) translateY(0)";
      taskbar.style.opacity = "1";
    }
  } else {
    // Below 50vh - always show taskbar
    taskbar.style.transform = "translateX(-50%) scale(0.8) translateY(0)";
    taskbar.style.opacity = "1";
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateTaskbar);
    ticking = true;
  }
}

// Add work container scroll listener
function initWorkContainerScroll() {
  const workContainer = document.querySelector(".work-container");
  if (workContainer) {
    workContainer.addEventListener("scroll", function () {
      if (document.body.classList.contains("work-expand")) {
        if (!ticking) {
          requestAnimationFrame(updateTaskbar);
          ticking = true;
        }
      }
    });
  }
}

function initTaskbarScroll() {
  console.log("✅ Taskbar scroll initialized!");

  // Initialize lastScrollY
  lastScrollY = window.scrollY;

  window.addEventListener("scroll", onScroll);

  // Initialize work container scroll listener
  setTimeout(initWorkContainerScroll, 100);
}

function injectTaskbar() {
  console.log("🔄 Injecting taskbar...");

  let taskbarContainer = document.getElementById("taskbar-container");
  if (!taskbarContainer) {
    taskbarContainer = document.createElement("div");
    taskbarContainer.id = "taskbar-container";
    document.body.appendChild(taskbarContainer);
    console.log("✅ Created taskbar container");
  }

  taskbarContainer.innerHTML = `
    <nav class="taskbar">
      <button class="logo-btn" onclick="scrollToTop()">
        <img src="Hero/images/2.png" alt="21 Studios Logo" class="logo-img" />
      </button>

      <div class="nav-buttons">
        <button class="nav-btn" onclick="scrollToWork()">WORK</button>
        <button class="nav-btn" onclick="scrollToServices()">SERVICES</button>
        <button class="nav-btn">ABOUT US</button>
        <button class="nav-btn waitlist-btn">
          <span>JOIN <span></span>THE</span>
          <span>WAITLIST</span>
        </button>
      </div>

      <button class="hamburger-btn" onclick="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="mobile-menu">
        <button class="mobile-nav-btn" onclick="scrollToWork()">WORK</button>
        <button class="mobile-nav-btn" onclick="scrollToServices()">SERVICES</button>
        <button class="mobile-nav-btn">ABOUT US</button>
        <button class="mobile-nav-btn mobile-waitlist-btn">
          <span>JOIN THE</span>
          <span>WAITLIST</span>
        </button>
      </div>

      <div class="studio-text">21 STUDIOS</div>
    </nav>
  `;

  console.log("✅ Taskbar injected successfully");
}

// Global functions
window.scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.scrollToWork = function () {
  const viewportHeight = window.innerHeight;
  const targetScroll = viewportHeight * 0.51;
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
};

window.toggleMenu = function () {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  }
};
// Add this function with your other global functions
window.scrollToServices = function () {
  const viewportHeight = window.innerHeight;
  const targetScroll = viewportHeight * 2; // 200vh - where services start
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
};

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (
    hamburger &&
    mobileMenu &&
    !hamburger.contains(event.target) &&
    !mobileMenu.contains(event.target)
  ) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Close menu when scrolling (both main page and work section)
function closeMenuOnScroll() {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu && hamburger.classList.contains("active")) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
}

window.addEventListener("scroll", closeMenuOnScroll);

// Also listen for work container scroll to close menu
function initWorkMenuClose() {
  const workContainer = document.querySelector(".work-container");
  if (workContainer) {
    workContainer.addEventListener("scroll", closeMenuOnScroll);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM loaded - initializing taskbar");
  injectTaskbar();
  initTaskbarScroll();
  setTimeout(initWorkMenuClose, 100);
});

// Also initialize if DOM is already loaded
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  console.log("⚡ DOM already ready - initializing taskbar immediately");
  setTimeout(() => {
    injectTaskbar();
    initTaskbarScroll();
    initWorkMenuClose();
  }, 100);
}
