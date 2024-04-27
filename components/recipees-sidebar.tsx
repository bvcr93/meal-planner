import {
  HomeIcon,
  LayoutGridIcon,
  SearchIcon
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TMeal } from "@/types";
import Image from "next/image";

interface FavProps {
  favoriteMeals: any;
}

export default function RecipeesSidebar({ favoriteMeals }: FavProps) {
  console.log(favoriteMeals);

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden w-64 flex-col bg-gray-100  dark:bg-neutral-950 md:flex">
          <div className="flex h-16 items-center justify-between  px-6 "></div>
          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6 border-r">
            <Link
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href="#"
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
              href="#"
            >
              <LayoutGridIcon className="h-5 w-5" />
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center border-l justify-between bg-white px-6 dark:bg-neutral-900">
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  className="h-9 w-96 rounded-md bg-gray-100 pl-10 text-sm focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </header>
          <main className="flex-1 bg-gray-100 dark:bg-neutral-900">
            <div className="container mx-auto py-8 px-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteMeals.map((meal: TMeal) => (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative h-24">
                      <Image
                        fill
                        className="object-cover rounded-md"
                        src={meal.coverImage || ""}
                        alt={""}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>{" "}
    </>
  );
}
