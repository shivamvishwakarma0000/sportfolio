document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Toggle hamburger icon from bars to times (X)
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ==========================================
    // Neural Network Particle Background
    // ==========================================
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const numParticles = 80;
    const connectionDistance = 150;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Opacity based on distance
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: Only animate once
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // Magnetic Buttons
    // ==========================================
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        el.addEventListener('mouseout', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // Smooth Scrolling for Nav Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Scroll Progress Indicator
    // ==========================================
    const progressCircle = document.querySelector('.progress-bar');
    const scrollPercentageText = document.getElementById('scroll-percentage');
    const scrollContainer = document.getElementById('scroll-progress-container');
    const totalLength = 163.36; // 2 * PI * R

    function updateScrollProgress() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight);
        const percentage = Math.round(progress * 100);
        
        // Update percentage text
        scrollPercentageText.textContent = `${percentage}%`;
        
        // Update circle stroke-dashoffset
        const offset = totalLength - (progress * totalLength);
        progressCircle.style.strokeDashoffset = offset;
        
        // Hide/Show loader based on scroll
        if (window.scrollY > 200) {
            scrollContainer.style.opacity = '1';
            scrollContainer.style.pointerEvents = 'auto';
        } else {
            scrollContainer.style.opacity = '0';
            scrollContainer.style.pointerEvents = 'none';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // Click to scroll to top
    scrollContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // Contact Form Submission (AJAX)
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop the page from redirecting
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const formData = new FormData(this);
            
            // Start Animation
            submitBtn.classList.add('btn-loading');
            submitBtn.innerHTML = 'Sending...';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success State
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = '#28a745';
                    submitBtn.style.borderColor = '#28a745';
                    submitBtn.style.color = '#fff';
                    
                    this.reset(); // Clear the form
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        submitBtn.classList.remove('btn-loading');
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.borderColor = '';
                        submitBtn.style.color = '';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
                submitBtn.style.background = '#dc3545';
                
                setTimeout(() => {
                    submitBtn.classList.remove('btn-loading');
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }
    // ==========================================
    // Resume & CV Button Animations
    // ==========================================
    const resumeBtns = document.querySelectorAll('#resume .magnetic');
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('btn-loading');
            
            // Remove the loading state after the animation finishes (1.5s)
            setTimeout(() => {
                this.classList.remove('btn-loading');
            }, 1500);
        });
    });
});
