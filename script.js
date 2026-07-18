document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeOptions = document.getElementById('theme-options');
    const colorDots = document.querySelectorAll('.color-dot');
    const bgDots = document.querySelectorAll('.bg-dot');
    const fontOptions = document.querySelectorAll('.font-option');
    const styleOptions = document.querySelectorAll('.style-option');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Close theme options if mobile menu is opened
            if (navLinks.classList.contains('active') && themeOptions) {
                themeOptions.classList.remove('active');
            }
            
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
    // Customizer Settings Panel (Colors, Backgrounds, Fonts)
    // ==========================================
    const themeClasses = ['theme-gold', 'theme-blue', 'theme-green', 'theme-purple', 'theme-rose'];
    const bgClasses = ['bg-default', 'bg-oceanic', 'bg-nocturne', 'bg-nebula', 'bg-cyberpunk'];
    const fontClasses = ['font-outfit', 'font-grotesque', 'font-jakarta', 'font-fira', 'font-playfair'];
    const styleClasses = ['style-clay', 'style-terminal'];

    // 1. Accent Color logic
    const savedTheme = localStorage.getItem('portfolio-theme') || 'gold';
    applyTheme(savedTheme);
    
    function applyTheme(themeName) {
        themeClasses.forEach(c => document.body.classList.remove(c));
        document.body.classList.add(`theme-${themeName}`);
        localStorage.setItem('portfolio-theme', themeName);
        colorDots.forEach(dot => {
            if (dot.dataset.theme === themeName) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 2. Background Style logic
    const savedBg = localStorage.getItem('portfolio-bg') || 'default';
    applyBackground(savedBg);

    function applyBackground(bgName) {
        bgClasses.forEach(c => document.body.classList.remove(c));
        document.body.classList.add(`bg-${bgName}`);
        localStorage.setItem('portfolio-bg', bgName);
        bgDots.forEach(dot => {
            if (dot.dataset.bg === bgName) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 3. Typography Font logic
    let savedFont = localStorage.getItem('portfolio-font') || 'outfit';
    if (savedFont === 'syne') {
        savedFont = 'jakarta';
    }
    applyFont(savedFont);

    function applyFont(fontName) {
        fontClasses.forEach(c => document.body.classList.remove(c));
        document.body.classList.add(`font-${fontName}`);
        localStorage.setItem('portfolio-font', fontName);
        fontOptions.forEach(opt => {
            if (opt.dataset.font === fontName) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // 4. Interface Mode logic
    const savedStyle = localStorage.getItem('portfolio-style') || 'clay';
    applyStyle(savedStyle);

    function applyStyle(styleName) {
        styleClasses.forEach(c => document.body.classList.remove(c));
        document.body.classList.add(`style-${styleName}`);
        localStorage.setItem('portfolio-style', styleName);
        styleOptions.forEach(opt => {
            if (opt.dataset.style === styleName) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }
    
    // Toggle the theme customizer options panel
    if (themeToggle && themeOptions) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeOptions.classList.toggle('active');
            
            // Close mobile menu if theme options open
            if (themeOptions.classList.contains('active') && navLinks) {
                navLinks.classList.remove('active');
                // Restore hamburger icon
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-ellipsis-v');
                }
            }
        });
    }
    
    // Bind click handlers
    colorDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            applyTheme(dot.dataset.theme);
        });
    });

    bgDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            applyBackground(dot.dataset.bg);
        });
    });

    fontOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            applyFont(opt.dataset.font);
        });
    });

    styleOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            applyStyle(opt.dataset.style);
        });
    });
    
    // Close theme options panel if clicked outside
    document.addEventListener('click', (e) => {
        if (themeOptions && !themeOptions.contains(e.target) && e.target !== themeToggle) {
            themeOptions.classList.remove('active');
        }
    });

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
                'primary',                 // Gold / Blue dynamically
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
            if (this.color === 'primary') {
                let fillStyle = 'rgba(255, 183, 3, 0.4)'; // Default Gold
                if (document.body.classList.contains('theme-blue')) {
                    fillStyle = 'rgba(0, 210, 255, 0.4)';
                } else if (document.body.classList.contains('theme-green')) {
                    fillStyle = 'rgba(0, 245, 212, 0.4)';
                } else if (document.body.classList.contains('theme-purple')) {
                    fillStyle = 'rgba(189, 83, 237, 0.4)';
                } else if (document.body.classList.contains('theme-rose')) {
                    fillStyle = 'rgba(255, 51, 102, 0.4)';
                }
                ctx.fillStyle = fillStyle;
            } else {
                ctx.fillStyle = this.color;
            }
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
                    let strokeColor = `rgba(255, 183, 3, ${alpha})`; // Default Gold
                    if (document.body.classList.contains('theme-blue')) {
                        strokeColor = `rgba(0, 210, 255, ${alpha})`;
                    } else if (document.body.classList.contains('theme-green')) {
                        strokeColor = `rgba(0, 245, 212, ${alpha})`;
                    } else if (document.body.classList.contains('theme-purple')) {
                        strokeColor = `rgba(189, 83, 237, ${alpha})`;
                    } else if (document.body.classList.contains('theme-rose')) {
                        strokeColor = `rgba(255, 51, 102, ${alpha})`;
                    }
                    ctx.strokeStyle = strokeColor;
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

    // ==========================================
    // Fullscreen Terminal IDE Workspace Logic
    // ==========================================
    const consoleBody = document.getElementById('terminal-console-body');
    const navTabs = document.querySelectorAll('.terminal-nav-tabs .editor-tab');
    const terminalSections = document.querySelectorAll('.terminal-section');

    if (consoleBody && navTabs.length > 0) {
        // Clicks scroll to section
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.target;
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    // Remove active from all tabs
                    navTabs.forEach(t => t.classList.remove('active'));
                    // Add active to current
                    tab.classList.add('active');
                    
                    // Smoothly scroll target element into viewport within consoleBody
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Scroll spy to update tabs active class as user scrolls
        consoleBody.addEventListener('scroll', () => {
            let currentSectionId = '';
            const containerTop = consoleBody.getBoundingClientRect().top;
            
            terminalSections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                // If section top is near container top or above it
                if (rect.top - containerTop <= 150) {
                    currentSectionId = sec.id;
                }
            });

            if (currentSectionId) {
                navTabs.forEach(tab => {
                    if (tab.dataset.target === currentSectionId) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
            }
        });
    }

    // Directory folder expansion inside Terminal Vault
    const vaultFolders = document.querySelectorAll('.terminal-vault-folder');
    vaultFolders.forEach(folder => {
        const header = folder.querySelector('.folder-header');
        const filesDiv = folder.querySelector('.folder-files');
        if (header && filesDiv) {
            header.addEventListener('click', () => {
                const isOpen = filesDiv.style.display === 'block';
                filesDiv.style.display = isOpen ? 'none' : 'block';
                // Toggle icon
                const folderIcon = header.querySelector('i');
                if (folderIcon) {
                    if (isOpen) {
                        folderIcon.className = 'fas fa-folder text-primary';
                    } else {
                        folderIcon.className = 'fas fa-folder-open text-primary';
                    }
                }
            });
        }
    });

    // Terminal IDE Actions
    const ideExitBtn = document.getElementById('ide-exit-btn');
    if (ideExitBtn) {
        ideExitBtn.addEventListener('click', () => {
            applyStyle('clay'); // Switch back to Claymorphic mode
        });
    }

    const idePaletteBtn = document.getElementById('ide-palette-btn');
    if (idePaletteBtn && themeOptions) {
        idePaletteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeOptions.classList.toggle('active');
        });
    }

    // Terminal Document Decryption Vault
    const ideVaultLocked = document.getElementById('ide-vault-locked');
    const ideVaultUnlocked = document.getElementById('ide-vault-unlocked');
    const ideVaultPasscode = document.getElementById('ide-vault-passcode');
    const ideVaultDecryptBtn = document.getElementById('ide-vault-decrypt-btn');
    const ideVaultError = document.getElementById('ide-vault-error');

    if (ideVaultDecryptBtn && ideVaultPasscode) {
        ideVaultDecryptBtn.addEventListener('click', () => {
            const pass = ideVaultPasscode.value;
            if (pass === '@Shivam0000') {
                ideVaultLocked.style.display = 'none';
                ideVaultUnlocked.style.display = 'block';
                // Sync with main vault session
                sessionStorage.setItem('vaultUnlocked', 'true');
                if (vaultFoldersArea && vaultLockScreen) {
                    vaultLockScreen.style.display = 'none';
                    vaultFoldersArea.classList.add('active');
                }
            } else {
                ideVaultError.textContent = 'ACCESS DENIED: Invalid Security Key';
                ideVaultError.style.display = 'block';
                ideVaultPasscode.classList.add('shake');
                setTimeout(() => ideVaultPasscode.classList.remove('shake'), 500);
            }
        });
    }

    // Lock vault button in Terminal
    const ideVaultLockBtn = document.getElementById('ide-vault-lock-btn');
    if (ideVaultLockBtn) {
        ideVaultLockBtn.addEventListener('click', () => {
            if (ideVaultLocked && ideVaultUnlocked) {
                ideVaultLocked.style.display = 'block';
                ideVaultUnlocked.style.display = 'none';
                sessionStorage.removeItem('vaultUnlocked');
                // Sync with main vault lock
                if (vaultFoldersArea && vaultLockScreen) {
                    vaultLockScreen.style.display = 'flex';
                    vaultFoldersArea.classList.remove('active');
                }
            }
        });
    }

    // Sync decryption on load
    if (sessionStorage.getItem('vaultUnlocked') === 'true') {
        if (ideVaultLocked && ideVaultUnlocked) {
            ideVaultLocked.style.display = 'none';
            ideVaultUnlocked.style.display = 'block';
        }
    }

    // Terminal Contact form bash execution simulation
    const ideContactForm = document.getElementById('ide-contact-form');
    const ideContactStatus = document.getElementById('ide-contact-status');
    
    if (ideContactForm) {
        ideContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            ideContactStatus.textContent = 'bash: send_message.sh: SMTP Connecting...';
            ideContactStatus.style.color = 'var(--primary-color)';
            
            // Sync content to main contact form fields
            const mainName = document.getElementById('name');
            const mainEmail = document.getElementById('email');
            const mainMsg = document.getElementById('message');
            
            if (mainName) mainName.value = document.getElementById('ide-contact-name').value;
            if (mainEmail) mainEmail.value = document.getElementById('ide-contact-email').value;
            if (mainMsg) mainMsg.value = document.getElementById('ide-contact-msg').value;

            // Trigger SMTP dispatch mockup
            setTimeout(() => {
                ideContactStatus.textContent = 'bash: send_message.sh: SMTP Success (Message Transmitted)';
                ideContactStatus.style.color = '#2ec4b6';
                ideContactForm.reset();
            }, 1200);
        });
    }

    // ==========================================
    // Feedback & Personal Space Locker System
    // ==========================================

    const PASSCODE = '@Shivam0000';
    let isUnlocked = false;
    let notes = [];
    let feedbacks = [];
    let geminiKey = localStorage.getItem('portfolio-gemini-key') || '';
    let editingNoteId = null;

    // Elements
    const feedbackTriggerBtn = document.getElementById('feedback-trigger-btn');
    const ideFeedbackBtn = document.getElementById('ide-feedback-btn');
    const feedbackModal = document.getElementById('feedback-dashboard-modal');
    const feedbackModalClose = document.getElementById('feedback-modal-close');
    
    const feedbackLockScreen = document.getElementById('feedback-lock-screen');
    const feedbackModalContent = document.getElementById('feedback-modal-content');
    const feedbackSidebar = document.getElementById('feedback-sidebar');
    
    const passcodeInput = document.getElementById('feedback-passcode-input');
    const unlockBtn = document.getElementById('feedback-unlock-btn');
    const lockError = document.getElementById('feedback-lock-error');
    const backToPublicBtn = document.getElementById('feedback-back-to-public-btn');
    const goAdminBtn = document.getElementById('feedback-go-admin-btn');
    const lockBtn = document.getElementById('feedback-lock-btn');
    
    const publicFeedbackForm = document.getElementById('public-feedback-form');
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const panels = document.querySelectorAll('.feedback-panel');
    
    // Notes Elements
    const newNoteBtn = document.getElementById('f-new-note-btn');
    const cancelNoteBtn = document.getElementById('f-btn-cancel-note');
    const noteForm = document.getElementById('f-note-form');
    const notesListView = document.getElementById('f-notes-list-view');
    const noteEditView = document.getElementById('f-note-edit-view');
    const notesGrid = document.getElementById('f-notes-grid');
    const filterCategory = document.getElementById('f-filter-category');
    
    const noteIdInput = document.getElementById('f-note-id');
    const noteTitleInput = document.getElementById('f-note-title');
    const noteCategoryInput = document.getElementById('f-note-category');
    const noteContentInput = document.getElementById('f-note-content');
    
    const btnAiEnhance = document.getElementById('f-btn-ai-enhance');
    const btnGeneratePdf = document.getElementById('f-btn-generate-pdf');
    const pdfThemeSelect = document.getElementById('f-pdf-theme');
    
    // Feedback List Elements
    const feedbackListContainer = document.getElementById('f-feedback-list');
    
    // Settings Elements
    const settingsForm = document.getElementById('f-settings-form');
    const geminiKeyInput = document.getElementById('f-gemini-key');

    // ------------------------------------------
    // Encryption Helpers
    // ------------------------------------------
    function encrypt(text) {
        try {
            return CryptoJS.AES.encrypt(text, PASSCODE).toString();
        } catch (e) {
            console.error("Encryption failed", e);
            return text;
        }
    }

    function decrypt(ciphertext) {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, PASSCODE);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.error("Decryption failed", e);
            return "";
        }
    }

    // ------------------------------------------
    // Load & Save Notes / Feedbacks
    // ------------------------------------------
    function loadNotesFromStorage() {
        const encrypted = localStorage.getItem('portfolio-secure-notes');
        if (encrypted) {
            const decryptedStr = decrypt(encrypted);
            if (decryptedStr) {
                try {
                    notes = JSON.parse(decryptedStr);
                } catch (e) {
                    notes = [];
                }
                return;
            }
        }
        notes = [];
    }

    function saveNotesToStorage() {
        const encrypted = encrypt(JSON.stringify(notes));
        localStorage.setItem('portfolio-secure-notes', encrypted);
    }

    function loadFeedbacksFromStorage() {
        const encrypted = localStorage.getItem('portfolio-public-feedbacks');
        if (encrypted) {
            const decryptedStr = decrypt(encrypted);
            if (decryptedStr) {
                try {
                    feedbacks = JSON.parse(decryptedStr);
                } catch (e) {
                    feedbacks = [];
                }
                return;
            }
        }
        feedbacks = [];
    }

    function saveFeedbacksToStorage() {
        const encrypted = encrypt(JSON.stringify(feedbacks));
        localStorage.setItem('portfolio-public-feedbacks', encrypted);
    }

    // ------------------------------------------
    // Modal Open & Close Event Handling
    // ------------------------------------------
    if (feedbackTriggerBtn) {
        feedbackTriggerBtn.addEventListener('click', () => {
            feedbackModal.classList.add('active');
            // If unlocked already, load notes & feedbacks
            if (isUnlocked) {
                renderNotes();
                renderFeedbacks();
            } else {
                lockSpace(); // Ensure it starts locked
            }
        });
    }

    if (ideFeedbackBtn) {
        ideFeedbackBtn.addEventListener('click', () => {
            feedbackModal.classList.add('active');
            // If unlocked already, load notes & feedbacks
            if (isUnlocked) {
                renderNotes();
                renderFeedbacks();
            } else {
                lockSpace(); // Ensure it starts locked
            }
        });
    }

    if (feedbackModalClose) {
        feedbackModalClose.addEventListener('click', () => {
            feedbackModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside card
    if (feedbackModal) {
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                feedbackModal.classList.remove('active');
            }
        });
    }

    // ------------------------------------------
    // Security Passcode Flow
    // ------------------------------------------
    function unlockSpace() {
        isUnlocked = true;
        feedbackLockScreen.style.display = 'none';
        feedbackSidebar.style.display = 'flex';
        
        // Hide public submit panel and activate the default locked panel (notes)
        switchTab('personal-notes');
        
        loadNotesFromStorage();
        loadFeedbacksFromStorage();
        renderNotes();
        renderFeedbacks();
        
        // Load API Settings input
        if (geminiKeyInput) {
            geminiKeyInput.value = geminiKey;
        }
    }

    function lockSpace() {
        isUnlocked = false;
        feedbackLockScreen.style.display = 'none';
        feedbackSidebar.style.display = 'none';
        
        // Reset passcode field
        if (passcodeInput) {
            passcodeInput.value = '';
        }
        if (lockError) {
            lockError.style.display = 'none';
        }
        
        // Make public submission form active
        panels.forEach(p => p.classList.remove('active'));
        const publicSubmitPanel = document.getElementById('panel-public-submit');
        if (publicSubmitPanel) {
            publicSubmitPanel.classList.add('active');
        }
    }

    if (goAdminBtn) {
        goAdminBtn.addEventListener('click', () => {
            feedbackLockScreen.style.display = 'flex';
            passcodeInput.focus();
        });
    }

    if (backToPublicBtn) {
        backToPublicBtn.addEventListener('click', () => {
            feedbackLockScreen.style.display = 'none';
        });
    }

    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            handleUnlockAttempt();
        });
    }

    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUnlockAttempt();
            }
        });
    }

    function handleUnlockAttempt() {
        const val = passcodeInput.value.trim();
        if (val === PASSCODE) {
            unlockSpace();
        } else {
            lockError.textContent = 'Incorrect passcode. Access Denied.';
            lockError.style.display = 'block';
            setTimeout(() => {
                lockError.style.display = 'none';
            }, 3000);
        }
    }

    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            lockSpace();
        });
    }

    // ------------------------------------------
    // Public Feedback Submission
    // ------------------------------------------
    function bindPublicFeedbackSubmit() {
        const form = document.getElementById('public-feedback-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('feedback-user-name').value.trim();
                const email = document.getElementById('feedback-user-email').value.trim();
                const msg = document.getElementById('feedback-message').value.trim();
                
                loadFeedbacksFromStorage();
                
                const newFeedback = {
                    id: 'fb_' + Date.now(),
                    name: name,
                    email: email || 'Anonymous',
                    message: msg,
                    date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                };
                
                feedbacks.unshift(newFeedback);
                saveFeedbacksToStorage();
                
                form.reset();
                
                const prevHTML = form.innerHTML;
                form.innerHTML = `<div style="text-align: center; padding: 2rem; color: #10b981;">
                    <i class="fas fa-check-circle" style="font-size: 3.5rem; margin-bottom: 1rem; filter: drop-shadow(0 0 10px rgba(16,185,129,0.3));"></i>
                    <h3 style="color:#ffffff;">Feedback Submitted!</h3>
                    <p style="color:rgba(255,255,255,0.7); margin-top:5px;">Thank you for sharing your thoughts.</p>
                </div>`;
                
                setTimeout(() => {
                    form.innerHTML = prevHTML;
                    bindPublicFeedbackSubmit();
                }, 3000);
            });
        }
    }
    
    bindPublicFeedbackSubmit();

    // ------------------------------------------
    // Tab Navigation Logic
    // ------------------------------------------
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.dataset.tab;
            switchTab(tabName);
        });
    });

    function switchTab(tabName) {
        sidebarMenuItems.forEach(item => {
            if (item.dataset.tab === tabName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        panels.forEach(panel => {
            if (panel.id === `panel-${tabName}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        // If switching to notes tab, reset view back to grid list
        if (tabName === 'personal-notes') {
            notesListView.style.display = 'block';
            noteEditView.style.display = 'none';
            renderNotes();
        } else if (tabName === 'received-feedbacks') {
            renderFeedbacks();
        }
    }

    // ------------------------------------------
    // Personal Notes Operations
    // ------------------------------------------
    if (newNoteBtn) {
        newNoteBtn.addEventListener('click', () => {
            editingNoteId = null;
            noteForm.reset();
            noteIdInput.value = '';
            
            notesListView.style.display = 'none';
            noteEditView.style.display = 'block';
        });
    }

    if (cancelNoteBtn) {
        cancelNoteBtn.addEventListener('click', () => {
            notesListView.style.display = 'block';
            noteEditView.style.display = 'none';
        });
    }

    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const id = noteIdInput.value;
            const title = noteTitleInput.value.trim();
            const category = noteCategoryInput.value;
            const content = noteContentInput.value.trim();
            
            if (id) {
                // Edit existing note
                const idx = notes.findIndex(n => n.id === id);
                if (idx !== -1) {
                    notes[idx].title = title;
                    notes[idx].category = category;
                    notes[idx].content = content;
                    notes[idx].updatedAt = new Date().toLocaleDateString();
                }
            } else {
                // Create new note
                const newNote = {
                    id: 'note_' + Date.now(),
                    title: title,
                    category: category,
                    content: content,
                    updatedAt: new Date().toLocaleDateString()
                };
                notes.unshift(newNote);
            }
            
            saveNotesToStorage();
            notesListView.style.display = 'block';
            noteEditView.style.display = 'none';
            renderNotes();
        });
    }

    if (filterCategory) {
        filterCategory.addEventListener('change', () => {
            renderNotes();
        });
    }

    function renderNotes() {
        if (!notesGrid) return;
        notesGrid.innerHTML = '';
        
        const filterVal = filterCategory.value;
        const filteredNotes = filterVal === 'all' ? notes : notes.filter(n => n.category === filterVal);
        
        if (filteredNotes.length === 0) {
            notesGrid.innerHTML = `<div class="no-notes-placeholder">
                <i class="fas fa-sticky-note"></i>
                <p>No notes found in this category.</p>
            </div>`;
            return;
        }
        
        filteredNotes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'f-note-card';
            
            let tagClass = 'tag-custom';
            const catLower = note.category.toLowerCase();
            if (catLower === 'introduction') tagClass = 'tag-intro';
            else if (catLower === 'hobby') tagClass = 'tag-hobby';
            else if (catLower === 'strength') tagClass = 'tag-strength';
            else if (catLower === 'weakness') tagClass = 'tag-weakness';
            
            card.innerHTML = `
                <div class="note-card-header">
                    <span class="note-card-tag ${tagClass}">${note.category}</span>
                    <h3>${escapeHTML(note.title)}</h3>
                    <p>${escapeHTML(note.content)}</p>
                </div>
                <div class="note-card-footer">
                    <span>${note.updatedAt}</span>
                    <div class="note-card-actions">
                        <button class="btn-edit" title="Edit Note"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" title="Delete Note"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            
            // Card click leads to edit (except when clicking buttons)
            card.addEventListener('click', (e) => {
                if (e.target.closest('.note-card-actions')) return;
                openNoteForEditing(note);
            });
            
            card.querySelector('.btn-edit').addEventListener('click', () => {
                openNoteForEditing(note);
            });
            
            card.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                // Ask for passcode to delete!
                const pass = prompt('Enter passcode to delete this note:');
                if (pass === PASSCODE) {
                    notes = notes.filter(n => n.id !== note.id);
                    saveNotesToStorage();
                    renderNotes();
                } else if (pass !== null) {
                    alert('Incorrect passcode. Deletion aborted.');
                }
            });
            
            notesGrid.appendChild(card);
        });
    }

    function openNoteForEditing(note) {
        editingNoteId = note.id;
        noteIdInput.value = note.id;
        noteTitleInput.value = note.title;
        noteCategoryInput.value = note.category;
        noteContentInput.value = note.content;
        
        notesListView.style.display = 'none';
        noteEditView.style.display = 'block';
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // ------------------------------------------
    // Render Public Feedbacks
    // ------------------------------------------
    function renderFeedbacks() {
        if (!feedbackListContainer) return;
        feedbackListContainer.innerHTML = '';
        
        if (feedbacks.length === 0) {
            feedbackListContainer.innerHTML = `<div class="no-feedback-placeholder">
                <i class="fas fa-inbox" style="font-size: 2.5rem; color: rgba(255,255,255,0.2); display: block; margin-bottom: 10px;"></i>
                <p>No feedback received yet.</p>
            </div>`;
            return;
        }
        
        feedbacks.forEach(fb => {
            const card = document.createElement('div');
            card.className = 'f-feedback-card';
            card.innerHTML = `
                <div class="feedback-card-content">
                    <div class="feedback-card-meta">
                        <span class="feedback-sender">${escapeHTML(fb.name)}</span>
                        <span class="feedback-sender-email">${escapeHTML(fb.email)}</span>
                        <span class="feedback-date">${fb.date}</span>
                    </div>
                    <p class="feedback-text">${escapeHTML(fb.message)}</p>
                </div>
                <div class="feedback-card-actions">
                    <button class="btn-delete-fb" title="Delete Feedback"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            
            card.querySelector('.btn-delete-fb').addEventListener('click', () => {
                const pass = prompt('Enter passcode to delete this feedback log:');
                if (pass === PASSCODE) {
                    feedbacks = feedbacks.filter(f => f.id !== fb.id);
                    saveFeedbacksToStorage();
                    renderFeedbacks();
                } else if (pass !== null) {
                    alert('Incorrect passcode. Deletion aborted.');
                }
            });
            
            feedbackListContainer.appendChild(card);
        });
    }

    // ------------------------------------------
    // Settings (API Key) Operations
    // ------------------------------------------
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = geminiKeyInput.value.trim();
            geminiKey = val;
            localStorage.setItem('portfolio-gemini-key', val);
            
            alert('Settings saved successfully!');
            switchTab('personal-notes');
        });
    }

    // ------------------------------------------
    // AI Enhancer Logic
    // ------------------------------------------
    if (btnAiEnhance) {
        btnAiEnhance.addEventListener('click', async () => {
            const content = noteContentInput.value.trim();
            const category = noteCategoryInput.value;
            
            if (!content) {
                alert('Please type some initial text first to enhance.');
                return;
            }
            
            btnAiEnhance.disabled = true;
            btnAiEnhance.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing with AI...';
            
            if (geminiKey && geminiKey.trim().length > 10) {
                // Call Google Gemini API
                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: `You are an expert personal bio writer and career coach. The user wants you to write a professional, highly engaging, beautifully formatted template based on their category: "${category}" and their raw notes/points: "${content}". Please expand and structure this content beautifully using clean Markdown headings, highlight points, and lists. Do not write conversational filler or intros; start directly with the markdown content.`
                                }]
                            }]
                        })
                    });
                    
                    const data = await response.json();
                    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                        const generatedText = data.candidates[0].content.parts[0].text;
                        noteContentInput.value = generatedText;
                    } else {
                        throw new Error('Invalid API response structure');
                    }
                } catch (e) {
                    console.error("Gemini API call failed, falling back to local template", e);
                    alert("Gemini API request failed. Using local rule-based template generator.");
                    runLocalEnhancer(content, category);
                }
            } else {
                // Use Local Enhancer
                runLocalEnhancer(content, category);
            }
            
            btnAiEnhance.disabled = false;
            btnAiEnhance.innerHTML = '<i class="fas fa-magic"></i> Enhance text with AI Template';
        });
    }

    function runLocalEnhancer(rawText, category) {
        let enhanced = '';
        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const bulletPoints = lines.map(line => `- ${line}`).join('\n');
        
        switch (category) {
            case 'Introduction':
                enhanced = `# Shivam | Professional Narrative\n\n## Summary Profile\nI am a tech innovator and software developer dedicated to crafting premium digital solutions. By combining structured development pipelines with modern design frameworks, I build web experiences that are both functionally robust and visually spectacular.\n\n## Core Competencies & Input Highlights\n${bulletPoints}\n\n## Professional Vision\n"Focusing on pixel-perfect details, clean architectures, and engaging interactions to deliver solutions that leave a lasting impact."`;
                break;
            case 'Hobby':
                enhanced = `# Creative Outlets & Interdisciplinary Skills\n\n## Personal Pursuits\nEngaging in creative activities provides a continuous spark for cognitive agility and code logic styling.\n\n## Key Interests & Reflections\n${lines.map(l => `- **${l}**: Exploring new dimensions, finding challenges, and applying strategic design thinking.`).join('\n')}\n\n## Development Impact\nThese outlets help maintain high physical energy, focus, and a creative design perspective.`;
                break;
            case 'Strength':
                enhanced = `# Professional Assets & Core Strengths\n\n## Strength Overview\nA summary of programmatic skills and interpersonal assets driving high delivery output.\n\n## Key Pillars\n${lines.map((l, i) => `${i+1}. **${l}**: Actively applied across full-stack architectures to solve problems and drive value.`).join('\n')}\n\n## Implementation Philosophy\n"Turning technical adaptiveness and meticulous visual standards into high-impact code assets."`;
                break;
            case 'Weakness':
                enhanced = `# Continuous Growth & Professional Reflection\n\n## Growth Focus\nActively acknowledging professional developmental areas and implementing structured frameworks to build capabilities.\n\n## Core Reflections\n${lines.map(l => `- **Growth Area (${l})**: Formulating active habits (like active time-blocking, task delegation, and focus sprints) to balance code quality with rapid shipping goals.`).join('\n')}\n\n## Evolution Path\nMaintaining accountability through sprint scoping, sprint reviews, and continuous peer-aligned checkpoints.`;
                break;
            default:
                enhanced = `# Personal Study Guide: ${noteTitleInput.value || 'Custom Subject'}\n\n## Core Theme Overview\nStructured details and notes for review.\n\n## Key Points\n${bulletPoints}\n\n## Formulated Objectives\n- Prepare content structure.\n- Execute mock rehearsals.\n- Optimize presentation delivery.`;
                break;
        }
        
        noteContentInput.value = enhanced;
    }

    // ------------------------------------------
    // Poster PDF Generator (html2pdf)
    // ------------------------------------------
    if (btnGeneratePdf) {
        btnGeneratePdf.addEventListener('click', () => {
            const title = noteTitleInput.value.trim();
            const category = noteCategoryInput.value;
            const content = noteContentInput.value.trim();
            const theme = pdfThemeSelect.value;
            
            if (!title || !content) {
                alert('Please fill out the Title and Content before generating a PDF.');
                return;
            }
            
            // Build dynamic element for rendering
            const posterDiv = document.createElement('div');
            posterDiv.id = 'temp-pdf-poster';
            posterDiv.className = `pdf-poster-container theme-${theme}`;
            
            const htmlContent = markdownToHTML(content);
            const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
            
            posterDiv.innerHTML = `
                <div class="poster-frame">
                    <div class="poster-header">
                        <span class="poster-badge">${category}</span>
                        <span style="font-weight:800; letter-spacing:1px; font-size:1.1rem;"><i class="fas fa-shield-alt" style="color:inherit; margin-right:8px;"></i>SHIVAM LOCKER</span>
                    </div>
                    <div class="poster-body">
                        <div class="poster-content-card">
                            <h1 class="poster-title" style="margin-top:0; margin-bottom:1.5rem; font-size:2.2rem; line-height:1.2;">${title}</h1>
                            <div class="poster-content-text">${htmlContent}</div>
                        </div>
                    </div>
                    <div class="poster-footer">
                        <span class="poster-date">Generated on ${currentDate}</span>
                        <span class="poster-signature" style="font-style:italic;">Shivam Personal Space</span>
                    </div>
                </div>
            `;
            
            // Temporarily append to body (needed by html2pdf to capture style)
            document.body.appendChild(posterDiv);
            
            const opt = {
                margin:       0,
                filename:     `Shivam_${category}_${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
                image:        { type: 'jpeg', quality: 1.0 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            btnGeneratePdf.disabled = true;
            btnGeneratePdf.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rendering PDF...';
            
            setTimeout(() => {
                html2pdf().set(opt).from(posterDiv).save().then(() => {
                    // Remove temporary element
                    document.body.removeChild(posterDiv);
                    btnGeneratePdf.disabled = false;
                    btnGeneratePdf.innerHTML = '<i class="fas fa-file-pdf"></i> Save Poster PDF';
                }).catch(err => {
                    console.error("PDF generation failed", err);
                    document.body.removeChild(posterDiv);
                    btnGeneratePdf.disabled = false;
                    btnGeneratePdf.innerHTML = '<i class="fas fa-file-pdf"></i> Save Poster PDF';
                    alert('PDF generation failed. Check console for details.');
                });
            }, 250);
        });
    }

    // Simple markdown-to-html helper for PDF layout rendering
    function markdownToHTML(mdText) {
        if (!mdText) return '';
        
        let html = mdText;
        
        // Escape HTML tags to prevent broken nodes
        html = escapeHTML(html);
        
        // Convert headers
        html = html.replace(/^#\s+(.+)$/gm, '<h2 style="font-size:1.8rem; margin-top:1.5rem; margin-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px; color:inherit;">$1</h2>');
        html = html.replace(/^##\s+(.+)$/gm, '<h3 style="font-size:1.4rem; margin-top:1.2rem; margin-bottom:0.6rem; color:inherit;">$1</h3>');
        html = html.replace(/^###\s+(.+)$/gm, '<h4 style="font-size:1.15rem; margin-top:1rem; margin-bottom:0.5rem; color:inherit;">$1</h4>');
        
        // Convert bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Convert italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Convert bullet points: group consecutive bullets into a single <ul> block
        html = html.replace(/^[-\*]\s+(.+)$/gm, '<li>$1</li>');
        html = html.replace(/((?:<li>.*?<\/li>\s*)+)/gs, '<ul style="margin-left:20px; margin-bottom:1rem; line-height:1.6;">$1</ul>');
        
        // Replace single line breaks with paragraph dividers or <br>
        html = html.replace(/\n\n/g, '<p style="margin-bottom:1rem;"></p>');
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }
});
