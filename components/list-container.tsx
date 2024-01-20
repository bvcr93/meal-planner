import { Meal } from "@prisma/client";
import React from "react";
interface ListContainerProps {
  meals: Meal[];
}
export default function ListContainer({ meals }: ListContainerProps) {
  return (
    <div className="w-full border">
      {meals.map((meal) => (
        <div>{meal.name}</div>
      ))}
    </div>
  );
}
