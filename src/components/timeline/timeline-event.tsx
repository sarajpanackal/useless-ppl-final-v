import type { TimelineEvent as TimelineEventModel } from "@/data/characters";

export function TimelineEvent({ event }: { event: TimelineEventModel }) {
  return (
    <li className="grid gap-2 border-l border-line pl-5">
      <p className="text-sm font-medium text-muted">
        {event.label ?? "Sequence " + event.sequence} - {event.eventType}
      </p>
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="leading-7 text-muted">{event.description}</p>
    </li>
  );
}
