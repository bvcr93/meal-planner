import { db } from "@/lib/db";
import SearchInput from "@/components/ui/search-input";
import { Categories } from "@/components/ui/categories";
import { auth } from "@clerk/nextjs";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
const names = [{ name: "asd", id: 1 }, { name: "asd", id: 2 }];
export default async function ExplorePage() {
  const categories = await db.category.findMany();
  return (
    <div className="maincol">
      <Categories data={categories} />
      <SearchInput />
      {/* <Link href={`/explore/${id}`}>asd</Link> */}
    </div>
  );
}
