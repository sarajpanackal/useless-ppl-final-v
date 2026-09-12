"use client";

import { useState } from "react";
import type { Character } from "@/data/characters";
import { TimelineEvent } from "./timeline-event";
import { soundFx } from "@/lib/audio-effects";

export function TimelineBranch({ character }: { character: Character }) {
  const [activeEventId, setActiveEventId] = useState<string>(
    character.timeline[0]?.id ?? ""
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-stone-400">
        <span className="font-bold uppercase text-stone-200">
          {`// TEMPORAL DIVERGENCE NODES (${character.timeline.length} RECORDED)`}
        </span>
        <span className="text-cyan-400">ANOMALY DETECTED</span>
      </div>

      <ol className="grid gap-4">
        {character.timeline.map((event) => (
          <TimelineEvent
            event={event}
            isActive={activeEventId === event.id}
            key={event.id}
            onClick={() => {
              soundFx.playClick();
              setActiveEventId(event.id);
            }}
          />
        ))}
      </ol>
    </section>
  );
}
