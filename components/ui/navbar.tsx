"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { NavbarSpinner } from "./navbar-spinner";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <div className="w-full py-5 sticky top-0 z-50 dark:bg-neutral-900 bg-white">
      <div className="maincol flex justify-between items-center ">
        <div className="hidden md:flex items-center just">
          <Link
            href={`/`}
            className="font-semibold font-mono tracking-widest text-xl mr-10"
          >
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
                  <Link href={`/weekly-plan`}>Dashboard</Link>
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
          <Link href={`/weekly-plan`}>Dashboard</Link>
          {/* <Link href={`/weekly-plan`}>Dashboard</Link> */}
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
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger className="mt-2">
                    {" "}
                    <Bell />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="w-full flex justify-between items-center">
                      <div>My Account</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      You received a comment on your meal!
                    </DropdownMenuItem>
                    {/* notification onclick links to comment itself */}
                    <DropdownMenuItem className="cursor-pointer">
                      You received a comment on your meal!
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      You received a comment on your meal!
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      You received a comment on your meal!
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="absolute top-2 right-0 w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
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
