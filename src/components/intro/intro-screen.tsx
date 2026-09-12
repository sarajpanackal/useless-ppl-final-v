"use client";

import Link from "next/link";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { soundFx } from "@/lib/audio-effects";

const lines = ["useless people", "presents", "useless", "people!!"];

const tileStyles = [
  "bg-[#fcf7ee] text-[#1a1816] font-serif border-stone-300",
  "bg-[#ece6e9] text-[#2c3035] font-mono border-stone-300",
  "bg-[#8e9ca7] text-white font-serif border-stone-400",
  "bg-[#494c52] text-white font-mono border-stone-600",
  "bg-[#f6efe1] text-[#332a26] font-serif border-stone-300",
  "bg-[#c5d1d8] text-[#3c4247] font-mono border-stone-400",
  "bg-[#eae1e8] text-[#1b1919] font-serif border-stone-300",
  "bg-[#b3a693] text-[#1c1714] font-mono border-stone-400",
];

function getTileStyle(lineIndex: number, letterIndex: number) {
  return tileStyles[(lineIndex * 5 + letterIndex) % tileStyles.length];
}

function getRotation(lineIndex: number, letterIndex: number) {
  const rotations = [-3.5, 2.5, -1.8, 2, -2.8, 3, -1.5, 1.2];
  return rotations[(lineIndex * 7 + letterIndex) % rotations.length];
}

function getOffset(lineIndex: number, letterIndex: number) {
  const offsets = [0, -6, 5, -3, 4, -5, 3, 1];
  return offsets[(lineIndex * 3 + letterIndex) % offsets.length];
}

function LetterTile({
  char,
  letterIndex,
  lineIndex,
}: {
  char: string;
  letterIndex: number;
  lineIndex: number;
}) {
  if (char === " ") {
    return <span className="w-2.5 sm:w-4 md:w-6 inline-block" aria-hidden="true" />;
  }

  return (
    <span
      className={
        "landing-letter cursor-pointer transition-transform hover:scale-110 hover:z-20 " +
        getTileStyle(lineIndex, letterIndex)
      }
      onMouseEnter={() => soundFx.playClick()}
      style={
        {
          "--letter-rotation": `${getRotation(lineIndex, letterIndex)}deg`,
          "--letter-y": `${getOffset(lineIndex, letterIndex)}px`,
          "--juggle-delay": `${lineIndex * 0.18 + letterIndex * 0.035}s`,
        } as CSSProperties
      }
    >
      {char}
    </span>
  );
}

export function IntroScreen() {
  const [coords, setCoords] = useState({
    cardX: 0,
    cardY: 0,
    titleX: 0,
    titleY: 0,
    driftX: 0,
    driftY: 0,
  });

  function tracePointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setCoords({
      cardX: x * 0.25,
      cardY: y * 0.18,
      titleX: x * 0.75,
      titleY: y * 0.5,
      driftX: x * 3,
      driftY: y * 3,
    });
  }

  function releasePointer() {
    setCoords({
      cardX: 0,
      cardY: 0,
      titleX: 0,
      titleY: 0,
      driftX: 0,
      driftY: 0,
    });
  }

  return (
    <section className="landing-stage" aria-label="USELESS PEOPLE landing">
      {/* Background atmosphere badges */}
      <div
        className="retro-star left-6 top-8 sm:left-14 sm:top-14 rotate-[-12deg]"
        aria-hidden="true"
      />
      <div
        className="retro-star right-6 bottom-8 sm:right-16 sm:bottom-16 rotate-[15deg] scale-90 !bg-[#bfd0dc]"
        aria-hidden="true"
      />

      {/* Main Ransom Note Board */}
      <div
        className="landing-board px-4 py-8 sm:px-10 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden"
        onPointerLeave={releasePointer}
        onPointerMove={tracePointer}
        style={
          {
            "--mouse-card-x": `${coords.cardX}rem`,
            "--mouse-card-y": `${coords.cardY}rem`,
          } as CSSProperties
        }
      >
        {/* Top classified stamp header */}
        <div className="w-full flex items-center justify-between pb-6 sm:pb-8 border-b border-stone-400/30 text-stone-600 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span>CASE FILE: SPECIAL ARCHIVE</span>
          </div>
          <span className="hidden sm:inline">SERIOUSNESS FACTOR: EXCESSIVE</span>
        </div>

        {/* The Animated Letter Lines */}
        <div
          className="my-auto py-6 sm:py-10 flex flex-col items-center justify-center gap-1.5 sm:gap-3 transition-transform duration-150 ease-out"
          style={
            {
              transform: `translate(${coords.titleX}rem, ${coords.titleY}rem)`,
              "--letter-drift-x": `${coords.driftX}px`,
              "--letter-drift-y-up": `${coords.driftY}px`,
            } as CSSProperties
          }
        >
          <h1
            className="flex flex-col items-center gap-1 sm:gap-2.5"
            aria-label="useless people presents useless people!!"
          >
            {lines.map((line, lineIndex) => (
              <span className="flex items-center justify-center gap-1 sm:gap-1.5" key={line}>
                {Array.from(line).map((char, letterIndex) => (
                  <LetterTile
                    char={char}
                    letterIndex={letterIndex}
                    lineIndex={lineIndex}
                    key={line + "-" + letterIndex}
                  />
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Forward Action Button */}
        <div className="w-full flex items-center justify-between pt-6 border-t border-stone-400/30">
          <p className="font-mono text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider hidden sm:block">
            Phase 01 // Canonical Neglect Investigation
          </p>
          <Link
            href="/quote"
            onClick={() => soundFx.playClick()}
            className="ml-auto group inline-flex items-center gap-2.5 rounded-lg bg-[#0e1114] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-95"
            aria-label="Proceed to the emotional thesis quote"
          >
            <span>DISCOVER THE THESIS</span>
            <span className="text-cyan-400 transition-transform group-hover:translate-x-1 group-hover:text-white text-base">
              &rsaquo;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
