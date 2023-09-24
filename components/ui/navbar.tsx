import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <div className="w-full py-5 border-b">
      <div className="maincol flex justify-between items-center">
        <Link href={`/`}>logo</Link>
        <div className="flex gap-10">
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
