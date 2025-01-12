// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from immediately closing menu
    navLinks.classList.toggle('active');
    // Toggle hamburger icon between bars and times (x)
    hamburgerIcon.classList.toggle('fa-bars');
    hamburgerIcon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburgerIcon.classList.add('fa-bars');
        hamburgerIcon.classList.remove('fa-times');
    }
});

// Close mobile menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.add('fa-bars');
            hamburgerIcon.classList.remove('fa-times');
        }
    });
});

// Theme switcher functionality
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('i');

// Check if the OS is in dark mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

// Function to update theme icon
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');

// If user explicitly set a theme, use it. Otherwise, match OS theme
if (savedTheme === null) {
    const osTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    setTheme(osTheme);
} else {
    setTheme(savedTheme);
}

// Listen for OS theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Theme toggle button
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation
const phrases = [
    "Show me the code",
    "Debug like a detective",
    "Code like a poet",
    "Think like a programmer",
    "Build the future",
    "Make it work, make it right",
    "Code never lies",
    "Keep coding, keep learning"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 1500;

const typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        // Deleting text
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        // Typing text
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    // Check if word is complete
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(() => {
            isPaused = false;
        }, pauseDuration);
    }

    // Check if deletion is complete
    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    // Set the next timeout
    const nextTimeout = isPaused ? pauseDuration : 
                       isDeleting ? deletingSpeed : typingSpeed;

    setTimeout(typeText, nextTimeout);
}

// Start the typing animation
typeText();