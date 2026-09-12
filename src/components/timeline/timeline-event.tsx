"use client";

import type { TimelineEvent as TimelineEventModel } from "@/data/characters";

const badgeColors: Record<string, string> = {
  canon: "bg-blue-950/80 text-blue-400 border-blue-500/40",
  breach: "bg-red-950/80 text-red-400 border-red-500/40 animate-pulse",
  alternate: "bg-amber-950/80 text-amber-400 border-amber-500/40",
  ending: "bg-emerald-950/80 text-emerald-400 border-emerald-500/40",
  placeholder: "bg-stone-900 text-stone-400 border-stone-700",
};

export function TimelineEvent({
  event,
  isActive = false,
  onClick,
}: {
  event: TimelineEventModel;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const badgeClass = badgeColors[event.eventType] || badgeColors.placeholder;

  return (
    <li
      onClick={onClick}
      className={`group relative flex flex-col gap-2 rounded-xl border p-5 transition-all cursor-pointer ${
        isActive
          ? "border-cyan-400 bg-[#161a22] shadow-[0_0_20px_rgba(24,229,226,0.15)]"
          : "border-white/10 bg-[#111419]/70 hover:border-white/20 hover:bg-[#111419]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${badgeClass}`}>
          {event.label ?? `SEQUENCE ${event.sequence}`} {"//"} {event.eventType}
        </span>
        <span className="font-mono text-[10px] text-stone-500">
          NODE #{String(event.sequence).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition">
        {event.title}
      </h3>

      <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
        {event.description}
      </p>
    </li>
  );
}
