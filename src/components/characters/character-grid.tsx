"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
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
import { soundFx } from "@/lib/audio-effects";

export function CharacterGrid({ characters }: { characters: Character[] }) {
  const [customNpcs, setCustomNpcs] = useState<CustomNpc[]>([]);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [votes, setVotes] = useState<StoredVotes>({});
  const [filter, setFilter] = useState<"all" | "builtin" | "custom">("all");

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

  const allCandidates: CharacterCardCandidate[] = useMemo(() => [
    ...characters.map((character) => ({
      kind: "builtin" as const,
      character,
    })),
    ...customNpcs.map((character) => ({
      kind: "custom" as const,
      character,
    })),
  ], [characters, customNpcs]);

  const filteredCandidates = useMemo(() => {
    if (filter === "builtin") return allCandidates.filter((c) => c.kind === "builtin");
    if (filter === "custom") return allCandidates.filter((c) => c.kind === "custom");
    return allCandidates;
  }, [allCandidates, filter]);

  const totalVotesCast = useMemo(() => {
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  }, [votes]);

  return (
    <section className="relative min-h-[calc(100vh-48px)] p-6 sm:p-10 lg:p-14 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Top Header & Casting Directive */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-red-400 font-bold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Classified Casting Bureau // Division 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            CHARACTER DOSSIERS
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-mono text-stone-400 max-w-2xl">
            Click any card to trigger its 3D flip inspection. Read classified evidence on why canon abandoned them, then cast your audience vote.
          </p>
        </div>

        {/* Global Tally & Leaderboard Direct link */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-right">
            <span className="block font-mono text-[10px] text-stone-400 uppercase">Total Votes Cast</span>
            <span className="font-mono text-lg font-bold text-cyan-400">{totalVotesCast}</span>
          </div>
          <Link
            href="/results"
            onClick={() => soundFx.playClick()}
            className="group flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-3 font-mono text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>View Leaderboard</span>
            <span className="transition-transform group-hover:translate-x-1">&rsaquo;</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          onClick={() => {
            soundFx.playClick();
            setFilter("all");
          }}
          className={`px-3 py-1.5 rounded-lg border transition ${
            filter === "all"
              ? "bg-white text-black border-white font-bold"
              : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
          }`}
        >
          All Dossiers ({allCandidates.length})
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            setFilter("builtin");
          }}
          className={`px-3 py-1.5 rounded-lg border transition ${
            filter === "builtin"
              ? "bg-white text-black border-white font-bold"
              : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
          }`}
        >
          Canon Legends ({characters.length})
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            setFilter("custom");
          }}
          className={`px-3 py-1.5 rounded-lg border transition ${
            filter === "custom"
              ? "bg-white text-black border-white font-bold"
              : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
          }`}
        >
          Custom NPCs ({customNpcs.length})
        </button>
      </div>

      {/* The Character Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCandidates.map((candidate) => (
          <CharacterCard
            candidate={candidate}
            hasVoted={votedIds.includes(candidate.character.id)}
            key={candidate.character.id}
            onVote={handleVote}
            voteCount={votes[candidate.character.id] ?? 0}
          />
        ))}

        {/* Custom NPC Creator (Inline template) */}
        {(filter === "all" || filter === "custom") && (
          <CustomNpcCreator onCreated={handleCustomNpcCreated} />
        )}
      </div>
    </section>
  );
}
