import type { Character } from "@/data/characters";
import { Leaderboard } from "./leaderboard";

export function ResultsBoard({ characters }: { characters: Character[] }) {
  return <Leaderboard characters={characters} />;
}
