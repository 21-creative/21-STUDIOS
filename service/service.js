function initServiceComponent() {
  console.log("🔄 Initializing service component");

  const serviceRoot = document.getElementById("service-component-root");
  if (!serviceRoot) {
    console.error("❌ Service root element not found");
    return;
  }

  // Generate HTML for 10 services
  let servicesHTML = '<div class="service-container" id="service-container">';

  for (let i = 1; i <= 10; i++) {
    const isOdd = i % 2 === 1;
    const serviceClass = isOdd ? "service-odd" : "service-even";

    servicesHTML += `
      <div class="service-row service-row-${i}">
        <div class="service-text ${serviceClass}">SERVICE ${i}</div>
      </div>
    `;
  }

  servicesHTML += "</div>";

  serviceRoot.innerHTML = servicesHTML;
  console.log("✅ 10 services HTML injected");

  // Add random delays after HTML is injected
  addRandomDelays();
  initServiceAnimations();
}

function addRandomDelays() {
  for (let i = 1; i <= 10; i++) {
    const serviceText = document.querySelector(
      `.service-row-${i} .service-text`
    );
    if (serviceText) {
      const randomDelay = Math.random() * 8; // Random delay between 0-8 seconds
      serviceText.style.animationDelay = `${randomDelay}s`;
      console.log(`Service ${i} delay: ${randomDelay.toFixed(2)}s`);
    }
  }
}

function initServiceAnimations() {
  const serviceContainer = document.getElementById("service-container");
  if (!serviceContainer) return;

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollInVH = (scrollY / viewportHeight) * 100;

    if (scrollInVH >= 200) {
      serviceContainer.classList.add("active");
    } else {
      serviceContainer.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initServiceComponent);
