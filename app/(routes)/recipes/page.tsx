import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
export default async function RecipesPage() {
  const { userId }: { userId: string | null } = auth();
  console.log("Logged in User ID:", userId);

  if (!userId) {
    throw new Error("User not authenticated.");
  }
  const userProfile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  const meals = await db.meal.findMany({
    where: {
      creatorId: userProfile?.id,
    },
    include: {
      creator: true,
    },
  });

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
    <div className="min-h-screen mb-20">
    <Link href={`/recipes/new`}>
        <Button className="mt-20">Create new recipe</Button>
    </Link>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {meals?.map((meal) => (
            <FoodCard
                userId={meal.creator?.userId}
                creatorImageUrl={meal.creator?.imageUrl}
                creatorId={meal.creatorId}
                key={meal.id}
                id={meal.id}
                favoriteMeals={favoriteMealIdsForUser}
                name={meal.name}
                description={meal.description}
                createdAt={meal.createdAt ? meal.createdAt.toString() : ""}
                coverImage={meal.coverImage || undefined}
                cookingTime={meal.cookingTime}
                hasEditButton={true}
                hasCreatorImage={false}
                // favoritedBy={mealsWithFavorites}
            />
        ))}
    </div>
</div>

  );
}