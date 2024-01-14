import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClerkLoading, UserButton, auth } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { NavbarSpinner } from "./navbar-spinner";
export default async function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="w-full py-5 sticky top-0 z-50 dark:bg-neutral-900">
      <div className="maincol flex justify-between items-center ">
        <div className="hidden md:flex items-center just">
          <Link
            href={`/`}
            className="font-semibold font-mono tracking-widest text-xl mr-10"
          >
            {/* <Image
              src={foody}
              width={200}
              height={200}
              className="object-cover h-12"
              alt=""
            /> */}
            <h1 className="text-2xl">Foody</h1>
          </Link>
        </div>
        <div className="md:hidden flex">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-start text-2xl">Foody</SheetTitle>
                <SheetDescription className="flex flex-col w-full items-start text-lg pt-10 space-y-2">
                  <Link href={`/explore`}>Explore</Link>
                  <Link href={`/recipes`}>My Recipes</Link>
                  <Link href={`/dashboard`}>Dashboard</Link>
                  <Link href={`/pro`} className="text-orange-500 font-semibold">
                    Upgrade to Pro
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:flex gap-10 hidden">
          <Link href={`/explore`}>Explore</Link>
          <Link href={`/recipes`}>My Recipes</Link>
          <Link href={`/dashboard`}>Dashboard</Link>
          <Link href={`/pro`} className="text-orange-500 font-semibold">
            Upgrade to Pro
          </Link>
        </div>
        <div>
          {userId ? (
            <div className="flex gap-5 items-center">
              {/* <Input
                className="border-b rounded-none bg-transparent"
                placeholder="Search"
              /> */}

              <ModeToggle />
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
