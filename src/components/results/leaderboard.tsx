"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Character } from "@/data/characters";
import {
  readCustomNpcs,
  readVotes,
  writeVotes,
  writeVotedIds,
  USELESS_STORAGE_EVENT,
  type CustomNpc,
  type StoredVotes,
} from "@/lib/useless-storage";
import { soundFx } from "@/lib/audio-effects";

type LeaderboardProps = {
  characters: Character[];
};

type LeaderboardEntry = {
  id: string;
  slug?: string;
  image: string;
  name: string;
  order: number;
  source: string;
  type: "builtin" | "custom";
  votes: number;
};

const reactions = [
  { label: "Too ignored", icon: "💔" },
  { label: "Needs cinema", icon: "🎬" },
  { label: "Blue forever", icon: "🔵" },
];

export function Leaderboard({ characters }: LeaderboardProps) {
  const [customNpcs, setCustomNpcs] = useState<CustomNpc[]>([]);
  const [votes, setVotes] = useState<StoredVotes>({});
  const [filter, setFilter] = useState<"all" | "builtin" | "custom">("all");
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

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

  const allRankedEntries = useMemo<LeaderboardEntry[]>(() => {
    const builtinEntries = characters.map((character, index) => ({
      id: character.id,
      slug: character.slug,
      image: character.cardAssets.selected || character.cardAssets.front,
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
      source: "User Archive",
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

  const filteredEntries = useMemo(() => {
    if (filter === "builtin") return allRankedEntries.filter((e) => e.type === "builtin");
    if (filter === "custom") return allRankedEntries.filter((e) => e.type === "custom");
    return allRankedEntries;
  }, [allRankedEntries, filter]);

  const totalVotes = useMemo(() => {
    return allRankedEntries.reduce((acc, cur) => acc + cur.votes, 0);
  }, [allRankedEntries]);

  function handleResetVotes() {
    if (window.confirm("Are you sure you want to reset all stored audience votes?")) {
      writeVotes({});
      writeVotedIds([]);
      setVotes({});
      soundFx.playClick();
    }
  }

  return (
    <section className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-14 flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>COMMUNITY VERDICT ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            USELESS LEADERBOARD
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-mono text-stone-400">
            Ranked by audience votes cast on the back of each classified card.
          </p>
        </div>

        {/* Quick Back to Dossier Grid CTA */}
        <Link
          href="/characters"
          onClick={() => soundFx.playClick()}
          className="group inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 font-mono text-xs font-bold uppercase text-stone-200 transition"
        >
          <span>← Back to Dossier Grid</span>
        </Link>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="rounded-xl border border-white/10 bg-[#12151a] p-4 flex flex-col justify-between">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest">
            Total Votes Logged
          </span>
          <span className="text-2xl font-black text-cyan-300 mt-1">{totalVotes}</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#12151a] p-4 flex flex-col justify-between">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest">
            Current #1 Neglected
          </span>
          <span className="text-2xl font-black text-amber-300 mt-1 truncate">
            {allRankedEntries[0]?.name || "N/A"}
          </span>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#12151a] p-4 flex flex-col justify-between">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest">
            Custom NPCs Filed
          </span>
          <span className="text-2xl font-black text-red-400 mt-1">{customNpcs.length}</span>
        </div>
      </div>

      {/* Reaction Controls */}
      <div className="rounded-xl border border-white/10 bg-[#111419] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="font-bold text-stone-200 uppercase block">
            Audience Emotional Reaction:
          </span>
          <span className="text-stone-400 text-[11px]">
            Leave a permanent impression on this canon timeline
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {reactions.map((r) => (
            <button
              key={r.label}
              onClick={() => {
                soundFx.playClick();
                setSelectedReaction(r.label);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold uppercase transition ${
                selectedReaction === r.label
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(24,229,226,0.3)]"
                  : "bg-white/5 border-white/15 text-stone-300 hover:border-white/30"
              }`}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs & Reset Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
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
            All Candidates ({allRankedEntries.length})
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

        <button
          onClick={handleResetVotes}
          className="text-stone-500 hover:text-red-400 underline text-[11px] transition"
        >
          Reset All Votes
        </button>
      </div>

      {/* Ranked List */}
      <ol className="flex flex-col gap-3">
        {filteredEntries.map((entry, index) => {
          const rank = index + 1;
          const isFirst = rank === 1 && entry.votes > 0;
          const votePercentage = totalVotes > 0 ? Math.round((entry.votes / totalVotes) * 100) : 0;

          return (
            <li
              key={entry.id}
              className={`group relative flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-4 gap-4 transition-all ${
                isFirst
                  ? "border-amber-400/50 bg-[#171920] shadow-[0_0_25px_rgba(245,158,11,0.1)]"
                  : "border-white/10 bg-[#12151a] hover:border-white/20 hover:bg-[#15191f]"
              }`}
            >
              {/* Left: Rank & Avatar */}
              <div className="flex items-center gap-4">
                <span
                  className={`font-mono text-xl sm:text-2xl font-black w-10 text-center ${
                    rank === 1
                      ? "text-amber-400"
                      : rank === 2
                      ? "text-stone-300"
                      : rank === 3
                      ? "text-amber-600"
                      : "text-stone-600"
                  }`}
                >
                  #{String(rank).padStart(2, "0")}
                </span>

                <div
                  className="h-16 w-16 rounded-xl border border-white/20 bg-black/60 bg-cover bg-center shrink-0 shadow-md"
                  style={{ backgroundImage: `url("${entry.image}")` }}
                  aria-label={entry.name}
                  role="img"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                      {entry.source}
                    </span>
                    {entry.type === "custom" && (
                      <span className="font-mono text-[9px] bg-red-950/60 border border-red-500/40 text-red-400 px-1.5 py-0.2 rounded font-bold">
                        CUSTOM
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white truncate">
                    {entry.name}
                  </h2>
                  {entry.slug && (
                    <Link
                      href={`/character/${entry.slug}`}
                      onClick={() => soundFx.playClick()}
                      className="font-mono text-[11px] text-stone-400 hover:text-cyan-300 transition"
                    >
                      View Case File →
                    </Link>
                  )}
                </div>
              </div>

              {/* Right: Vote Progress & Score */}
              <div className="flex flex-col sm:items-end gap-1.5 sm:min-w-[180px]">
                <div className="flex items-center justify-between sm:justify-end gap-2 font-mono">
                  <span className="text-base font-black text-white">
                    {entry.votes} {entry.votes === 1 ? "VOTE" : "VOTES"}
                  </span>
                  <span className="text-xs text-stone-500">({votePercentage}%)</span>
                </div>

                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFirst ? "bg-amber-400" : "bg-cyan-400"
                    }`}
                    style={{ width: `${votePercentage}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
