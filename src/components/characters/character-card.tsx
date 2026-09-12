"use client";

import { useState } from "react";
import type { Character } from "@/data/characters";
import type { CustomNpc } from "@/lib/useless-storage";

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

function getCandidateView(candidate: CharacterCardCandidate) {
  if (candidate.kind === "builtin") {
    const { character } = candidate;

    return {
      id: character.id,
      name: character.name,
      source: character.source,
      tag: character.dossierLabel,
      details: character.shortDescription,
      backDetails: character.uselessReason,
      frontImage: character.cardAssets.front,
      selectedImage: character.cardAssets.selected,
      backImage: character.cardAssets.back,
      chooseLabel: character.chooseLabel,
    };
  }

  return {
    id: candidate.character.id,
    name: candidate.character.name,
    source: "Favourite NPC Creator",
    tag: "Custom // user archive",
    details: candidate.character.details,
    backDetails: candidate.character.backDetails,
    frontImage: candidate.character.frontImage,
    selectedImage: candidate.character.frontImage,
    backImage: candidate.character.backImage,
    chooseLabel: "CHOOSE NPC",
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
    <article className="dossier-section">
      <div className="dossier-section-copy">
        <p>{view.tag}</p>
        <h2>{view.name}</h2>
        <span>{view.source}</span>
      </div>

      <DossierFlipCard
        backDetails={view.backDetails}
        backImage={view.backImage}
        candidateId={view.id}
        chooseLabel={view.chooseLabel}
        details={view.details}
        frontImage={view.frontImage}
        hasVoted={hasVoted}
        name={view.name}
        onVote={onVote}
        selectedImage={view.selectedImage}
        voteCount={voteCount}
      />
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
  name: string;
  onVote: (candidateId: string) => void;
  previewOnly?: boolean;
  selectedImage: string;
  voteCount: number;
};

export function DossierFlipCard({
  backDetails,
  backImage,
  candidateId,
  chooseLabel,
  details,
  frontImage,
  hasVoted,
  name,
  onVote,
  previewOnly = false,
  selectedImage,
  voteCount,
}: DossierFlipCardProps) {
  const [isChosen, setIsChosen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  function chooseCandidate() {
    setIsChosen(true);
    setIsFlipped(true);
  }

  function voteCandidate() {
    if (!hasVoted) {
      onVote(candidateId);
    }
  }

  return (
    <div className="dossier-card-shell">
      <div className="dossier-flip-frame" style={{ perspective: "1400px" }}>
        <div
          className="dossier-flip-inner"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <button
            aria-label={`${chooseLabel} for ${name}`}
            aria-hidden={isFlipped}
            className="dossier-face dossier-face-front"
            onClick={chooseCandidate}
            style={{
              backgroundImage: cssImageUrl(isChosen ? selectedImage : frontImage),
            }}
            tabIndex={isFlipped ? -1 : 0}
            type="button"
          >
            <span className="sr-only">{chooseLabel}</span>
          </button>

          <div
            aria-label={`${name} classified dossier`}
            aria-hidden={!isFlipped}
            className="dossier-face dossier-face-back"
            style={{ backgroundImage: cssImageUrl(backImage) }}
          >
            {isFlipped && previewOnly ? (
              <button
                className="dossier-back-return"
                onClick={() => setIsFlipped(false)}
                type="button"
              >
                Return to ID badge
              </button>
            ) : null}

            {isFlipped && !previewOnly ? (
              <button
                className="dossier-back-vote"
                disabled={hasVoted}
                onClick={voteCandidate}
                type="button"
              >
                {hasVoted ? "Vote logged" : "Vote"}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="dossier-status-strip" aria-live="polite">
        <span>{isFlipped ? backDetails : details}</span>
        <b>
          {voteCount} {voteCount === 1 ? "vote" : "votes"}
        </b>
      </div>
    </div>
  );
}
