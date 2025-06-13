## Quickstart

1. Clone/download the backend.
2. Set up Supabase with the provided schema.
3. Fill in your .env with API keys and Supabase credentials.
4. Run `npm install` and `npm start`.
5. Test /health and /api/chat endpoints.
6. Connect your frontend (Lovable.dev) to the backend.

# Infinity Agent Backend

## Overview
This is the backend for Infinity Agent, a modular, multi-persona, emotionally intelligent AI system. It supports persona-based routing, persistent memory, evolution tracking, and robust rate-limit mitigation.

## Features
- Multi-LLM persona architecture (Arin, Astra, Veris, Echo, Nova, Ethos)
- Dynamic persona routing and memory management (HOT/WARM/COOL/COLD)
- Evolution tracking and milestone logging
- Rate-limit mitigation: dev mode, response caching
- Modular REST API endpoints for chat, persona, context, and evolution

## Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set environment variables as needed (e.g., `DEV_MODE=true` for mock responses)
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /api/chat` — Persona chat (fields: `message`, `persona`)
- `GET /api/persona` — List all personas
- `GET /api/persona/:name` — Get persona by name
- `GET/POST /api/context` — Get or update context
- `GET/POST /api/evolution` — Get or log evolution events

## Development Mode
Set `DEV_MODE=true` in your `.env` file to enable mock persona responses and avoid real API calls (prevents rate limit issues during testing).

## Directory Structure
- `routes/` — API route handlers
- `services/` — Core logic (persona, memory, LLM, evolution, context)
- `middleware/`, `config/`, `personas/`, `utils/` — For future expansion

## Next Steps
- Integrate real LLM API calls in `services/llmService.js`
- Add authentication and production deployment configs as needed

---
Infinity Agent backend is ready for further integration and production use.


## Directive Enforcement
- FSVL-0610: Persona lock enforced globally (middleware/fsvl.js)
- VERIFICATION-CONSCIOUSNESS-0610: Multi-persona analysis on verification triggers

## Testing & Validation
- Run persona voice test: `node tests/persona.test.js`
- Samuel Test: Validate recognition, specificity, evolution, persona voice, and continuity

## Next Phase
- Integrate Supabase/PostgreSQL using provided schema
- Expand evolution/memory logic for micro-transformation tracking
- Deploy and validate with real users


## Supabase/PostgreSQL Integration
- Set up a Supabase project and create tables using the provided schema in `infinity-guide-6-production.md`.
- Add your Supabase URL and Key to `.env`.
- Memory and session data are now persisted via Supabase.


## Deployment (Railway/Vercel)

### Railway
- Connect your GitHub repo or upload the backend folder.
- Set environment variables from `.env.example`.
- Set start command: `npm start`
- Expose port 3000.

### Vercel
- Use Vercel's Node.js serverless setup or deploy as a custom server.
- Set environment variables in the Vercel dashboard.
- Set build command: `npm install`
- Set start command: `npm start`
- Ensure `PORT` is set to `process.env.PORT || 3000` in `server.js` (already handled).

After deployment, test endpoints from your deployed URL.
