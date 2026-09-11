import { RouteLink } from "@/components/ui/route-link";
import { FlowerAnimation } from "./flower-animation";

export function QuoteScene() {
  return (
    <section className="grid gap-10 md:grid-cols-[1fr_320px] md:items-center">
      <div>
        <p className="mb-3 text-sm font-medium text-blue-note">
          Quote / flower route
        </p>
        <blockquote className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
          You can be the prettiest shade of blue, but if their favorite color is
          red, it does not matter.
        </blockquote>
        <p className="mt-5 max-w-2xl leading-8 text-muted">
          This route is only a skeleton for now. The full composition, timing,
          typography, and emotional damage are waiting for human direction.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <RouteLink href="/characters" variant="primary">
            Continue to character selection
          </RouteLink>
          <RouteLink href="/">Back to landing</RouteLink>
        </div>
      </div>
      <FlowerAnimation />
    </section>
  );
}
