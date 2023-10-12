import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
export default async function ExplorePage() {
  const { meals } = await getMeals();

  return (
    <div className="min-h-screen">
      <div className="flex">
        <h2 className="text-lg sm:text-xl mb-16 mt-10">Find you favorite meal</h2>
      </div>
      <SearchSection meals={meals} />
    </div>
  );
}
