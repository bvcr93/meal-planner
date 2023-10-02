"use client";
import { getUserMealCountAction } from "@/app/actions";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useUser } from "@clerk/nextjs";
import { Meal } from "@prisma/client";
interface UserCountProps {
  creatorId: string | null;
  meals?: Meal[];
}

export default function UserCount({ creatorId, meals }: UserCountProps) {
  const userMealsCount =
    meals?.filter((meal: Meal) => meal.creatorId === creatorId).length || 0;

  const MAX_MEALS = 5;
  const remainingMeals = MAX_MEALS - userMealsCount;
  return (
    <Button
      type="button"
      className="text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
    >
      {`${remainingMeals} more left`}
    </Button>
  );
}
