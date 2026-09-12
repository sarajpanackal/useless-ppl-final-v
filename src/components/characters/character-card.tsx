"use client";

import { useState } from "react";
import Link from "next/link";
import type { Character } from "@/data/characters";
import type { CustomNpc } from "@/lib/useless-storage";
import { soundFx } from "@/lib/audio-effects";

export type CharacterCardCandidate =
  | {
      kind: "builtin";
      character: Character;
    }
  | {
      kind: "custom";
      character: CustomNpc;
    };

type CharacterCardProps = {
  candidate: CharacterCardCandidate;
  hasVoted: boolean;
  voteCount: number;
  onVote: (candidateId: string) => void;
};

function cssImageUrl(src: string) {
  return `url("${src.replaceAll('"', '\\"')}")`;
}

export function getCandidateView(candidate: CharacterCardCandidate) {
  if (candidate.kind === "builtin") {
    const { character } = candidate;

    return {
      id: character.id,
      slug: character.slug,
      name: character.name,
      source: character.source,
      tag: character.dossierLabel,
      details: character.shortDescription,
      backDetails: character.uselessReason,
      frontImage: character.cardAssets.front,
      selectedImage: character.cardAssets.selected,
      backImage: character.cardAssets.back,
      chooseLabel: character.chooseLabel,
      isBuiltin: true,
    };
  }

  return {
    id: candidate.character.id,
    slug: candidate.character.id,
    name: candidate.character.name,
    source: "Favourite NPC Creator",
    tag: "CUSTOM // ARCHIVED FILE",
    details: candidate.character.details,
    backDetails: candidate.character.backDetails,
    frontImage: candidate.character.frontImage,
    selectedImage: candidate.character.frontImage,
    backImage: candidate.character.backImage,
    chooseLabel: "CHOOSE NPC",
    isBuiltin: false,
  };
}

export function CharacterCard({
  candidate,
  hasVoted,
  onVote,
  voteCount,
}: CharacterCardProps) {
  const view = getCandidateView(candidate);

  return (
    <article className="group flex flex-col rounded-xl border border-white/10 bg-[#12151a] p-4 shadow-xl transition-all hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Top Header info */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 font-bold">
            {view.tag}
          </span>
          <h2 className="text-xl font-black tracking-tight text-white mt-0.5">
            {view.name}
          </h2>
          <span className="text-xs font-mono text-stone-400">{view.source}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300 font-bold">
            {voteCount} {voteCount === 1 ? "VOTE" : "VOTES"}
          </span>
          {hasVoted && (
            <span className="text-[9px] font-mono text-emerald-400 mt-1 uppercase">
              ● Voted
            </span>
          )}
        </div>
      </div>

      {/* 3D Flip Card */}
      <div className="w-full flex-1">
        <DossierFlipCard
          backDetails={view.backDetails}
          backImage={view.backImage}
          candidateId={view.id}
          chooseLabel={view.chooseLabel}
          details={view.details}
          frontImage={view.frontImage}
          hasVoted={hasVoted}
          isBuiltin={view.isBuiltin}
          name={view.name}
          onVote={onVote}
          selectedImage={view.selectedImage}
          slug={view.slug}
        />
      </div>
    </article>
  );
}

type DossierFlipCardProps = {
  backDetails: string;
  backImage: string;
  candidateId: string;
  chooseLabel: string;
  details: string;
  frontImage: string;
  hasVoted: boolean;
  isBuiltin?: boolean;
  name: string;
  onVote: (candidateId: string) => void;
  previewOnly?: boolean;
  selectedImage: string;
  slug?: string;
};

