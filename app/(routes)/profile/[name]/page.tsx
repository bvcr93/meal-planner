import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function ProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  const userProfile = await db.profile.findFirst({
    where: {
      name: decodedName,
    },
    include: {
      createdMeals: {
        include: {
          _count: {
            select: { comments: true },
          },
        },
      },
      rating: true,
      comments: true,
    },
  });

  console.log("user profile: ", userProfile);

  const ratings = await db.rating.findMany();
  const meals = await db.meal.findMany({
    where: {
      creatorId: userProfile?.id,
    },
  });

  console.log("meals from profile page: ", meals);

  console.log("ratings: ", ratings);

  function calculateAverageRating(mealId: string, ratings: Array<any>): number {
    const mealRatings = ratings.filter((rating) => rating.mealId === mealId);
    const total = mealRatings.reduce(
      (acc, rating) => acc + rating.ratingValue,
      0
    );
    return mealRatings.length > 0 ? total / mealRatings.length : 0;
  }

  if (userProfile && userProfile.createdMeals) {
    userProfile.createdMeals.forEach((meal) => {
      console.log(
        `Meal ID: ${meal.id}, Comment Count: ${meal._count.comments}`
      );
    });
  }

  if (!userProfile) {
    return (
      <div className="flex flex-col items-center text-2xl justify-center h-96">
        User not found.
        <Link href={"/explore"}>
          <Button size={"sm"} className="mt-5">
            Go back
          </Button>
        </Link>
      </div>
    );
  }

  if (!userProfile?.createdMeals || userProfile.createdMeals.length === 0) {
    return (
      <div className="flex flex-col items-center text-2xl justify-center h-96">
        User doesn't have any meals yet.
        <Link href={"/explore"}>
          <Button size={"sm"} className="mt-5">
            Go back
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen md:flex flex-col gap-5 mt-10">
      <div className="w-full border py-4">
        <h1>
          {userProfile.name} {userProfile.email}
        </h1>
      </div>
      <h1>My meals:</h1>
      <hr />
      <div className="grid lg:grid-cols-2 place-items-center gap-5">
        {userProfile?.createdMeals.map((meal) => (
          <Link href={`/explore/${meal.name}`}>
            <Card className="min-w-[400px] md:min-w-[450px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    alt="food image"
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    width={200}
                    height={200}
                    src={meal.coverImage || ""}
                  />
                </div>
                <div className="p-8">
                  <CardTitle className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {meal.name}
                  </CardTitle>

                  <div className="mt-2 text-gray-500">{meal.description}</div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      {renderStars(calculateAverageRating(meal.id, ratings))}
                      <span className="ml-2 text-sm text-gray-600">
                        {calculateAverageRating(meal.id, ratings).toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-500">
                      {meal._count.comments}{" "}
                      {meal._count.comments === 1 ? "comment" : "comments"}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

const renderStars = (rating: number) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i <= rating ? "fill-primary" : "fill-muted stroke-muted-foreground"
        }`}
      />
    );
  }
  return stars;
};
