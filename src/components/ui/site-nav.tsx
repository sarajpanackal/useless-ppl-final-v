"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { soundFx } from "@/lib/audio-effects";

const navItems = [
  { href: "/", label: "01 // INTRO" },
  { href: "/quote", label: "02 // THESIS" },
  { href: "/characters", label: "03 // DOSSIERS" },
  { href: "/results", label: "04 // LEADERBOARD" },
];

function subscribeSound(callback: () => void) {
  window.addEventListener("useless-sound-change", callback);
  return () => window.removeEventListener("useless-sound-change", callback);
}

function getSoundSnapshot() {
  return soundFx.getMuted();
}

function getSoundServerSnapshot() {
  return true;
}

export function SiteNav() {
  const pathname = usePathname();
  const isMuted = useSyncExternalStore(subscribeSound, getSoundSnapshot, getSoundServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer mounted update
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleSound = () => {
    const next = soundFx.toggleMute();
    if (!next) {
      soundFx.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0c0e10]/85 backdrop-blur-md text-stone-300 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Left: Project title & archive status indicator */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            className="group flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-stone-100 hover:text-cyan-400 transition"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>USELESS PEOPLE</span>
            <span className="hidden sm:inline text-stone-500 font-normal">{"// ARCHIVE"}</span>
          </Link>
        </div>

        {/* Center: Routes */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/characters" &&
                (pathname.startsWith("/character/") || pathname.startsWith("/timeline/")));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => soundFx.playClick()}
                className={`px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider rounded transition-colors ${
                  isActive
                    ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(24,229,226,0.15)]"
                    : "text-stone-400 hover:text-stone-100 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Audio FX Toggle */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleSound}
              type="button"
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-[10px] uppercase text-stone-400 hover:border-cyan-400/50 hover:text-cyan-300 transition cursor-pointer"
            >
              <span>{isMuted ? "🔇" : "🔊"}</span>
              <span className="hidden md:inline">{isMuted ? "FX OFF" : "FX ON"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
