# HIWI

**Wired to build what's next.**

The website for HIWI, a digital studio helping businesses build a strong online
presence and create the digital foundations they need to grow.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `src/app/page.tsx` — the single-page home: hero, philosophy, work, services,
  pillars, process, about, start-a-project, sign-off, footer
- `src/app/work/[slug]/page.tsx` — case-study pages
- `src/data/projects.ts` — client work data (the only place case-study content lives)
- `src/components/HeroVisual.tsx` — the faint canvas "wired" grid behind the hero orbital
- `src/components/HeroOrbital.tsx` — the five section nodes; this **is** the page nav,
  there is no separate menu, so keep the nodes focusable if you edit it
- `src/components/ui/radial-orbital-timeline.tsx` — the generic orbital it renders
- `src/components/Monogram.tsx` — the HIWI mark (also `public/assets/icon.svg`)

## Brand

| Token      | Value     | Use |
|------------|-----------|-----|
| Obsidian   | `#090909` | hero, footer, text |
| Off-white  | `#F5F5F0` | page background |
| Electric Lime | `#C7FF3D` | CTAs, hovers, indicators only |

Type: **Space Grotesk** (display) + **Inter** (body), both via `next/font/google`.

Two rules the copy follows and should keep following:

1. **No fabricated claims.** No invented metrics, testimonials, traffic, or
   revenue numbers. Facts about client work come from the clients' own sites.
2. **No buzzwords.** Direct language — "we build websites that help businesses
   look credible online", not "cutting-edge solutions".

## Before launch

Search the repo for `TODO(Harsh)`:

- `src/components/Footer.tsx` — real Instagram and LinkedIn URLs
- `public/robots.txt` and `public/sitemap.xml` — replace `hiwi.example.com`
  with the real domain

## Contact form

`StartProjectSection` posts to `/api/contact`, which appends the topic and email
to a Google Sheet. It needs these environment variables — until they are set the
form shows an error instead of sending:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
SHEET_ID=
SHEET_NAME=Sheet1
```
