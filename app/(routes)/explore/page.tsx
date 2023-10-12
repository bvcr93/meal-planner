import SearchSection from "@/components/ui/search-section";
import { getMeals } from "@/lib/meals";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
export default async function ExplorePage() {
  const { userId }: { userId: string | null } = auth();

  let favoriteMealIdsForUser: any;
  if (!userId) {
    throw new Error("User ID is null or undefined.");
  }

  const userProfile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userId) {
    const favoriteMealsForUser = await db.favoriteMeals.findMany({
      where: {
        profileId: userId,
      },
    });

    favoriteMealIdsForUser = favoriteMealsForUser.map((meal) => meal.mealId);
  }

  const { meals } = await getMeals();
  console.log("favoriteMealIdsForUser:", favoriteMealIdsForUser);
  console.log("meals prop in FoodCard:", meals);

  return (
    <div className="min-h-screen">
      <div className="flex">
        <h2 className="text-lg sm:text-xl mb-16 mt-10">
          Find you favorite meal
        </h2>
      </div>
      <SearchSection meals={meals} favoriteMeals={favoriteMealIdsForUser} />
    </div>
  );
}
