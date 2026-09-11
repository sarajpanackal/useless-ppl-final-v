import Link from "next/link";
import type { ReactNode } from "react";

type RouteLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function RouteLink({
  children,
  href,
  variant = "secondary",
}: RouteLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center border px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? "border-foreground bg-foreground text-background hover:bg-blue-note"
      : "border-line bg-background text-foreground hover:border-foreground";

  return (
    <Link className={base + " " + styles} href={href}>
      {children}
    </Link>
  );
}
