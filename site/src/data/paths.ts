// The address of a page as visitors see it: "/resume", never "/resume.html"
// or "/resume/". The build writes resume.html, so Astro reports that name.
export function cleanPath(pathname: string): string {
  const path = pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '')
    .replace(/\/$/, '');
  return path || '/';
}
