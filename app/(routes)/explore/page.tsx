import { db } from "@/lib/db";
import SearchInput from "@/components/ui/search-input";
import { Categories } from "@/components/ui/categories";
export default async function ExplorePage() {
  const categories = await db.category.findMany();
  return (
    <div className="maincol">
      <Categories data={categories} />
      <SearchInput />
    </div>
  );
}
