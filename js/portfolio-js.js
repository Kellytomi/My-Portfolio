// Theme switcher functionality
const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
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
const typingSpeed = 100; // Speed of typing
const deletingSpeed = 50; // Speed of deleting
const pauseDuration = 1500; // Pause between phrases

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

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

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