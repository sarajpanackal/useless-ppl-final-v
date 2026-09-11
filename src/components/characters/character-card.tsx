import { RouteLink } from "@/components/ui/route-link";
import type { Character } from "@/data/characters";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="grid gap-4 rounded-lg border border-line bg-white p-5">
      <div>
        <p className="text-sm text-muted">{character.source}</p>
        <h2 className="mt-1 text-2xl font-semibold">{character.name}</h2>
        <p className="mt-3 leading-7 text-muted">
          {character.shortDescription}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(character.stats).map(([label, value]) => (
          <div className="border border-line px-3 py-2" key={label}>
            <dt className="text-muted">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        <RouteLink href={"/character/" + character.slug}>Case file</RouteLink>
        <RouteLink href={"/timeline/" + character.slug}>Timeline</RouteLink>
      </div>
    </article>
  );
}
