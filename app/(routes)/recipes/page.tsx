import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import { db } from "@/lib/db";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
export default async function RecipesPage() {
  const { meals } = await getMeals();
  const favoriteMeals = await db.favoriteMeals.findMany();
  const favoriteMealIds = favoriteMeals.map((meal) => meal.mealId);
  meals?.sort(
    (a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
      (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );
  return (
    <div className="maincol ">
      <Link href={`/recipes/new`}>
        <Button className="mt-20">Create new recipe</Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 place-items-center mt-10">
        {meals?.map((meal) => (
          <div className="cursor-pointer">
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
