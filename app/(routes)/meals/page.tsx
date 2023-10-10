"use client";
import FavoriteCard from "@/components/ui/favorite-card";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";

interface Meal{
  id: string;
  name: string;
  description: string;
};

export default function FavoriteMeals() {
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

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (meals.length === 0)
    return (
      <div className="text-center maincol mt-20 text-xl font-semibold">
        <span>You have no favorite meals yet.</span>
      </div>
    );
  return (
    <div className="maincol">
      <div className="w-full grid grid-cols-5">
        {meals.map((meal) => (
          <FavoriteCard
            id={meal.id}
            name={meal.name}
            description={meal.description}
          />
        ))}
      </div>
    </div>
  );
}
