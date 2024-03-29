"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TMeal } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

interface SpecialsProps {
  meals: TMeal[];
}
export default function Specials({ meals }: SpecialsProps) {

  // most liked recipees, for now just the latest

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<TMeal | undefined>(meals[1]);
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedMeal(meals[0]);
  }, [meals]);
  function handleMealDisplay(mealId: string, index: number) {
    const foundMeal = meals.find((meal) => meal.id === mealId);
    setSelectedMeal(foundMeal);
    setCurrentIndex(index);
  }
  if(meals.length === 0) {
    return (

      <div className="flex flex-col gap-5 items-center py-5 justify-center">
      <div>No meals to show! Create one</div>
      <Link href={'/recipes/new'}>
      <Button className="mb-10">Create meal</Button>
      </Link>
      </div>
    )
  }

  return (
    <div className="md:flex grid w-full py-20 gap-5 dark:text-white">
      <div className="w-96 border-r border-orange-500">
        {meals.map((meal, index) => (
          <div
            key={meal.id}
            className={`flex py-2 px-5 relative object-cover cursor-pointer ${
              currentIndex === index && "bg-slate-200 dark:bg-slate-800"
            }`}
          >
            <div
              onClick={() => handleMealDisplay(meal.id, index)}
              className="w-full cursor-pointer"
            >
              {meal.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative border md:h-auto h-32">
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
