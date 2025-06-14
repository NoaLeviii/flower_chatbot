// Video Background Handler
class VideoBackground {
    constructor() {
        this.video = document.querySelector('.background-video');
        this.fallbackImage = 'assets/fallback-background.jpg';
        this.initialize();
    }

    initialize() {
        if (this.video) {
            this.setupVideo();
            this.handleVideoErrors();
            this.optimizePerformance();
        }
    }

    setupVideo() {
        // Ensure video is muted and plays in loop
        this.video.muted = true;
        this.video.loop = true;
        this.video.playsInline = true;

        // Add loading state
        this.video.addEventListener('loadstart', () => {
            document.body.classList.add('video-loading');
        });

        // Remove loading state when video is ready
        this.video.addEventListener('canplay', () => {
            document.body.classList.remove('video-loading');
        });
    }

    handleVideoErrors() {
        this.video.addEventListener('error', () => {
            console.error('Error loading video, falling back to image');
            this.fallbackToImage();
        });
    }

    fallbackToImage() {
        if (this.video) {
            const container = this.video.parentElement;
            const img = document.createElement('img');
            img.src = this.fallbackImage;
            img.alt = 'Background Image';
            img.className = 'background-image';
            container.replaceChild(img, this.video);
        }
    }

    optimizePerformance() {
        // Pause video when not visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.video.play();
                    } else {
                        this.video.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(this.video);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoBackground();
}); 