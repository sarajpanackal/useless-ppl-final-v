export type MediaType =
  | "film"
  | "book"
  | "series"
  | "animation"
  | "unknown";

export type TimelineEventType =
  | "canon"
  | "breach"
  | "alternate"
  | "ending"
  | "placeholder";

export type CharacterStats = {
  plotRelevance: number;
  protagonistEnergy: number;
  writerAttention: number;
  plotArmor: number;
  [metric: string]: number | string | boolean;
};

export type TimelineEvent = {
  id: string;
  sequence: number;
  label?: string;
  title: string;
  description: string;
  eventType: TimelineEventType;
};

export type Character = {
  id: string;
  slug: string;
  name: string;
  source: string;
  mediaType: MediaType;
  image?: string;
  shortDescription: string;
  uselessReason: string;
  stats: CharacterStats;
  timeline: TimelineEvent[];
  ending: string;
};

export const characters: Character[] = [
  {
    id: "char-glixon",
    slug: "glixon",
    name: "Glixon",
    source: "Bethlehem Kudumba Unit",
    mediaType: "film",
    shortDescription:
      "A placeholder case file for a side character awaiting human-written glory.",
    uselessReason:
      "Canon has not yet filed the paperwork required to make this person narratively unavoidable.",
    stats: {
      plotRelevance: 18,
      protagonistEnergy: 41,
      writerAttention: 12,
      plotArmor: 9,
    },
    timeline: [
      {
        id: "glixon-canon-note",
        sequence: 1,
        label: "Canon",
        title: "Observed from the edge of importance",
        description:
          "A deliberately brief placeholder until the human writes the real context.",
        eventType: "canon",
      },
      {
        id: "glixon-breach-note",
        sequence: 2,
        label: "Breach",
        title: "The timeline notices a missing lead",
        description:
          "The alternate-timeline structure exists, but the story is not invented yet.",
        eventType: "breach",
      },
    ],
    ending:
      "Alternate ending to be written later by the human creative director.",
  },
  {
    id: "char-ursula",
    slug: "ursula",
    name: "Ursula",
    source: "Spider-Man",
    mediaType: "film",
    shortDescription:
      "A tiny local-data entry for someone who brought softness to a much louder story.",
    uselessReason:
      "She was present, kind, and narratively underpaid. Phase 1 refuses to fix that without direction.",
    stats: {
      plotRelevance: 24,
      protagonistEnergy: 35,
      writerAttention: 20,
      plotArmor: 14,
    },
    timeline: [
      {
        id: "ursula-canon-note",
        sequence: 1,
        label: "Canon",
        title: "Kindness in a side hallway",
        description:
          "A small placeholder for the moment canon did not know what else to do with her.",
        eventType: "canon",
      },
      {
        id: "ursula-alternate-note",
        sequence: 2,
        label: "Alternate",
        title: "The camera stays",
        description:
          "The camera is allowed to linger, but the actual scene is not written yet.",
        eventType: "alternate",
      },
    ],
    ending:
      "Alternate ending pending human-written emotional escalation.",
  },
  {
    id: "char-private",
    slug: "private",
    name: "Private",
    source: "Madagascar",
    mediaType: "animation",
    shortDescription:
      "A local placeholder for a character with suspiciously high sincerity density.",
    uselessReason:
      "The ensemble moved fast, and the smallest earnest one did not always get the thesis statement.",
    stats: {
      plotRelevance: 38,
      protagonistEnergy: 48,
      writerAttention: 31,
      plotArmor: 27,
    },
    timeline: [
      {
        id: "private-canon-note",
        sequence: 1,
        label: "Canon",
        title: "Cute competence filed as support",
        description:
          "Current note only. Do not mistake this for the real alternate story.",
        eventType: "canon",
      },
      {
        id: "private-ending-note",
        sequence: 2,
        label: "Ending",
        title: "A too-serious spotlight waits",
        description:
          "The ending route has a place, but not a finished ending.",
        eventType: "ending",
      },
    ],
    ending:
      "Alternate ending intentionally unwritten until the human chooses the joke and sincerity levels.",
  },
];

export function getCharacterByRouteId(routeId: string) {
  return characters.find(
    (character) => character.slug === routeId || character.id === routeId,
  );
}

export function getPlotNeglectScore(character: Character) {
  const { plotArmor, plotRelevance, protagonistEnergy, writerAttention } =
    character.stats;

  return (
    400 - plotArmor - plotRelevance - protagonistEnergy - writerAttention
  );
}
