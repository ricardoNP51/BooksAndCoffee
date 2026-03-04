document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initCustomCursor();
});

// Initialize Lenis for Smooth Scrolling
function initSmoothScroll() {
    // Check if Lenis is loaded (via CDN)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Use requestAnimationFrame to continuously update the scroll
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    } else {
        console.warn("Lenis library not loaded.");
    }
}

// Custom Cursor Implementation
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // If running on touch device, don't init cursor
    if (window.matchMedia("(pointer: coarse)").matches || !cursor || !follower) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for dot
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth animation loop for the follower ring
    function loop() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    }
    loop();

    // Hover effects on clickable elements
    const interactables = document.querySelectorAll('a, button, .interactive');
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--clr-accent)';
            
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.backgroundColor = 'rgba(207, 168, 112, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--clr-accent)';
            cursor.style.border = 'none';
            
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
        });
    });
}
