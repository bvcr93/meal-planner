import EditArea from "@/components/edit-area";
import RecipeEditor from "@/components/recipe-editor";
import QuillEditor from "@/components/ui/text-editor";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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
  const { user } = auth();
  return (
    <div className="">
      {/* <RecipeEditor
        name={meal?.name}
        description={meal?.description}
        meal={meal}
      /> */}{" "}
      <EditArea name={meal?.name} description={meal?.description} meal={meal} />
      {/* <QuillEditor
        name={meal?.name}
        description={meal?.description}
        meal={meal}
      /> */}
    </div>
  );
}
