import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton, auth } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { NavbarSpinner } from "./navbar-spinner";
export default async function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="w-full py-5">
      <div className="maincol flex justify-between items-center h-14 ">
        <div className="hidden md:flex items-center just">
          <Link href={`/`} className="font-semibold italic text-xl mr-10">
            Foody
          </Link>
        </div>
        <div className="md:hidden flex">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:flex gap-10 hidden">
          <Link href={`/meals`}>Favorites</Link>
          <Link href={`/explore`}>Explore</Link>
          <Link href={`/recipes`}>Recipes</Link>

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
              {/* <Input
                className="border-b rounded-none bg-transparent"
                placeholder="Search"
              /> */}
              <ClerkLoading>
                <NavbarSpinner />
              </ClerkLoading>
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
