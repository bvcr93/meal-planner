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

  if (!userProfile) {
    throw new Error("Profile not found for the authenticated user.");
  }

  const meals = await db.meal.findMany({
    where: {
      creatorId: userProfile.id,
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
    <div className="w-full min-h-screen mb-20">
      <Link href={`/recipes/new`}>
        <Button className="mt-20">Create new recipe</Button>
      </Link>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 place-items-center mt-10 gap-y-10">
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
            // favoritedBy={mealsWithFavorites}
          />
        ))}
      </div>
    </div>
  );
}
