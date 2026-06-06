/* ============================================================
   PORTFOLIO JAVASCRIPT — POLISHED VERSION
   Earl John B. Plaza
============================================================ */

"use strict";

/* ----------------------------------------------------------
   1. PAGE LOADER
---------------------------------------------------------- */
const loader = document.getElementById("page-loader");
const loaderBar = document.getElementById("loader-bar");
const loaderText = document.getElementById("loader-text");

const loaderSteps = [
  { width: "20%", text: "Loading assets..." },
  { width: "45%", text: "Building UI..." },
  { width: "70%", text: "Preparing animations..." },
  { width: "90%", text: "Almost ready..." },
  { width: "100%", text: "Welcome! 🚀" },
];

function runLoader() {
  let step = 0;

  function nextStep() {
    if (step >= loaderSteps.length) {
      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(triggerHeroAnimations, 300);
      }, 400);
      return;
    }

    const current = loaderSteps[step];
    loaderBar.style.width = current.width;
    loaderText.textContent = current.text;
    step++;

    setTimeout(nextStep, step === loaderSteps.length ? 600 : 380);
  }

  nextStep();
}

/* ----------------------------------------------------------
   2. HERO ANIMATIONS (Triggered after loader)
---------------------------------------------------------- */
function triggerHeroAnimations() {
  const heroContent = document.querySelector(".hero-content");
  const heroVisual = document.querySelector(".hero-visual");
  const badges = document.querySelectorAll(".floating-badge");

  if (heroContent) heroContent.classList.add("animate");

  setTimeout(() => {
    if (heroVisual) heroVisual.classList.add("animate");
  }, 400);

  badges.forEach((badge, index) => {
    setTimeout(
      () => {
        badge.classList.add("visible");
      },
      800 + index * 180,
    );
  });

  setTimeout(typeText, 1200);
}

/* ----------------------------------------------------------
   3. GLITCH EFFECT ON NAME
---------------------------------------------------------- */
function initGlitch() {
  const nameHighlight = document.querySelector(".name-highlight");
  if (!nameHighlight) return;

  nameHighlight.classList.add("glitch");
  nameHighlight.setAttribute("data-text", nameHighlight.textContent);
}

/* ----------------------------------------------------------
   4. PARTICLE BACKGROUND
---------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.opacitySpeed = Math.random() * 0.006 + 0.002;
      this.growing = Math.random() > 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.growing) {
        this.opacity += this.opacitySpeed;
        if (this.opacity >= 0.6) this.growing = false;
      } else {
        this.opacity -= this.opacitySpeed;
        if (this.opacity <= 0.05) this.growing = true;
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 180, 216, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    const MAX_DISTANCE = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_DISTANCE) {
          const opacity = (1 - distance / MAX_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 180, 216, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

/* ----------------------------------------------------------
   5. ADD OUTER PROFILE RING
---------------------------------------------------------- */
function initProfileRing() {
  const profileWrapper = document.querySelector(".profile-wrapper");
  if (!profileWrapper) return;

  const outerRing = document.createElement("div");
  outerRing.classList.add("profile-ring-outer");
  profileWrapper.appendChild(outerRing);
}

/* ----------------------------------------------------------
   6. TYPING ANIMATION
---------------------------------------------------------- */
const typingRoles = [
  "Aspiring Full-Stack Developer",
  "Back-End Enthusiast",
  "Database Management Student",
  "BSIT 2nd Year Student",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingEl = document.getElementById("typing-text");

function typeText() {
  if (!typingEl) return;

  const currentRole = typingRoles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 45 : 95;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typingRoles.length;
    speed = 400;
  }

  setTimeout(typeText, speed);
}

/* ----------------------------------------------------------
   7. NAVBAR — SCROLL EFFECT & ACTIVE LINK
---------------------------------------------------------- */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

/* ----------------------------------------------------------
   8. MOBILE HAMBURGER MENU
---------------------------------------------------------- */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

function toggleMenu() {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
  document.body.style.overflow = navMenu.classList.contains("open")
    ? "hidden"
    : "";
}

function closeMenu() {
  hamburger.classList.remove("open");
  navMenu.classList.remove("open");
  document.body.style.overflow = "";
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (e) => {
  if (
    navMenu &&
    navMenu.classList.contains("open") &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

/* ----------------------------------------------------------
   9. SCROLL REVEAL
---------------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      setTimeout(() => {
        el.classList.add("active");

        const skillFills = el.querySelectorAll(".skill-fill");
        skillFills.forEach((fill) => {
          const targetWidth = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 300);
        });
      }, index * 80);
    }
  });
}

/* ----------------------------------------------------------
   10. SMOOTH SCROLL
---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ----------------------------------------------------------
   11. SCROLL PROGRESS BAR
---------------------------------------------------------- */
function createScrollProgress() {
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00b4d8, #7c3aed);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
    border-radius: 0 2px 2px 0;
  `;
  document.body.prepend(bar);
  return bar;
}

const progressBar = createScrollProgress();

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
}

/* ----------------------------------------------------------
   12. CONSOLE EASTER EGG
---------------------------------------------------------- */
function showConsoleEasterEgg() {
  console.log(
    "%c👋 Hey there, Developer!",
    "color: #00b4d8; font-size: 1.4rem; font-weight: bold;",
  );
  console.log(
    "%cYou found the console. Curious one, aren't you? 😄",
    "color: #8888a8; font-size: 0.9rem;",
  );
  console.log(
    "%c📧 earljohnbplaza@gmail.com",
    "color: #7ee787; font-size: 0.9rem;",
  );
  console.log(
    "%c🐙 github.com/earljohn-spec",
    "color: #a78bfa; font-size: 0.9rem;",
  );
}

/* ----------------------------------------------------------
   13. MASTER SCROLL HANDLER
---------------------------------------------------------- */
function onScroll() {
  handleNavbarScroll();
  updateActiveNavLink();
  revealOnScroll();
  updateScrollProgress();
}

/* ----------------------------------------------------------
   14. FORCE SCROLL TO TOP BEFORE PAGE UNLOADS
---------------------------------------------------------- */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/* ----------------------------------------------------------
   15. INIT
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Scroll to top on every page load/reload
  window.scrollTo(0, 0);

  // Initialize everything
  initParticles();
  initGlitch();
  initProfileRing();
  showConsoleEasterEgg();

  // Run loader — triggers hero animations on complete
  runLoader();

  // Initial scroll check
  handleNavbarScroll();
});

window.addEventListener("scroll", onScroll, { passive: true });

window.addEventListener(
  "resize",
  () => {
    revealOnScroll();
    if (window.innerWidth > 768) closeMenu();
  },
  { passive: true },
);
