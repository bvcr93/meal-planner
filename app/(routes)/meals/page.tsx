"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type Meal = {
  id: number;
  name: string;
  description: string;
};

export default function FavoriteMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);

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
      }
    }

    fetchFavoriteMeals();
  }, []);
  if (!meals) return <div>You have no favorite meals yet.</div>;
  return (
    <div className="maincol">
      <div className="w-full grid grid-cols-5">
        {meals.map((meal) => (
          <Link href={`/recipes/${meal.id}`}>
            <div className="w-48 h-64 rounded-xl shadow-xl border flex flex-col items-center justify-center mt-20">
              <div>{meal.name}</div>
              <div dangerouslySetInnerHTML={{ __html: meal.description }}></div>

              <Button size={"sm"} className="mt-5">
                Remove
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
