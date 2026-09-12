"use client";

import Link from "next/link";
import Image from "next/image";
import type { Character } from "@/data/characters";
import { TimelineBranch } from "./timeline-branch";
import { soundFx } from "@/lib/audio-effects";

export function TimelineBreach({ character }: { character: Character }) {
  return (
    <article className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-12 flex flex-col gap-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
          <Link
            href={`/character/${character.slug}`}
            onClick={() => soundFx.playClick()}
            className="hover:text-cyan-300 transition"
          >
            ← CASE FILE: {character.name.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-red-400 font-bold uppercase">TIMELINE BREACH</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 bg-red-950/50 border border-red-500/40 px-2.5 py-1 rounded font-bold animate-pulse">
            ● QUANTUM BREACH IN PROGRESS
          </span>
        </div>
      </div>

      {/* Main Breach Showcase */}
      <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-[#121014] p-6 sm:p-8 shadow-2xl">
        {/* Background ambient glow */}
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-center border-b border-white/10 pb-8">
          <div className="relative h-32 w-32 rounded-xl overflow-hidden border-2 border-red-500 shadow-lg mx-auto md:mx-0">
            <Image
              alt={character.name}
              className="object-cover"
              fill
              priority
              sizes="140px"
              src={character.cardAssets.selected}
            />
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold">
              {"// ALTERNATE REALITY OVERRIDE"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
              {character.name}: Alternate Timeline
            </h1>
            <p className="mt-2 font-mono text-xs sm:text-sm text-stone-400 leading-relaxed max-w-2xl">
              Canon abandoned {character.name} to the background. In this alternate breach continuum, narrative priority shifts, forcing the primary storyline to reckon with their existence.
            </p>
          </div>
        </div>

        {/* Timeline Branch Sequence */}
        <div className="relative z-10 mt-8">
          <TimelineBranch character={character} />
        </div>

        {/* Alternate Ending Box */}
        <div className="relative z-10 mt-8 rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase mb-2">
            <span>{"// ARCHIVED ALTERNATE ENDING"}</span>
          </div>
          <p className="font-mono text-sm text-stone-200 italic leading-relaxed">
            &quot;{character.ending}&quot;
          </p>
        </div>

        {/* Action Controls */}
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3 border-t border-white/10 pt-6">
          <Link
            href="/results"
            onClick={() => soundFx.playClick()}
            className="w-full sm:w-auto flex-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 py-3 px-6 font-mono text-xs font-black uppercase tracking-widest text-black shadow-lg shadow-cyan-500/20 text-center transition-all hover:scale-[1.01] active:scale-95"
          >
            VIEW USELESS LEADERBOARD →
          </Link>
          <Link
            href={`/character/${character.slug}`}
            onClick={() => soundFx.playClick()}
            className="w-full sm:w-auto rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-6 font-mono text-xs font-bold uppercase text-stone-300 text-center transition"
          >
            Back to Case File
          </Link>
        </div>
      </div>
    </article>
  );
}
