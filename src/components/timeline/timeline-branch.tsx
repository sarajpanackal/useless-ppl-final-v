import type { Character } from "@/data/characters";
import { TimelineEvent } from "./timeline-event";

export function TimelineBranch({ character }: { character: Character }) {
  return (
    <section aria-labelledby="timeline-events">
      <h2 id="timeline-events" className="text-2xl font-semibold">
        Working timeline
      </h2>
      <ol className="mt-6 grid gap-6">
        {character.timeline.map((event) => (
          <TimelineEvent event={event} key={event.id} />
        ))}
      </ol>
    </section>
  );
}
