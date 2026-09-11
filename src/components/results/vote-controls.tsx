"use client";

import { useState } from "react";

const reactions = ["Too ignored", "Needs cinema", "Blue forever"];

export function VoteControls() {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  return (
    <section className="rounded-lg border border-line bg-white p-5" aria-labelledby="reaction-controls">
      <h2 id="reaction-controls" className="text-xl font-semibold">
        Local reaction controls
      </h2>
      <p className="mt-3 leading-7 text-muted">
        These buttons do not save anything yet. They only prove the future
        reaction area has a place to live.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {reactions.map((reaction) => (
          <button
            aria-pressed={selectedReaction === reaction}
            className="min-h-11 border border-line px-4 py-2 text-sm font-medium transition hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
            key={reaction}
            onClick={() => setSelectedReaction(reaction)}
            type="button"
          >
            {reaction}
          </button>
        ))}
      </div>
      {selectedReaction ? (
        <p className="mt-4 text-sm text-muted">
          Local-only reaction selected: {selectedReaction}
        </p>
      ) : null}
    </section>
  );
}
