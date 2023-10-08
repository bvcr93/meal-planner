import RecipeEditor from "@/components/recipe-editor";
import { db } from "@/lib/db";

import React from "react";
interface Props {
  params: {
    id: string;
  };
}
export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const meal = await db.meal.findFirst({
    where: {
      name: params.id,
    },
  });
  console.log("ID:", params.id);
  console.log("Meal:", meal);
 

  return (
    <div className="grid grid-cols-1 w-1/2 mx-auto">
      <RecipeEditor name= {meal?.name} description={meal?.description} meal={meal} />
    </div>
  );
}
