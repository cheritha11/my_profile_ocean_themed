/* ============================================================
   main.js — General init (FIXED)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Smooth scroll for anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── Fade-up: add class to elements, then observe ── */
  const fadeTargets = [
    '.hero__text',
    '.hero__visual',
    '.about__grid',
    '.timeline__item',
    '.skills__grid',
    '.skill-card',
    '.projects__grid',
    '.project-card',
    '.resume__block',
    '.contact__heading',
    '.contact__sub',
    '.contact__links',
    '.section__label',
    '.section__heading',
  ];

  fadeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-up');
    });
  });

  /* ── IntersectionObserver for fade-up ── */
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

  /* ── Dot nav scroll-spy ── */
  const dots     = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('section[id]');

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const active = document.querySelector(`.dot[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObs.observe(s));

  /* ── Dot nav click ── */
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
