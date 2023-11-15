"use client";

import Image from "next/image";
import { useState } from "react";
import { TMeal } from "./ui/search-section";
interface SpecialsProps {
  meals: TMeal[];
}
export default function Specials({ meals }: SpecialsProps) {
  console.log(meals);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<TMeal | undefined>(meals[1]);

  function handleMealDisplay(mealId: string, index: number) {
    const foundMeal = meals.find((meal) => meal.id === mealId);
    setSelectedMeal(foundMeal);
    setCurrentIndex(index);
  }

  return (
    <div className="flex w-full py-20 gap-5 dark:text-white">
      <div className="w-96 border-r border-orange-500">
        {meals.slice(1, 6).map((meal, index) => (
          <div
            key={meal.id}
            className={`flex py-2 px-5 relative object-cover cursor-pointer ${
              currentIndex === index && "bg-orange-500"
            }`}
          >
            <div
              onClick={() => handleMealDisplay(meal.id, index)}
              className="w-full cursor-pointe "
            >
              {meal.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative">
        {selectedMeal && (
          <Image
            src={selectedMeal.coverImage || ""}
            alt=""
            fill
            className="object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
