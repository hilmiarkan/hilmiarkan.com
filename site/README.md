# hilmiarkan.com (rebuild)

Astro + React rebuild of the site. The published export in the repository root
stays live until this version replaces it.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321, reloads on save
npm run build    # static output in dist/
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/styles/tokens.css` | Every color, shadow and size. Change the look here. |
| `src/layouts/Base.astro` | Page shell: `<head>`, navigation, theme bootstrap. |
| `src/components/Nav.astro` | Sidebar on desktop, bottom bar on small screens. |
| `src/components/ThemeToggle.tsx` | React component: light/dark switch. |
| `src/components/ProfileCard.astro` | Avatar and name card on the home page. |
| `src/data/nav.ts` | Navigation links and their order. |
| `src/data/icons.ts` | Navigation icons. |
| `src/pages/` | One file per URL. |

`.astro` files render to plain HTML at build time and ship no JavaScript.
`.tsx` files are React components; they run in the browser only where a page
asks for them with a `client:*` directive.
