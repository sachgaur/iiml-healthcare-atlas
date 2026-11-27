# Care Atlas — IIM Lucknow Learning Portal

<!-- Badges intentionally omitted; this is a course resource, not a library. -->

An interactive portal for the IIM Lucknow course **Digital Transformation and Innovation in Healthcare**. It helps students follow the Indian healthcare journey across five stages, inspect Indian service-design cases, consider data/AI and patient-data protections, try decision quizzes, and contribute problems or case suggestions during class.

## What it contains

- **Care map** — an interactive overview of *Reach care*, *Assess & refer*, *Investigate*, *Agree & treat*, and *Recover & review*.
- **Opening cases** — Indian examples such as Aravind Eye Care and Narayana Health, with prompts for workflow changes, measures, and discussion.
- **Asha’s comic** — an illustrated fictional journey connecting everyday clinics, diagnostics, hospitals, claims, and home care.
- **Data & AI** — classroom material on using health data, AI limitations, ABDM-style record sharing, and cybersecurity/patient-data protection.
- **Innovation studio** — structured prompts for framing and testing improvement ideas in a participant’s own organisation.
- **Quizzes** — short decision-making exercises with client-side progress and scores.
- **Needs board / case suggestions** — class submissions and one-per-user voting when backed by Cloudflare D1 and ChatGPT Sites sign-in.

## Technology

- React 19, Next 16, TypeScript 5, and Tailwind CSS 4
- Vite/Vinext with a Cloudflare Worker production entrypoint
- Drizzle ORM and Cloudflare D1 (SQLite-compatible) for the class board
- No production secrets are stored in the repository; local environment files are ignored

## Getting started

Requires **Node.js 22.13.0 or newer**.

```bash
npm ci
npm run dev
```

Open the URL printed by the development server (port `5173` by default).

### Build and preview

```bash
npm run build
npm run start
```

`npm run start` runs the built worker locally with Wrangler. It is useful for exercising the D1-backed code paths after applying migrations.

### Lint

```bash
npm run lint
```

## Cloudflare D1 setup

The board uses two tables: `needs` and `votes`. The Drizzle migration files are under [`drizzle/`](./drizzle). A build generates the worker configuration needed for local D1 execution.

```bash
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB \
  --local --config dist/server/wrangler.json --persist-to .wrangler/state \
  --file drizzle/0000_familiar_nighthawk.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB \
  --local --config dist/server/wrangler.json --persist-to .wrangler/state \
  --file drizzle/0001_chilly_nightcrawler.sql
```

The app expects a D1 binding named `DB`, as declared in [`.openai/hosting.json`](./.openai/hosting.json) and consumed by [`db/index.ts`](./db/index.ts).

## Limitations outside ChatGPT Sites

Although the portal was originally prepared for ChatGPT Sites, most content runs as ordinary React/Next content:

- Public educational views — care map, comic, data/AI, innovation, and quizzes — are available without platform-specific authentication.
- Sign-in and voting are **not expected to work on an arbitrary GitHub Pages/static host or bare Cloudflare deployment** because ChatGPT Sites authentication depends on platform identity headers and routing.
- To exercise voting locally, apply migrations, run a Cloudflare worker preview with the `DB` binding, and enable/retain the appropriate local sign-in route.
- The production `/api/board` route returns `503` when the D1 binding is absent; authenticated board mutations return `401` when the platform-injected user identity is unavailable.
- If migrating away from ChatGPT Sites, replace `getChatGPTUser()` in [`app/chatgpt-auth.ts`](./app/chatgpt-auth.ts) and `getChatGPTUser()` in [`app/api/board/route.ts`](./app/api/board/route.ts) with another durable identity provider, and adjust production routing accordingly.

## Project layout

```
app/          Application routes, UI views, board API, ChatGPT auth adapter
components/   Shared UI components
lib/          Course data, board model, and service logic
db/           Drizzle ORM client and Cloudflare D1 schema
drizzle/      SQL migrations
public/       Course artwork, map, comic images, and lecture guide
scripts/      Development, build, installation, and Cloudflare environment helpers
worker/       Production worker entrypoint
```

## Course material

The interactive map is also downloadable as an SVG, and the lecture guide is linked from the app’s navigation and footer:

- `public/resources/care-system-map.svg`
- `public/resources/lecture-guide.pdf`

## Publishing notes

This repository deliberately excludes generated `dist/`, dependency, environment, runtime-state, and local build output directories. A complete production deployment is a Vinext/Cloudflare worker package and is not equivalent to serving the React sources as static files.
