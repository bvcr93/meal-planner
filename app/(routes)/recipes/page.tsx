import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import { db } from "@/lib/db";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import UserCount from "@/components/ui/user-count";
import { auth } from "@clerk/nextjs";
export default async function RecipesPage() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    throw new Error("User not authenticated.");
  }
  const { meals } = await getMeals();
  const favoriteMeals = await db.favoriteMeals.findMany();
  const favoriteMealIds = favoriteMeals.map((meal) => meal.mealId);
  meals?.sort(
    (a, b) =>
      (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
      (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );
  // const mealsWithFavorites = await db.meal.findMany({
  //   include: {
  //     favoritedBy: {
  //       select: {
  //         profile: {
  //           select: {
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  const favoriteMealsForUser = await db.favoriteMeals.findMany({
    where: {
      profileId: userId,
    },
  });
  const favoriteMealIdsForUser = favoriteMealsForUser.map(
    (meal) => meal.mealId
  );
  return (
    <div className="w-full min-h-screen">
      <Link href={`/recipes/new`}>
        <Button className="mt-20">Create new recipe</Button>
      </Link>
      <div className="grid md:grid-cols-3 place-items-center mt-10 gap-5">
        {meals?.map((meal) => (
          <FoodCard
            hasFavoriteSign={true}
            userId={meal.creator?.userId}
            creatorImageUrl={meal.creator?.imageUrl}
            creatorId={meal.creatorId}
            key={meal.id}
            id={meal.id}
            favoriteMeals={favoriteMealIdsForUser}
            name={meal.name}
            description={meal.description}
            createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
            // favoritedBy={mealsWithFavorites}
          />
        ))}
      </div>
    </div>
  );
}
