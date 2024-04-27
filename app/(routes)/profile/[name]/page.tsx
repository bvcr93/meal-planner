import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import DietaryPreferences from "@/components/dietary-preferences";
import Spinner from "@/components/ui/spinner";
import { db } from "@/lib/db";
import { Rating } from "@prisma/client";
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

  const ratings = await db.rating.findMany();

  function calculateAverageRating(
    mealId: string,
    ratings: Array<Rating>
  ): number {
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
      <div className="flex flex-col items-center gap-6 p-6 bg-slate-100 dark:bg-slate-900 dark:text-white shadow-lg rounded-xl">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User's name" src={userProfile.imageUrl} />
          <AvatarFallback>
            <Spinner />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {userProfile.email}
          </p>
        </div>
        <DietaryPreferences />
        {/* create initial preferneces simple form and pass the data here */}
      </div>

      <hr />
      <div className="md:grid lg:grid-cols-3 grid-cols-1 gap-10">
        {userProfile?.createdMeals.map((meal) => (
          <Link href={`/explore/${meal.name}`}>
            <Card className="mt-10 rounded-xl">
              <CardHeader className="relative h-20">
                <Image
                  fill
                  alt=""
                  className="object-cover rounded-t-xl"
                  src={meal.coverImage || ""}
                />
                <CardTitle className="absolute top-2 left-2 z-50 text-white text-lg font-semibold">
                  {meal.name}
                </CardTitle>
                {/* <CardDescription>{meal.description}</CardDescription> */}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

