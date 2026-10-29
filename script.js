// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Typed effect
const phrases = [
  'AI/ML Engineer',
  'LLM Integration Specialist',
  'Enterprise App Builder',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}
type();

// Intersection Observer for fade-in
const fadeEls = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .lead-item, .exp-card, .about-grid, .contact-grid, .edu-item, .edu-h'
);
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
fadeEls.forEach(el => { el.classList.add('fade-in'); observer.observe(el); });


// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// ===== Scroll polish =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress bar
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

// Back-to-top button
const toTop = document.createElement('button');
toTop.className = 'to-top';
toTop.setAttribute('aria-label', 'Back to top');
toTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.body.appendChild(toTop);

const orbs = document.querySelectorAll('.orb');
function onScrollFx() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  toTop.classList.toggle('show', window.scrollY > 600);
  if (!reduceMotion && window.scrollY < window.innerHeight * 1.2) {
    orbs.forEach((o, i) => { o.style.translate = `0 ${window.scrollY * (0.12 + i * 0.07)}px`; });
  }
}
window.addEventListener('scroll', onScrollFx, { passive: true });
onScrollFx();

// Staggered reveal for grid children, plus section titles and extras
document.querySelectorAll(
  '.projects-grid, .skills-grid, .cert-grid, .leadership-grid, .edu-h-items, .exp-timeline, .about-stats'
).forEach(group => {
  [...group.children].forEach((child, i) => { child.style.transitionDelay = `${Math.min(i, 5) * 90}ms`; });
});
const revealEls = document.querySelectorAll('.section-title, .about-photo-col, .edu-h-item, .stat, .contact-info');
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } }),
  { threshold: 0.15 }
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (el.classList.contains('edu-h-item')) el.style.transitionDelay = `${(i % 3) * 150}ms`;
  revealObs.observe(el);
});

// Count-up for About stats
function countUp(el) {
  const raw = el.textContent.trim();
  const m = raw.match(/^([\d.]+)(\D*)$/);
  if (!m || reduceMotion) return;
  const target = parseFloat(m[1]);
  const decimals = (m[1].split('.')[1] || '').length;
  const suffix = m[2];
  const start = performance.now();
  const dur = 1200;
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + (t === 1 ? suffix : '');
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}
const statObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); statObs.unobserve(e.target); } }),
  { threshold: 0.6 }
);
document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));
