import EditArea from "@/components/edit-area";
import { db } from "@/lib/db";

export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const allMeals = await db.meal.findMany();
  console.log(allMeals);

  const decodedName = decodeURIComponent(params.id);
  console.log("Decoded name:", decodedName);

  const meal = await db.meal.findFirst({
    where: {
      name: decodedName,
    },
  });

  console.log("Searching for meal with name:", params.id);

  return (
    <div className="mt-10">
      {meal && (
        <EditArea
          name={meal.name}
          description={meal.description}
          id={meal.id}
        />
      )}
    </div>
  );
}
