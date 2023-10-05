import { getMeals } from "@/lib/meals";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import UserCount from "./user-count";
export default async function Navbar() {
  const { userId }: { userId: string | null } = auth();
  const { meals } = await getMeals();
  const currentUser = meals?.find((meal) => meal?.creator?.userId === userId);
  const currentUserCreatorId = currentUser?.creator?.id || null;

  return (
    <div className="w-full py-5">
      <div className="maincol flex justify-between items-center h-14 ">
        <div className="hidden md:flex items-center just">
          <Link href={`/`} className="font-semibold italic text-xl mr-10">
            Foody
          </Link>
          {userId && (
            <UserCount creatorId={currentUserCreatorId} meals={meals} />
          )}
        </div>
        <div className="md:hidden flex">menu</div>
        <div className="md:flex gap-10 hidden">
          <Link href={`/meals`}>Favorites</Link>
          <Link href={`/explore`}>Explore</Link>

          <Link
            href={`/upgrade-to-pro`}
            className="text-orange-500 font-semibold"
          >
            Upgrade to Pro
          </Link>
        </div>
        <div>
          {userId ? (
            <div className="flex gap-5">
              <Input className="border-b rounded-none" placeholder="Search" />
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-5">
              <Link href={`/sign-in`}>
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href={`/sign-up`}>
                <Button variant="ghost">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
