# Character Schema

Character data currently lives in src/data/characters.ts.

The schema is intentionally small and easy to change.

## Character

- id: stable internal identifier
- slug: URL-friendly identifier
- name: character name
- source: story, film, book, or other origin
- mediaType: loose category such as film, book, series, animation, or unknown
- image: optional future image path or URL
- shortDescription: short working description
- uselessReason: why canon did not properly care
- stats: flexible fictional metrics
- timeline: local list of timeline events
- ending: short placeholder for the alternate ending direction

## Timeline Event

- id: stable event identifier
- sequence: order in the timeline
- label: optional year, act, scene, or other label
- title: event title
- description: brief event description
- eventType: canon, breach, alternate, ending, or placeholder

Do not treat these fields as final. The data model should evolve with the story direction.
