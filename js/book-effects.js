// This file will house complex 3D rotation, magnetic buttons, and page transition effects.

class MagneticElement {
    constructor(el) {
        this.el = el;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.bindEvents();
    }

    bindEvents() {
        this.el.addEventListener('mouseenter', () => {
            const rect = this.el.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
        });

        this.el.addEventListener('mousemove', (e) => {
            const rect = this.el.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            // Calculate movement (from center)
            this.x = (relX - this.width / 2) * 0.4;
            this.y = (relY - this.height / 2) * 0.4;

            this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;

            // If inner text element exists, move it too (parallax)
            const text = this.el.querySelector('.magnetic-text');
            if (text) {
                text.style.transform = `translate(${this.x * 0.5}px, ${this.y * 0.5}px)`;
            }
        });

        this.el.addEventListener('mouseleave', () => {
            this.el.style.transform = `translate(0px, 0px)`;
            const text = this.el.querySelector('.magnetic-text');
            if (text) {
                text.style.transform = `translate(0px, 0px)`;
            }
        });
    }
}

// 3D Book Cover Tilt Effect
function initBookTilt() {
    const books = document.querySelectorAll('.book-3d');

    books.forEach(book => {
        book.addEventListener('mousemove', (e) => {
            const rect = book.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate rotation
            const rotateX = ((mouseY / height) - 0.5) * -30; // Max 15deg rotation
            const rotateY = ((mouseX / width) - 0.5) * 30;

            requestAnimationFrame(() => {
                book.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
        });

        book.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                book.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Init magnetic buttons
    document.querySelectorAll('.magnetic').forEach(el => new MagneticElement(el));

    // Init book 3D tilt
    initBookTilt();
});
