import Link from "next/link";
import type { CSSProperties } from "react";

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
  return (
    <section className="landing-stage" aria-label="USELESS PEOPLE landing">
      <div className="retro-star retro-star-one" aria-hidden="true" />
      <div className="retro-star retro-star-two" aria-hidden="true" />

      <div className="landing-card">
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
