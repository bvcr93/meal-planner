import HeroSection from "@/components/hero";
import Profiles from "@/components/profiles";
import Slider from "@/components/ui/slider";
import { db } from "@/lib/db";

export default async function Home() {
  const meals = await db.meal.findMany({
    include: {
      creator: true,
      comments: true,
    },
  });

  const profiles = await db.profile.findMany();
  console.log("profiles: ", profiles);

  // reviews for each profile individually
  const reviews = profiles.map((profile) =>
    meals
      .filter((meal) => meal.creatorId === profile.id)
      .reduce((sum, meal) => sum + meal.comments.length, 0)
  );

  const mealsPerUser = profiles.map(
    (profile) => meals.filter((meal) => meal.creatorId === profile.id).length
  );
  return (
    <main>
      <HeroSection />
      <hr />
      <div className="md:flex flex-col w-full dark:bg-neutral-950">
        <h1 className="text-center w-full my-10 text-xl dark:text-yellow-400">
          Recent users
        </h1>
        <Profiles
          profiles={profiles}
          reviewsPerUser={reviews}
          mealsPerUser={mealsPerUser}
        />
      </div>
    </main>
  );
}
