import { notFound } from "next/navigation";
import { TimelineBreach } from "@/components/timeline/timeline-breach";
import { characters, getCharacterByRouteId } from "@/data/characters";

export function generateStaticParams() {
  return characters.map((character) => ({
    id: character.slug,
  }));
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = getCharacterByRouteId(id);

  if (!character) {
    notFound();
  }

  return <TimelineBreach character={character} />;
}
