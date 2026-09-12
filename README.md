# USELESS PEOPLE

USELESS PEOPLE is an intentionally useless, theatrical web experience about side characters, comic-relief characters, NPC-like figures, and overlooked story people receiving an absurdly serious amount of narrative attention.

The emotional thesis is:

> You can be the prettiest shade of blue, but if their favorite color is red, it does not matter.

The project is not meant to become useful. It is not a productivity app, recommendation engine, social platform, AI assistant, rankings product, or practical tool hiding behind a joke. Its whole point is unnecessary narrative seriousness applied to people canon forgot to treat like protagonists.

---

## Recent Redesign & Optimizations (Clean UI & Feature Polish)

The application has been completely redesigned with a cleaner, high-end editorial UI while strictly preserving the original 3D flip card idea, all built-in characters, and narrative lore:

1. **Enhanced 3D Flip Card Architecture (`character-card.tsx`)**:
   - Preserved authentic 3D perspective flip along the Y-axis.
   - Added dual-sided flip triggers so cards can be freely flipped to the classified dossier and back to the front badge anytime.
   - Structured back dossier layout with classified stamps, canonical neglect evidence, live vote confirmation feedback, and direct deep links to the character's **Case File** and **Timeline Breach**.

2. **Unified Classified Archive Header & Tactile Audio (`site-nav.tsx`, `audio-effects.ts`)**:
   - Minimalist top-level classified archive header with active phase route indicators (`01 // INTRO`, `02 // THESIS`, `03 // DOSSIERS`, `04 // LEADERBOARD`).
   - Integrated Web Audio synthesizer for tactile card flip swooshes, clicks, and vote stamp feedback (with a persistent mute/unmute toggle, zero external MP3/WAV files needed).

3. **Custom NPC Creator Optimization (`custom-npc-creator.tsx`)**:
   - Added client-side HTML5 canvas image compression before saving to `localStorage` to avoid `QuotaExceededError` when users upload high-resolution phone photos.
   - **Live 3D Card Preview**: Interactive flip preview allows creators to test their custom front and back card before saving.

4. **Classified Case File Deep Dive (`character-case-file.tsx`)**:
   - Full classified folder interface for `/character/[id]`.
   - Evidence photo switcher (Badge, Selected, Dossier).
   - Interactive "Redacted" text bars (click/hover black bars to reveal classified notes).
   - Visual metric meters for *Plot Relevance*, *Protagonist Energy*, *Writer Attention*, *Plot Armor*, and calculated *Plot Neglect Score*.

5. **Quantum Timeline Breach (`timeline-breach.tsx`)**:
   - Visual branching timeline nodes detailing canon events, breach horizons, alternate narrative trajectories, and archived ending notes.

6. **Leaderboard & Reaction Verdict (`leaderboard.tsx`)**:
   - Ranked podium highlighting the #1 neglected character with proportional vote share bars.
   - Audience emotional reaction controls (*"Too ignored"*, *"Needs cinema"*, *"Blue forever"*).
   - Filter tabs (*All Contenders*, *Canon Legends*, *Custom NPCs*) and vote reset option.

---

## What The Site Does

The current version is a complete local-first experience:

- A ransom-note-style landing page introduces the project.
- The landing text scales large on screen and reacts to mouse movement with a jittery, restless motion.
- The landing arrow moves into a quote scene.
- The quote scene uses a soft flower visual and centers the blue-versus-red thesis line.
- The quote page continues into character selection with a small dramatic prompt.
- The character page presents four characters as retro classified dossier cards.
- Each character has a front card, a selected card, and a back dossier card.
- Clicking the choose area flips the card with a 3D flip animation.
- The back of each card exposes a vote action and links to case files and timelines.
- Voting updates that character's stored vote count.
- The Useless Leaderboard ranks the characters by stored votes.
- Users can also create a custom favourite NPC with uploaded front and back card images.

## Routes

- `/` - ransom-note landing page.
- `/quote` - cinematic quote and flower scene.
- `/characters` - character selection, card flipping, voting, and custom NPC creation.
- `/results` - USELESS LEADERBOARD ranked by stored votes.
- `/character/[id]` - individual local character case file route.
- `/timeline/[id]` - individual local alternate timeline route.

## Character Card Assets

The four built-in characters each use three related assets:

- `public/characters/private/front.jpeg`
- `public/characters/private/selected.jpeg`
- `public/characters/private/back.jpeg`

- `public/characters/glixon/front.jpeg`
- `public/characters/glixon/selected.jpeg`
- `public/characters/glixon/back.jpeg`

- `public/characters/ursula/front.jpeg`
- `public/characters/ursula/selected.jpeg`
- `public/characters/ursula/back.jpeg`

- `public/characters/meg-griffin/front.jpeg`
- `public/characters/meg-griffin/selected.jpeg`
- `public/characters/meg-griffin/back.jpeg`

The quote scene flower is stored at:

- `public/quote-flower.png`

## Voting And Storage

This app intentionally keeps data simple and local.

Votes are stored in the browser with `localStorage`, using keys defined in `src/lib/useless-storage.ts`. The same storage layer also tracks which character IDs have already been voted for in the current browser and stores custom NPC entries.

There is no database, no authentication, no API, no Supabase, no OpenAI integration, no account system, and no server-side voting service. That is intentional for the current phase.

## Leaderboard Ranking

The leaderboard combines the built-in characters with any custom NPCs saved in the current browser. It sorts entries by vote count from highest to lowest.

When vote counts are tied, the app keeps a stable archive order:

1. Built-in characters keep their local data order.
2. Custom NPCs appear after built-in characters in creation order.

## Custom Favourite NPC Creator

The character selection page includes a themed custom NPC template card. Users can:

- upload a front card image
- add an NPC name
- add supporting front-side details
- upload a backside image
- add optional backside details
- preview the custom card
- flip the custom card
- save the custom NPC into local browser storage
- vote for the custom NPC after creation

Saved custom NPCs are eligible for the Useless Leaderboard when they have votes.

## Visual Direction

The design language is deliberately strange and over-serious:

- classified dossier cards
- CRT scanlines
- grain and printed-card texture
- off-white ID-card backgrounds
- charcoal black dossier backs
- red security accents
- cyan vote/status accents
- theatrical quote staging
- ransom-note landing typography

The goal is not generic polish. The goal is to make useless fictional importance feel weirdly official.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Framer Motion
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Project Rules

Before making creative or implementation changes, read:

- `AGENTS.md`
- `docs/PRODUCT_VISION.md`
- `docs/DESIGN_DIRECTION.md`

Important constraints:

- Preserve the absurd narrative premise.
- Keep character data local unless explicitly directed otherwise.
- Do not add database/auth/Supabase/OpenAI/API/login/account features without a new explicit request.
- Do not turn this into a useful product.
- Do not redesign unrelated routes while working on a specific page.
- The human creative director owns the final design, copy, humor, story, timing, typography, and visual choices.