export function DossierFlipCard({
  backDetails,
  backImage,
  candidateId,
  chooseLabel,
  details,
  frontImage,
  hasVoted,
  isBuiltin = false,
  name,
  onVote,
  previewOnly = false,
  selectedImage,
  slug,
}: DossierFlipCardProps) {
  const [isChosen, setIsChosen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    soundFx.playCardFlip();
    if (!isFlipped) {
      setIsChosen(true);
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }

  function handleVote(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasVoted && !previewOnly) {
      soundFx.playVoteStamp();
      onVote(candidateId);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 3D Perspective Card Container */}
      <div
        className="dossier-card-container relative w-full aspect-[768/1180] cursor-pointer select-none"
        onClick={toggleFlip}
        role="button"
        tabIndex={0}
        aria-label={`${isFlipped ? "Flip to badge" : "Flip to dossier"} for ${name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        <div className={`dossier-card-inner ${isFlipped ? "flipped" : ""}`}>
          {/* ================= Front Side (ID Badge / Selected Card) ================= */}
          <div
            className="backface-hidden absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-cover bg-center transition-transform"
            style={{
              backgroundImage: cssImageUrl(isChosen ? selectedImage : frontImage),
            }}
          >
            {/* Overlay Gradient & Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <span className="rounded bg-black/70 backdrop-blur-sm border border-white/20 px-2 py-0.5 font-mono text-[10px] text-stone-300 font-bold uppercase">
                  CLASSIFIED // FRONT
                </span>
                <span className="rounded-full bg-cyan-500/20 border border-cyan-400/50 p-1.5 text-cyan-300 text-xs">
                  🔄
                </span>
              </div>

              {/* Bottom Card Action Tag */}
              <div className="rounded-lg bg-black/80 backdrop-blur-md border border-white/15 p-3 flex items-center justify-between">
                <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {isChosen ? "SELECTED" : chooseLabel}
                </div>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest animate-pulse">
                  CLICK TO FLIP ↷
                </span>
              </div>
            </div>
          </div>

          {/* ================= Back Side (Classified Dossier) ================= */}
          <div
            className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: cssImageUrl(backImage) }}
          >
            {/* Dossier Tactical Overlay */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col justify-between p-4 border border-white/10 rounded-2xl">
              {/* Back Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  {"// DECLASSIFIED REPORT"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip();
                  }}
                  className="rounded bg-white/10 hover:bg-white/20 px-2 py-0.5 font-mono text-[10px] text-stone-300 hover:text-white uppercase transition"
                  aria-label="Return to front of card"
                >
                  ↩ Flip Front
                </button>
              </div>

              {/* Back Body: Canonical Neglect Reason */}
              <div className="my-auto py-2 flex flex-col gap-2">
                <div className="classified-stamp self-start text-[10px]">
                  CANONICAL NEGLECT
                </div>
                <p className="text-xs font-sans text-stone-200 leading-relaxed bg-black/60 p-2.5 rounded border border-white/10">
                  {backDetails}
                </p>

                {/* Deep links for Built-in characters */}
                {isBuiltin && slug && (
                  <div className="grid grid-cols-2 gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/character/${slug}`}
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center justify-center rounded bg-stone-800 hover:bg-stone-700 border border-white/15 px-2.5 py-1.5 font-mono text-[10px] font-bold text-stone-200 hover:text-cyan-300 uppercase tracking-wider transition"
                    >
                      Case File →
                    </Link>
                    <Link
                      href={`/timeline/${slug}`}
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center justify-center rounded bg-stone-800 hover:bg-stone-700 border border-white/15 px-2.5 py-1.5 font-mono text-[10px] font-bold text-stone-200 hover:text-red-400 uppercase tracking-wider transition"
                    >
                      Timeline →
                    </Link>
                  </div>
                )}
              </div>

              {/* Back Footer: Vote Trigger */}
              <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
                {!previewOnly && (
                  <button
                    type="button"
                    disabled={hasVoted}
                    onClick={handleVote}
                    className={`w-full py-2.5 px-3 rounded-lg font-mono text-xs font-black uppercase tracking-widest transition-all ${
                      hasVoted
                        ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 cursor-default"
                        : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(24,229,226,0.3)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                    }`}
                  >
                    {hasVoted ? "✓ VOTE RECORDED" : "CAST VOTE FOR THIS NPC"}
                  </button>
                )}
                {previewOnly && (
                  <span className="text-center font-mono text-[10px] text-stone-400 uppercase">
                    Preview Mode // Flip active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under-Card Summary Bar */}
      <div className="flex items-center justify-between rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs font-mono text-stone-400">
        <span className="truncate pr-2">{isFlipped ? "Viewing classified back" : details}</span>
        <button
          type="button"
          onClick={toggleFlip}
          className="shrink-0 text-cyan-400 hover:text-cyan-300 font-bold uppercase text-[10px]"
        >
          {isFlipped ? "SHOW FRONT" : "FLIP CARD ↷"}
        </button>
      </div>
    </div>
  );
}
