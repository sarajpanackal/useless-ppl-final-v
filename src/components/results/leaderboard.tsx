"use client";

import { useEffect, useMemo, useState } from "react";
import type { Character } from "@/data/characters";
import {
  readCustomNpcs,
  readVotes,
  USELESS_STORAGE_EVENT,
  type CustomNpc,
  type StoredVotes,
} from "@/lib/useless-storage";

type LeaderboardProps = {
  characters: Character[];
};

type LeaderboardEntry = {
  id: string;
  image: string;
  name: string;
  order: number;
  source: string;
  type: "builtin" | "custom";
  votes: number;
};

export function Leaderboard({ characters }: LeaderboardProps) {
  const [customNpcs, setCustomNpcs] = useState<CustomNpc[]>([]);
  const [votes, setVotes] = useState<StoredVotes>({});

  useEffect(() => {
    function loadStoredData() {
      setCustomNpcs(readCustomNpcs());
      setVotes(readVotes());
    }

    loadStoredData();
    window.addEventListener(USELESS_STORAGE_EVENT, loadStoredData);
    window.addEventListener("storage", loadStoredData);

    return () => {
      window.removeEventListener(USELESS_STORAGE_EVENT, loadStoredData);
      window.removeEventListener("storage", loadStoredData);
    };
  }, []);

  const rankedEntries = useMemo<LeaderboardEntry[]>(() => {
    const builtinEntries = characters.map((character, index) => ({
      id: character.id,
      image: character.image ?? character.cardAssets.front,
      name: character.name,
      order: index,
      source: character.source,
      type: "builtin" as const,
      votes: votes[character.id] ?? 0,
    }));

    const customEntries = customNpcs.map((customNpc, index) => ({
      id: customNpc.id,
      image: customNpc.frontImage,
      name: customNpc.name,
      order: characters.length + index,
      source: "Favourite NPC Creator",
      type: "custom" as const,
      votes: votes[customNpc.id] ?? 0,
    }));

    return [...builtinEntries, ...customEntries].sort((a, b) => {
      if (b.votes !== a.votes) {
        return b.votes - a.votes;
      }

      return a.order - b.order;
    });
  }, [characters, customNpcs, votes]);

  return (
    <section className="leaderboard-scene">
      <div className="crt-grain" aria-hidden="true" />

      <header className="leaderboard-header">
        <p>Community verdict archive</p>
        <h1>USELESS LEADERBOARD</h1>
        <span>Ranked by stored audience votes. Ties keep archive order.</span>
      </header>

      <ol className="leaderboard-list">
        {rankedEntries.map((entry, index) => (
          <li className="leaderboard-row" key={entry.id}>
            <span className="leaderboard-rank">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <div
              aria-label={entry.name}
              className="leaderboard-image"
              role="img"
              style={{ backgroundImage: `url("${entry.image}")` }}
            />
            <div className="leaderboard-copy">
              <p>{entry.type === "custom" ? "CUSTOM NPC" : entry.source}</p>
              <h2>{entry.name}</h2>
            </div>
            <strong>
              {entry.votes} {entry.votes === 1 ? "vote" : "votes"}
            </strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
