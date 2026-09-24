// Force scroll to top on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  let updateCarouselPositionFn = null;
  let scrollToSectionFn = null;
  let initialSection = 'home';
  
  // ==========================================
  // 1. LANGUAGE SWITCHER (EN / ID)
  // ==========================================
  const langBtn = document.getElementById('lang-btn');
  // Always default to English ('en') on every visit/reload; clean up any legacy stored language
  try {
    localStorage.removeItem('language');
  } catch (e) {}
  let activeLang = 'en';

  const translations = {
    en: {
      "intro-role": "Creative Web Developer",
      "intro-prompt": "CLICK ANYWHERE TO ENTER",
      "nav-home": "Home",
      "home-title": "Workspace Hub",
      "nav-about": "About",
      "nav-projects": "Projects",
      "nav-contact": "Contact",
      "btn-talk": "Let's Talk",
      "hero-status": "STATUS: ONLINE",
      "hero-desc": "I design and build premium web applications, translating complex ideas into elegant, responsive, and high-performance digital experiences.",
      "btn-explore": "Explore Projects",
      "btn-about-me": "Get to Know Me",
      "btn-resume": "My Resume",
      "btn-get-in-touch": "Get In Touch",
      "vibe-title": "Cool Vibe Coder",
      "about-title": "About Me",
      "about-status": "Open for projects",
      "about-profile-name": "Jordy Cahya Buana",
      "about-profile-role": "Creative Web Developer",
      "about-profile-location": "Malang, Indonesia",
      "about-bio-badge": "Philosophy & Craft",
      "about-bio-title": "Fusing Design with Technical Precision",
      "about-bio-desc1": "I am a motivated Informatics Engineering graduate from Brawijaya University, specializing in Front-End Development. As a dedicated vibe coder, I thrive on bridging the gap between design and functionality—combining intuitive AI-assisted workflows and modern tech to build scalable, responsive web applications. My expertise spans across the JavaScript ecosystem, including React, Next.js, and advanced CSS frameworks. With a keen eye for detail and user experience, I am eager to leverage my technical skills and problem-solving mindset to contribute to high-impact digital products.",
      "about-bio-desc2": "With a strong focus on responsive architecture, fluid micro-interactions, and computational efficiency, I transform complex ideas into high-impact digital products across the modern JavaScript and mobile ecosystems.",
      "stat-grad-year": "Informatics Engineering",
      "stat-bangkit": "Bangkit '23 Alum",
      "stat-thesis": "Published Researcher",
      "college-badge-label": "Alma Mater",
      "college-title": "Universitas Brawijaya",
      "college-faculty": "Faculty of Computer Science (FILKOM)",
      "college-degree": "Bachelor of Informatics Engineering (S.Kom)",
      "college-desc": "Graduated in Informatics Engineering from Universitas Brawijaya in Malang. Built a comprehensive foundation in Software Architecture, Web & Mobile Systems, and Algorithmic Problem Solving while spearheading scientific research on declarative UI performance.",
      "thesis-badge-label": "Published Thesis",
      "thesis-main-title": "\"Comparative Analysis of RecyclerView and LazyColumn Performance in Displaying Data Collection in Android Applications\"",
      "thesis-journal-name": "Jurnal PTIIK, Universitas Brawijaya",
      "thesis-summary": "Empirical scientific research measuring frame render latency, memory overhead, and scroll velocity comparing Android Jetpack Compose with traditional RecyclerView.",
      "btn-read-paper": "Read Published Paper",
      "tech-stack-title": "Tech Stack Expertise",
      "experience-title": "Experience",
      "exp-1-role": "Internship",
      "exp-1-date": "Feb 2023 - Jul 2023",
      "exp-1-company": "Bangkit Academy (by Google, GoTo, Traveloka)",
      "exp-1-desc": "Developed native Android applications using Kotlin, Android SDK, and modern system architectures under mentorship from top tech companies.",
      "exp-2-role": "Student",
      "exp-2-date": "Jan 2020 - Dec 2025",
      "exp-2-company": "Universitas Brawijaya",
      "exp-2-desc": "Completed Informatics Engineering degree, focusing on software design, algorithmic problem solving, and modern Front-End Web development.",
      "projects-board-title": "Projects Board",
      "filter-all": "All Projects",
      "filter-web": "Web Apps & Games",
      "filter-mobile": "Android Apps",
      "filter-system": "Benchmarks & Systems",
      "search-projects-placeholder": "Search projects, tech, or tags...",
      "no-projects-title": "No projects found",
      "no-projects-desc": "Try searching with a different keyword or reset filters.",
      "btn-reset-filters": "Reset Filters",
      "proj-1-cat": "Web Game",
      "proj-1-desc": "A pixel-art game website featuring adventure gameplay as the brave knight to save the kidnapped princess and bring joy to the kingdom.",
      "proj-2-cat": "Android App",
      "proj-2-desc": "A native Android community and forum platform built to facilitate communication and interactive thread discussions.",
      "proj-3-cat": "Jetpack Compose",
      "proj-3-desc": "Performance benchmark subject comparing Declarative list loading with traditional XML layout managers using Android Jetpack Compose.",
      "proj-4-cat": "Android XML",
      "proj-4-desc": "Android XML view rendering performance validation subject designed for scroll loading benchmarking under academic research.",
      "proj-5-cat": "Benchmarks",
      "proj-5-desc": "An automated performance measurement suite profiling app startup, render frames, and scrolling velocities using Android Jetpack Macrobenchmark.",
      "proj-6-cat": "Software Eng",
      "proj-6-desc": "Collaborative software engineering class application built to validate software design cycles, system patterns, and relational databases.",
      "contact-title": "Get In Touch",
      "contact-subtitle": "Let's create something together",
      "contact-desc": "Feel free to reach out through the terminal mailer or via my social channels. I'm always open to discussing new engineering projects, mobile systems, or collaboration ideas.",
      "contact-label-location": "Location",
      "social-title": "You can find me on",
      "btn-submit": "Execute Transmission",
      
      // Placeholders
      "placeholder-name": "Your Name",
      "placeholder-email": "you@example.com",
      "placeholder-subject": "Project Inquiry",
      "placeholder-message": "Write your message here...",
      
      // Messages
      "msg-transmitting": "TRANSMITTING PACKETS...",
      "msg-success": "Transmission complete. Packets safely arrived at Malang gateway. Jordy will respond shortly.",
      "msg-error": "Transmission failed. The packets did not arrive — please email buana779@gmail.com directly.",
      "msg-invalid": "Incomplete packet. Please fill every field with a valid address.",
      "msg-mailto": "Opening your mail client with this message ready to send.",
      "footer-copy": "© 2026 Jordy Cahya Buana. All Rights Reserved."
    },
    id: {
      "intro-role": "Developer Web Kreatif",
      "intro-prompt": "KLIK DI MANA SAJA UNTUK MASUK",
      "nav-home": "Beranda",
      "home-title": "Ruang Kerja",
      "nav-about": "Tentang",
      "nav-projects": "Proyek",
      "nav-contact": "Kontak",
      "btn-talk": "Mari Berbincang",
      "hero-status": "STATUS: AKTIF",
      "hero-desc": "Saya merancang dan membangun aplikasi web premium, menerjemahkan ide-ide kompleks menjadi pengalaman digital yang elegan, responsif, dan berkinerja tinggi.",
      "btn-explore": "Jelajahi Proyek",
      "btn-about-me": "Kenali Saya",
      "btn-resume": "Resume Saya",
      "btn-get-in-touch": "Hubungi Saya",
      "vibe-title": "Cool Vibe Coder",
      "about-title": "Tentang Saya",
      "about-status": "Terbuka untuk proyek",
      "about-profile-name": "Jordy Cahya Buana",
      "about-profile-role": "Developer Web Kreatif",
      "about-profile-location": "Malang, Indonesia",
      "about-bio-badge": "Filosofi & Keahlian",
      "about-bio-title": "Memadukan Desain dengan Presisi Teknis",
      "about-bio-desc1": "Saya adalah lulusan Teknik Informatika dari Universitas Brawijaya yang termotivasi, berspesialisasi dalam Front-End Development. Sebagai seorang vibe coder yang berdedikasi, saya berkembang dalam menjembatani kesenjangan antara desain dan fungsionalitas—menggabungkan alur kerja berbantuan AI yang intuitif dan teknologi modern untuk membangun aplikasi web yang skalabel dan responsif. Keahlian saya mencakup ekosistem JavaScript, termasuk React, Next.js, dan framework CSS tingkat lanjut. Dengan perhatian kuat pada detail dan pengalaman pengguna, saya bersemangat untuk memanfaatkan keterampilan teknis dan pola pikir pemecahan masalah saya untuk berkontribusi pada produk digital yang berdampak tinggi.",
      "about-bio-desc2": "Dengan fokus kuat pada arsitektur responsif, mikro-interaksi yang lancar, dan efisiensi komputasi, saya menerjemahkan ide-ide kompleks menjadi produk digital berdampak tinggi di seluruh ekosistem JavaScript dan aplikasi mobile modern.",
      "stat-grad-year": "Teknik Informatika",
      "stat-bangkit": "Alumni Bangkit '23",
      "stat-thesis": "Peneliti Terpublikasi",
      "college-badge-label": "Almamater",
      "college-title": "Universitas Brawijaya",
      "college-faculty": "Fakultas Ilmu Komputer (FILKOM)",
      "college-degree": "Sarjana Teknik Informatika (S.Kom)",
      "college-desc": "Lulusan Teknik Informatika dari Universitas Brawijaya, Malang. Membangun fondasi komprehensif dalam Arsitektur Perangkat Lunak, Sistem Web & Mobile, serta Pemecahan Masalah Algoritmik sembari memimpin penelitian ilmiah tentang performa UI deklaratif.",
      "thesis-badge-label": "Tesis Terpublikasi",
      "thesis-main-title": "\"Analisis Perbandingan Performa RecyclerView dan LazyColumn dalam Menampilkan Koleksi Data pada Aplikasi Android\"",
      "thesis-journal-name": "Jurnal PTIIK, Universitas Brawijaya",
      "thesis-summary": "Riset ilmiah empiris yang mengukur latensi render frame, konsumsi memori, dan kecepatan scroll membandingkan Android Jetpack Compose dengan RecyclerView tradisional.",
      "btn-read-paper": "Baca Artikel Tesis",
      "tech-stack-title": "Keahlian Tech Stack",
      "experience-title": "Pengalaman",
      "exp-1-role": "Magang",
      "exp-1-date": "Feb 2023 - Jul 2023",
      "exp-1-company": "Bangkit Academy (oleh Google, GoTo, Traveloka)",
      "exp-1-desc": "Mengembangkan aplikasi Android asli menggunakan Kotlin, Android SDK, dan arsitektur sistem modern di bawah bimbingan dari perusahaan teknologi teratas.",
      "exp-2-role": "Mahasiswa",
      "exp-2-date": "Jan 2020 - Des 2025",
      "exp-2-company": "Universitas Brawijaya",
      "exp-2-desc": "Menyelesaikan gelar Teknik Informatika, berfokus pada desain perangkat lunak, pemecahan masalah algoritmik, dan pengembangan Web Front-End modern.",
      "projects-board-title": "Papan Proyek",
      "filter-all": "Semua Proyek",
      "filter-web": "Aplikasi Web & Game",
      "filter-mobile": "Aplikasi Android",
      "filter-system": "Benchmark & Sistem",
      "search-projects-placeholder": "Cari proyek, teknologi, atau tag...",
      "no-projects-title": "Proyek tidak ditemukan",
      "no-projects-desc": "Coba gunakan kata kunci lain atau reset filter.",
      "btn-reset-filters": "Reset Filter",
      "proj-1-cat": "Game Web",
      "proj-1-desc": "Sebuah situs game pixel-art yang menampilkan gameplay petualangan sebagai ksatria pemberani untuk menyelamatkan putri yang diculik dan membawa kegembiraan bagi kerajaan.",
      "proj-2-cat": "Aplikasi Android",
      "proj-2-desc": "Sebuah platform komunitas dan forum Android asli yang dibangun untuk memfasilitasi komunikasi dan diskusi utas interaktif.",
      "proj-3-cat": "Jetpack Compose",
      "proj-3-desc": "Subjek benchmark kinerja yang membandingkan pemuatan daftar Deklaratif dengan manajer tata letak XML tradisional menggunakan Android Jetpack Compose.",
      "proj-4-cat": "Android XML",
      "proj-4-desc": "Subjek validasi kinerja perenderan tampilan Android XML yang dirancang untuk tolok ukur pemuatan gulir di bawah penelitian akademik.",
      "proj-5-cat": "Benchmark",
      "proj-5-desc": "Rangkaian pengukuran kinerja otomatis yang memprofilkan pengaktifan aplikasi, bingkai render, dan kecepatan gulir menggunakan Android Jetpack Macrobenchmark.",
      "proj-6-cat": "Rekayasa Perangkat Lunak",
      "proj-6-desc": "Aplikasi kelas rekayasa perangkat lunak kolaboratif yang dibangun untuk memvalidasi siklus desain perangkat lunak, pola sistem, dan database relasional.",
      "contact-title": "Hubungi Saya",
      "contact-subtitle": "Mari ciptakan sesuatu bersama",
      "contact-desc": "Jangan ragu untuk menghubungi saya melalui mailer terminal atau melalui saluran sosial saya. Saya selalu terbuka untuk mendiskusikan proyek rekayasa baru, sistem seluler, atau ide kolaborasi.",
      "contact-label-location": "Lokasi",
      "social-title": "Temukan saya di",
      "btn-submit": "Kirim Transmisi",
      
      // Placeholders
      "placeholder-name": "Nama Anda",
      "placeholder-email": "email@contoh.com",
      "placeholder-subject": "Pertanyaan Proyek",
      "placeholder-message": "Tulis pesan Anda di sini...",
      
      // Messages
      "msg-transmitting": "MENGIRIMKAN PAKET...",
      "msg-success": "Transmisi selesai. Paket telah tiba dengan aman di gerbang Malang. Jordy akan segera merespons.",
      "msg-error": "Transmisi gagal. Paket tidak sampai — silakan kirim email langsung ke buana779@gmail.com.",
      "msg-invalid": "Paket tidak lengkap. Mohon isi semua kolom dengan alamat yang valid.",
      "msg-mailto": "Membuka aplikasi email Anda dengan pesan ini siap dikirim.",
      "footer-copy": "© 2026 Jordy Cahya Buana. Hak Cipta Dilindungi."
    }
  };

  const typewriterDict = {
    en: ["Creative Developer", "Front-End Developer", "Web Developer"],
    id: ["Developer Kreatif", "Front-End Developer", "Web Developer"]
  };

  function applyLanguage(lang) {
    activeLang = lang;
    
    // Toggle button label (when active is 'en', button option should be 'ID' to toggle, and vice versa)
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'ID' : 'EN';
    }

    // Set doc lang
    document.documentElement.setAttribute('lang', lang);
    
    // Set document titles / meta for SEO
    document.title = lang === 'en' ? 'Jordy | Creative Bento Portfolio' : 'Jordy | Portofolio Bento Kreatif';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', lang === 'en' ? 
        "Jordy's Creative Bento Portfolio. Software engineer specializing in building high-performance, modern web applications with elegant designs." :
        "Portofolio Bento Kreatif Jordy. Pengembang web yang berspesialisasi dalam membangun aplikasi web modern berkinerja tinggi dengan desain elegan."
      );
    }

    // Static text node swaps
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Placeholder inputs translations
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const targetLang = activeLang === 'en' ? 'id' : 'en';
      applyLanguage(targetLang);
      resetTypewriter();
    });
  }

  // Set initial language
  applyLanguage(activeLang);


  // ==========================================
  // 3. CANVAS CONSTELLATION BACKGROUND
  // ==========================================
  function setupParticleCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = window.innerWidth < 768 ? 25 : 45;
    let animationFrameId = null;
    let isRunning = true;
    let isScrolling = false;
    let scrollTimeout = null;
    
    // Mouse interaction coordinates
    let mouse = {
      x: null,
      y: null,
      radius: 130
    };
    
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (isRunning && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animateParticles);
        }
      }, 100);
    };
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Resize handler
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    // Constellation palette
    const PARTICLE_TONES = {
      dark:  ['rgba(102, 192, 244, 0.50)', 'rgba(74, 158, 255, 0.42)'],
      light: ['rgba(21, 99, 158, 0.45)',   'rgba(26, 68, 194, 0.38)']
    };
    let isDarkFrame = document.documentElement.classList.contains('dark-theme');

    // Particle Class
    class Particle {
      constructor(x, y, directionX, directionY, size, tone) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.tone = tone;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = PARTICLE_TONES[isDarkFrame ? 'dark' : 'light'][this.tone];
        ctx.fill();
      }
      update() {
        // Bounce off canvas edges
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        // Draw particle
        this.draw();
      }
    }
    
    // Populate particle cloud
    function initParticles() {
      particlesArray = [];
      let size = 1.5;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let directionX = (Math.random() * 0.35) - 0.175;
        let directionY = (Math.random() * 0.35) - 0.175;
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, i % 2));
      }
    }
    
    // Draw connections between nodes and user's mouse cursor using batched draw calls
    function connectParticles() {
      const maxDistSq = 110 * 110;
      const len = particlesArray.length;
      
      // 1. Batch inter-particle links into one path and single stroke
      ctx.beginPath();
      ctx.strokeStyle = isDarkFrame ? 'rgba(102, 192, 244, 0.08)' : 'rgba(21, 99, 158, 0.06)';
      ctx.lineWidth = 0.8;
      
      for (let a = 0; a < len; a++) {
        const pa = particlesArray[a];
        for (let b = a + 1; b < len; b++) {
          const pb = particlesArray[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < maxDistSq) {
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
          }
        }
      }
      ctx.stroke();
      
      // 2. Batch cursor stream links into one path and single stroke
      if (mouse.x !== null && mouse.y !== null) {
        const mouseRadiusSq = mouse.radius * mouse.radius;
        ctx.beginPath();
        ctx.strokeStyle = isDarkFrame ? 'rgba(102, 192, 244, 0.20)' : 'rgba(21, 99, 158, 0.16)';
        ctx.lineWidth = 1.1;
        
        for (let a = 0; a < len; a++) {
          const pa = particlesArray[a];
          const dx = pa.x - mouse.x;
          const dy = pa.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < mouseRadiusSq) {
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(mouse.x, mouse.y);
          }
        }
        ctx.stroke();
      }
    }
    
    // Animation Loop
    function animateParticles() {
      if (!isRunning) return;
      if (isScrolling) {
        animationFrameId = null;
        return; // Fully yield frame budget to browser compositor during active scroll gestures
      }
      isDarkFrame = document.documentElement.classList.contains('dark-theme');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Pause animation when browser tab is inactive or hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (isRunning && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animateParticles);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    
    // Initialize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animateParticles();

    return {
      stop: () => {
        isRunning = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseout', onMouseOut);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', resizeCanvas);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }

  // Initialize constellation particle canvas for Introduction splash overlay
  const introParticleSystem = setupParticleCanvas('intro-canvas');


  // ==========================================
  // 5. TYPEWRITER EFFECT
  // ==========================================
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2200; // Delay between words
  let textArrayIndex = 0;
  let charIndex = 0;
  let typewriterTimeout;

  function type() {
    const currentWord = typewriterDict[activeLang][textArrayIndex];
    if (charIndex < currentWord.length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += currentWord.charAt(charIndex);
      charIndex++;
      typewriterTimeout = setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      typewriterTimeout = setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    const currentWord = typewriterDict[activeLang][textArrayIndex];
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typewriterTimeout = setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex >= typewriterDict[activeLang].length) textArrayIndex = 0;
      typewriterTimeout = setTimeout(type, typingDelay + 400);
    }
  }

  function resetTypewriter() {
    clearTimeout(typewriterTimeout);
    charIndex = 0;
    textArrayIndex = 0;
    if (typedTextSpan) {
      typedTextSpan.textContent = "";
      type();
    }
  }

  if(typedTextSpan) {
    typewriterTimeout = setTimeout(type, 1000);
  }

  // ==========================================
  // 6. MOBILE NAVIGATION SLIDE DRAWER
  // ==========================================
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  let toggleMenu = null;

  if (menuBtn && navLinks) {
    let menuBackdrop = document.querySelector('.mobile-menu-backdrop');
    if (!menuBackdrop) {
      menuBackdrop = document.createElement('div');
      menuBackdrop.className = 'mobile-menu-backdrop';
      document.body.appendChild(menuBackdrop);
    }

    toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navLinks.classList.contains('active');
      menuBtn.classList.toggle('active', isOpen);
      navLinks.classList.toggle('active', isOpen);
      menuBackdrop.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => toggleMenu());
    menuBackdrop.addEventListener('click', () => toggleMenu(false));

    // Dismiss drawer upon link navigation
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  // ==========================================
  // 6b. CONNECTED SINGLE-PAGE SCROLLING & SCROLLSPY
  // ==========================================
  const navLinksItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.page-section');
  let isProgrammaticScroll = false;
  let scrollTimeout = null;

  function setActiveNavLink(targetId) {
    navLinksItems.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === '#' + targetId;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  function scrollToSection(targetId, updateHash = true) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    isProgrammaticScroll = true;
    setActiveNavLink(targetId);

    if (updateHash && window.location.hash !== '#' + targetId) {
      history.pushState(null, '', '#' + targetId);
    }

    targetEl.scrollIntoView({ behavior: 'smooth' });

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 850);
  }

  scrollToSectionFn = scrollToSection;

  // Handle click events on all hash-pointing navigation elements
  const hashLinks = document.querySelectorAll('a[href^="#"]');
  hashLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        scrollToSection(targetId, true);
        
        // Close mobile drawer if open
        if (typeof toggleMenu === 'function') {
          toggleMenu(false);
        } else if (menuBtn && navLinks) {
          menuBtn.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Debounced URL hash updating to eliminate browser IPC hitching during rapid scrolling
  let hashUpdateTimeout = null;
  function debouncedUpdateHash(id) {
    clearTimeout(hashUpdateTimeout);
    hashUpdateTimeout = setTimeout(() => {
      if (window.location.hash !== '#' + id) {
        history.replaceState(null, '', '#' + id);
      }
    }, 200);
  }

  // ScrollSpy using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    if (isProgrammaticScroll) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          setActiveNavLink(id);
          debouncedUpdateHash(id);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Handle top and bottom scroll boundaries via throttled rAF
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking || isProgrammaticScroll) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      if (isProgrammaticScroll) return;

      const scrollY = window.scrollY || window.pageYOffset;
      // Top edge boundary
      if (scrollY < 80) {
        setActiveNavLink('home');
        debouncedUpdateHash('home');
        return;
      }

      // Bottom edge boundary (using body.offsetHeight to avoid synchronous scrollHeight reflow)
      if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 60)) {
        setActiveNavLink('contact');
        debouncedUpdateHash('contact');
      }
    });
  }, { passive: true });

  // Handle browser back/forward history navigation
  window.addEventListener('popstate', () => {
    const targetId = window.location.hash.substring(1) || 'home';
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      scrollToSection(targetId, false);
    }
  });

  // Initialize Routing on Page Load
  const navEntry = performance.getEntriesByType('navigation')[0];
  const isReload = navEntry ? navEntry.type === 'reload' : false;

  const requestedSection = window.location.hash.substring(1);
  const requestedEl = document.getElementById(requestedSection);
  const isKnownSection = !!requestedEl && requestedEl.classList.contains('page-section');

  initialSection = (!isReload && isKnownSection) ? requestedSection : 'home';

  if (requestedSection !== initialSection) {
    history.replaceState(null, '', '#' + initialSection);
  }

  setActiveNavLink(initialSection);

  // ==========================================
  // 7. PROJECTS GRID & CATEGORY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchDropdown = document.getElementById('projects-search-dropdown');
  const searchInput = document.getElementById('project-search-input');
  const searchCloseBtn = document.getElementById('project-search-close');
  const noResultsEl = document.getElementById('projects-no-results');
  const resetFiltersBtn = document.getElementById('reset-project-filters');

  let activeCategory = 'all';
  let searchQuery = '';
  let isSearchOpen = false;

  function openSearch() {
    if (!searchDropdown) return;
    isSearchOpen = true;
    searchDropdown.style.display = 'block';
    requestAnimationFrame(() => {
      searchDropdown.classList.add('open');
      searchToggleBtn?.classList.add('active');
      searchToggleBtn?.setAttribute('aria-expanded', 'true');
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  function closeSearch() {
    if (!searchDropdown) return;
    isSearchOpen = false;
    searchDropdown.classList.remove('open');
    searchToggleBtn?.classList.remove('active');
    searchToggleBtn?.setAttribute('aria-expanded', 'false');
    if (searchInput) {
      searchInput.value = '';
    }
    searchQuery = '';
    updateProjectVisibility();
    setTimeout(() => {
      if (!isSearchOpen) {
        searchDropdown.style.display = 'none';
      }
    }, 300);
  }

  function toggleSearch() {
    if (isSearchOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  }

  function updateProjectVisibility() {
    const q = searchQuery.toLowerCase().trim();
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      
      let matchesSearch = true;
      if (q) {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        const cat = card.querySelector('.project-cat')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase()).join(' ');
        
        const cardSearchText = `${title} ${desc} ${cat} ${tags}`;
        matchesSearch = cardSearchText.includes(q);
      }

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden-by-filter');
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
        visibleCount++;
      } else {
        card.classList.add('hidden-by-filter');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (card.classList.contains('hidden-by-filter')) {
            card.style.display = 'none';
          }
        }, 300);
      }
    });

    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.style.display = 'flex';
        requestAnimationFrame(() => {
          noResultsEl.style.opacity = '1';
        });
      } else {
        noResultsEl.style.opacity = '0';
        setTimeout(() => {
          if (visibleCount > 0) {
            noResultsEl.style.display = 'none';
          }
        }, 200);
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      updateProjectVisibility();
    });
  });

  if (searchToggleBtn) {
    searchToggleBtn.addEventListener('click', toggleSearch);
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', () => {
      closeSearch();
      searchToggleBtn?.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      updateProjectVisibility();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        searchToggleBtn?.focus();
      }
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      closeSearch();
      activeCategory = 'all';
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });
      updateProjectVisibility();
    });
  }

  // ==========================================
  // 8. TERMINAL MAILER
  // ==========================================
  // Set CONTACT_ENDPOINT to a form-forwarding URL (Formspree, Getform, Basin,
  // a Netlify function, ...) and submissions are POSTed there as JSON.
  // While it is empty the form hands off to the visitor's own mail client
  // instead. It must never report success for a message that went nowhere.
  const CONTACT_ENDPOINT = '';
  const CONTACT_EMAIL = 'buana779@gmail.com';

  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm?.querySelector('.form-submit-btn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const loader = submitBtn?.querySelector('.loader');
  const formStatus = document.getElementById('form-status');

  if (contactForm && submitBtn) {
    let statusTimer = null;
    let statusFadeTimer = null;

    function showStatus(kind, messageKey) {
      if (!formStatus) return;
      clearTimeout(statusTimer);
      clearTimeout(statusFadeTimer);

      formStatus.className = 'form-status ' + kind;
      formStatus.textContent = translations[activeLang][messageKey];
      formStatus.style.display = 'block';
      formStatus.style.opacity = '1';

      statusTimer = setTimeout(() => {
        formStatus.style.opacity = '0';
        formStatus.style.transition = 'opacity 0.6s ease';
        statusFadeTimer = setTimeout(() => {
          formStatus.style.display = 'none';
          formStatus.style.opacity = '1';
        }, 600);
      }, 8000);
    }

    function setBusy(busy) {
      submitBtn.disabled = busy;
      if (btnText) {
        btnText.textContent = busy
          ? translations[activeLang]["msg-transmitting"]
          : translations[activeLang]["btn-submit"];
      }
      if (loader) loader.style.display = busy ? 'inline-block' : 'none';
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check fields validation
      const inputs = contactForm.querySelectorAll('.form-input');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = 'var(--card-border)';
        }
      });

      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value.trim() && !emailField.checkValidity()) {
        valid = false;
        emailField.style.borderColor = '#ef4444';
      }

      if (!valid) {
        showStatus('error', 'msg-invalid');
        return;
      }

      const payload = {
        name: contactForm.querySelector('#name').value.trim(),
        email: contactForm.querySelector('#email').value.trim(),
        subject: contactForm.querySelector('#subject').value.trim(),
        message: contactForm.querySelector('#message').value.trim()
      };

      // No endpoint configured: hand the message to the visitor's mail client
      // rather than pretending it was delivered.
      if (!CONTACT_ENDPOINT) {
        const body = payload.message + '\n\n--\n' + payload.name + ' <' + payload.email + '>';
        showStatus('info', 'msg-mailto');
        window.location.href = 'mailto:' + CONTACT_EMAIL +
          '?subject=' + encodeURIComponent(payload.subject) +
          '&body=' + encodeURIComponent(body);
        return;
      }

      setBusy(true);
      if (formStatus) formStatus.style.display = 'none';

      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Request failed: ' + response.status);

        showStatus('success', 'msg-success');
        contactForm.reset();
      } catch (err) {
        console.error('Contact form submission failed:', err);
        showStatus('error', 'msg-error');
      } finally {
        setBusy(false);
      }
    });
  }

  // ==========================================
  // 9. THEME SWITCHER (AUTOMATIC SYSTEM PREFERENCE + MANUAL TOGGLE)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const osDarkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  // The blocking script in <head> has already resolved and applied the theme for zero-flash load.
  // Function to apply theme
  function applyTheme(isDark, persist = false) {
    document.documentElement.classList.toggle('dark-theme', isDark);
    if (persist) {
      try {
        localStorage.setItem('user_theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    }
  }

  // Automatically follow the OS/browser theme whenever it changes
  if (osDarkQuery) {
    const handleSystemThemeChange = (e) => {
      // When system theme changes, automatically follow user's new system option
      // and reset manual override so it continues to track system preference seamlessly
      try {
        localStorage.removeItem('user_theme');
      } catch (err) {}
      applyTheme(e.matches);
    };

    if (typeof osDarkQuery.addEventListener === 'function') {
      osDarkQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof osDarkQuery.addListener === 'function') {
      osDarkQuery.addListener(handleSystemThemeChange);
    }
  }

  // Manual toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark-theme');
      applyTheme(!isCurrentlyDark, true);
    });
  }

  // ==========================================
  // 10. INTRO SPLASH OVERLAY DISMISSAL & BENTO FADE-IN
  // ==========================================
  const introOverlay = document.getElementById('intro-overlay');

  if (introOverlay) {
    // Bind mousemove parallax tracking for background shape blobs
    const blob1 = introOverlay.querySelector('.blob-1');
    const blob2 = introOverlay.querySelector('.blob-2');
      
    if (blob1 && blob2) {
      introOverlay.addEventListener('mousemove', (e) => {
        const rect = introOverlay.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Blob 1 follows cursor coordinates with 30% distance translation
        const moveX1 = (x - centerX) * 0.30;
        const moveY1 = (y - centerY) * 0.30;
        
        // Blob 2 slides in opposite direction with 25% translation (parallax depth)
        const moveX2 = (x - centerX) * -0.25;
        const moveY2 = (y - centerY) * -0.25;
        
        blob1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
        blob2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
      });
      
      // Reset positions smoothly when mouse leaves the overlay area
      introOverlay.addEventListener('mouseleave', () => {
        blob1.style.transform = 'translate(0px, 0px)';
        blob2.style.transform = 'translate(0px, 0px)';
      });
    }

    // The splash is a deliberate gate: the visitor enters by clicking, tapping
    // or pressing a key. It never dismisses itself on a timer.
    let introDismissed = false;

    function dismissIntro() {
      if (introDismissed) return;
      introDismissed = true;

      enterEvents.forEach(evt => window.removeEventListener(evt, dismissIntro));

      introOverlay.classList.add('fade-out');

      // Restart typewriter on home
      resetTypewriter();

      // Trigger the bento fade-in halfway through the overlay exit (0.5s)
      setTimeout(() => {
        document.body.classList.add('intro-dismissed');
        if (initialSection && initialSection !== 'home' && typeof scrollToSectionFn === 'function') {
          scrollToSectionFn(initialSection, false);
        }
      }, 500);

      // Hide the overlay once it has finished fading out (1.0s) and stop intro particles
      setTimeout(() => {
        introOverlay.style.display = 'none';
        if (introParticleSystem && typeof introParticleSystem.stop === 'function') {
          introParticleSystem.stop();
        }
      }, 1000);
    }

    // Deliberate "enter" gestures only. Under reduced motion the gate still
    // stands; the CSS simply collapses the fade so entry is instant.
    const enterEvents = ['click', 'keydown', 'touchstart'];
    enterEvents.forEach(evt =>
      window.addEventListener(evt, dismissIntro, { once: true, passive: true })
    );
  } else {
    // Fallback if no intro element exists
    document.body.classList.add('intro-dismissed');
    if (initialSection && initialSection !== 'home' && typeof scrollToSectionFn === 'function') {
      scrollToSectionFn(initialSection, false);
    }
  }

});
