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

export type CharacterCardAssets = {
  front: string;
  selected: string;
  back: string;
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
  cardAssets: CharacterCardAssets;
  chooseLabel: string;
  dossierLabel: string;
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
    image: "/characters/glixon/front.jpeg",
    cardAssets: {
      front: "/characters/glixon/front.jpeg",
      selected: "/characters/glixon/selected.jpeg",
      back: "/characters/glixon/back.jpeg",
    },
    chooseLabel: "CHOOSE HIM",
    dossierLabel: "Unit 02 // Glixxon",
    shortDescription:
      "Disregarded clutch operative, filed from Bethlehem Kudumba Unit.",
    uselessReason:
      "The family is already in chaos. He is told to stay back, naturally gets involved, and notices what everyone else missed.",
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
    image: "/characters/ursula/front.jpeg",
    cardAssets: {
      front: "/characters/ursula/front.jpeg",
      selected: "/characters/ursula/selected.jpeg",
      back: "/characters/ursula/back.jpeg",
    },
    chooseLabel: "CHOOSE HER",
    dossierLabel: "Unit 03 // Ursula",
    shortDescription:
      "Civilian ally from New York Apt 4C, carrying cake-level narrative relevance.",
    uselessReason:
      "The city is tearing itself apart, Peter is collapsing, and then there is a gentle knock at the door.",
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
    image: "/characters/private/front.jpeg",
    cardAssets: {
      front: "/characters/private/front.jpeg",
      selected: "/characters/private/selected.jpeg",
      back: "/characters/private/back.jpeg",
    },
    chooseLabel: "CHOOSE HIM",
    dossierLabel: "Agent 04 // Private",
    shortDescription:
      "Private baby-form operative with hyper-cuteness and heart.",
    uselessReason:
      "Hatched in Antarctica, rescued from leopard seals, and somehow classified as a weapon of mass pacification.",
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
  {
    id: "char-meg-griffin",
    slug: "meg-griffin",
    name: "Meg Griffin",
    source: "Family Guy",
    mediaType: "animation",
    image: "/characters/meg-griffin/front.jpeg",
    cardAssets: {
      front: "/characters/meg-griffin/front.jpeg",
      selected: "/characters/meg-griffin/selected.jpeg",
      back: "/characters/meg-griffin/back.jpeg",
    },
    chooseLabel: "CHOOSE HER",
    dossierLabel: "Unit 04 // Meg Griffin",
    shortDescription:
      "Family scapegoat and confirmed lightning rod of Spooner Street.",
    uselessReason:
      "Canon made her a lightning rod, then acted surprised when the room kept getting struck.",
    stats: {
      plotRelevance: 29,
      protagonistEnergy: 22,
      writerAttention: 19,
      plotArmor: 11,
    },
    timeline: [
      {
        id: "meg-canon-note",
        sequence: 1,
        label: "Canon",
        title: "The room points at the same target",
        description:
          "A placeholder for the family pattern that keeps treating Meg like furniture with feelings.",
        eventType: "canon",
      },
      {
        id: "meg-breach-note",
        sequence: 2,
        label: "Breach",
        title: "The lightning rod starts conducting plot",
        description:
          "The archive exists, but the actual alternate scene still belongs to the human.",
        eventType: "breach",
      },
    ],
    ending:
      "Alternate ending waiting for the human to decide how tragic the joke is allowed to become.",
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
