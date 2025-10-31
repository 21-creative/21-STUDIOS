// Scroll event listener (work and black line)
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Convert scroll position to viewport units
  const scrollInVH = (scrollY / viewportHeight) * 100;

  // Glow effect: 0-50vh = increase, 50vh+ = stay at peak
  if (scrollInVH > 0 && scrollInVH <= 50) {
    document.body.classList.add("scrolled");
    document.body.classList.remove("peak-glow");

    // Increase glow intensity from 0 to 50vh
    if (scrollInVH > 25) {
      document.body.classList.add("peak-glow");
    }
  } else if (scrollInVH > 50) {
    // Stay at peak glow after 50vh (no decrease)
    document.body.classList.add("scrolled", "peak-glow");
  } else {
    document.body.classList.remove("scrolled", "peak-glow");
  }

  // All other animations happen between 50vh-150vh (changed from 100vh-200vh)
  if (scrollInVH > 50 && scrollInVH <= 150) {
    document.body.classList.add("text-animate");
    document.body.classList.add("black-line-visible");
  } else if (scrollInVH > 150) {
    // Keep animations applied after 150vh
    document.body.classList.add("text-animate");
    document.body.classList.add("black-line-visible");
  } else {
    document.body.classList.remove("text-animate");
    document.body.classList.remove("black-line-visible");
  }

  // Work 1 image animation at 50vh (changed from 100vh)
  if (scrollInVH >= 50) {
    document.body.classList.add("work1-animate");
  } else {
    document.body.classList.remove("work1-animate");
  }
});

// ===== WORK 1 CLICK FUNCTION =====

//taskbar//
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

//logobuttonconnection.
// ===== SCROLL TO TOP FUNCTION =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// ===== SCROLL TO WORK FUNCTION =====
// ===== SCROLL TO WORK FUNCTION =====
function scrollToWork() {
  const viewportHeight = window.innerHeight;
  const targetScroll = viewportHeight * 0.51; // 51vh (changed from 101vh)

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

// Update scrollToWork function to close mobile menu
function scrollToWork() {
  const viewportHeight = window.innerHeight;
  const targetScroll = viewportHeight * 0.51; // 51vh (changed from 101vh)

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
