# Architecture

This project is a Next.js App Router application.

## How The App Is Organized

- src/app contains routes. A folder becomes a URL segment when it has a page.tsx file.
- src/components contains reusable UI pieces grouped by experience area.
- src/data/characters.ts contains the local typed character data.
- docs contains project memory and planning notes.

## Current Routes

- / renders the landing skeleton.
- /quote renders the quote and flower scene skeleton.
- /characters renders the character selection grid from local data.
- /character/[id] renders a case file for a local character.
- /timeline/[id] renders the character timeline skeleton from local data.
- /results renders a local placeholder ranking.

## Current Data Flow

The app reads character records directly from src/data/characters.ts. There is no database, backend API, authentication, or external service in Phase 1.

Dynamic pages use the route value in the URL to find a local character by slug or id. If no character exists, Next.js shows a not-found page.

## Future Backend Direction

If voting or rankings need persistence later, Supabase may be considered. That is not part of Phase 1. Do not add Supabase or any other backend until the human explicitly asks.
