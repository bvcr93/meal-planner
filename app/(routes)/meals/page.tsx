"use client";
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

  return (
    <div>
      <h1>Favorite Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            {meal.name} {meal.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
