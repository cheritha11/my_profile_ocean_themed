/* ============================================================
   theme.js — Theme toggle with localStorage persistence
   ============================================================ */

(function () {
  const root   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const PREF   = 'ocean-portfolio-theme';

  /* Load saved or default to onshore */
  const saved = localStorage.getItem(PREF) || 'onshore';
  root.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'onshore' ? 'deepsea' : 'onshore';
    root.setAttribute('data-theme', next);
    localStorage.setItem(PREF, next);
  });
})();
