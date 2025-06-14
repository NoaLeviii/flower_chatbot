// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize the application
async function initializeApp() {
    console.log('Flower Chatbot initialized');
    await loadHebrewText();
    setupEventListeners();
    initializeTheme();
    setupScrollAnimations();
}

// Load Hebrew text content
async function loadHebrewText() {
    try {
        const response = await fetch('/data/hebrew-text.json');
        const data = await response.json();
        window.hebrewText = data;
        updateUIText();
    } catch (error) {
        console.error('Error loading Hebrew text:', error);
    }
}

// Update UI with Hebrew text
function updateUIText() {
    if (!window.hebrewText) return;

    const { ui, examples } = window.hebrewText;
    
    // Update main content
    document.querySelector('h2').textContent = ui.subtitle;
    document.querySelector('header p').textContent = ui.description;
    document.querySelector('h3').textContent = ui.helpTitle;
    document.querySelector('section p').textContent = ui.helpDescription;
    document.querySelector('.cta-button').textContent = ui.startChat;
    
    // Update examples
    const examplesList = document.querySelector('ul');
    if (examplesList) {
        examplesList.innerHTML = examples.map(example => 
            `<li>${example.icon} ${example.question}</li>`
        ).join('');
    }
    
    // Update footer
    document.querySelector('footer').textContent = ui.footer;
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Chat controls
    const clearChatBtn = document.getElementById('clear-chat');
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', clearChat);
    }

    const newChatBtn = document.getElementById('new-chat');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', startNewChat);
    }

    const helpBtn = document.getElementById('help');
    if (helpBtn) {
        helpBtn.addEventListener('click', showHelp);
    }

    const exportBtn = document.getElementById('export-chat');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportChat);
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.section, .cta-button');
    elements.forEach(el => el.classList.add('animate-on-scroll'));
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Chat management
function clearChat() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.src = iframe.src; // Reload iframe to clear chat
    }
    showNotification('Chat cleared');
}

function startNewChat() {
    clearChat();
    showNotification('New chat started');
}

function showHelp() {
    const helpContent = `
        <h3>How to use the Flower Chatbot</h3>
        <ul>
            <li>Type your question about flowers</li>
            <li>Use the clear button to start fresh</li>
            <li>Export your conversation for reference</li>
            <li>Toggle between light and dark themes</li>
        </ul>
    `;
    showModal('Help', helpContent);
}

function exportChat() {
    const chatContent = document.querySelector('.chat-container').innerText;
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flower-chat-' + new Date().toISOString().slice(0,10) + '.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('Chat exported successfully');
}

// UI Helpers
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <div class="modal-body">${content}</div>
            <button class="close-modal">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Analytics
function trackUserInteraction(action) {
    console.log('User interaction:', action);
    // Add analytics tracking logic here
} 