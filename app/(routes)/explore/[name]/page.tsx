import { db } from "@/lib/db";
import React from "react";
import Image from "next/image";
interface MealDetailsProps {
  params: {
    name: string;
  };
}

export default async function MealDetails({
  params: { name },
}: MealDetailsProps) {
  const decodedName = decodeURIComponent(name).trim();

  const meal = await db.meal.findFirst({
    where: {
      name: decodedName,
    },
    include: {
      creator: true,
    },
  });

  if (!meal) {
    return <div>Meal not found.</div>;
  }
  return (
    <div className="h-screen flex flex-col items-center justify-start mt-10 gap-10">
      <div className="relative w-1/2">
        {" "}
        {/* Adjust width as needed */}
        <Image
          src={meal.coverImage || ""}
          width={400}
          height={100}
          alt=""
          className="w-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 rounded-xl w-full h-full"></div>
          <div className="text-white text-center absolute w-full space-y-5">
            <div className="text-2xl">{meal.name}</div>
            <p>{meal.description}</p>
            {meal.creator && <p>Created by: {meal.creator.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
