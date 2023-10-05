import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
export default async function ExplorePage() {
  const { meals } = await getMeals();

  // console.log(meals);
  return (
    <div className="maincol">
      <SearchSection meals={meals} />
    </div>
  );
}
