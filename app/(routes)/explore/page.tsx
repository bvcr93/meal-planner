import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
export default async function ExplorePage() {
  const { meals } = await getMeals();
  return (
    <div className="maincol">
      <SearchSection allMeals={meals} />
    </div>
  );
}
