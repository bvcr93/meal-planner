"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface Props {
  children: React.ReactNode;
}
export default function FavoritesLayout({ children }: Props) {
  return (
    <div>
      <div className="w-full flex justify-between items-center mt-20">
        <Link href={`/recipes/new`}>
          <Button className="">Create new recipe</Button>
        </Link>
        <Link href={"/recipes/favorites"}>
          <Button className="ml-5" variant={"secondary"}>
            Favorites
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
