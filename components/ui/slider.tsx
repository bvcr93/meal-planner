"use client";

import React, { useEffect } from "react";
interface SliderProps {
  meals: Meal[];
}
export default function Slider({ meals }: SliderProps) {
  console.log(meals);

  return (
    <div className="w-full border flex gap-5">
      {meals.map((meal) => (
        <SliderCard meal={meal} />
      ))}
    </div>
  );
}

interface SliderCardProps {
  meal: Meal;
}

function SliderCard({ meal }: SliderCardProps) {
  return <div className="w-full border">{meal.name}</div>;
}
