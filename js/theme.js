// Dark mode switch.
// The theme is set on <html data-bs-theme="..."> by a small script in the <head>
// (so the page never flashes the wrong theme). A choice made with the switch is
// saved in the browser and remembered on later visits.
(() => {
  const root = document.documentElement;
  const toggles = document.querySelectorAll('.theme-toggle');

  const isDark = () => root.getAttribute('data-bs-theme') === 'dark';
  const sync = () => toggles.forEach((t) => t.setAttribute('aria-checked', String(isDark())));

  const switchTheme = () => {
    const chosen = isDark() ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', chosen);
    sync();
    try { localStorage.setItem('theme', chosen); } catch (e) { /* storage blocked: applies to this visit only */ }
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      // Cross-fade the whole page to the new theme as one image (see .theme-fade
      // in styles.css), so backgrounds, text, borders and the logo change together.
      // Browsers without View Transitions switch everything at once instead.
      root.classList.add('theme-fade');
      if (!document.startViewTransition || reducedMotion.matches) {
        switchTheme();
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-fade')));
        return;
      }
      const transition = document.startViewTransition(switchTheme);
      // A skipped fade (e.g. the tab is hidden) still applies the theme; ignore the rejection
      transition.ready.catch(() => {});
      transition.finished.catch(() => {}).finally(() => root.classList.remove('theme-fade'));
    });
  });

  sync();
})();
