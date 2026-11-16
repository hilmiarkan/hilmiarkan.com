# hilmiarkan.com (rebuild)

Astro + React rebuild of the site. The published export in the repository root
stays live until this version replaces it.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321, reloads on save
npm run build    # static output in dist/
```

## Add or edit content

**A note.** Create `src/content/notes/<name>.md`. The file name becomes the
URL (`/notes/<name>`). Line breaks are kept exactly as typed.

```md
---
title: "Title shown in the list"
date: 2026-11-16
---

First line of the note.
Second line.
```

**The resume.** Edit `src/data/resume.yaml`. Add a job by copying an existing
block under `experience`.

**A work.** Create a folder `src/content/works/<name>/` with an `index.md` and
its images beside it. Copy the top block (`title`, `year`, `summary`,
`headline`, `role`, `tools`, `cover`, `order`) from an existing work.
In the text, `## Heading` starts a section and `![description](./01.webp)`
places an image. Two images on consecutive lines sit side by side; three or
more become a strip that scrolls sideways.

A missing or misspelled field stops the build with a message naming the file.

## Where things live

| Path | What it is |
| --- | --- |
| `src/content/notes/` | Notes, one Markdown file each. |
| `src/content/works/` | Works, one folder each (text + images). |
| `src/data/resume.yaml` | All resume text. |
| `src/content.config.ts` | The fields each kind of content must have. |
| `src/styles/tokens.css` | Every color, shadow and size. Change the look here. |
| `src/styles/prose.css` | Typography for Markdown text. |
| `src/layouts/Base.astro` | Page shell: `<head>`, navigation, theme bootstrap. |
| `src/layouts/SplitLayout.astro` | Picker + content (works and notes). |
| `src/components/` | Navigation, pickers, theme toggle, resume row, home cards. |
| `src/data/nav.ts`, `src/data/icons.ts` | Navigation links and icons. |
| `src/pages/` | One file per URL. |

`.astro` files render to plain HTML at build time and ship no JavaScript.
React components (`.tsx`) arrive with the interactive parts (draggable home
cards, photo gallery) and load only on the pages that use them.
