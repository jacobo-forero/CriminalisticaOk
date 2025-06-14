document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("backToTop");
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");
    const bars = document.querySelectorAll(".bar");
    const navLinks = document.querySelectorAll(".nav-link");
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const stats = document.querySelectorAll(".stat-number");
    const statsSection = document.querySelector(".stats-container");
    const animatedElements = document.querySelectorAll("[data-aos]");
    const modalOverlay = document.getElementById("modalOverlay");
    const serviceCards = document.querySelectorAll(".service-card");
    const closeButtons = document.querySelectorAll(".close-modal");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar?.classList.add("scrolled");
            backToTop?.classList.add("active");
        } else {
            navbar?.classList.remove("scrolled");
            backToTop?.classList.remove("active");
        }

        if (statsSection && isInViewport(statsSection)) {
            animateStats();
        }

        checkAnimations();
    });

    mobileMenu?.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navMenu?.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
        } else {
            resetBars();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");
            mobileMenu?.classList.remove("active");
            resetBars();
        });
    });

    function resetBars() {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
    }

    let currentSlide = 0;

    function showSlide(n) {
        testimonialSlides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        testimonialSlides[n].classList.add("active");
        dots[n].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 5000);

    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-count"), 10);
            let count = 0;
            const increment = Math.ceil(target / 100);

            const updateCount = () => {
                count += increment;
                if (count > target) count = target;
                stat.innerText = count;
                if (count < target) {
                    requestAnimationFrame(updateCount);
                }
            };

            updateCount();
        });
        statsAnimated = true;
    }

    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
    });

    function checkAnimations() {
        animatedElements.forEach((element) => {
            if (isInViewport(element) && !element.classList.contains("animated")) {
                const animationType = element.getAttribute("data-aos");
                const delay = element.getAttribute("data-aos-delay") || 0;

                setTimeout(() => {
                    element.style.animation = `${animationType} 0.8s forwards`;
                    element.classList.add("animated");
                }, delay);

                element.removeAttribute("data-aos");
            }
        });
    }

    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
    });

    serviceCards.forEach((card) => {
        const btnMore = card.querySelector(".btn-more");
        btnMore?.addEventListener("click", () => {
            const serviceType = card.getAttribute("data-service");
            const modal = document.getElementById(`modal-${serviceType}`);
            if (modal) {
                modalOverlay.style.display = "flex";
                modal.style.display = "block";
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeAllModals();
        });
    });

    modalOverlay?.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeAllModals();
        }
    });

    function closeAllModals() {
        modalOverlay.style.display = "none";
        document.querySelectorAll(".modal").forEach((modal) => {
            modal.style.display = "none";
        });
    }

    checkAnimations();
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; 
        const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
    }
});

    navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
    }
});
});

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
}
});
document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
});

// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Botón principal "Ver más"
    const mainButton = document.createElement('button');
    mainButton.innerHTML = '<i class="fas fa-plus"></i>';
    mainButton.classList.add('main-toggle-button');

    // Botones adicionales
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle-button');

    const langToggle = document.createElement('button');
    langToggle.innerHTML = '<i class="fas fa-language"></i>';
    langToggle.classList.add('lang-toggle-button');

    const buttons = [mainButton, themeToggle, langToggle];

    // Aplicar estilos comunes
    const styleButton = btn => {
        Object.assign(btn.style, {
            width: '50px',
            height: '50px',
            backgroundColor: '#007bff',
            color: '#f8fafc',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            border: 'none',
            fontSize: '1.5em',
            cursor: 'pointer'
        });

        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = '#ff9719');
        btn.addEventListener('mouseleave', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            btn.style.backgroundColor = isDarkMode ? '#0a359d' : '#007bff';
        });
    };

    buttons.forEach(styleButton);

    Object.assign(mainButton.style, {
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: '999'
    });

    const extraButtonsContainer = document.createElement('div');
    Object.assign(extraButtonsContainer.style, {
        position: 'fixed',
        bottom: '90px',
        left: '30px',
        display: 'none',
        flexDirection: 'column',
        gap: '10px',
        zIndex: '999'
    });

    // Evento mostrar/ocultar botones extra
    mainButton.addEventListener('click', () => {
        const isVisible = extraButtonsContainer.style.display === 'flex';
        extraButtonsContainer.style.display = isVisible ? 'none' : 'flex';

        const isDarkMode = document.body.classList.contains('dark-mode');
        mainButton.style.backgroundColor = isVisible
            ? (isDarkMode ? '#0a359d' : '#007bff')
            : '#ff9719';
    });

    // Evento modo oscuro
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Actualizar colores de botones
        buttons.forEach(btn => {
            btn.style.backgroundColor = isDarkMode ? '#0a359d' : '#007bff';
        });
    });

    // Detectar tema guardado
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#0a359d';
        });
    }

    // Evento cambiar idioma
    langToggle.addEventListener('click', function () {
        const fileMap = {
            'index.html': 'index_en.html',
            'index_en.html': 'index.html',
            'politica.html': 'politica_en.html',
            'politica_en.html': 'politica.html',
            'servicio.html': 'servicio_en.html',
            'servicio_en.html': 'servicio.html'
        };

        const urlParts = window.location.pathname.split('/');
        const currentFile = urlParts[urlParts.length - 1] || 'index.html';
        const newFile = fileMap[currentFile];

        if (newFile) {
            window.location.href = newFile;
        } else {
            alert('No se pudo detectar el idioma actual.');
        }
    });

    // Agregar botones al DOM
    extraButtonsContainer.appendChild(themeToggle);
    extraButtonsContainer.appendChild(langToggle);
    document.body.appendChild(mainButton);
    document.body.appendChild(extraButtonsContainer);
});
