import Link from "next/link";
import React from "react";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { Button } from "./button";

export default function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="w-full">
      <div className="maincol flex justify-between items-center h-14">
        <div className="hidden md:flex">
          <Link href={`/`} className="font-semibold italic text-xl">
            Foody
          </Link>
        </div>
        <div className="md:hidden flex">menu</div>
        <div className="md:flex gap-10 hidden">
          <Link href={`/meals`}>My meals</Link>
          <Link href={`/explore`}>Explore</Link>
        </div>
        <div>
          {userId ? (
            <UserButton afterSignOutUrl="/" />
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
