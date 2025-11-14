// ===== TASKBAR HIDE/SHOW ON SCROLL =====
let lastScrollY = window.scrollY;
let ticking = false;

function updateTaskbar() {
  const taskbar = document.querySelector(".taskbar");
  const currentScrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const scrollInVH = (currentScrollY / viewportHeight) * 100;

  // Only activate navbar hide/show after 50vh
  if (scrollInVH > 50) {
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide taskbar completely off screen
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

window.addEventListener("scroll", onScroll);

// ===== SCROLL TO TOP FUNCTION =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ===== SCROLL TO WORK FUNCTION =====
function scrollToWork() {
  const viewportHeight = window.innerHeight;
  const targetScroll = viewportHeight * 0.51; // 51vh

  // Close mobile menu if open
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }

  window.scrollTo({
    top: targetScroll,
    behavior: "smooth",
  });
}

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Close menu when scrolling
window.addEventListener("scroll", function () {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger.classList.contains("active")) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Also update the mobile nav buttons to close menu when clicked
document.addEventListener("DOMContentLoaded", function () {
  // Add click events to mobile nav buttons to close menu after click
  const mobileNavButtons = document.querySelectorAll(".mobile-nav-btn");
  mobileNavButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const hamburger = document.querySelector(".hamburger-btn");
      const mobileMenu = document.querySelector(".mobile-menu");
      if (hamburger && mobileMenu) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  });
});

// ===== TASKBAR INJECTION =====
function injectTaskbar() {
  // Create taskbar container if it doesn't exist
  let taskbarContainer = document.getElementById("taskbar-container");
  if (!taskbarContainer) {
    taskbarContainer = document.createElement("div");
    taskbarContainer.id = "taskbar-container";
    document.body.appendChild(taskbarContainer);
  }

  // Inject taskbar
  taskbarContainer.innerHTML = `
    <nav class="taskbar">
      <button class="logo-btn" onclick="scrollToTop()">
        <img src="Hero/images/2.png" alt="21 Studios Logo" class="logo-img" />
      </button>

      <div class="nav-buttons">
        <button class="nav-btn" onclick="scrollToWork()">WORK</button>
        <button class="nav-btn">SERVICES</button>
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
        <button class="mobile-nav-btn">SERVICES</button>
        <button class="mobile-nav-btn">ABOUT US</button>
        <button class="mobile-nav-btn mobile-waitlist-btn">
          <span>JOIN THE</span>
          <span>WAITLIST</span>
        </button>
      </div>

      <div class="studio-text">21 STUDIOS</div>
    </nav>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  injectTaskbar();
});
