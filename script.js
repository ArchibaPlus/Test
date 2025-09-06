const gameData = [
    {
        title: "Neon Runner",
        description: "Fast-paced cyberpunk platformer with stunning visual effects and challenging gameplay.",
        fullDescription: "Experience the thrill of high-speed parkour in a neon-soaked cyberpunk world. Navigate through challenging levels filled with obstacles, enemies, and spectacular visual effects. Master the art of wall-running, sliding, and precision jumping in this adrenaline-pumping adventure.",
        status: "Released",
        image: "Game Screenshot",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        steamUrl: "https://store.steampowered.com/app/example1",
        features: [
            "60+ challenging levels",
            "Smooth parkour mechanics",
            "Stunning neon visual effects",
            "Electronic soundtrack",
            "Steam achievements"
        ]
    },
    {
        title: "Mystic Forest",
        description: "Enchanting adventure RPG where you explore magical realms and uncover ancient secrets.",
        fullDescription: "Embark on an epic journey through mystical forests filled with magical creatures and ancient mysteries. Craft powerful spells, solve intricate puzzles, and forge alliances with woodland spirits in this immersive RPG experience.",
        status: "In Development",
        image: "Game Screenshot",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
        steamUrl: "https://store.steampowered.com/app/example2",
        features: [
            "Open-world exploration",
            "Magic crafting system",
            "Multiple story paths",
            "Beautiful hand-drawn art",
            "Coming to Steam Early Access"
        ]
    },
    {
        title: "Space Debris",
        description: "Strategic space survival game where you manage resources while avoiding cosmic dangers.",
        fullDescription: "Survive in the harsh void of space as you pilot your ship through dangerous asteroid fields and cosmic storms. Manage limited resources, upgrade your vessel, and make split-second decisions that determine your fate among the stars.",
        status: "Beta",
        image: "Game Screenshot",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
        steamUrl: "https://store.steampowered.com/app/example3",
        features: [
            "Real-time resource management",
            "Physics-based gameplay",
            "Procedurally generated space",
            "Ship customization",
            "Beta testing available"
        ]
    },
    {
        title: "Pixel Quest",
        description: "Retro-inspired puzzle adventure combining classic mechanics with modern design.",
        fullDescription: "Journey through a charming pixel art world filled with clever puzzles and nostalgic gameplay. Rediscover the joy of classic adventure games with modern quality-of-life improvements and innovative puzzle mechanics.",
        status: "Coming Soon",
        image: "Game Screenshot",
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        steamUrl: "https://store.steampowered.com/app/example4",
        features: [
            "Classic pixel art style",
            "100+ unique puzzles",
            "Retro-inspired soundtrack",
            "Multiple difficulty modes",
            "Wishlist on Steam now"
        ]
    }
];

let filteredGames = [...gameData];

function createGameCard(game) {
    return `
        <div class="game-card" onclick="showGameDetails('${game.title}')">
            <div class="game-image">${game.image}</div>
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <span class="game-status">${game.status}</span>
        </div>
    `;
}

function filterGames(status) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`[data-filter="${status}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (status === 'all') {
        filteredGames = [...gameData];
    } else {
        const statusMap = {
            'released': 'Released',
            'development': 'In Development',
            'beta': 'Beta',
            'coming-soon': 'Coming Soon'
        };
        filteredGames = gameData.filter(game => game.status === statusMap[status]);
    }
    
    animateGameCards();
}

function animateGameCards() {
    const gamesGrid = document.getElementById('gamesGrid');
    const existingCards = gamesGrid.querySelectorAll('.game-card');
    
    // Fade out existing cards
    existingCards.forEach(card => card.classList.add('hidden'));
    
    setTimeout(() => {
        gamesGrid.innerHTML = filteredGames.map(createGameCard).join('');
        
        // Animate in new cards
        const newCards = gamesGrid.querySelectorAll('.game-card');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });
    }, 300);
}

function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    
    // Simulate loading delay
    setTimeout(() => {
        gamesGrid.innerHTML = gameData.map(createGameCard).join('');
        
        // Animate cards on initial load
        const cards = gamesGrid.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 500);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

function showGameDetails(gameTitle) {
    const game = gameData.find(g => g.title === gameTitle);
    if (!game) return;

    // Populate modal content
    document.getElementById('modalTitle').textContent = game.title;
    document.getElementById('modalDescription').textContent = game.fullDescription;
    document.getElementById('modalStatus').textContent = game.status;
    
    // Set video source
    const video = document.getElementById('gameVideo');
    video.src = game.videoUrl;
    
    // Set Steam link
    const steamLink = document.getElementById('steamLink');
    steamLink.href = game.steamUrl;
    
    // Populate features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = `
        <h3>Key Features</h3>
        <ul>
            ${game.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // Show modal
    document.getElementById('gameModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    const video = document.getElementById('gameVideo');
    
    modal.classList.remove('active');
    video.pause();
    video.currentTime = 0;
    document.body.style.overflow = 'auto';
}

function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navbar.classList.toggle('menu-open');
    navMenu.classList.toggle('active');
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('.newsletter-input').value;
    const messageEl = document.getElementById('newsletterMessage');
    const submitBtn = form.querySelector('.newsletter-btn');
    
    // Disable form during submission
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        if (email && email.includes('@')) {
            messageEl.textContent = 'Thanks for subscribing! You\'ll hear from us soon.';
            messageEl.className = 'newsletter-message success';
            form.reset();
        } else {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.className = 'newsletter-message error';
        }
        
        submitBtn.textContent = 'Subscribe';
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'newsletter-message';
        }, 5000);
    }, 1000);
}

// Close modal when clicking outside content
document.getElementById('gameModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Enhanced scroll effect with parallax
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    // Parallax effect for hero section - only when hero is visible
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const heroTop = heroSection.offsetTop;
        
        // Only apply parallax when scrolling within the hero section
        if (scrollY <= heroHeight) {
            heroSection.style.transform = `translateY(${scrollY * 0.3}px)`;
        } else {
            // Reset transform when past hero section
            heroSection.style.transform = 'translateY(0)';
        }
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterGames(btn.dataset.filter);
        });
    });
    
    // Setup mobile menu
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
    
    // Setup newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterSubmit);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.querySelector('.navbar');
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.classList.remove('active');
            navbar.classList.remove('menu-open');
            navMenu.classList.remove('active');
        });
    });
});