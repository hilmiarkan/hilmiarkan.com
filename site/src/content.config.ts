// Content collections: where the site's writing and data live, and the shape
// each entry must have. A typo in a field name fails the build with a clear
// message instead of silently showing a broken page.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per work: src/content/works/<slug>/index.md plus its images.
const works = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/works', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),            // name in the project picker
      year: z.number(),
      summary: z.string(),          // one line under the name in the picker
      headline: z.string(),         // large sentence that opens the page
      role: z.string(),             // "What I do"
      tools: z.string(),            // "Tech used"
      cover: image(),
      order: z.number(),            // position in the picker, lowest first
    }),
});

// One file per note: src/content/notes/<slug>.md
const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const link = z.object({
  period: z.string(),
  duration: z.string().optional(),
  title: z.string(),
  url: z.string().url().optional(),
  meta: z.string().optional(),
  details: z.array(z.string()).default([]),
});

// A single file: src/data/resume.yaml
const resume = defineCollection({
  loader: glob({ pattern: 'resume.yaml', base: './src/data' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    about: z.string(),
    experience: z.array(link),
    education: z.array(link),
    contact: z.array(z.object({ label: z.string(), value: z.string(), url: z.string().url() })),
  }),
});

// A single list: src/content/side-projects/projects.yaml plus its images.
const sideProjects = defineCollection({
  loader: file('src/content/side-projects/projects.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      column: z.number().min(1).max(4),
      order: z.number(),
      thumb: image().optional(),    // image on the card
      full: image().optional(),     // long image for the overlay; optional
      video: z.string().optional(), // looping video instead of thumb
    }),
});

export const collections = { works, notes, resume, sideProjects };
