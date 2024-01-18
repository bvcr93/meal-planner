import KanbanBoard from "@/components/kanban-board";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";

export default async function WeeklyPlan() {
  const meals = await db.meal.findMany();

  return (
    <div className="">
      <div className="flex gap-5">
        {meals.map((meal) => (
          <div className="mt-10 relative" key={meal.id}>
            <Image
              width={200}
              height={200}
              alt=""
              src={meal.coverImage || ""}
              className="object-cover rounded-full w-20 h-20"
            />
            <div className="absolute inset-0 flex items-center cursor-pointer justify-center text-white rounded-full bg-black bg-opacity-50 hover:bg-opacity-0 transition-opacity duration-300">
              {meal.name}
            </div>
          </div>
        ))}
      </div>
      <KanbanBoard />
    </div>
  );
}
