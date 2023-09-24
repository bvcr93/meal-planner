import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full py-5 border-b">
      <div className="maincol flex justify-between">
        <div>logo</div>
        <div className="flex gap-10">
          <Link href={`/meals`}>My meals</Link>
          <Link href={`/explore`}>Explore</Link>
        </div>
        <div>avatar clerk</div>
      </div>
    </div>
  );
}
