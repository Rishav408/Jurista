# Jurista

**AI-powered legal research assistant for Indian law.**

Ask legal questions in plain language, analyze documents against legal context, search current case law and statutes, and get structured answers grounded in Indian constitutional and criminal law — powered by Google Gemini and LangChain.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white&labelColor=20232a)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&logoColor=white&labelColor=20232a)
![Flask](https://img.shields.io/badge/Flask-3-000000?logo=flask&logoColor=white&labelColor=20232a)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white&labelColor=20232a)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white&labelColor=20232a)

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Configuration](#configuration)
- [API reference](#api-reference)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Legal disclaimer](#legal-disclaimer)
- [License](#license)

## Features

| | |
|---|---|
| 💬 **Conversational legal chat** | Multi-turn conversations with per-session memory, rendered as markdown, with typing indicators and streaming-style UX |
| 🗂 **Thread management** | Create, rename, delete, and switch between conversations — persisted client-side |
| 📄 **Document analysis** | Upload `.pdf`, `.txt`, and `.docx` files (up to 10 MB) and ask questions grounded in the document's text |
| 🔍 **Intelligent search** | A routing layer decides per-message whether web search is needed, then synthesizes DuckDuckGo results into the answer (also force-usable via toggle) |
| ⚡ **Quick actions & suggestions** | Pre-built legal prompt templates — explain a right, analyze a document, search case law, compare IPC → BNS provisions |
| 🌗 **Light / dark theme** | System-aware, persisted across sessions |
| 📱 **Fully responsive** | Harvey-AI-style chat layout with collapsible workspace sidebar and mobile drawer navigation |

## Architecture

Jurista is a two-part application: a React single-page app and a Python REST API.

```text
┌─────────────────────────┐         ┌──────────────────────────────────┐
│  Frontend (React SPA)   │  HTTP   │           Backend (Flask)        │
│                         │ ──API──▶│                                  │
│  Vite + Tailwind        │         │  routes.py        (validation)   │
│  React Router v6        │  /api   │  gemini_chain.py  (LLM + memory) │
│  Framer Motion          │  +health│  intelligent_search.py (router)  │
│  LocalStorage threads   │         │  search_tool.py   (DuckDuckGo)   │
│            │            │         │  document_loader.py (PDF/DOCX)   │
│    localhost :3000 ─────┼─ proxy ─┼─▶ localhost :5000 / Render        │
└─────────────────────────┘         └───────────────┬──────────────────┘
                                                    │
                                        ┌───────────▼───────────┐
                                        │   Google Gemini API   │
                                        │   DuckDuckGo Search   │
                                        └───────────────────────┘
```

**Client → server.** The frontend keeps threads and messages in `localStorage`, and sends each turn to one of three endpoints depending on context: document attached → `/api/chat`, normal → `/api/chat/intelligent`, search forced → `/api/chat/force-search`.

**Development vs production.** In local development the Vite dev server proxies `/api` and `/health` to the Flask backend (single origin, no CORS friction). In production the app resolves the backend from `frontend/src/lib/constants.js`: `http://localhost:5000` on localhost URLs, otherwise the deployed Render service.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6, React Router v6, Tailwind CSS 3, Framer Motion, Lucide Icons, react-markdown |
| Backend | Python 3.11, Flask 3, Flask-Cors, Pydantic (request validation), python-dotenv, gunicorn |
| AI / RAG | Google Gemini 2.5 Flash via `langchain-google-genai`, LangChain chains + conversation memory, DuckDuckGo search synthesis |
| Document parsing | PyPDF2, python-docx, BeautifulSoup/lxml |
| Hosting | Firebase Hosting (frontend), Render (backend) |

## Getting started

### Prerequisites

- **Node.js ≥ 18** (20+ recommended)
- **Python 3.11** (pinned by `backend/.python-version`)
- A **Google Gemini API key** — free at [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### 1. Backend

```powershell
cd backend

# Create and activate a virtual environment (recommended)
python -m venv .venv
.\.venv\Scripts\activate        # Windows (Git Bash: source .venv/Scripts/activate)
# source .venv/bin/activate     # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env          # then edit .env and set GEMINI_API_KEY
```

Minimum required in `backend/.env`:

```dotenv
GEMINI_API_KEY=your_key_here
```

```powershell
python main.py
```

Verify: open <http://127.0.0.1:5000/health> → `{"status":"healthy"}`.

> The backend is an **API server only** — `GET /` returns 404 by design.

### 2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>. The dev server proxies `/api` and `/health` to `http://localhost:5000`; a different backend can be targeted with the `JURISTA_BACKEND_URL` environment variable.

### Optionally run everything with one backend command

```powershell
cd backend
python run.py    # same as main.py, but validates .env and the GEMINI_API_KEY first
```

## Available scripts

### Frontend (`cd frontend`)

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server on port `3000` with API proxy |
| `npm run build` | Production build to `dist/` (with vendor/motion/markdown chunking) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the source |

### Backend (`cd backend`)

| Command | Description |
|---|---|
| `python main.py` | Start the Flask dev server (port from `PORT`, default `5000`) |
| `python run.py` | Start with pre-flight validation of `.env` / `GEMINI_API_KEY` |
| `gunicorn "main:create_app()" --bind 0.0.0.0:$PORT` | Production WSGI (see `Procfile`, `render.yaml`) |

## Configuration

Backend settings live in `backend/config.py` and are loaded from `backend/.env` via `python-dotenv`. Configuration precedence: environment variables → `.env` → defaults below.

| Variable | Default | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | — (**required**) | Google Gemini API credential |
| `GEMINI_MODEL` | `gemini-1.5-flash` | Model ID (`.env.example`/Render use `gemini-2.5-flash`) |
| `GEMINI_TEMPERATURE` | `0.7` | Sampling temperature |
| `GEMINI_MAX_TOKENS` | `8192` | Max tokens per response |
| `SECRET_KEY` | `dev-secret-key-change-in-production` | Flask secret management |
| `DEBUG` | `False` | Flask debug mode |
| `PORT` | `5000` | HTTP port |
| `ALLOWED_ORIGINS` | `*` | Comma-separated CORS allowlist (set to your frontend origin in production) |
| `LANGCHAIN_TRACING_V2` | `false` | LangSmith tracing toggle |
| `LANGCHAIN_API_KEY` | — | LangSmith credential (when tracing is enabled) |
| `LANGCHAIN_PROJECT` | `jurista-backend` | LangSmith project name |
| `SEARCH_MAX_RESULTS` | `5` | Results fetched per search |
| `SEARCH_TIMEOUT` | `30` | Search request timeout (seconds) |
| `CONVERSATION_MEMORY_SIZE` | `10` | Turns of per-session memory |

## API reference

Base URL: `http://localhost:5000` (dev) · `https://nyayaai-backend-qwwx.onrender.com` (production).

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/chat` | Chat with document context |
| `POST` | `/api/chat/intelligent` | Chat with automatic search routing |
| `POST` | `/api/chat/force-search` | Chat with forced web search |
| `POST` | `/api/chat/memory` | Manage session memory (`clear`, …) |
| `POST` | `/api/chat/upload` | Upload document, get extracted context |
| `POST` | `/api/search` | Direct legal search |
| `POST` | `/api/search/multi` | Multi-query search |
| `GET` | `/api/status` | Backend service status |
| `GET` | `/api/search/status` | Search subsystem status |
| `POST` | `/api/summarize` · `/api/analyze` | Summarize / analyze text |

All `POST` bodies are validated with Pydantic; the core query fields:

```json
POST /api/chat
{
  "query": "What is Article 21?",
  "session_id": "optional-thread-id",
  "context": "optional document text"
}
```

```powershell
curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d '{\"query\": \"What is Article 21?\"}'
```

```json
POST /api/chat/memory
{
  "action": "clear",
  "session_id": "thread-id"
}
```

## Deployment

### Frontend — Firebase Hosting

```powershell
cd frontend
npm run build             # emits frontend/dist/
firebase deploy           # hosts frontend/dist per firebase.json (SPA rewrites enabled)
```

`firebase.json` serves `frontend/dist`, adds 1-hour cache headers for hashed assets, and rewrites all routes to `/index.html` for React Router.

### Backend — Render

`backend/render.yaml` is ready for a Blueprint deploy: it installs `requirements.txt`, runs gunicorn via the `Procfile` command, and pins non-secret env vars. Set `GEMINI_API_KEY`, `SECRET_KEY`, and `ALLOWED_ORIGINS` manually in the Render dashboard — **never commit secrets**. `ALLOWED_ORIGINS` must include your frontend origins (see the commented examples in `render.yaml`).

Production origin handling: the frontend calls the Render URL automatically when served from any non-localhost origin, so `ALLOWED_ORIGINS` and the deployed backend URL in `frontend/src/lib/constants.js` must stay in sync.

## Project structure

```text
Jurista/
├─ backend/                  # Flask REST API
│  ├─ main.py                # App factory, CORS, logging, /health
│  ├─ routes.py              # API endpoints + Pydantic validation
│  ├─ gemini_chain.py        # Gemini LLM, chains, per-session memory
│  ├─ intelligent_search.py  # Search-needed routing decision
│  ├─ search_tool.py         # DuckDuckGo search + fallback logic
│  ├─ document_loader.py     # PDF/TXT/DOCX text extraction
│  ├─ config.py              # Env-driven configuration
│  ├─ requirements.txt       # Pinned compatible dependency set
│  ├─ Procfile / render.yaml # Production deployment definitions
│  └─ .env.example           # Shareable config template
├─ frontend/                 # React SPA (see frontend/README.md)
│  ├─ src/
│  │  ├─ components/         # layout/ chat/ home/ features/ about/ contact/ ui/
│  │  ├─ pages/              # HomePage, ChatPage, FeaturesPage, AboutPage, ContactPage
│  │  ├─ contexts/           # ChatContext, ThemeContext
│  │  ├─ hooks/              # useChat, useConnection, useThreads, useTheme, …
│  │  ├─ lib/                # api client, constants, utils
│  │  ├─ App.jsx / main.jsx
│  ├─ vite.config.js         # Dev proxy (/api, /health), manual chunks
│  └─ package.json
├─ frontend-old/             # Legacy static frontend (superseded by the React app)
├─ Documentation/
├─ firebase.json             # Firebase Hosting config (serves frontend/dist)
└─ README.md
```

## Troubleshooting

<details>
<summary><b>ModuleNotFoundError: No module named <code>'langchain_core.pydantic_v1'</code></b></summary>

A newer `langchain-core` (1.x) is installed, but this backend needs the 0.1.x LangChain ecosystem. Fix with:

```powershell
pip install "langchain-core>=0.1.9,<0.2"
```

Also uninstall any stray `langgraph*` / LangChain 1.x packages installed alongside it. When installing dependencies, always use `backend/requirements.txt` — it pins a mutually compatible set.
</details>

<details>
<summary><b>Chat page shows “Backend server is not responding”</b></summary>

The Flask backend isn't reachable. Start it (`python main.py`) and confirm <http://127.0.0.1:5000/health>. In dev the banner can remain until the next health-poll succeeds.
</details>

<details>
<summary><b>CORS errors in the browser console</b></summary>

The frontend calls the backend cross-origin when opened from a non-proxy origin (production builds, `vite preview`). Either run the backend with origins allowed, or use the Vite dev server (`npm run dev`) where requests are proxied same-origin.
</details>

<details>
<summary><b>Port already in use (5000 / 3000)</b></summary>

Backend: set `PORT` in `backend/.env`, then point the frontend proxy at it via `JURISTA_BACKEND_URL`. Frontend: `npm run dev -- --port 3001`.
</details>

<details>
<summary><b>Google “Python 3.11.9 FutureWarning” / LangChain deprecation warnings on startup</b></summary>

Benign notices (`initialize_agent` deprecation, the document-loaders fallback message). Startup and functionality are unaffected.
</details>

## Legal disclaimer

Jurista is an educational and research tool. Its output is **not legal advice**: responses can be inaccurate, incomplete, or outdated, and law is jurisdiction- and fact-specific. Always consult a qualified advocate or solicitor for real legal matters. Before any production use, review API provider terms, privacy/logging behavior, and the matter-linked liability of automated legal guidance.

## License

No open-source license has been applied yet. If this repository will be published or reused, add a LICENSE file (e.g., MIT or Apache-2.0) before doing so.
