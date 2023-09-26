import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <div className="w-full ">
      <div className="maincol flex justify-between items-center ">
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
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
