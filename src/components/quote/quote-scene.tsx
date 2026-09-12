"use client";

import Image from "next/image";
import Link from "next/link";
import { soundFx } from "@/lib/audio-effects";

export function QuoteScene() {
  return (
    <section className="quote-scene-stage min-h-[calc(100vh-48px)] relative flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden">
      <div className="crt-grain" aria-hidden="true" />

      {/* Top Classified Sub-Header */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono tracking-widest text-stone-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-stone-300 font-semibold">CANONICAL DIRECTIVE // THESIS</span>
        </div>
        <span className="hidden sm:inline text-stone-500 uppercase">SUBJECT: EMOTIONAL INCONSEQUENCE</span>
      </div>

      {/* Centerpiece Content: Flower & Dramatic Quote */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14 py-8">
        {/* The Flower visual */}
        <div className="quote-flower-anim flex justify-center lg:justify-end">
          <div className="relative w-48 sm:w-64 md:w-80 lg:w-[26rem] aspect-[4/5] filter drop-shadow-[0_20px_35px_rgba(24,229,226,0.15)] transition-transform duration-700">
            <Image
              alt="The melancholic flower symbol of overlooked beauty"
              className="object-contain"
              fill
              priority
              sizes="(max-width: 768px) 250px, (max-width: 1200px) 380px, 460px"
              src="/quote-flower.png"
            />
          </div>
        </div>

        {/* The Quote Statement */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-stone-500">
            &mdash; The Unforgiving Reality
          </span>
          <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-stone-100 tracking-tight">
            <span>You can be the prettiest shade of </span>
            <span className="font-italic text-blue-400 font-semibold drop-shadow-[0_0_16px_rgba(59,130,246,0.6)]">
              blue
            </span>
            <span>, but if their favorite color is </span>
            <span className="font-bold text-red-500 drop-shadow-[0_0_18px_rgba(239,68,68,0.7)]">
              red
            </span>
            <span>, it does not matter.</span>
          </blockquote>

          <p className="mt-6 max-w-xl text-sm sm:text-base font-sans text-stone-400 leading-relaxed">
            In canon, they were placed in the margins—offering cakes, taking stray punches, or following orders from the penguins in charge. Here, their insignificance is given full cinematic weight.
          </p>
        </div>
      </div>

      {/* Bottom Navigation Forward Prompt */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-stone-400 uppercase tracking-wider text-center sm:text-left">
          IF YOU HAVE EVER BEEN OVERLOOKED BY THE MAIN PLOT:
        </span>
        <Link
          href="/characters"
          onClick={() => soundFx.playClick()}
          className="group inline-flex items-center gap-3 rounded-lg border border-cyan-500/50 bg-cyan-950/40 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-cyan-300 shadow-[0_0_20px_rgba(24,229,226,0.15)] transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(24,229,226,0.4)] active:scale-95"
        >
          <span>ENTER CLASSIFIED CASTING</span>
          <span className="text-base transition-transform group-hover:translate-x-1">&rsaquo;</span>
        </Link>
      </div>
    </section>
  );
}
