# Jurista Frontend (React + Vite)

The official Jurista frontend: a React 18 + Vite SPA replacing the legacy static
HTML site (preserved in `frontend-old/`).

## Pages

| Route | Page | Notes |
|---|---|---|
| `/` | Homepage | Hero + animated live demo, stats, how-it-works, feature cards, testimonials, CTA |
| `/features` | Feature deck | Full-screen scroll-snap slides with dot navigation + keyboard arrows |
| `/about` | About | Editorial layout: problem → solution → tech → roadmap → team |
| `/contact` | Contact | Validated form (UI only, not yet wired to a backend) + FAQ |
| `/chat` | Legal workspace | Harvey-AI-style chat: threads, quick actions, doc attach, web-search toggle |

The chat page renders full-screen without the shared navbar/footer, by design.

## Development

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000, proxies /api + /health to localhost:5000
```

Point the dev proxy at a remote backend if needed:

```bash
# PowerShell
$env:JURISTA_BACKEND_URL = "https://nyayaai-backend-qwwx.onrender.com"; npm run dev
```

## Build & deploy

```bash
npm run build      # outputs to frontend/dist
npm run preview    # serve the production build locally
```

Firebase Hosting (see `../firebase.json`) serves `frontend/dist` and rewrites
all paths to `index.html` for SPA routing — no changes needed on deploy.

## Architecture

```
src/
├── lib/          constants (API base, quick actions), api client, utils
├── hooks/        useTheme, useThreads, useChat, useConnection, useChatApp, useScrollReveal
├── contexts/     ThemeContext, ChatContext (single source of truth for chat state)
├── components/
│   ├── layout/   Navbar, Footer, PageLayout, ChatLayout
│   ├── ui/       Button, Card/GlassCard, Badge, AnimatedCounter, ScrollReveal
│   ├── home/     HeroSection, LiveDemo, StatsTicker, HowItWorks, FeatureCards, …
│   ├── features/ SlideDeck, SlideNavigation, slide templates + demos
│   ├── about/    hero / problem / solution / stack / roadmap / team
│   ├── contact/  ContactForm (validation + success state), ContactInfo, FAQ
│   └── chat/     sidebar, thread items, bubbles (markdown), input, welcome, …
└── pages/        HomePage, FeaturesPage, AboutPage, ContactPage, ChatPage
```

### Backend contract (unchanged)

- `GET /health` → connection probe (footer status dot)
- `POST /api/chat/intelligent` — default assistant routing
- `POST /api/chat/force-search` — the "Web Search" toggle
- `POST /api/chat` — used when a document is attached (text passed as `context`)
- `POST /api/chat/upload` — multipart file upload → `{ filename, text }`
- `POST /api/chat/memory` — `action: "clear"` on thread delete

Threads persist in `localStorage` (`jurista_threads` + `jurista_active_thread`),
compatible with the legacy schema (pre-rebrand `nyaya_*` keys are migrated).

## Decisions (as agreed)

- React + Vite migration ✔
- Framer Motion animations ✔
- Chat: Harvey-style command center, no fake analytics ✔
- Contact form: UI only for now (POST target intentionally stubbed) ✔
- Content kept as-is; replace placeholder testimonials/links when ready ✔
