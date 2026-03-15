/* =====================================================
   FoxFire Security — script.js
   ===================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------
     1. NAV — scroll glass effect
  ------------------------------------------------------- */
  const nav = document.getElementById('nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run on load


  /* -------------------------------------------------------
     2. NAV — mobile hamburger
  ------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const navMobile  = document.getElementById('navMobile');

  function openMenu() {
    navMobile.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    navMobile.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMobile.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navMobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on any link click inside mobile menu
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* -------------------------------------------------------
     3. SCROLL FADE-INS via IntersectionObserver
  ------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show all elements immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }


  /* -------------------------------------------------------
     4. ACTIVE NAV LINK highlight on scroll
  ------------------------------------------------------- */
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a');

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }


  /* -------------------------------------------------------
     5. SMOOTH SCROLL — offset for fixed nav height
  ------------------------------------------------------- */
  const NAV_HEIGHT = 72;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
