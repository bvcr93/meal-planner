import { db } from "@/lib/db";
import React from "react";
import Image from "next/image";
import CommentSection from "@/components/ui/comment-section";
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
  const comments = await db.comment.findMany({
    where: {
      mealId: meal?.id,
    },
    include: {
      profile: true,
    },
  });
  if (!meal) {
    return <div>Meal not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-10 gap-10 mb-20">
      <div className="relative w-full">
        <Image
          src={meal.coverImage || ""}
          width={600}
          height={100}
          alt=""
          className="w-full object-cover rounded-xl h-96"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 rounded-xl w-full h-full"></div>
          <div className="text-white text-center absolute w-full space-y-5">
            <div className="text-4xl font-semibold">{meal.name}</div>
            <p>{meal.description}</p>
            {meal.creator && <p>Created by: {meal.creator.name}</p>}
          </div>
        </div>
      </div>
      {comments.map((comment) => (
        <div className="w-full">
          <CommentSection {...comment} user={comment.profile} />
        </div>
      ))}
    </div>
  );
}
