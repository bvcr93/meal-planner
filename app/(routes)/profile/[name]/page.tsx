import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
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
      createdMeals: true,
    },
  });

  if (!userProfile) {
    // User not found
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
      <div className="grid md:grid-cols-2 place-items-center gap-5">
      {userProfile?.createdMeals.map((meal) => (
        <Card className="md:min-w-[600px] w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                alt="food image"
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={meal.coverImage || ""}
                width={200}
                height={200}
              />
            </div>
            <div className="p-8">
              <CardTitle className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {meal.name}
              </CardTitle>
              <CardDescription className="block mt-1 text-lg leading-tight font-medium text-black">
                {meal.description}
              </CardDescription>
              <div className="mt-2 text-gray-500">
                Cooking time: {meal.cookingTime} min
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  <span className="ml-2 text-sm text-gray-600">4.0</span>
                </div>
                <div className="mt-2 text-gray-500">200 reviews</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      </div>
    </div>
  );
}
