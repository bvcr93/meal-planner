import { db } from "@/lib/db";
import React, { useEffect } from "react";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProfileProps {
  params: {
    name: string;
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const { userId } = auth();

  const { name } = params;
  const decodedName = decodeURIComponent(name);
  console.log(decodedName);

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

  console.log("User Profile:", userProfile);
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
    <div className="min-h-screen md:flex gap-5 mt-10">
      {userProfile?.createdMeals.map((meal) => (
        <div className="flex" key={meal.id}>
          <div className="rounded-lg shadow-lg w-64">
            <div className="h-24 bg-blue-600 rounded-t-lg" />
            <Image
              alt=""
              className="rounded-full -mt-12 w-32 h-32 border-4 border-white mx-auto object-cover"
              src={meal.coverImage || ""}
              width={200}
              height={200}
            />
            <div className="text-center mt-2">
              <h2 className="text-lg font-semibold">{meal.name}</h2>
              <p className="text-gray-500">Software Engineer</p>
            </div>
            <div className="flex justify-around my-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg">2500</h3>
                <p className="text-gray-500">Calories</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">10</h3>
                <p className="text-gray-500">Likes</p>
              </div>
            </div>
            <div className="px-6 py-4">
              <Button className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Show recipee
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
