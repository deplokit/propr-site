/* ============================================
   PROPR — Main JS
   Subscrr-inspired scroll reveal system
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky header shadow ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // --- Mobile menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal (Subscrr-style staggered reveals) ---
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  const revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length && 'IntersectionObserver' in window) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => obs.observe(el));
    }
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- Contact form (client-side placeholder) ---
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const origText = btn.textContent;
      btn.textContent = 'Sent — Thank You!';
      btn.style.background = '#4a7a3a';
      btn.style.borderColor = '#4a7a3a';
      btn.style.color = '#fff';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = origText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    });
  });

  // --- Contact form toggle (mobile) ---
  document.querySelectorAll('.form-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      // Toggle buttons
      document.querySelectorAll('.form-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Toggle panels
      document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('form-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // --- Video play handler ---
  document.querySelectorAll('.video-embed').forEach(embed => {
    embed.addEventListener('click', () => {
      alert('Full video coming soon. Replace this handler with your YouTube/Vimeo embed.');
    });
  });
});
