// Builds /sitemap.xml from the pages that exist, so a new note or work is
// listed without editing anything here.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const works = await getCollection('works');
  const notes = await getCollection('notes');

  const paths = [
    '/',
    '/case-study',
    ...works.sort((a, b) => a.data.order - b.data.order).map((work) => `/case-study/${work.id}`),
    '/design-projects',
    '/resume',
    '/notes',
    ...notes.map((note) => `/notes/${note.id}`),
    '/photos',
  ];

  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href.replace(/\/$/, path === '/' ? '/' : '')}</loc></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
