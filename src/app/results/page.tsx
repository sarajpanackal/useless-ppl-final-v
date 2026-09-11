import { ResultsBoard } from "@/components/results/results-board";
import { characters } from "@/data/characters";

export default function ResultsPage() {
  return <ResultsBoard characters={characters} />;
}
