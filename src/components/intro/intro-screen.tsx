import { RouteLink } from "@/components/ui/route-link";
import { characters } from "@/data/characters";

const plannedFlow = [
  "Landing",
  "Quote / flower experience",
  "Character selection",
  "Character case file",
  "Timeline breach",
  "Alternate timeline",
  "Results / rankings",
];

export function IntroScreen() {
  const firstCharacter = characters[0];

  return (
    <section className="grid gap-10">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-blue-note">
          Phase 1 functional foundation
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          USELESS PEOPLE
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          A deliberately useless stage for overlooked characters who were
          narratively blue in a world that kept choosing red.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <RouteLink href="/quote" variant="primary">
          Start with the quote
        </RouteLink>
        <RouteLink href="/characters">Browse characters</RouteLink>
        <RouteLink href={"/character/" + firstCharacter.slug}>
          Open first case file
        </RouteLink>
      </div>

      <section aria-labelledby="phase-one-routes" className="border-t border-line pt-8">
        <h2 id="phase-one-routes" className="text-xl font-semibold">
          Current route skeleton
        </h2>
        <ol className="mt-4 grid gap-2 text-muted sm:grid-cols-2">
          {plannedFlow.map((step) => (
            <li className="border border-line bg-white px-4 py-3" key={step}>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
