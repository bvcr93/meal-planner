"use client";
import FoodCard from "@/components/ui/food-card";
import { db } from "@/lib/db";
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
      <h1>Favorite Meals</h1>
      <div className="w-full">
        {meals.map((meal) => (
          <div className="w-full border">{meal.name}</div>
        ))}
      </div>
    </div>
  );
}
