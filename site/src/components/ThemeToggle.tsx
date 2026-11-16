import { useEffect, useState } from 'react';
import './ThemeToggle.css';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'hilmi-theme';

// The <html data-theme> attribute is set by a tiny inline script in Base.astro
// before the page paints, so this component only has to read and change it.
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#222222' : '#ffffff');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode: the choice simply is not remembered.
  }
}

export default function ThemeToggle() {
  // State: which theme is active. The server cannot know, so start with
  // "light" and correct it once the component is running in the browser.
  const [theme, setTheme] = useState<Theme>('light');

  // Effect: runs once after the first render, in the browser only.
  useEffect(() => {
    setTheme(currentTheme());

    // Another open tab changed the theme: follow it.
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        document.documentElement.dataset.theme = event.newValue;
        setTheme(event.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const change = () => {
      applyTheme(next);
      setTheme(next);
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Crossfade the two palettes where the browser supports it.
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(change);
    else change();
  }

  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="theme-toggle-moon" d="M20.9 13.3A9 9 0 0 1 10.7 3.1 9 9 0 1 0 20.9 13.3Z" />
        <g className="theme-toggle-sun">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </g>
      </svg>
    </button>
  );
}
