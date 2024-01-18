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
      ratings: true,
    },
  });
  const comments = await db.comment.findMany({
    where: {
      mealId: meal?.id,
    },
    include: {
      profile: true,
      subcomments: {
        include: {
          profile: true,
        },
      },
      ratings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("Ratings for the meal:", meal?.ratings);

  if (!meal) {
    return <div>Meal not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-10 gap-10 mb-20">
      <div className="relative w-full">
        <Image
          src={meal.coverImage || ""}
          width={1000}
          height={1000}
          alt=""
          className="w-full object-cover rounded-xl h-96"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 rounded-xl w-full h-full"></div>
          <div className="text-white text-center absolute w-full space-y-5 md:px-20 px-10 text-sm">
            <div className="text-4xl font-semibold">{meal.name}</div>
            <p className="font-sm text-slate-300">{meal.description}</p>
          </div>
        </div>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="w-full">
          <CommentSection
            {...comment} 
            user={comment.profile}
            subcomments={comment.subcomments}
          />
        </div>
      ))}
      <div></div>
    </div>
  );
}
