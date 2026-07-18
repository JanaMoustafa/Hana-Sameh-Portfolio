/* ===================================================================
   HANA PORTFOLIO – script.js
   =================================================================== */

/* ── Navbar scroll effect ─────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

/* ── Mobile hamburger ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Active nav link on scroll ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}
updateActiveNav();

/* ── Scroll reveal ───────────────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Typewriter effect for hero subtitle ────────────────────── */
const typeTargets = [
  'Data Analyst',
  'Web Developer',
  'Database Designer',
  'BI Enthusiast',
  'Problem Solver'
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const current = typeTargets[typeIdx];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { isDeleting = false; typeIdx = (typeIdx + 1) % typeTargets.length; charIdx = 0; setTimeout(type, 500); return; }
  } else {
    typeEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { isDeleting = true; setTimeout(type, 1400); return; }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}
setTimeout(type, 800);

/* ── Animated counter ────────────────────────────────────────── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start) + (el.dataset.suffix || '');
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target), 1200);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

/* ── Project card expand/collapse ────────────────────────────── */
document.querySelectorAll('.project-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const bullets = card.querySelector('.project-bullets');
    const isOpen = bullets.classList.contains('expanded');
    bullets.classList.toggle('expanded', !isOpen);
    btn.textContent = isOpen ? 'See more ↓' : 'See less ↑';
  });
});

/* ── Smooth cursor glow (desktop only) ───────────────────────── */
if (window.matchMedia('(pointer:fine)').matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%);
    pointer-events:none;z-index:0;transform:translate(-50%,-50%);
    transition:opacity 0.3s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ── Year in footer ──────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

