(() => {
  const root = document.documentElement;
  const selector = '[data-portfolio-name="Theme"]';
  // The original mobile navigation has no theme slot. Keep this control outside
  // the React rendering tree so hydration and client-side routing can own that tree.
  const mobileControl = document.createElement('button');
  mobileControl.id = 'portfolio-mobile-theme';
  mobileControl.type = 'button';
  mobileControl.dataset.portfolioName = 'Theme';
  document.body.appendChild(mobileControl);

  function decorate() {
    const dark = root.dataset.theme === 'dark';
    mobileControl.hidden = !document.querySelector('#main nav');
    for (const control of document.querySelectorAll(selector)) {
      const label = `Switch to ${dark ? 'light' : 'dark'} mode`;
      control.setAttribute('role', 'button');
      control.setAttribute('tabindex', '0');
      control.setAttribute('aria-label', label);
      control.setAttribute('aria-pressed', String(dark));
      control.setAttribute('title', label);
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#222222' : '#ffffff');
  }

  let currentTransition;
  function setTheme(theme, persist = true, animate = true) {
    if (theme !== 'light' && theme !== 'dark') return;
    const apply = () => {
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
      if (persist) {
        try { localStorage.setItem('hilmi-theme', theme); } catch {}
      }
      decorate();
    };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduced || root.dataset.theme === theme) { apply(); return; }
    currentTransition?.skipTransition?.();
    if (document.startViewTransition) {
      const transition = document.startViewTransition(apply);
      currentTransition = transition;
      transition.finished.catch(() => {}).finally(() => { if (currentTransition === transition) currentTransition = null; });
    } else {
      root.classList.add('theme-fading');
      apply();
      setTimeout(() => root.classList.remove('theme-fading'), 320);
    }
  }

  function handleToggle(event) {
    const control = event.target instanceof Element ? event.target.closest(selector) : null;
    if (!control) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    if (event.type === 'keydown' && event.repeat) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  document.addEventListener('click', handleToggle, true);
  document.addEventListener('keydown', handleToggle, true);
  addEventListener('storage', event => {
    if (event.key === 'hilmi-theme' && event.newValue) setTheme(event.newValue, false);
  });
  // Client-side routing replaces navigation nodes during client-side routing.
  new MutationObserver(decorate).observe(document.body, { childList: true, subtree: true });
  decorate();
})();
