import Image from "next/image";
import { User } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Categories } from "@/components/ui/categories";
export default async function Home() {
  // In case the user signs out while on the page.
  const categories = await db.category.findMany();

  return (
    <div className="maincol">
      <Categories data={categories}/>
    </div>
  );
}
