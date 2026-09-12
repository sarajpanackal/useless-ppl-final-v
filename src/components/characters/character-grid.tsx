"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readCustomNpcs,
  readVotedIds,
  readVotes,
  USELESS_STORAGE_EVENT,
  writeVotedIds,
  writeVotes,
  type CustomNpc,
  type StoredVotes,
} from "@/lib/useless-storage";
import { CharacterCard, type CharacterCardCandidate } from "./character-card";
import { CustomNpcCreator } from "./custom-npc-creator";
import type { Character } from "@/data/characters";

export function CharacterGrid({ characters }: { characters: Character[] }) {
  const [customNpcs, setCustomNpcs] = useState<CustomNpc[]>([]);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [votes, setVotes] = useState<StoredVotes>({});

  useEffect(() => {
    function loadStoredData() {
      setCustomNpcs(readCustomNpcs());
      setVotes(readVotes());
      setVotedIds(readVotedIds());
    }

    loadStoredData();
    window.addEventListener(USELESS_STORAGE_EVENT, loadStoredData);
    window.addEventListener("storage", loadStoredData);

    return () => {
      window.removeEventListener(USELESS_STORAGE_EVENT, loadStoredData);
      window.removeEventListener("storage", loadStoredData);
    };
  }, []);

  function handleVote(candidateId: string) {
    if (votedIds.includes(candidateId)) {
      return;
    }

    const nextVotes = {
      ...votes,
      [candidateId]: (votes[candidateId] ?? 0) + 1,
    };
    const nextVotedIds = [...votedIds, candidateId];

    setVotes(nextVotes);
    setVotedIds(nextVotedIds);
    writeVotes(nextVotes);
    writeVotedIds(nextVotedIds);
  }

  function handleCustomNpcCreated(customNpc: CustomNpc) {
    setCustomNpcs((current) => [...current, customNpc]);
  }

  const candidates: CharacterCardCandidate[] = [
    ...characters.map((character) => ({
      kind: "builtin" as const,
      character,
    })),
    ...customNpcs.map((character) => ({
      kind: "custom" as const,
      character,
    })),
  ];

  return (
    <section className="character-selection-scene">
      <div className="crt-grain" aria-hidden="true" />

      <div className="character-selection-header">
        <p>Classified casting office</p>
        <h1>Character Selection</h1>
        <Link className="character-results-link" href="/results">
          View useless leaderboard
        </Link>
      </div>

      <div className="character-card-grid">
        {candidates.map((candidate) => (
          <CharacterCard
            candidate={candidate}
            hasVoted={votedIds.includes(candidate.character.id)}
            key={candidate.character.id}
            onVote={handleVote}
            voteCount={votes[candidate.character.id] ?? 0}
          />
        ))}

        <CustomNpcCreator onCreated={handleCustomNpcCreated} />
      </div>
    </section>
  );
}
