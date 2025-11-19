const select = (selector) => document.querySelector(selector);

const handleTheme = () => {
  const toggle = select('#themeToggle');
  const root = document.documentElement;
  const body = document.body;
  const STORAGE_KEY = 'solora-theme';

  const applyTheme = (mode) => {
    if (mode === 'dark') {
      root.classList.add('dark');
      body.dataset.theme = 'dark';
    } else {
      root.classList.remove('dark');
      body.dataset.theme = 'light';
    }
    localStorage.setItem(STORAGE_KEY, mode);
  };

  const initTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  };

  toggle?.addEventListener('click', () => {
    const current = body.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  initTheme();
};

const intersectionAnimations = () => {
  const animated = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  });
  animated.forEach((node) => observer.observe(node));
};

const enhanceCards = () => {
  const targets = document.querySelectorAll('.service-card, .price-card, .add-on-item, .contact-form label');
  targets.forEach((node) => node.classList.add('fade-up'));
};

const smoothAnchors = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

const contactFormLogic = () => {
  const form = select('#contactForm');
  const message = select('#formMessage');
  if (!form || !message) return;
  const button = form.querySelector('button[type="submit"]');

  const setStatus = (text, type = 'success') => {
    message.textContent = text;
    message.classList.remove('sr-only');
    message.classList.toggle('text-red-500', type === 'error');
    message.classList.toggle('text-green-600', type === 'success');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    fields.forEach((field) => {
      if (!field.value.trim()) {
        field.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        field.removeAttribute('aria-invalid');
      }
    });

    if (!valid) {
      setStatus('Please complete all fields before submitting.', 'error');
      return;
    }

    button?.setAttribute('aria-busy', 'true');
    setStatus('Sending your request…', 'success');

    setTimeout(() => {
      button?.removeAttribute('aria-busy');
      setStatus('Thank you. We will reach out shortly with next steps.');
      form.reset();
    }, 1200);
  });
};

const initYear = () => {
  const year = new Date().getFullYear();
  const yearSlot = select('#year');
  if (yearSlot) yearSlot.textContent = year;
};

const mobileNav = () => {
  const toggle = select('#mobileNavToggle');
  const menu = select('#mobileNav');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
};

const init = () => {
  handleTheme();
  enhanceCards();
  intersectionAnimations();
  smoothAnchors();
  contactFormLogic();
  initYear();
  mobileNav();
  videoHoverLogic();
};

const videoHoverLogic = () => {
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    const video = card.querySelector('.hover-video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(e => console.log('Video play failed:', e));
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
};

document.addEventListener('DOMContentLoaded', init);
