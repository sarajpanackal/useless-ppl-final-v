import { RouteLink } from "@/components/ui/route-link";
import type { Character } from "@/data/characters";

export function CharacterCaseFile({ character }: { character: Character }) {
  return (
    <article className="grid gap-8">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-red-note">
          Character case file
        </p>
        <h1 className="text-4xl font-semibold">{character.name}</h1>
        <p className="mt-2 text-muted">{character.source}</p>
        <p className="mt-5 leading-8 text-muted">{character.uselessReason}</p>
      </header>

      <section aria-labelledby="case-stats" className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5">
          <h2 id="case-stats" className="text-xl font-semibold">
            Current fictional metrics
          </h2>
          <dl className="mt-4 grid gap-2">
            {Object.entries(character.stats).map(([label, value]) => (
              <div className="flex items-center justify-between border-b border-line py-2" key={label}>
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg border border-line bg-white p-5">
          <h2 className="text-xl font-semibold">Alternate ending note</h2>
          <p className="mt-4 leading-8 text-muted">{character.ending}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <RouteLink href={"/timeline/" + character.slug} variant="primary">
          Breach the timeline
        </RouteLink>
        <RouteLink href="/characters">Back to selection</RouteLink>
      </div>
    </article>
  );
}
