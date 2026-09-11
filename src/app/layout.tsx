import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/ui/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "USELESS PEOPLE",
  description:
    "An intentionally useless fictional experience for overlooked characters.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
