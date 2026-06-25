/* =============================================
   DISCO CUTS — Main JavaScript
   ============================================= */

(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav ---------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Hero scroll hint ---------- */
  const scrollHint = document.querySelector('.hero-scroll');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const nextSection = document.querySelector('.announcement-band, .about-section, .services-section');
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Form submission (contact/booking) ---------- */
  document.querySelectorAll('form[data-disco-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }
      // Simulate async
      setTimeout(() => {
        const successMsg = form.querySelector('.form-success');
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = original;
        }
      }, 1200);
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Stagger animation delay ---------- */
  document.querySelectorAll('.stagger-children > *').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    el.classList.add('reveal');
  });

  /* ---------- Star rating interaction ---------- */
  const starInputs = document.querySelectorAll('.star-rating input');
  starInputs.forEach(input => {
    input.addEventListener('change', () => {
      const labels = document.querySelectorAll('.star-rating label');
      labels.forEach(label => label.style.color = '');
    });
  });

  /* ---------- Current day highlight in hours ---------- */
  const dayMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = dayMap[new Date().getDay()];
  document.querySelectorAll('.hours-row .hours-day').forEach(cell => {
    if (cell.textContent.trim().startsWith(today)) {
      cell.classList.add('hours-today');
      const sibling = cell.nextElementSibling;
      if (sibling) sibling.classList.add('hours-today');
    }
  });

})();
