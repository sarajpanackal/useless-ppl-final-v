import { RouteLink } from "@/components/ui/route-link";
import type { Character } from "@/data/characters";
import { TimelineBranch } from "./timeline-branch";

export function TimelineBreach({ character }: { character: Character }) {
  return (
    <article className="grid gap-8">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-red-note">
          Timeline breach
        </p>
        <h1 className="text-4xl font-semibold">{character.name}</h1>
        <p className="mt-5 leading-8 text-muted">
          This is the structural doorway for alternate timelines. The actual
          breach choreography, scroll behavior, and cinematic treatment are
          reserved for later direction.
        </p>
      </header>
      <TimelineBranch character={character} />
      <div className="flex flex-wrap gap-3">
        <RouteLink href="/results" variant="primary">
          Continue to results
        </RouteLink>
        <RouteLink href={"/character/" + character.slug}>
          Back to case file
        </RouteLink>
      </div>
    </article>
  );
}
