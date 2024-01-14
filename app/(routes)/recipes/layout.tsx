"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
interface Props {
  children: React.ReactNode;
  withFooter: boolean;
}

export default function FavoritesLayout({ children, withFooter = false }: Props) {
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
