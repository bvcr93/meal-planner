import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
export default async function ExplorePage() {
  const { meals } = await getMeals();
  if (!meals) return null; // or provide some default or error view

  return (
    <div className="maincol">
      <SearchSection meals={meals} />
    </div>
  );
}
