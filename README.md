# USELESS PEOPLE

USELESS PEOPLE is an intentionally useless fictional experience about overlooked side characters receiving far too much narrative attention.

The project is in Phase 1: a technical foundation, route skeleton, local typed character data, and project memory for future Codex work. It is not a productivity tool, recommendation engine, social network, AI assistant, or useful platform in disguise.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- npm

## Local Setup

1. Install dependencies with npm install.
2. Start the development server with npm run dev.
3. Build for production with npm run build.

No environment variables are required for Phase 1. Local env files are ignored by Git, and no credentials should be committed.

## Routes

- / - landing skeleton
- /quote - quote and flower scene skeleton
- /characters - local character selection
- /character/[id] - local character case file
- /timeline/[id] - local alternate timeline skeleton
- /results - local rankings/results placeholder

## Data

Character content currently lives in src/data/characters.ts. This is intentionally local data only. Do not add a database, auth, Supabase, OpenAI API, or user accounts until the human explicitly directs that work.

## Project Memory

See AGENTS.md and the docs folder before making changes. The human owns creative direction. Codex owns careful implementation, project hygiene, and validation.
