import { db } from "@/lib/db";
import SearchInput from "@/components/ui/search-input";
import { Categories } from "@/components/ui/categories";
import { auth } from "@clerk/nextjs";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
export default async function ExplorePage() {
  const categories = await db.category.findMany();
  return (
    <div className="maincol">
      <Categories data={categories} />
      <SearchInput />
    </div>
  );
}
