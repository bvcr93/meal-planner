"use client";

import { Button } from "./ui/button";
import FoodCard from "./ui/food-card";
import { useState } from "react";
interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
}

 interface Meal {
  id: string;
  name: string;
  description: string;
  isEdited: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  creatorId: string;
  cookingTime: number | null;
  coverImage: string | null;
  creator: Profile | null;
}

interface FavoriteMealsProps {
  meals: Meal[];
  favoriteMealIds: string[];
}

export function MealsDisplay({ meals, favoriteMealIds }: FavoriteMealsProps) {
  const [showFavorites, setShowFavorites] = useState(false);

  const mealsToDisplay = showFavorites
    ? meals.filter((meal) => favoriteMealIds.includes(meal.id))
    : meals;

  return (
    <div>
      <Button className="mt-5" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All" : "Show Favorites"}
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {mealsToDisplay.map((meal) => (
          <FoodCard
            userId={meal.creator?.userId}
            creatorImageUrl={meal.creator?.imageUrl}
            creatorId={meal.creatorId}
            key={meal.id}
            id={meal.id}
            favoriteMeals={favoriteMealIds}
            name={meal.name}
            description={meal.description}
            createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
            coverImage={meal.coverImage || undefined}
            cookingTime={meal.cookingTime}
            hasEditButton={true}
            hasCreatorImage={false}
            hasFavoriteStar
          />
        ))}
      </div>
    </div>
  );
}

// for filtering the favorite meals
