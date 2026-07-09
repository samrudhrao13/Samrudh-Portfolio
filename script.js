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
  'AI Engineer',
  'Full-Stack Developer',
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
  '.skill-card, .project-card, .cert-card, .lead-item, .exp-card, .about-grid, .contact-grid, .edu-item'
);
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
fadeEls.forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// Formspree async contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  status.textContent = '';

  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.style.color = 'var(--accent2)';
      form.reset();
    } else {
      status.textContent = '✗ Something went wrong. Please email me directly.';
      status.style.color = '#ff5f56';
    }
  } catch {
    status.textContent = '✗ Network error. Please try again.';
    status.style.color = '#ff5f56';
  }
  submitBtn.disabled = false;
  submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
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
