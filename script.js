// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Typed effect
const phrases = [
  'Full-Stack Developer',
  'AI/ML Enthusiast',
  'Enterprise App Builder',
  'Workflow Automation Dev',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
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
  '.skill-card, .project-card, .cert-card, .lead-item, .exp-card, .about-grid, .contact-grid, .edu-item'
);
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
fadeEls.forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// Contact form submit
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sent! ✓';
  btn.style.background = 'var(--accent2)';
  btn.style.borderColor = 'var(--accent2)';
  btn.style.color = '#000';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.cssText = '';
    e.target.reset();
  }, 3000);
});

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
