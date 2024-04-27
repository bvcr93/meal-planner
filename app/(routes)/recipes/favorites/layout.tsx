"use client";
import RecipeesSidebar from "@/components/recipees-sidebar";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import React, { ReactNode, useEffect, useState } from "react";

interface Meal {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
}

export default async function RecipeesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteMeals() {
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();

        if (data.success) {
          setMeals(data.meals);
        } else {
          console.error("Failed to fetch favorite meals:", data.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavoriteMeals();
  }, []);

  return (
    <div className="">
      <RecipeesSidebar favoriteMeals={meals} />
      {/* {children} */}
    </div>
  );
}
