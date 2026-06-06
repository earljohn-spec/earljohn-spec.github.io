/* ============================================================
   PORTFOLIO JAVASCRIPT
   Earl John B. Plaza
============================================================ */

"use strict";

/* ----------------------------------------------------------
   1. TYPING ANIMATION
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
   2. NAVBAR — SCROLL EFFECT & ACTIVE LINK
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
   3. MOBILE HAMBURGER MENU
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

// Close menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("open") &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

/* ----------------------------------------------------------
   4. SCROLL REVEAL ANIMATION
---------------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");

      // Animate skill bars when skills section is revealed
      const skillFills = el.querySelectorAll(".skill-fill");
      skillFills.forEach((fill) => {
        const targetWidth = fill.getAttribute("data-width");
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 300);
      });
    }
  });
}

/* ----------------------------------------------------------
   5. SMOOTH SCROLL FOR ALL ANCHOR LINKS
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
   6. SCROLL PROGRESS INDICATOR (Subtle top bar)
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
   7. CONSOLE EASTER EGG (Developer touch)
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
    "%c📧 Let's connect: earljohnbplaza@gmail.com",
    "color: #7ee787; font-size: 0.9rem;",
  );
  console.log(
    "%c🐙 GitHub: https://github.com/earljohn-spec",
    "color: #a78bfa; font-size: 0.9rem;",
  );
}

/* ----------------------------------------------------------
   8. MASTER SCROLL HANDLER (Single listener for performance)
---------------------------------------------------------- */
function onScroll() {
  handleNavbarScroll();
  updateActiveNavLink();
  revealOnScroll();
  updateScrollProgress();
}

/* ----------------------------------------------------------
   9. INIT — Run on DOM Ready
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Start typing animation
  setTimeout(typeText, 800);

  // Run scroll checks immediately for elements in view
  revealOnScroll();
  handleNavbarScroll();

  // Show console message
  showConsoleEasterEgg();
});

// Attach scroll listener
window.addEventListener("scroll", onScroll, { passive: true });

// Handle resize (recalculate positions)
window.addEventListener(
  "resize",
  () => {
    revealOnScroll();
    if (window.innerWidth > 768) {
      closeMenu();
    }
  },
  { passive: true },
);
