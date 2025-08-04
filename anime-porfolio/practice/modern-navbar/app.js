// Modern Navbar App JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing navbar...');
    
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    const mainContent = document.getElementById('mainContent');
    const activeSection = document.getElementById('activeSection');
    

// blossom.js
const canvas = document.getElementById('blossom-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

class Petal {
  constructor(initial = false) {
    this.reset(initial);
  }
  reset(initial) {
    this.x = rand(0, W);
    this.y = initial ? rand(0, H) : -30;
    this.size = rand(12, 35);
    this.speedY = rand(0.5, 1.8);
    this.speedX = rand(-0.4, 0.4);
    this.rotation = rand(0, Math.PI * 2);
    this.rotationSpeed = rand(-0.01, 0.01);
    this.opacity = rand(0.5, 1);
    this.life = 0;
    this.maxLife = rand(400, 900);
    this.offset = rand(0, Math.PI * 2);
  }
  update() {
    this.life++;
    this.y += this.speedY;
    this.x += this.speedX + Math.sin((this.life / 60) + this.offset) * 0.3;
    this.rotation += this.rotationSpeed;
    if (this.y > H + 50 || this.life > this.maxLife) this.reset(false);
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity * (1 - Math.min(this.life / this.maxLife, 1) * 0.3);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    const s = this.size;
    // simple petal shape
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.5);
    ctx.bezierCurveTo(s * 0.4, -s * 0.5, s * 0.4, s * 0.2, 0, s * 0.5);
    ctx.bezierCurveTo(-s * 0.4, s * 0.2, -s * 0.4, -s * 0.5, 0, -s * 0.5);
    ctx.fillStyle = '#ffe4ec';
    ctx.fill();
    ctx.restore();
  }
}

const PETAL_COUNT = 70;
const petals = [];
for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal(true));

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

function animate() {
  ctx.clearRect(0, 0, W, H);
  for (const p of petals) {
    p.update();
    p.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate();



    // Section configuration
    const sections = {
        'home': {
            title: 'Home',
            description: 'Welcome to the',
            bgClass: 'home-bg'
        },
        'tasks': {
            title: 'Tasks', 
            description: 'Manage your work in the',
            bgClass: 'tasks-bg'
        },
        'notifications': {
            title: 'Notifications',
            description: 'Stay updated with the',
            bgClass: 'notifications-bg'
        },
        'profile': {
            title: 'Profile',
            description: 'View your information in the',
            bgClass: 'profile-bg'
        }
    };
    
    // Function to clear all active states
    function clearActiveStates() {
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Function to clear all background classes
    function clearBackgroundClasses() {
        mainContent.classList.remove('home-bg', 'tasks-bg', 'notifications-bg', 'profile-bg');
    }
    
    // Function to update content and UI
    function switchSection(sectionKey) {
        const section = sections[sectionKey];
        if (!section) return;
        
        console.log('Switching to section:', sectionKey);
        
        // Update main title
        activeSection.textContent = section.title;
        
        // Update description
        const descriptionP = document.querySelector('.content-display p');
        descriptionP.innerHTML = `${section.description} <span id="sectionName">${section.title}</span> section`;
        
        // Clear and set background
        clearBackgroundClasses();
        mainContent.classList.add(section.bgClass);
        
        console.log('Applied background class:', section.bgClass);
    }
    
    // Add click handlers to buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const sectionKey = this.getAttribute('data-section');
            console.log('Button clicked:', sectionKey);
            
            // Clear all active states first
            clearActiveStates();
            
            // Set this button as active
            this.classList.add('active');
            
            // Switch to the new section
            switchSection(sectionKey);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Initialize with home section
    const homeButton = document.querySelector('[data-section="home"]');
    if (homeButton) {
        clearActiveStates();
        homeButton.classList.add('active');
        switchSection('home');
        console.log('Initialized with home section');
    }
    
    console.log('Navbar initialization complete');
});