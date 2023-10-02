import Link from "next/link";
import React from "react";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { Button } from "./button";
import { Input } from "./input";

export default function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="w-full py-5">
      <div className="maincol flex justify-between items-center h-14 ">
        <div className="hidden md:flex items-center just">
          <Link href={`/`} className="font-semibold italic text-xl mr-10">
            Foody
          </Link>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            5 more left
          </button>
        </div>
        <div className="md:hidden flex">menu</div>
        <div className="md:flex gap-10 hidden">
          <Link href={`/meals`}>My meals</Link>
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
