document.addEventListener('DOMContentLoaded', function() { // Smooth scrolling for navigation links const navLinks = document.querySelectorAll('.navbar a'); navLinks.forEach(link => { link.addEventListener('click', function(e) { e.preventDefault(); const targetId = this.getAttribute('href').substring(1); const targetSection = document.getElementById(targetId); if (targetSection) { targetSection.scrollIntoView({ behavior: 'smooth' }); } }); });

// 3D tilt effect on image
const profileImage = document.querySelector('.image');
if (profileImage) {
    profileImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(800px) rotateY(-10deg)';
    });
}

// Add floating animation to certain elements
const floatingElements = document.querySelectorAll('.contacts a');
floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
    element.classList.add('floating');
});

// 3D hover effect for cards
const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-item, .contact-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(500px) translateZ(20px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(500px) translateZ(0) rotateX(0deg)';
    });
});

// Parallax effect for sections
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.about, .projects, .contact');
    
//     parallaxElements.forEach(element => {
//         const speed = 0.1;
//         const yPos = -(scrolled * speed);
//         element.style.transform = `translateY(${yPos}px)`;
//     });
// });

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
const sections = document.querySelectorAll('.about, .skills, .projects, .achievements, .contact');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add cursor trail effect
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    const trail = document.querySelector('.cursor-trail');
    if (trail) {
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
    }
    
    requestAnimationFrame(animateTrail);
}

// Create cursor trail element
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
cursorTrail.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    pointer-events: none;
    z-index: 999;
    transition: transform 0.1s ease;
`;
document.body.appendChild(cursorTrail);

animateTrail();

// Add button click effects
const buttons = document.querySelectorAll('.button, .cv');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.height, rect.width);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
});

// Mobile menu toggle (if needed) function toggleMobileMenu() { const navbar = document.querySelector('.navbar'); navbar.classList.toggle('mobile-active'); }

// Scroll to top function function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }