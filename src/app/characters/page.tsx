import { CharacterGrid } from "@/components/characters/character-grid";
import { characters } from "@/data/characters";

export default function CharactersPage() {
  return <CharacterGrid characters={characters} />;
}
