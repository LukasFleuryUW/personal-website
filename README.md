# Lukas Fleury — Portfolio

Personal site built with Next.js 14, TypeScript, and Tailwind. Dark aurora aesthetic, five routes plus a Let's Connect footer.

## Run it locally

You'll need Node.js 18.17+ (I'd install the LTS from https://nodejs.org if you don't have it yet).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Live reload is on — save a file and the browser updates.

## Deploy it (free, ~5 minutes)

1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, and import the repo.
3. Accept the defaults. Vercel detects Next.js automatically.
4. Once it's live, add your domain in Vercel's project settings (or use the free `*.vercel.app` URL).

## What to swap in

- **LinkedIn URL** — `components/Footer.tsx`, look for `linkedin.com/in/lukas-fleury/` and replace with your real profile URL.
- **Photos** — drop any images into a new `public/` folder and reference them like `<img src="/watflight-airframe.jpg" />` in the relevant page.
- **New role or project** — each page has a data array at the top (e.g. `roles` in `app/work/page.tsx`, `projects` in `app/projects/page.tsx`). Copy an existing entry and edit it.

## Structure

```
app/
  layout.tsx           shared shell — nav, aurora bg, footer
  globals.css          Tailwind + grain overlay
  page.tsx             /            Home / hero
  about/page.tsx       /about       About Me
  work/page.tsx        /work        Mammoet + Welmar
  projects/page.tsx    /projects    Exhaust, OYAP, SkillsOntario
  design-team/page.tsx /design-team WATFlight
components/
  Nav.tsx              top nav with active-state pill
  Footer.tsx           Let's Connect (email, phone, LinkedIn)
  Aurora.tsx           animated gradient background
  PageHeader.tsx       reusable section/eyebrow/title/description
  ExperienceCard.tsx   role & project card
```

## Notes

- The aurora background is pure CSS (three blurred radial gradients drifting on keyframes) so it's cheap on battery and works on mobile.
- Fonts are system defaults for now. If you want Inter + JetBrains Mono, add `next/font/google` in `layout.tsx`.
