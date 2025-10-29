/* === NAVBAR SCROLL BEHAVIOR === */
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 10;
        
        this.init();
    }
    
    /* === INITIALIZATION === */
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    /* === SCROLL HANDLING === */
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
            // Scrolling down
            this.navbar.classList.add('hidden');
        } else {
            // Scrolling up
            this.navbar.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    }
}

/* === HERO HEADING ANIMATION === */
class HeroHeadingAnimation {
    constructor() {
        this.heroHeading = document.querySelector('.hero-heading');
        this.init();
    }
    
    /* === INITIALIZATION === */
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    /* === SCROLL HANDLING === */
    handleScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress (0 to 1) as we scroll through the first 100vh
        const progress = Math.min(scrollY / viewportHeight, 1);
        
        // Apply animation - scroll upward and fade out
        this.heroHeading.style.transform = `translate(-50%, calc(-50% - ${progress * 100}px))`;
        this.heroHeading.style.opacity = 1 - progress;
    }
}

/* === PAGE INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
    new NavbarScroll();
    new HeroHeadingAnimation();
   new ProductsAnimation();
   new CoverflowAnimation(); 
});

//-------------------------------------------------------------------//
/* === PRODUCTS SECTION ANIMATION === */
class ProductsAnimation {
    constructor() {
        this.productsSection = document.getElementById('products');
        this.lastScrollY = window.scrollY;
        this.viewportHeight = window.innerHeight;
        this.triggerPoint = this.viewportHeight * 1.0; // Changed from 1.2 to 1.0 (100vh instead of 120vh)
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Show products section when reaching 100vh
        if (scrollY >= this.triggerPoint) {
            this.productsSection.classList.add('active');
        } else {
            this.productsSection.classList.remove('active');
        }
        
        this.lastScrollY = scrollY;
    }
}
/* === COVERFLOW ANIMATION === */
class CoverflowAnimation {
    constructor() {
        this.track = document.getElementById('coverflowTrack');
        this.prevBtn = document.getElementById('coverflowPrev');
        this.nextBtn = document.getElementById('coverflowNext');
        this.productName = document.getElementById('productName');
        this.currentIndex = 3; // Start with center item
        this.totalItems = 7;
        this.init();
    }
    
    init() {
        this.createCoverflowItems();
        this.setupEventListeners();
        this.updateProductInfo();
    }
    
    createCoverflowItems() {
        for (let i = 0; i < this.totalItems; i++) {
            const item = document.createElement('div');
            item.className = 'coverflow-item';
            item.innerHTML = `<img src="images/products.png" alt="Product ${i + 1}">`;
            this.track.appendChild(item);
        }
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
    }
    
    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.totalItems) % this.totalItems;
        this.updateCoverflow();
        this.updateProductInfo();
    }
    
    updateCoverflow() {
        const items = this.track.children;
        const positions = [-3, -2, -1, 0, 1, 2, 3];
        
        for (let i = 0; i < this.totalItems; i++) {
            const itemIndex = (i + this.currentIndex - 3 + this.totalItems) % this.totalItems;
            const position = positions[i];
            
            let transform, scale, opacity, zIndex;
            
            switch(Math.abs(position)) {
                case 0:
                    transform = `translateX(0) rotateY(0deg)`;
                    scale = 1;
                    opacity = 1;
                    zIndex = 3;
                    break;
                case 1:
                    transform = `translateX(${position * 140}px) rotateY(${position * -15}deg)`;
                    scale = 0.9;
                    opacity = 0.8;
                    zIndex = 2;
                    break;
                case 2:
                    transform = `translateX(${position * 140}px) rotateY(${position * -30}deg)`;
                    scale = 0.8;
                    opacity = 0.6;
                    zIndex = 1;
                    break;
                case 3:
                    transform = `translateX(${position * 140}px) rotateY(${position * -45}deg)`;
                    scale = 0.7;
                    opacity = 0.4;
                    zIndex = 0;
                    break;
            }
            
            items[itemIndex].style.transform = `${transform} scale(${scale})`;
            items[itemIndex].style.opacity = opacity;
            items[itemIndex].style.zIndex = zIndex;
        }
    }
    
    updateProductInfo() {
        const productNumber = (this.currentIndex + 1) % this.totalItems || this.totalItems;
        this.productName.textContent = `PRODUCT ${productNumber}`;
    }
}

