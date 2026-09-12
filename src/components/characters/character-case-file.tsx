"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Character } from "@/data/characters";
import { getPlotNeglectScore } from "@/data/characters";
import { soundFx } from "@/lib/audio-effects";

export function CharacterCaseFile({ character }: { character: Character }) {
  const [activePhoto, setActivePhoto] = useState<"front" | "selected" | "back">("front");
  const [revealedRedactions, setRevealedRedactions] = useState<Record<string, boolean>>({});

  const neglectScore = getPlotNeglectScore(character);

  const toggleRedaction = (id: string) => {
    soundFx.playClick();
    setRevealedRedactions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentPhotoUrl =
    activePhoto === "front"
      ? character.cardAssets.front
      : activePhoto === "selected"
      ? character.cardAssets.selected
      : character.cardAssets.back;

  return (
    <article className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-12 flex flex-col gap-8">
      {/* Top Breadcrumbs & Stamp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
          <Link
            href="/characters"
            onClick={() => soundFx.playClick()}
            className="hover:text-cyan-300 transition"
          >
            ← ALL DOSSIERS
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold uppercase">{character.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="declassified-stamp">DECLASSIFIED</span>
          <span className="classified-stamp">NEGLECT: CRITICAL</span>
        </div>
      </div>

      {/* Main Dossier Folder Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 bg-[#111419] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Left Column: Evidence Photo Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[768/1180] rounded-xl overflow-hidden border border-white/15 bg-black/80 shadow-lg">
            <Image
              alt={`${character.name} evidence photo`}
              className="object-cover transition-all duration-300"
              fill
              priority
              sizes="340px"
              src={currentPhotoUrl}
            />
            <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-cyan-300 border border-white/10">
              FILE: {activePhoto.toUpperCase()}
            </div>
          </div>

          {/* Photo Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] font-bold">
            <button
              onClick={() => {
                soundFx.playClick();
                setActivePhoto("front");
              }}
              className={`py-1.5 rounded uppercase border transition ${
                activePhoto === "front"
                  ? "bg-cyan-500 text-black border-cyan-400 font-black"
                  : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
              }`}
            >
              Badge
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActivePhoto("selected");
              }}
              className={`py-1.5 rounded uppercase border transition ${
                activePhoto === "selected"
                  ? "bg-cyan-500 text-black border-cyan-400 font-black"
                  : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
              }`}
            >
              Selected
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActivePhoto("back");
              }}
              className={`py-1.5 rounded uppercase border transition ${
                activePhoto === "back"
                  ? "bg-cyan-500 text-black border-cyan-400 font-black"
                  : "bg-white/5 text-stone-400 border-white/10 hover:text-white"
              }`}
            >
              Dossier
            </button>
          </div>
        </div>

        {/* Right Column: Case Notes & Neglect Evidence */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-red-400 font-bold uppercase tracking-widest">
              <span>{character.dossierLabel}</span>
              <span>{"//"}</span>
              <span className="text-stone-400">{character.mediaType}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-1">
              {character.name}
            </h1>
            <p className="font-mono text-sm text-cyan-300 mt-1">
              Source: {character.source}
            </p>

            <div className="mt-6 rounded-lg bg-black/40 border border-white/10 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
                {"// SUMMARY DESCRIPTION"}
              </span>
              <p className="text-stone-300 font-sans leading-relaxed text-sm">
                {character.shortDescription}
              </p>
            </div>

            {/* Interactive Redacted Canonical Reason */}
            <div className="mt-4 rounded-lg bg-black/40 border border-red-500/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 font-bold">
                  {"// OFFICIAL NEGLECT CHARGES"}
                </span>
                <span className="font-mono text-[9px] text-stone-500 uppercase">
                  (TAP BLACK BARS TO REVEAL)
                </span>
              </div>
              <p className="text-stone-300 font-sans leading-relaxed text-sm">
                {character.uselessReason.split(" ").map((word, idx) => {
                  const key = `w-${idx}`;
                  const isRedacted = idx % 3 === 0;
                  if (isRedacted && !revealedRedactions[key]) {
                    return (
                      <span
                        key={key}
                        onClick={() => toggleRedaction(key)}
                        className="redacted-block mx-0.5"
                        title="Click to reveal redacted classified word"
                      >
                        {word}
                      </span>
                    );
                  }
                  return <span key={key}> {word}</span>;
                })}
              </p>
            </div>
          </div>

          {/* Plot Neglect Diagnostic & Metrics */}
          <div className="rounded-lg bg-black/60 border border-white/10 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">
                  Calculated Neglect Index
                </span>
                <span className="font-mono text-xl font-bold text-red-400">
                  {neglectScore} / 400
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950/40 border border-emerald-500/40 px-2.5 py-1 rounded">
                CRITICAL IRRELEVANCE
              </span>
            </div>

            {/* Stat Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Plot Relevance</span>
                  <span className="text-white font-bold">{character.stats.plotRelevance}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${character.stats.plotRelevance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Protagonist Energy</span>
                  <span className="text-white font-bold">{character.stats.protagonistEnergy}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${character.stats.protagonistEnergy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Writer Attention</span>
                  <span className="text-white font-bold">{character.stats.writerAttention}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${character.stats.writerAttention}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-400 mb-1">
                  <span>Plot Armor</span>
                  <span className="text-white font-bold">{character.stats.plotArmor}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{ width: `${character.stats.plotArmor}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alternate Ending Brief */}
          <div className="rounded-lg bg-cyan-950/20 border border-cyan-500/20 p-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
              {"// ALTERNATE ENDING TRAJECTORY"}
            </span>
            <p className="text-xs font-mono text-stone-300 italic">
              &quot;{character.ending}&quot;
            </p>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href={`/timeline/${character.slug}`}
              onClick={() => soundFx.playClick()}
              className="w-full sm:w-auto flex-1 rounded-lg bg-red-600 hover:bg-red-500 py-3 px-6 font-mono text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 text-center transition-all hover:scale-[1.01] active:scale-95"
            >
              BREACH THE TIMELINE →
            </Link>
            <Link
              href="/characters"
              onClick={() => soundFx.playClick()}
              className="w-full sm:w-auto rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-6 font-mono text-xs font-bold uppercase text-stone-300 text-center transition"
            >
              Back to Dossiers
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
