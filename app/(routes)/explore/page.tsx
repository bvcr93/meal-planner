import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function ExplorePage() {
  const { userId }: { userId: string | null } = auth();
  let favoriteMealIdsForUser: any;

  if (userId) {
    const favoriteMealsForUser = await db.favoriteMeals.findMany({
      where: {
        profileId: userId,
      },
    });

    favoriteMealIdsForUser = favoriteMealsForUser.map((meal) => meal.mealId);
  }

  const { meals } = await getMeals();
  if (!meals) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl">
        Error loading meals
      </div>
    );
  }

  const allComments = await db.comment.findMany();
  const ratings = await db.rating.findMany();
  console.log("ratings: ", ratings);

  const mealsWithRatings = meals.map((meal) => {
    const averageRating = meal.ratings.length
      ? meal.ratings.reduce((acc, curr) => acc + curr.ratingValue, 0) /
        meal.ratings.length
      : 0;

    return {
      ...meal,
      averageRating,
    };
  });

  return (
    <div className="min-h-screen">
      <div className="flex w-full text-center">
        <h2 className="text-lg sm:text-xl mb-16 mt-10 text-center w-full">
          Find your favorite meal
        </h2>
      </div>
      <SearchSection
        meals={mealsWithRatings}
        favoriteMeals={favoriteMealIdsForUser || []}
        allComments={allComments}
      />
    </div>
  );
}
