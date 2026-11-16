(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let animated = new WeakSet();
  let lastPath = '';
  let scheduled = false;
  function update() {
    scheduled = false;
    const path = location.pathname.replace(/\/$/, '') || '/';
    if (path !== lastPath) { animated = new WeakSet(); lastPath = path; }
    if (path !== '/case-study' && !path.startsWith('/case-study/')) return;
    const page = document.querySelector('#main [data-portfolio-root]');
    if (!page) return;
    // Only animate the main work panel, never the sidebar or project picker.
    const content = [...page.children].find(el => el.dataset.portfolioName === 'Frame 13');
    if (!content || !content.children.length || animated.has(content)) return;
    animated.add(content);
    if (!reduce.matches) content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 360, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'none' });
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  new MutationObserver(schedule).observe(document.querySelector('#main') || document.body, { childList: true, subtree: true });
  addEventListener('popstate', schedule);
  addEventListener('resize', schedule);
  update();
})();
(() => {
  // The navigation icons carry no text: name each link and mark the current page.
  const names = { 'read.cv': 'Resume' };
  const clean = path => path.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  function label() {
    const here = clean(location.pathname);
    for (const link of document.querySelectorAll('#main nav a[href]')) {
      const name = link.querySelector('[data-portfolio-name]')?.dataset.portfolioName;
      if (name && !link.hasAttribute('aria-label')) link.setAttribute('aria-label', names[name] || name);
      const target = clean(new URL(link.href).pathname);
      const current = target === '/' ? here === '/' : here === target || here.startsWith(target + '/');
      if (current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  }
  let queued = false;
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; label(); }); } };
  new MutationObserver(schedule).observe(document.querySelector('#main') || document.body, { childList: true, subtree: true });
  addEventListener('popstate', schedule);
  label();
})();
(() => {
  // Some works were published without a small-screen layout and pin the
  // viewport to 1200px. mobile.css supplies that layout, so keep the real width.
  const isWork = () => location.pathname.startsWith('/case-study/');
  function enforce() {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta && isWork() && meta.content !== 'width=device-width') meta.content = 'width=device-width';
  }
  new MutationObserver(enforce).observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ['content'] });
  enforce();

  // Bring the current project into view in the horizontal picker.
  const small = matchMedia('(max-width: 1199.98px)');
  let shown = '';
  function reveal() {
    if (!small.matches || shown === location.pathname) return;
    const active = document.querySelector('#main .portfolio-EqMmV a[data-portfolio-name="Active"]');
    const picker = active?.closest('.portfolio-EqMmV');
    if (!picker || picker.scrollWidth <= picker.clientWidth) return;
    shown = location.pathname;
    const a = active.getBoundingClientRect(), p = picker.getBoundingClientRect();
    picker.scrollLeft += a.left - p.left - (p.width - a.width) / 2;
  }
  let queued = false;
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; reveal(); }); } };
  new MutationObserver(schedule).observe(document.querySelector('#main') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-portfolio-name'] });
  addEventListener('popstate', schedule);
  reveal();
})();
