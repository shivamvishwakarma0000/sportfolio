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
            
            // Toggle hamburger icon from ellipsis (3-dots) to times (X)
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-ellipsis-v');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-ellipsis-v');
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
                    icon.classList.add('fa-ellipsis-v');
                }
            });
        });
    }

    // ==========================================
    // Interactive Constellation Node Background
    // ==========================================
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 80;
    const maxDistance = 120; // Max distance for drawing connection lines
    
    // Mouse coordinates object
    const mouse = {
        x: null,
        y: null,
        radius: 180 // Radius of mouse interaction area
    };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Adjust particle count based on screen size
        if (window.innerWidth < 768) {
            particleCount = 35;
        } else {
            particleCount = 80;
        }
        initParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse movement event listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4; // Very gentle speed
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1; // 1px to 3px
            
            // Subtle theme colors
            const colors = [
                'rgba(255, 183, 3, 0.4)',  // Gold
                'rgba(46, 196, 182, 0.4)', // Teal
                'rgba(139, 92, 246, 0.4)'  // Violet
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            // Attraction to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    // Move slightly towards mouse
                    this.x += (dx / dist) * force * 0.2;
                    this.y += (dy / dist) * force * 0.2;
                }
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off boundaries with a small buffer
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            
            // Connect to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - p1.x;
                const dy = mouse.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.25;
                    ctx.strokeStyle = `rgba(255, 183, 3, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            
            // Connect to other particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.12;
                    ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
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

    // ==========================================
    // Scroll Spy for Nav Links
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 180; // offset for the sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksList.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run once initially


    // ==========================================
    // Secure Document Vault Password & Folder Logic
    // ==========================================
    const vaultPasswordInput = document.getElementById('vault-password-input');
    const vaultSubmitBtn = document.getElementById('vault-submit-btn');
    const vaultLockScreen = document.getElementById('vault-lock-screen');
    const vaultFoldersArea = document.getElementById('vault-folders-area');
    const vaultAuthForm = document.getElementById('vault-auth-form');
    const vaultErrorMsg = document.getElementById('vault-error-msg');
    const lockVaultBtn = document.getElementById('lock-vault-btn');
    
    const vaultModal = document.getElementById('vault-modal');
    const vaultModalClose = document.getElementById('vault-modal-close');
    const vaultModalFolderTitle = document.getElementById('vault-modal-folder-title');
    const vaultFilesList = document.getElementById('vault-files-list');

    // Sensitive files database (Using existing assets for preview/download)
    const vaultDatabase = {
        'aadhar': [
            { name: 'Aadhar_Card_Shivam.pdf', size: '1.2 MB', date: '12/03/2023', type: 'pdf', url: 'assets/Aadhar_Card_Shivam.pdf' }
        ],
        'aapar': [
            { name: 'APAAR_Card_Shivam.pdf', size: '840 KB', date: '05/11/2024', type: 'pdf', url: 'assets/AAPAR.pdf' }
        ],
        'abc': [
            { name: 'ABC_ID_Academic_Bank_of_Credits.pdf', size: '450 KB', date: '18/02/2024', type: 'pdf', url: 'assets/ABC_ID_Academic_Bank_of_Credits.pdf' }
        ],
        'all-semester': [
            { name: 'Semester_1_Marksheet.pdf', size: '1.8 MB', date: '15/01/2024', type: 'pdf', url: 'assets/Semester_1_Marksheet.pdf' },
            { name: 'Semester_2_Marksheet.pdf', size: '1.9 MB', date: '20/06/2024', type: 'pdf', url: 'assets/Semester_2_Marksheet.pdf' },
            { name: 'Semester_3_Marksheet.pdf', size: '2.1 MB', date: '12/01/2025', type: 'pdf', url: 'assets/Semester_3_Marksheet.pdf' },
            { name: 'Semester_4_Marksheet.pdf', size: '2.0 MB', date: '18/06/2025', type: 'pdf', url: 'assets/Semester_4_Marksheet.pdf' },
            { name: 'Semester_5_Marksheet.pdf', size: '2.2 MB', date: '15/01/2026', type: 'pdf', url: 'assets/Semester_5_Marksheet.pdf' },
            { name: 'Semester_6_Marksheet.pdf', size: '2.1 MB', date: '20/06/2026', type: 'pdf', url: 'assets/Semester_6_Marksheet.pdf' }
        ],
        'caste-certificate': [
            { name: 'Caste_Certificate_Shivam.pdf', size: '1.1 MB', date: '22/08/2021', type: 'pdf', url: 'assets/Caste_Certificate_Shivam.pdf' }
        ],
        'class-10': [
            { name: 'Class_10_Marksheet_SNPS.pdf', size: '1.5 MB', date: '30/05/2021', type: 'pdf', url: 'assets/Class_10_Marksheet_SNPS.pdf' },
            { name: 'Class_10_Passing_Certificate.pdf', size: '1.2 MB', date: '30/05/2021', type: 'pdf', url: 'assets/Class_10_Marksheet_SNPS.pdf' }
        ],
        'class-12': [
            { name: 'Class_12_Marksheet_SNPS.pdf', size: '1.6 MB', date: '28/05/2023', type: 'pdf', url: 'assets/Class_12_Marksheet_SNPS.pdf' },
            { name: 'Class_12_Passing_Certificate.pdf', size: '1.3 MB', date: '28/05/2023', type: 'pdf', url: 'assets/Class_12_Marksheet_SNPS.pdf' }
        ],
        'id-card': [
            { name: 'College_ID_Card_Parul_Univ.pdf', size: '620 KB', date: '10/08/2023', type: 'pdf', url: 'assets/College_ID_Card_Parul_Univ.pdf' },
            { name: 'Hostel_Pass_23_27.pdf', size: '480 KB', date: '15/08/2023', type: 'pdf', url: 'assets/College_ID_Card_Parul_Univ.pdf' }
        ],
        'photo': [
            { name: 'Passport_Size_Photo.jpg', size: '320 KB', date: '14/04/2025', type: 'image', url: 'assets/profile.png' },
            { name: 'Formal_Profile_Picture.png', size: '1.4 MB', date: '02/05/2025', type: 'image', url: 'assets/Formal_Profile_Picture.png' }
        ],
        'signature': [
            { name: 'Shivam_Digital_Signature.png', size: '120 KB', date: '20/07/2023', type: 'image', url: 'assets/sv-logo.png' }
        ],
        'tc': [
            { name: 'Transfer_Certificate_School.pdf', size: '950 KB', date: '15/07/2023', type: 'pdf', url: 'assets/Transfer_Certificate_School.pdf' }
        ]
    };

    // Helper functions for lock/unlock
    function unlockVault() {
        // Play scan visual effect
        vaultLockScreen.classList.add('vault-scan-active');
        
        setTimeout(() => {
            vaultLockScreen.classList.remove('vault-scan-active');
            vaultLockScreen.style.display = 'none';
            vaultFoldersArea.classList.add('active');
            
            // Save state in sessionStorage
            sessionStorage.setItem('vaultUnlocked', 'true');
        }, 1200);
    }

    function lockVault() {
        vaultFoldersArea.classList.remove('active');
        vaultLockScreen.style.display = 'block';
        vaultPasswordInput.value = '';
        vaultErrorMsg.classList.remove('active');
        sessionStorage.removeItem('vaultUnlocked');
    }

    // Check if previously unlocked in session
    if (sessionStorage.getItem('vaultUnlocked') === 'true') {
        vaultLockScreen.style.display = 'none';
        vaultFoldersArea.classList.add('active');
    }

    // Auth Submission
    if (vaultAuthForm) {
        vaultAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = vaultPasswordInput.value;
            
            if (password === '@Shivam0000') {
                // Correct Password
                vaultErrorMsg.classList.remove('active');
                unlockVault();
            } else {
                // Incorrect Password
                vaultErrorMsg.textContent = 'ACCESS DENIED: Invalid Security Key';
                vaultErrorMsg.classList.add('active');
                
                // Shake Animation
                vaultLockScreen.classList.add('shake');
                setTimeout(() => {
                    vaultLockScreen.classList.remove('shake');
                }, 600);
            }
        });
    }

    // Lock Button Click
    if (lockVaultBtn) {
        lockVaultBtn.addEventListener('click', lockVault);
    }

    // Folder Grid Click Event
    const folders = document.querySelectorAll('.folder-card');
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const folderKey = folder.getAttribute('data-folder');
            const folderNameText = folder.querySelector('.folder-name').textContent;
            const files = vaultDatabase[folderKey];
            
            if (files) {
                // Set Modal Title
                vaultModalFolderTitle.textContent = folderNameText;
                
                // Populate File Items
                vaultFilesList.innerHTML = '';
                files.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    
                    const fileIconClass = file.type === 'pdf' ? 'fa-file-pdf pdf' : 'fa-file-image image';
                    
                    fileItem.innerHTML = `
                        <div class="file-info">
                            <i class="fas ${fileIconClass} file-icon"></i>
                            <div class="file-details">
                                <span class="file-name">${file.name}</span>
                                <span class="file-meta">${file.size} &bull; ${file.date}</span>
                            </div>
                        </div>
                        <div class="file-actions">
                            <a href="${file.url}" target="_blank" class="btn btn-outline file-btn"><i class="fas fa-eye"></i> View</a>
                            <a href="${file.url}" download="${file.name}" class="btn btn-primary file-btn"><i class="fas fa-download"></i> Download</a>
                        </div>
                    `;
                    vaultFilesList.appendChild(fileItem);
                });
                
                // Open Modal
                vaultModal.classList.add('active');
            }
        });
    });

    // Close Modal Event
    if (vaultModalClose) {
        vaultModalClose.addEventListener('click', () => {
            vaultModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside card
    if (vaultModal) {
        vaultModal.addEventListener('click', (e) => {
            if (e.target === vaultModal) {
                vaultModal.classList.remove('active');
            }
        });
    }
});
