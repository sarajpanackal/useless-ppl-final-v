"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { characters } from "@/data/characters";

const firstCharacter = characters[0];

const navLinks = [
  { href: "/", label: "Landing" },
  { href: "/quote", label: "Quote" },
  { href: "/characters", label: "Characters" },
  { href: "/character/" + firstCharacter.slug, label: "Case File" },
  { href: "/timeline/" + firstCharacter.slug, label: "Timeline" },
  { href: "/results", label: "Results" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div className="min-h-screen bg-white text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-base font-semibold">
            USELESS PEOPLE
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <Link
                className="border border-line px-3 py-2 text-sm text-muted transition hover:border-foreground hover:text-foreground"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
