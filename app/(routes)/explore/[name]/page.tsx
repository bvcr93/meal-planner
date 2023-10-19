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

  console.log("Decoded Name:", decodedName);
  console.log("Retrieved Meal:", meal);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {meal ? (
        <>
          <div className="text-2xl">{meal.name}</div>
          <p>Description: {meal.description}</p>
          {meal.creator && (
            <>
              <p>Created by: {meal.creator.name}</p>
            </>
          )}
        </>
      ) : (
        <p>Meal not found.</p>
      )}
    </div>
  );
}
