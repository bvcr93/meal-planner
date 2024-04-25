import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import { db } from "@/lib/db";
import { Fish, Leaf, PizzaIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
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
  const meals = await db.meal.findMany({
    where: {
      creatorId: userProfile?.id,
    },
  });

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
        <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
          <h3 className="text-lg font-semibold mb-2">Favorite Cuisines</h3>
          <div className="flex items-center gap-2">
            <PizzaIcon className="h-6 w-6" />
            <p>Italian</p>
          </div>
          <div className="flex items-center gap-2">
            <Fish className="h-6 w-6" />
            <p>Japanese</p>
          </div>
        </div>
        <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
          <h3 className="text-lg font-semibold mb-2">Dietary Preferences</h3>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <p>Vegan</p>
          </div>
          <div className="flex items-center gap-2">
            <Fish className="h-6 w-6" />
            <p>Pescatarian</p>
          </div>
        </div>
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
              <CardContent>
                <p>{}</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
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
