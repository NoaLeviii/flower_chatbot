// Test suite for Flower Chatbot
class ChatbotTests {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    // Test if chat container exists
    testChatContainer() {
        const container = document.querySelector('.chat-container');
        this.assert(container !== null, 'Chat container should exist');
    }

    // Test if iframe is properly loaded
    testIframeLoading() {
        const iframe = document.querySelector('iframe');
        this.assert(iframe !== null, 'Chatbase iframe should exist');
        this.assert(iframe.src.includes('chatbase.co'), 'Iframe should point to Chatbase');
    }

    // Test theme toggle functionality
    testThemeToggle() {
        const body = document.body;
        const initialTheme = body.getAttribute('data-theme');
        this.toggleTheme();
        const newTheme = body.getAttribute('data-theme');
        this.assert(initialTheme !== newTheme, 'Theme should toggle between light and dark');
    }

    // Test flower data loading
    async testFlowerData() {
        try {
            const response = await fetch('/data/flowers.json');
            const data = await response.json();
            this.assert(data.flowers.length > 0, 'Flower data should be loaded');
            this.assert(data.flowers[0].name !== undefined, 'Flower data should have name property');
        } catch (error) {
            this.assert(false, 'Flower data should be accessible');
        }
    }

    // Helper assertion method
    assert(condition, message) {
        this.tests.push({
            passed: condition,
            message: message
        });
        
        if (condition) {
            this.passed++;
            console.log(`✅ PASS: ${message}`);
        } else {
            this.failed++;
            console.error(`❌ FAIL: ${message}`);
        }
    }

    // Run all tests
    runAll() {
        console.log('🧪 Running Flower Chatbot Tests...');
        
        this.testChatContainer();
        this.testIframeLoading();
        this.testThemeToggle();
        this.testFlowerData();

        console.log('\n📊 Test Summary:');
        console.log(`Total Tests: ${this.tests.length}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
    }
}

// Run tests when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tests = new ChatbotTests();
    tests.runAll();
}); 