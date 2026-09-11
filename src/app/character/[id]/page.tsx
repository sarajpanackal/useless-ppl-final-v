import { notFound } from "next/navigation";
import { CharacterCaseFile } from "@/components/characters/character-case-file";
import { characters, getCharacterByRouteId } from "@/data/characters";

export function generateStaticParams() {
  return characters.map((character) => ({
    id: character.slug,
  }));
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = getCharacterByRouteId(id);

  if (!character) {
    notFound();
  }

  return <CharacterCaseFile character={character} />;
}
