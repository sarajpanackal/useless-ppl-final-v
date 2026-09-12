export const VOTES_STORAGE_KEY = "useless-people:votes:v1";
export const VOTED_STORAGE_KEY = "useless-people:voted:v1";
export const CUSTOM_NPCS_STORAGE_KEY = "useless-people:custom-npcs:v1";
export const USELESS_STORAGE_EVENT = "useless-people-storage";

export type CustomNpc = {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  details: string;
  backDetails: string;
  createdAt: number;
};

export type StoredVotes = Record<string, number>;

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(USELESS_STORAGE_EVENT));
}

export function readVotes(): StoredVotes {
  return readJson<StoredVotes>(VOTES_STORAGE_KEY, {});
}

export function writeVotes(votes: StoredVotes) {
  writeJson(VOTES_STORAGE_KEY, votes);
}

export function readVotedIds(): string[] {
  return readJson<string[]>(VOTED_STORAGE_KEY, []);
}

export function writeVotedIds(votedIds: string[]) {
  writeJson(VOTED_STORAGE_KEY, votedIds);
}

export function readCustomNpcs(): CustomNpc[] {
  return readJson<CustomNpc[]>(CUSTOM_NPCS_STORAGE_KEY, []);
}

export function writeCustomNpcs(customNpcs: CustomNpc[]) {
  writeJson(CUSTOM_NPCS_STORAGE_KEY, customNpcs);
}

export function makeCustomNpcId() {
  return "custom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
