import type { Character } from "@/data/characters";
import { getPlotNeglectScore } from "@/data/characters";
import { VoteControls } from "./vote-controls";

export function ResultsBoard({ characters }: { characters: Character[] }) {
  const rankedCharacters = [...characters].sort(
    (a, b) => getPlotNeglectScore(b) - getPlotNeglectScore(a),
  );

  return (
    <section className="grid gap-8">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-blue-note">
          Results / ranking
        </p>
        <h1 className="text-4xl font-semibold">Unnecessary rankings</h1>
        <p className="mt-4 leading-8 text-muted">
          Phase 1 uses a deterministic local placeholder ranking. Real voting
          and persistence can wait until the human asks for them.
        </p>
      </header>

      <ol className="grid gap-3">
        {rankedCharacters.map((character, index) => (
          <li
            className="flex flex-col gap-2 rounded-lg border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            key={character.id}
          >
            <div>
              <p className="text-sm text-muted">Rank {index + 1}</p>
              <h2 className="text-2xl font-semibold">{character.name}</h2>
              <p className="mt-1 text-muted">{character.source}</p>
            </div>
            <p className="text-sm font-medium">
              neglect score: {getPlotNeglectScore(character)}
            </p>
          </li>
        ))}
      </ol>

      <VoteControls />
    </section>
  );
}
