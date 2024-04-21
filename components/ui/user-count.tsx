"use client";
import { Meal } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";

interface UserCountProps {
  creatorId: string | null;
  meals?: Meal[];
}

export default function UserCount({ creatorId, meals }: UserCountProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const { toast } = useToast();
  const userMealsCount =
    meals?.filter((meal: Meal) => meal.creatorId === creatorId).length || 0;

  const MAX_MEALS = 5;
  let remainingMeals = MAX_MEALS - userMealsCount;
  remainingMeals = Math.max(0, remainingMeals);
  useEffect(() => {
    if (remainingMeals === 0) {
      setIsAlertDialogOpen(true);
    }
  }, [remainingMeals]);

  useEffect(() => {
    if (remainingMeals === 0) {
      toast({
        title: "Limit Reached",
        description:
          "You've reached the maximum number of meals. Upgrade to Pro to create more!",
      });
    }
  }, [remainingMeals, toast]);

  return (
    <Button
      type="button"
      className="text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
    >
      {`${remainingMeals} more left`}
    </Button>
  );
}
