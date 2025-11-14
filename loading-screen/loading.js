// ============================================
// LOADING SCREEN - 5 SECOND CIRCULAR PROGRESS
// ============================================

function createLoadingScreen() {
  // Disable body scrolling during loading
  document.body.classList.add("loading-active");

  // Create loading screen container
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.className = "loading-screen";

  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="logo-container">
        <div class="circular-progress">
          <div class="progress-circle">
            <div class="progress-fill"></div>
          </div>
          <div class="logo-center">
            <img src="../Hero/images/2.png" alt="21 Studios Logo" class="loading-logo">
          </div>
        </div>
      </div>
    </div>
  `;

  // Add to body (as first element to ensure it covers everything)
  document.body.insertBefore(loadingScreen, document.body.firstChild);
  console.log("✅ Circular loading screen created - scrolling disabled");
}

function startLoadingSequence() {
  console.log("🚀 Starting 5-second loading sequence");

  // Total sequence: 5 seconds
  // 3 seconds for progress fill + 2 seconds for fade to black and transparency

  setTimeout(() => {
    removeLoadingScreen();
  }, 5000); // Total 5 seconds
}

function removeLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    console.log("🎬 Starting fade-out sequence");

    // Add fade-out class to trigger the black fade animation
    loadingScreen.classList.add("fade-out");

    // Remove from DOM after animation completes and re-enable scrolling
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
        // Re-enable body scrolling
        document.body.classList.remove("loading-active");
        console.log("✅ Loading screen completely removed - scrolling enabled");

        // Dispatch event that loading is complete
        window.dispatchEvent(new Event("loadingComplete"));
      }
    }, 2000); // Match the CSS animation duration
  }
}

// Initialize loading screen - ALWAYS SHOW ON LOAD/REFRESH
function initLoadingScreen() {
  createLoadingScreen();
  startLoadingSequence();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 DOM ready - initializing circular loading screen");
  initLoadingScreen();
});

// Also trigger on window load for good measure
window.addEventListener("load", function () {
  console.log("🔄 Window loaded - loading screen active");
});

// Fallback: Remove loading screen if something goes wrong
setTimeout(() => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    console.log("⚠️  Safety timeout - removing loading screen");
    removeLoadingScreen();
  }
}, 8000); // 8 second safety timeout

// Export functions for potential use elsewhere
window.loadingScreen = {
  init: initLoadingScreen,
  remove: removeLoadingScreen,
};
