"use client";
import FavoriteCard from "@/components/ui/favorite-card";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";

interface Meal {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
}

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
      <div className="text-center maincol mt-20 text-xl font-semibold h-screen">
        <span>You have no favorite meals yet.</span>
      </div>
    );
  function removeFromFavorites(id: string) {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  }
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 place-items-center">
        {meals.map((meal) => (
          <FavoriteCard
            id={meal.id}
            name={meal.name}
            description={meal.description}
            coverImage={meal.coverImage}
            key={meal.id}
            onRemove={removeFromFavorites}
          />
        ))}
      </div>
    </div>
  );
}
