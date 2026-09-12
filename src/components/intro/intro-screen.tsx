"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";

const lines = ["useless people", "presents", "useless", "people!!"];

const tileStyles = [
  "bg-[#f9f3e6] text-[#111111] font-serif",
  "bg-[#ebe6e8] text-[#32373b] font-mono",
  "bg-[#9facb6] text-white font-serif",
  "bg-[#64666a] text-white font-serif",
  "bg-[#f3eddd] text-[#3b3330] font-mono",
  "bg-[#ccd6dc] text-[#555b60] font-serif",
  "bg-[#ede6eb] text-[#111111] font-serif",
  "bg-[#b9ae9c] text-[#211b18] font-mono",
];

function getTileStyle(lineIndex: number, letterIndex: number) {
  return tileStyles[(lineIndex * 5 + letterIndex) % tileStyles.length];
}

function getRotation(lineIndex: number, letterIndex: number) {
  const rotations = [-3, 2, -1, 1.5, -2, 2.5, -1.5, 1];

  return rotations[(lineIndex * 7 + letterIndex) % rotations.length];
}

function getOffset(lineIndex: number, letterIndex: number) {
  const offsets = [0, -5, 4, -2, 3, -4, 2, 1];

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
    return <span className="w-3 sm:w-5" aria-hidden="true" />;
  }

  return (
    <span
      className={
        "landing-letter inline-grid place-items-center shadow-[0_5px_9px_rgba(64,56,43,0.14)] " +
        getTileStyle(lineIndex, letterIndex)
      }
      style={
        {
          "--letter-rotation": getRotation(lineIndex, letterIndex) + "deg",
          "--letter-y": getOffset(lineIndex, letterIndex) + "px",
          "--juggle-delay": lineIndex * 0.18 + letterIndex * 0.035 + "s",
        } as CSSProperties
      }
    >
      {char}
    </span>
  );
}

export function IntroScreen() {
  function tracePointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    event.currentTarget.style.setProperty("--mouse-bg-x", `${50 + x * 8}%`);
    event.currentTarget.style.setProperty("--mouse-bg-y", `${42 + y * 6}%`);
    event.currentTarget.style.setProperty("--mouse-card-x", `${x * 0.18}rem`);
    event.currentTarget.style.setProperty("--mouse-card-y", `${y * 0.12}rem`);
    event.currentTarget.style.setProperty("--mouse-title-x", `${x * 0.85}rem`);
    event.currentTarget.style.setProperty("--mouse-title-y", `${y * 0.55}rem`);
    event.currentTarget.style.setProperty("--letter-drift-x", `${x * 0.16}rem`);
    event.currentTarget.style.setProperty(
      "--letter-drift-x-reverse",
      `${x * -0.1}rem`,
    );
    event.currentTarget.style.setProperty("--letter-drift-y-up", `${y * 0.08}rem`);
    event.currentTarget.style.setProperty(
      "--letter-drift-y-down",
      `${y * 0.06}rem`,
    );
  }

  function releasePointer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--mouse-bg-x", "50%");
    event.currentTarget.style.setProperty("--mouse-bg-y", "42%");
    event.currentTarget.style.setProperty("--mouse-card-x", "0rem");
    event.currentTarget.style.setProperty("--mouse-card-y", "0rem");
    event.currentTarget.style.setProperty("--mouse-title-x", "0rem");
    event.currentTarget.style.setProperty("--mouse-title-y", "0rem");
    event.currentTarget.style.setProperty("--letter-drift-x", "0rem");
    event.currentTarget.style.setProperty("--letter-drift-x-reverse", "0rem");
    event.currentTarget.style.setProperty("--letter-drift-y-up", "0rem");
    event.currentTarget.style.setProperty("--letter-drift-y-down", "0rem");
  }

  return (
    <section className="landing-stage" aria-label="USELESS PEOPLE landing">
      <div className="retro-star retro-star-one" aria-hidden="true" />
      <div className="retro-star retro-star-two" aria-hidden="true" />

      <div
        className="landing-card"
        onPointerLeave={releasePointer}
        onPointerMove={tracePointer}
        style={
          {
            "--mouse-bg-x": "50%",
            "--mouse-bg-y": "42%",
            "--mouse-card-x": "0rem",
            "--mouse-card-y": "0rem",
            "--mouse-title-x": "0rem",
            "--mouse-title-y": "0rem",
            "--letter-drift-x": "0rem",
            "--letter-drift-x-reverse": "0rem",
            "--letter-drift-y-up": "0rem",
            "--letter-drift-y-down": "0rem",
          } as CSSProperties
        }
      >
        <h1
          className="landing-title"
          aria-label="useless people presents useless people!!"
        >
          {lines.map((line, lineIndex) => (
            <span className="landing-line" key={line}>
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

        <Link
          className="landing-next"
          href="/quote"
          aria-label="Go to quote page"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </Link>
      </div>
    </section>
  );
}
