(function () {
  'use strict';

  // ----- Theme -----
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const themeKey = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(themeKey);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme === 'dark' ? '' : 'light');
    localStorage.setItem(themeKey, theme);
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = !html.hasAttribute('data-theme') || html.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  // ----- Header scroll -----
  const header = document.querySelector('.header');
  function onScroll() {
    if (window.scrollY > 50) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('.reveal');
  const revealOpts = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, revealOpts);
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ----- Cursor glow (desktop only) -----
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-cursor-glow');
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ----- Mobile nav -----
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const overlayLinks = document.querySelectorAll('.nav-overlay-links a');

  function openNav() {
    nav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', function () {
    if (nav?.classList.contains('open')) closeNav();
    else openNav();
  });
  overlayLinks.forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Work cards: subtle magnetic hover (optional) -----
  document.querySelectorAll('.work-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--mx', x * 8 + 'px');
      card.style.setProperty('--my', y * 8 + 'px');
    });
    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--mx', '0');
      card.style.setProperty('--my', '0');
    });
  });
})();
