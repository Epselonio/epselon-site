// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('nav--scrolled', scrollY > 20);
  lastScroll = scrollY;
}, { passive: true });

// ===== ACTIVE NAV SECTION INDICATOR =====
const navLinks = document.querySelectorAll('.nav__links a[data-section]');
const sections = [];

navLinks.forEach(link => {
  const sectionId = link.getAttribute('data-section');
  const section = document.getElementById(sectionId);
  if (section) sections.push({ el: section, link: link });
});

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let activeLink = null;

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollY >= sections[i].el.offsetTop) {
      activeLink = sections[i].link;
      break;
    }
  }

  navLinks.forEach(link => link.classList.remove('nav__link--active'));
  if (activeLink) activeLink.classList.add('nav__link--active');
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('nav__mobile--open');
  const isOpen = navMobile.classList.contains('nav__mobile--open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('nav__mobile--open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== HERO ENTRANCE CHOREOGRAPHY =====
// Staggered reveal: badge → title → subtitle → CTA/note → dashboard
const heroElements = document.querySelectorAll('.anim-hero');
const heroDelays = [200, 400, 700, 950, 600];

requestAnimationFrame(() => {
  heroElements.forEach(el => {
    const delayIndex = parseInt(el.dataset.delay) || 0;
    const delay = heroDelays[delayIndex] || 200;
    setTimeout(() => {
      el.classList.add('anim-hero--visible');
    }, delay);
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isOpen = item.classList.contains('faq__item--open');

    document.querySelectorAll('.faq__item--open').forEach(openItem => {
      openItem.classList.remove('faq__item--open');
      openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('faq__item--open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== SCROLL ANIMATIONS WITH STAGGER =====
const fadeGroups = [
  { selector: '.problem__card', stagger: 140 },
  { selector: '.how__step', stagger: 160 },
  { selector: '.diagnostic__item', stagger: 90 },
  { selector: '.testimonials__card', stagger: 200 },
  { selector: '.faq__item', stagger: 70 },
];

fadeGroups.forEach(group => {
  const elements = document.querySelectorAll(group.selector);
  elements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${index * group.stagger}ms`;
  });
});

document.querySelectorAll('.section-header, .diagnostic__cta-card, .webinar__inner, .footer-cta .container').forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR CTA BUTTONS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CTA BUTTON GLOW FOLLOW =====
document.querySelectorAll('.btn--primary.btn--lg').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.background = `radial-gradient(circle 80px at ${x}px ${y}px, rgba(255,255,255,0.15), transparent), #060E1A`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.background = '';
  });
});
