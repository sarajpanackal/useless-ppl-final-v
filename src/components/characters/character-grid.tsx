import { CharacterCard } from "./character-card";
import type { Character } from "@/data/characters";

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <section className="grid gap-8">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-blue-note">
          Character selection
        </p>
        <h1 className="text-4xl font-semibold">Choose the overlooked</h1>
        <p className="mt-4 leading-8 text-muted">
          This grid is wired to local typed data. The character set, writing,
          imagery, and card behavior are placeholders until directed.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
    </section>
  );
}
