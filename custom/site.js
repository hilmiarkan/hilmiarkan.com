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
