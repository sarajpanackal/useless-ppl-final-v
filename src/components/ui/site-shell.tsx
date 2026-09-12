import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-stone-200 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <SiteNav />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
