import { db } from "@/lib/db";
import React from "react";

interface MealDetailsProps {
  params: {
    name: string;
  };
}

export default async function MealDetails({
  params: { name },
}: MealDetailsProps) {
  const decodedName = decodeURIComponent(name).trim();

  const meal = await db.meal.findFirst({
    where: {
      name: decodedName,
    },
    include: {
      creator: true,
    },
  });

  if (!meal) {
    return <div>Meal not found.</div>;
  }
  return (
    <div className="h-screen flex flex-col items-center justify-start mt-10">
      <div className="text-2xl">{meal.name}</div>
      <p>Description: {meal.description}</p>
      {meal.creator && <p>Created by: {meal.creator.name}</p>}
    </div>
  );
}
